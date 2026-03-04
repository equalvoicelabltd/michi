/**
 * /api/products/route.ts
 *
 * 🔑 只需要: OPENAI_API_KEY + Supabase keys
 * 🚫 不需要: Google Custom Search API
 *
 * 改動 (2026-03):
 *  - TOPICS 年份 → 2025-2026
 *  - buildPrompt 強調只要 2025 年後的商品
 *  - saveProducts 自動過濾 published_at < 2025-01-01 的商品
 *  - GET 預設只返回 2025 年後的商品
 *  - 新增 action=clean 清除舊商品
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ── Supabase ───────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── 年份常數 ───────────────────────────────────────────────
const CURRENT_YEAR = new Date().getFullYear();          // 2026
const MIN_YEAR     = CURRENT_YEAR - 1;                  // 2025
const CUTOFF_DATE  = `${MIN_YEAR}-01-01T00:00:00Z`;    // 只要 2025+ 商品

// ── Search topics — 全部改為最新年份 ───────────────────────
const TOPICS = [
  { topic: `Uniqlo Muji GU 最新系列 ${CURRENT_YEAR}`, category: 'fashion' },
  { topic: `Japan beauty cosmetics new launch SK-II Shiseido ${CURRENT_YEAR}`, category: 'beauty' },
  { topic: `Japan anime figure limited Pokemon Gundam ${CURRENT_YEAR}`, category: 'anime' },
  { topic: `日本 限定スナック 新フレーバー ${CURRENT_YEAR}`, category: 'food' },
  { topic: `Japan new electronics Sony Panasonic ${CURRENT_YEAR}`, category: 'electronics' },
  { topic: `日本 伝統工芸 職人 新作 陶芸 ${CURRENT_YEAR}`, category: 'craft' },
];

// ── Types ──────────────────────────────────────────────────
interface ProductRow {
  title: string;
  description: string | null;
  ai_summary: string | null;
  source: string;
  source_url: string;
  category: string;
  published_at?: string;
  image_url?: string | null;
  ai_generated?: boolean;
}

// ═══════════════════════════════════════════════════════════
// GET /api/products
// ═══════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  const action = new URL(request.url).searchParams.get('action');

  // ── Scrape: AI 搜尋最新商品 ─────────────────────────────
  if (action === 'scrape') {
    try {
      const count = await runScrape();
      return NextResponse.json({ success: true, count, message: `Added ${count} new products` });
    } catch (err) {
      console.error('[scrape] Error:', err);
      return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
  }

  // ── Clean: 刪除 2025 年之前的舊商品 ─────────────────────
  if (action === 'clean') {
    try {
      const { count } = await supabase
        .from('products')
        .delete()
        .lt('published_at', CUTOFF_DATE);
      return NextResponse.json({ success: true, deleted: count ?? 0 });
    } catch (err) {
      return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
  }

  // ── Default: 從 Supabase 讀取（只返回 2025+ 商品）──────
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gte('published_at', CUTOFF_DATE)
      .order('published_at', { ascending: false })
      .limit(18);

    if (error) {
      console.error('[GET] Supabase error:', error.message);
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
// Core scrape — OpenAI Responses API → fallback Chat
// ═══════════════════════════════════════════════════════════
async function runScrape(): Promise<number> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not configured');

  let total = 0;

  for (const { topic, category } of TOPICS) {
    try {
      let products = await searchWithResponsesAPI(topic, category, key);
      if (products.length === 0) {
        products = await searchWithChatCompletions(topic, category, key);
      }

      const saved = await saveProducts(products);
      total += saved;
      console.log(`[scrape] ${category}: found ${products.length}, saved ${saved}`);
    } catch (err) {
      console.warn(`[scrape] Failed for "${topic}":`, err);
    }
  }

  return total;
}

// ─────────────────────────────────────────────────────────────
// Method 1: OpenAI Responses API with web_search_preview
// ─────────────────────────────────────────────────────────────
async function searchWithResponsesAPI(
  topic: string, category: string, apiKey: string
): Promise<ProductRow[]> {
  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        tools: [{ type: 'web_search_preview' }],
        input: buildPrompt(topic, category),
      }),
    });

    if (!res.ok) {
      console.log(`[responses-api] Not available (${res.status}), using fallback`);
      return [];
    }

    const data = await res.json();
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
// Method 2: Chat Completions (fallback)
// ─────────────────────────────────────────────────────────────
async function searchWithChatCompletions(
  topic: string, category: string, apiKey: string
): Promise<ProductRow[]> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 700,
      messages: [
        {
          role: 'system',
          content: `你是日本商品情報專家。只提供 ${MIN_YEAR}-${CURRENT_YEAR} 年發佈的最新日本商品。
絕對不要提供 ${MIN_YEAR - 1} 年或更早的商品。
只輸出合法 JSON 陣列，絕不輸出其他文字。
格式：
[
  {
    "title": "商品名稱（繁體中文，30字以內）",
    "description": "一句描述（20字以內）",
    "ai_summary": "為何值得關注，品牌、特色、適合人群（80字以內，繁體中文）",
    "source": "品牌名稱",
    "source_url": "",
    "category": "${category}",
    "published_at": "ISO 8601 日期（必須是 ${MIN_YEAR} 年之後）"
  }
]`,
        },
        {
          role: 'user',
          content: `請提供以下主題在 ${MIN_YEAR}-${CURRENT_YEAR} 年的最新日本商品：${topic}\n返回 3 個商品，只輸出 JSON。`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? '';
  return parseJSON(text, category);
}

// ─────────────────────────────────────────────────────────────
// Prompt builder — 強調年份
// ─────────────────────────────────────────────────────────────
function buildPrompt(topic: string, category: string): string {
  return `Search for the LATEST Japanese product news about: "${topic}"

CRITICAL: Only include products released or announced in ${MIN_YEAR} or ${CURRENT_YEAR}.
Do NOT include any products from ${MIN_YEAR - 1} or earlier.
Today's date is ${new Date().toISOString().slice(0, 10)}.

Find 2-3 real Japanese products with verifiable sources.
Return ONLY a valid JSON array:
[
  {
    "title": "product name in Traditional Chinese (max 30 chars)",
    "description": "one sentence (max 20 chars)",
    "ai_summary": "why noteworthy — brand, features, audience (max 80 chars, Traditional Chinese)",
    "source": "brand or website name",
    "source_url": "full URL if found, else empty string",
    "category": "${category}",
    "published_at": "ISO 8601 date (MUST be ${MIN_YEAR} or later)"
  }
]
Return ONLY the JSON array, no other text.`;
}

// ─────────────────────────────────────────────────────────────
// JSON parser
// ─────────────────────────────────────────────────────────────
function parseJSON(text: string, category: string): ProductRow[] {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return [];
    const arr = JSON.parse(match[0]);
    if (!Array.isArray(arr)) return [];

    return arr
      .filter((item: any) => item.title && typeof item.title === 'string')
      .map((item: any) => ({
        title: String(item.title).slice(0, 255),
        description: item.description ? String(item.description).slice(0, 500) : null,
        ai_summary: item.ai_summary ? String(item.ai_summary).slice(0, 500) : null,
        source: item.source ? String(item.source).slice(0, 255) : 'Japan',
        source_url: item.source_url || '',
        category: item.category || category,
        published_at: item.published_at || new Date().toISOString(),
        image_url: item.image_url || null,
        ai_generated: true,
      }))
      // ★ 關鍵: 過濾掉 2025 年之前的商品
      .filter((p: ProductRow) => {
        if (!p.published_at) return true;
        try {
          return new Date(p.published_at).getFullYear() >= MIN_YEAR;
        } catch {
          return true;
        }
      });
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Save to Supabase (de-duplicate by title)
// ─────────────────────────────────────────────────────────────
async function saveProducts(products: ProductRow[]): Promise<number> {
  let saved = 0;

  for (const p of products) {
    // 再次確認年份
    if (p.published_at) {
      try {
        if (new Date(p.published_at).getFullYear() < MIN_YEAR) continue;
      } catch { /* skip bad dates */ }
    }

    // Check duplicate
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('title', p.title)
      .limit(1);

    if (existing && existing.length > 0) continue;

    const { error } = await supabase.from('products').insert({
      title: p.title,
      description: p.description,
      ai_summary: p.ai_summary,
      source: p.source,
      source_url: p.source_url,
      category: p.category,
      published_at: p.published_at,
      image_url: p.image_url,
      ai_generated: true,
    });

    if (!error) saved++;
  }

  return saved;
}