import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Product {
  title: string;
  description: string;
  category: string;
  source: string;
  ai_summary: string;
  published_at: string;
}

/**
 * GET /api/products
 * 獲取最新商品或觸發爬蟲
 * ?action=scrape - 觸發爬蟲搜索新商品
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // 驗證內部 API 密鑰（可選）
    const apiKey = request.headers.get('x-api-key');
    if (process.env.INTERNAL_API_KEY && apiKey !== process.env.INTERNAL_API_KEY) {
      // 不強制驗證，允許公開訪問
    }

    if (action === 'scrape') {
      // 觸發爬蟲
      const result = await scrapeJapaneseProducts();
      return NextResponse.json({
        success: true,
        message: `Found ${result.count} products`,
        productsCount: result.count,
      });
    }

    // 默認：返回已保存的商品
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      products: data || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * 手動觸發商品更新
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'refresh') {
      const result = await scrapeJapaneseProducts();
      return NextResponse.json({
        success: true,
        message: 'Products refreshed successfully',
        productsCount: result.count,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * 搜索日本最新商品
 * 使用 Google Custom Search API
 */
async function searchJapaneseProducts(
  query: string,
  category: string
): Promise<Product[]> {
  try {
    const searchQuery = `${query} ${category} 2024 2025 新作 發售 新商品`;

    // 調用 Google Custom Search API
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?` +
      `q=${encodeURIComponent(searchQuery)}` +
      `&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}` +
      `&key=${process.env.GOOGLE_SEARCH_API_KEY}` +
      `&sort=date`,
      { method: 'GET' }
    );

    if (!response.ok) {
      console.warn(`Google Search API warning: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    const items = data.items?.slice(0, 3) || [];

    // 為每個搜索結果生成 AI 摘要
    const products: Product[] = [];

    for (const item of items) {
      try {
        const aiSummary = await generateAISummary(
          item.title,
          item.snippet,
          category
        );

        products.push({
          title: item.title,
          description: item.snippet,
          category: category,
          source: new URL(item.link).hostname,
          ai_summary: aiSummary,
          published_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Error generating AI summary:', err);
        // 即使失敗，仍然添加產品
        products.push({
          title: item.title,
          description: item.snippet,
          category: category,
          source: new URL(item.link).hostname,
          ai_summary: item.snippet,
          published_at: new Date().toISOString(),
        });
      }
    }

    return products;
  } catch (error) {
    console.error('Error searching Japanese products:', error);
    return [];
  }
}

/**
 * 使用 OpenAI 生成中文摘要
 */
async function generateAISummary(
  title: string,
  snippet: string,
  category: string
): Promise<string> {
  try {
    const prompt = `
作為日本商品評論專家，為以下商品生成簡潔的中文摘要（最多 150 字）：

商品標題：${title}
商品介紹：${snippet}
商品分類：${category}

摘要要求：
- 強調產品的獨特之處
- 提及材料、工藝或設計元素
- 提供購買建議或適用場景
- 簡潔、優雅的語氣

直接輸出摘要，不需要前置說明。
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return (
      response.choices[0]?.message?.content ||
      snippet.substring(0, 150)
    );
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return snippet.substring(0, 150);
  }
}

/**
 * 保存商品到 Supabase
 */
async function saveProductsToSupabase(
  products: Product[]
): Promise<number> {
  try {
    if (products.length === 0) {
      console.log('No new products to save');
      return 0;
    }

    // 檢查重複
    const existingTitles = await supabase
      .from('products')
      .select('title')
      .in(
        'title',
        products.map((p) => p.title)
      );

    const existingSet = new Set(
      existingTitles.data?.map((p: any) => p.title) || []
    );

    // 過濾重複
    const newProducts = products.filter((p) => !existingSet.has(p.title));

    if (newProducts.length === 0) {
      console.log('All products already exist');
      return 0;
    }

    // 插入新商品
    const { error } = await supabase.from('products').insert(
      newProducts.map((p) => ({
        title: p.title,
        description: p.description,
        category: p.category,
        source: p.source,
        ai_generated: true,
        ai_summary: p.ai_summary,
        published_at: p.published_at,
        tags: [p.category.toLowerCase()],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
    );

    if (error) {
      throw error;
    }

    console.log(`Saved ${newProducts.length} new products to Supabase`);
    return newProducts.length;
  } catch (error) {
    console.error('Error saving products to Supabase:', error);
    return 0;
  }
}

/**
 * 爬蟲主函數
 */
async function scrapeJapaneseProducts() {
  try {
    // 定義搜索類別
    const categories = [
      { name: 'Fashion', query: 'Uniqlo MUJI 新作' },
      { name: 'Home', query: '家具 インテリア 新商品' },
      { name: 'Craft', query: '工藝 職人 新作' },
    ];

    const allProducts: Product[] = [];

    // 搜索每個類別
    for (const category of categories) {
      const products = await searchJapaneseProducts(
        category.query,
        category.name
      );
      allProducts.push(...products);
    }

    // 保存到 Supabase
    const saved = await saveProductsToSupabase(allProducts);

    return {
      count: saved,
      total: allProducts.length,
    };
  } catch (error) {
    console.error('Error in scrapeJapaneseProducts:', error);
    return {
      count: 0,
      total: 0,
    };
  }
}