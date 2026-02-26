/**
 * /api/products/route.ts
 *
 * 🔑 只需要: OPENAI_API_KEY + Supabase keys
 * 🚫 不需要: Google Custom Search API
 *
 * 工作原理:
 * 1. GET /api/products         → 從 Supabase 讀取已儲存商品
 * 2. GET /api/products?action=scrape → 呼叫 OpenAI 搜尋日本新商品並儲存
 * 3. POST /api/products { action: "refresh" } → 同上
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ── Supabase ───────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Search topics ──────────────────────────────────────────
const TOPICS = [
  { topic: 'Uniqlo Muji GU 最新系列 2025', category: 'fashion' },
  { topic: 'Japan beauty cosmetics new launch SK-II Shiseido 2025', category: 'beauty' },
  { topic: 'Japan anime figure limited Pokemon Gundam 2025', category: 'anime' },
  { topic: '日本 限定スナック 新フレーバー 2025', category: 'food' },
  { topic: 'Japan new electronics Sony Panasonic 2025', category: 'electronics' },
  { topic: '日本 伝統工芸 職人 新作 陶芸 2025', category: 'craft' },
];

// ═══════════════════════════════════════════════════════════
// GET /api/products
// ═══════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  const action = new URL(request.url).searchParams.get('action');

  if (action === 'scrape') {
    try {
      const count = await runScrape();
      return NextResponse.json({ success: true, count, message: `Added ${count} new products` });
    } catch (err) {
      console.error('[scrape] Error:', err);
      return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
  }

  // Default: read from Supabase
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(9);

    if (error) {
      console.error('[GET] Supabase error:', error.message);
      // Return empty rather than error — table may not exist yet
      return NextResponse.json({ success: true, products: [] });
    }

    return NextResponse.json({ success: true, products: data ?? [] });
  } catch (err) {
    console.error('[GET] Unexpected:', err);
    return NextResponse.json({ success: true, products: [] });
  }
}

// ═══════════════════════════════════════════════════════════
// POST /api/products
// ═══════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.action === 'refresh') {
      const count = await runScrape();
      return NextResponse.json({ success: true, count });
    }
    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════
// Core scrape — uses OpenAI Responses API (web_search_preview)
// Falls back to chat completions if responses API unavailable
// ═══════════════════════════════════════════════════════════
async function runScrape(): Promise<number> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.error('[scrape] Missing OPENAI_API_KEY');
    throw new Error('OPENAI_API_KEY is not configured in environment variables');
  }

  let total = 0;

  for (const { topic, category } of TOPICS) {
    try {
      // Try Responses API with web search first
      let products = await searchWithResponsesAPI(topic, category, key);

      // Fallback to chat completions (uses model knowledge)
      if (products.length === 0) {
        products = await searchWithChatCompletions(topic, category, key);
      }

      const saved = await saveProducts(products);
      total += saved;
      console.log(`[scrape] ${category}: found ${products.length}, saved ${saved}`);

    } catch (err) {
      console.warn(`[scrape] Failed for topic "${topic}":`, err);
    }
  }

  return total;
}

// ─────────────────────────────────────────────────────────────
// Method 1: OpenAI Responses API with web_search_preview
// Real-time web search! Best option.
// ─────────────────────────────────────────────────────────────
async function searchWithResponsesAPI(
  topic: string,
  category: string,
  apiKey: string
): Promise<ProductRow[]> {
  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        tools: [{ type: 'web_search_preview' }],
        input: buildPrompt(topic, category),
      }),
    });

    if (!res.ok) {
      // 404 or 400 means responses API not available for this key
      console.log(`[responses-api] Not available (${res.status}), will use fallback`);
      return [];
    }

    const data = await res.json();

    // Extract text from response output
    let text = '';
    for (const item of data.output ?? []) {
      if (item.type === 'message') {
        for (const c of item.content ?? []) {
          if (c.type === 'output_text') text += c.text;
        }
      }
    }

    return parseJSON(text, category);
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Method 2: Standard Chat Completions (model knowledge)
// No real-time search, but always works with any OpenAI key
// ─────────────────────────────────────────────────────────────
async function searchWithChatCompletions(
  topic: string,
  category: string,
  apiKey: string
): Promise<ProductRow[]> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 700,
      messages: [
        {
          role: 'system',
          content: `你是日本商品情報專家。根據主題提供近期（2024-2025）日本品牌商品資訊。
只輸出合法 JSON 陣列，絕不輸出其他文字。
格式：
[
  {
    "title": "商品名稱（繁體中文，30字以內）",
    "description": "一句描述（20字以內）",
    "ai_summary": "為何值得關注，包含品牌、特色、適合人群（80字以內，繁體中文）",
    "source": "品牌名稱",
    "source_url": "",
    "category": "${category}"
  }
]`,
        },
        {
          role: 'user',
          content: `請提供以下主題的日本商品情報：${topic}
返回 3 個商品，只輸出 JSON 陣列。`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI chat error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? '';
  return parseJSON(text, category);
}

// ─────────────────────────────────────────────────────────────
// Prompt builder
// ─────────────────────────────────────────────────────────────
function buildPrompt(topic: string, category: string): string {
  return `Search for recent Japanese product news about: "${topic}"

Find 2-3 real Japanese products released or announced in 2024-2025.
Return ONLY a valid JSON array with this exact structure:
[
  {
    "title": "product name in Traditional Chinese (max 30 chars)",
    "description": "one sentence description (max 20 chars)",
    "ai_summary": "why this product is noteworthy, include brand, features, target audience (max 80 chars in Traditional Chinese)",
    "source": "brand or website name",
    "source_url": "full URL if found, else empty string",
    "category": "${category}"
  }
]
Return ONLY the JSON array. No preamble, no explanation.`;
}

// ─────────────────────────────────────────────────────────────
// Parse JSON from AI text response
// ─────────────────────────────────────────────────────────────
interface ProductRow {
  title: string;
  description: string | null;
  ai_summary: string | null;
  source: string;
  source_url: string | null;
  category: string;
}

function parseJSON(text: string, category: string): ProductRow[] {
  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const start = clean.indexOf('[');
    const end = clean.lastIndexOf(']');
    if (start === -1 || end === -1) return [];

    const arr = JSON.parse(clean.slice(start, end + 1));
    if (!Array.isArray(arr)) return [];

    return arr
      .filter((p: any) => typeof p?.title === 'string' && p.title.length > 2)
      .slice(0, 3)
      .map((p: any): ProductRow => ({
        title: String(p.title).slice(0, 200),
        description: p.description ? String(p.description).slice(0, 400) : null,
        ai_summary: p.ai_summary ? String(p.ai_summary).slice(0, 400) : null,
        source: p.source ? String(p.source).slice(0, 100) : 'Japan',
        source_url: p.source_url && p.source_url.startsWith('http')
          ? String(p.source_url).slice(0, 500)
          : null,
        category,
      }));
  } catch (e) {
    console.warn('[parse] JSON parse failed:', e);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Save to Supabase, skip duplicates by title
// ─────────────────────────────────────────────────────────────
async function saveProducts(products: ProductRow[]): Promise<number> {
  if (products.length === 0) return 0;

  try {
    // Check duplicates
    const { data: existing } = await supabase
      .from('products')
      .select('title')
      .in('title', products.map(p => p.title));

    const seen = new Set((existing ?? []).map((r: any) => r.title));
    const fresh = products.filter(p => !seen.has(p.title));
    if (fresh.length === 0) return 0;

    const { error } = await supabase.from('products').insert(
      fresh.map(p => ({
        ...p,
        ai_generated: true,
        image_url: null,
        published_at: new Date().toISOString(),
      }))
    );

    if (error) {
      console.error('[save] Insert error:', error.message);
      return 0;
    }

    return fresh.length;
  } catch (err) {
    console.error('[save] Error:', err);
    return 0;
  }
}