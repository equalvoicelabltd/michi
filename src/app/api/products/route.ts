import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

// ── Supabase client (server-side) ──────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── OpenAI client ──────────────────────────────────────────
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Search queries for Japanese product news ───────────────
const SEARCH_QUERIES = [
  { q: '日本 新商品 発売 2025', category: 'general' },
  { q: 'Japan new product launch fashion 2025', category: 'fashion' },
  { q: '日本 コスメ 新作 発売', category: 'beauty' },
  { q: 'Japan anime limited edition figure 2025', category: 'anime' },
  { q: '日本 電子製品 新発売 2025', category: 'electronics' },
  { q: 'Japan new food snack limited 2025', category: 'food' },
];

interface RawSearchItem {
  title: string;
  snippet: string;
  link: string;
  pagemap?: { cse_image?: { src: string }[] };
}

// ============================================================
// GET /api/products
// Returns saved products, or triggers scrape if ?action=scrape
// ============================================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'scrape') {
      const count = await runScrape();
      return NextResponse.json({ success: true, message: `Scraped ${count} new products`, count });
    }

    // Default: return stored products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(9);

    if (error) {
      console.error('[products/GET] Supabase error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, products: data ?? [] });
  } catch (err) {
    console.error('[products/GET] Unexpected error:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// ============================================================
// POST /api/products
// Manual trigger: { "action": "refresh" }
// ============================================================
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();

    if (action === 'refresh') {
      const count = await runScrape();
      return NextResponse.json({ success: true, message: `Refreshed ${count} new products`, count });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    console.error('[products/POST] Error:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// ============================================================
// Core scrape logic
// ============================================================
async function runScrape(): Promise<number> {
  const allProducts: {
    title: string;
    description: string;
    category: string;
    source: string;
    source_url: string;
    image_url: string | null;
    ai_summary: string;
    published_at: string;
    ai_generated: boolean;
  }[] = [];

  const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cseId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  for (const { q, category } of SEARCH_QUERIES) {
    let items: RawSearchItem[] = [];

    // ── Try Google Custom Search ──────────────────────────
    if (googleApiKey && cseId) {
      try {
        const url =
          `https://www.googleapis.com/customsearch/v1` +
          `?q=${encodeURIComponent(q)}` +
          `&cx=${cseId}` +
          `&key=${googleApiKey}` +
          `&num=3` +
          `&sort=date`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          items = (data.items ?? []) as RawSearchItem[];
        } else {
          console.warn(`[scrape] Google Search non-200: ${res.status} for "${q}"`);
        }
      } catch (e) {
        console.warn(`[scrape] Google Search error for "${q}":`, e);
      }
    } else {
      console.warn('[scrape] GOOGLE_SEARCH_API_KEY or GOOGLE_SEARCH_ENGINE_ID not set — skipping Google search');
    }

    // ── Generate AI summaries ─────────────────────────────
    for (const item of items.slice(0, 2)) {
      let hostname = 'Japan News';
      try {
        hostname = new URL(item.link).hostname.replace('www.', '');
      } catch {}

      const imageUrl =
        item.pagemap?.cse_image?.[0]?.src ?? null;

      let aiSummary = item.snippet;
      if (process.env.OPENAI_API_KEY) {
        try {
          const resp = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content:
                  '你是日本商品情報專家。請用繁體中文撰寫一段簡潔、吸引人的商品摘要（100字以內），' +
                  '重點突出產品特色、適合人群及購買價值。直接輸出摘要，無需前置說明。',
              },
              {
                role: 'user',
                content: `商品標題：${item.title}\n商品描述：${item.snippet}\n分類：${category}`,
              },
            ],
            max_tokens: 180,
            temperature: 0.65,
          });
          aiSummary = resp.choices[0]?.message?.content ?? item.snippet;
        } catch (e) {
          console.warn('[scrape] OpenAI error:', e);
        }
      }

      allProducts.push({
        title: item.title,
        description: item.snippet,
        category,
        source: hostname,
        source_url: item.link,
        image_url: imageUrl,
        ai_summary: aiSummary,
        published_at: new Date().toISOString(),
        ai_generated: true,
      });
    }
  }

  if (allProducts.length === 0) {
    return 0;
  }

  // ── Deduplicate against existing titles ────────────────
  const { data: existingRows } = await supabase
    .from('products')
    .select('title')
    .in('title', allProducts.map((p) => p.title));

  const existingTitles = new Set((existingRows ?? []).map((r: { title: string }) => r.title));
  const newProducts = allProducts.filter((p) => !existingTitles.has(p.title));

  if (newProducts.length === 0) {
    return 0;
  }

  // ── Insert to Supabase ─────────────────────────────────
  const { error } = await supabase.from('products').insert(newProducts);
  if (error) {
    console.error('[scrape] Supabase insert error:', error);
    return 0;
  }

  return newProducts.length;
}