import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock data for demo - in production, use Google Custom Search API
const MOCK_NEWS = [
  {
    title: '新作コスメ「ラディアントグロー」発表',
    snippet:
      'SKIIが最新のスキンケア製品「ラディアントグロー」を発表しました。浸透力の高い新しいフォーミュラで、肌の輝きを取り戻します。',
    link: 'https://example.com/news1',
    category: 'cosmetics',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: '新型iPhone発表',
    snippet:
      'Appleが新型iPhone15を発表しました。A18チップ搭載で処理能力が大幅に向上しています。',
    link: 'https://example.com/news2',
    category: 'electronics',
    image: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'ユニクロ新作ファッション',
    snippet:
      'ユニクロが春夏コレクションを発表。快適性と機能性を兼ね備えた新作アイテムが登場します。',
    link: 'https://example.com/news3',
    category: 'fashion',
    image: 'https://via.placeholder.com/300x200',
  },
];

export async function GET(request: NextRequest) {
  // Verify Cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const languages = ['zh', 'zh-CN', 'en'];

    for (const news of MOCK_NEWS) {
      // Check if product already exists
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('source_url', news.link)
        .single();

      if (existing) continue;

      // Generate summaries in different languages using OpenAI
      const summaries: Record<string, string> = {};

      for (const lang of languages) {
        const langName =
          lang === 'zh'
            ? '繁體中文'
            : lang === 'zh-CN'
              ? '簡體中文'
              : 'English';

        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `你是一個日本商品情報專家。用簡潔的${langName}總結新商品資訊。
包含: 品牌、產品名、特點、關鍵信息。
限制在100個字以內。`,
            },
            {
              role: 'user',
              content: `請總結這個新聞:\n\n${news.snippet}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 150,
        });

        const langKey = lang === 'zh' ? 'summary_zh' : `summary_${lang}`;
        summaries[langKey] =
          response.choices[0]?.message?.content || news.snippet;
      }

      // Insert into Supabase
      const { error } = await supabase.from('products').insert({
        title: news.title,
        source_url: news.link,
        image_url: news.image,
        category: news.category,
        original_language: 'ja',
        published_at: new Date().toISOString(),
        ai_generated: true,
        summary_zh: summaries.summary_zh,
        summary_zh_CN: summaries.summary_zh_CN,
        summary_en: summaries.summary_en,
      });

      if (error) {
        console.error('Insert error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Products scraped and updated',
      count: MOCK_NEWS.length,
    });
  } catch (error) {
    console.error('Scrape error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape products' },
      { status: 500 }
    );
  }
}
