/**
 * src/app/api/products/route.ts
 *
 * 🔑 需要: OPENAI_API_KEY + Supabase keys
 * 商品品類: 護膚/美妝/動漫/時裝/手袋/鞋履/名牌
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ── Supabase ───────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─────────────────────────────────────────────────────────────
// TOPICS — 針對日本護膚、美妝、動漫、時裝、手袋、鞋履、名牌
// 每個 topic 對應一次 OpenAI 搜尋
// ─────────────────────────────────────────────────────────────
const TOPICS = [
  // ── 護膚 Skincare ──────────────────────────────────────
  {
    topic: '日本護膚新品 2025 SK-II HAKU POLA DECORTÉ 敷島 限定版 美白精華 保濕乳液',
    category: 'skincare',
    promptHint: '日本頂級護膚品牌最新推出，包括精華液、面霜、美白及抗老系列，並提及價格範圍及適合膚質。',
  },
  {
    topic: '日本藥妝護膚新品 2025 資生堂 Hada Labo Curél Senka 肌研 平價護膚 限定',
    category: 'skincare',
    promptHint: '日本大眾藥妝護膚新品，包括藥妝店熱賣品、限定版及季節新系列，強調性價比與功效。',
  },

  // ── 美妝 Makeup ────────────────────────────────────────
  {
    topic: '日本彩妝新品 2025 CANMAKE CEZANNE Ettusais RMK SUQQU 唇膏 眼影 腮紅 限定色',
    category: 'makeup',
    promptHint: '日本平價及中高端彩妝新品，聚焦限定色號、新質地（氣墊、絲絨唇膏、立體眼影），並提及春夏秋冬季節色系。',
  },
  {
    topic: 'Japan luxury makeup 2025 SUQQU Addiction THREE Lunasol limited edition new collection',
    category: 'makeup',
    promptHint: '日本高端彩妝品牌季節限定系列，包括眼影盤、腮紅盤、限定包裝，強調品牌美學與獨特色彩。',
  },

  // ── 動漫周邊 Anime ─────────────────────────────────────
  {
    topic: '日本動漫限定商品 2025 Pokemon Sanrio 鬼滅 咒術廻戰 BAPE コラボ 一番賞 扭蛋',
    category: 'anime',
    promptHint: '日本最新動漫聯名及限定周邊，包括公仔、文具、服裝、包袋，強調稀有性與聯名品牌，適合收藏或送禮。',
  },
  {
    topic: 'Japan anime collaboration goods 2025 Uniqlo UT Hello Kitty Gundam Dragon Ball limited store',
    category: 'anime',
    promptHint: '日本動漫品牌聯名服裝及日用品，如 Uniqlo UT 系列、7-Eleven 限定、會場限定商品，強調稀缺性。',
  },

  // ── 時裝 Fashion ───────────────────────────────────────
  {
    topic: '日本時裝新品 2025 Uniqlo GU Beams Journal Standard Marimekko 日本限定 新系列',
    category: 'fashion',
    promptHint: '日本本土時裝品牌新系列，聚焦日本限定款、設計師聯名、季節新色及特別版型，強調日本本地限定性。',
  },
  {
    topic: 'Japan streetwear 2025 Visvim Wtaps Neighborhood Kapital Junya Watanabe new release',
    category: 'fashion',
    promptHint: '日本設計師及街頭品牌新品，強調工藝、限量發售及日本獨有美學，適合熱愛日本文化的買家。',
  },

  // ── 手袋 Bags ──────────────────────────────────────────
  {
    topic: '日本名牌手袋 2025 Issey Miyake Bao Bao Porter Yoshida 吉田カバン 新款 限定色',
    category: 'bags',
    promptHint: '日本設計師及品牌手袋新款，包括限定色、季節新系列及日本限定版，強調設計特色與實用性。',
  },
  {
    topic: 'Japan luxury brand bag 2025 Coach Kate Spade MCM Japan limited Tory Burch new collection Asia exclusive',
    category: 'bags',
    promptHint: '在日本發售的名牌手袋限定款或亞洲限定版，包括新季設計、特別色及日本門市獨家商品。',
  },

  // ── 鞋履 Shoes ─────────────────────────────────────────
  {
    topic: '日本球鞋新品 2025 Nike Japan exclusive Adidas New Balance Asics Onitsuka Tiger 限定 復刻',
    category: 'shoes',
    promptHint: '日本限定球鞋及運動鞋新品，包括復刻款、日本限定色及聯名系列，強調稀有性及收藏價值。',
  },
  {
    topic: 'Japan designer shoes 2025 Yohji Yamamoto Comme des Garçons Tsumori Chisato Hawkins Japanese brand new',
    category: 'shoes',
    promptHint: '日本設計師鞋履及本土鞋品牌新款，強調日本工藝、獨特設計美學及限量發售資訊。',
  },

  // ── 名牌 Luxury ────────────────────────────────────────
  {
    topic: 'Japan luxury goods 2025 Louis Vuitton Chanel Gucci Japan limited edition Japan exclusive new arrival',
    category: 'luxury',
    promptHint: '國際名牌在日本限定發售的商品，包括日本限定色、亞太區獨家款及日本門市限定版，強調稀缺性與投資價值。',
  },
  {
    topic: '日本名牌 2025 Bottega Veneta Loewe Celine Miu Miu 日本限定 新品到貨 Asia exclusive',
    category: 'luxury',
    promptHint: '高端歐洲品牌於日本的最新到貨及限定版，包括手袋、配件及日本限定版，強調與其他地區的差異。',
  },
];

// ─────────────────────────────────────────────────────────────
// CATEGORY CONFIG — 前端顯示用
// ─────────────────────────────────────────────────────────────
export const CATEGORY_CONFIG: Record<string, { label: string; labelEn: string; icon: string; color: string }> = {
  skincare: { label: '護膚美肌', labelEn: 'Skincare',  icon: '🧴', color: '#C5A059' },
  makeup:   { label: '彩妝美容', labelEn: 'Makeup',    icon: '💄', color: '#B22222' },
  anime:    { label: '動漫周邊', labelEn: 'Anime',     icon: '🎌', color: '#1A237E' },
  fashion:  { label: '時裝服飾', labelEn: 'Fashion',   icon: '👗', color: '#2E7D32' },
  bags:     { label: '手袋包款', labelEn: 'Bags',      icon: '👜', color: '#4A148C' },
  shoes:    { label: '鞋履配件', labelEn: 'Shoes',     icon: '👠', color: '#BF360C' },
  luxury:   { label: '名牌精品', labelEn: 'Luxury',    icon: '✦',  color: '#1C1C1C' },
};

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface ProductRow {
  title: string;
  description: string;
  category: string;
  source: string;
  source_url: string;
  image_url: string | null;
  ai_summary: string;
  published_at: string;
  ai_generated: boolean;
}

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
      .limit(18); // 增至 18 以顯示各品類

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
// Core scrape — OpenAI Responses API (web search) → fallback chat
// ═══════════════════════════════════════════════════════════
async function runScrape(): Promise<number> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY not configured');

  let total = 0;

  for (const { topic, category, promptHint } of TOPICS) {
    try {
      // Try Responses API with real-time web search first
      let products = await searchWithResponsesAPI(topic, category, promptHint, key);

      // Fallback to chat completions (model knowledge, no real-time)
      if (products.length === 0) {
        products = await searchWithChatCompletions(topic, category, promptHint, key);
      }

      const saved = await saveProducts(products);
      total += saved;
      console.log(`[scrape] ${category} (${topic.slice(0, 30)}…): found ${products.length}, saved ${saved}`);

    } catch (err) {
      console.warn(`[scrape] Failed for topic "${topic.slice(0, 40)}":`, err);
    }
  }

  return total;
}

// ─────────────────────────────────────────────────────────────
// Method 1: OpenAI Responses API with web_search_preview
// ─────────────────────────────────────────────────────────────
async function searchWithResponsesAPI(
  topic: string,
  category: string,
  promptHint: string,
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
        input: buildWebSearchPrompt(topic, category, promptHint),
      }),
    });

    if (!res.ok) {
      console.log(`[responses-api] Not available (${res.status}), will use fallback`);
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
// Method 2: Chat Completions fallback
// ─────────────────────────────────────────────────────────────
async function searchWithChatCompletions(
  topic: string,
  category: string,
  promptHint: string,
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
      max_tokens: 900,
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(category, promptHint),
        },
        {
          role: 'user',
          content: `請提供以下日本商品品類的最新情報（2024-2025年）：\n\n主題：${topic}\n\n返回 3 件商品，只輸出 JSON 陣列，不要其他文字。`,
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
// SYSTEM PROMPT — 針對日本美妝/時尚/名牌/動漫
// ─────────────────────────────────────────────────────────────
function buildSystemPrompt(category: string, promptHint: string): string {
  const catLabel = CATEGORY_CONFIG[category]?.label ?? category;

  return `你是日本「${catLabel}」商品情報專家，專門追蹤日本最新商品發布、限定版及品牌動態。

你的專業知識涵蓋：
- 日本護膚美妝品牌（SK-II, POLA, HAKU, Shiseido, CANMAKE, CEZANNE 等）
- 日本彩妝限定系列（SUQQU, Lunasol, THREE, Addiction, KATE 等）
- 動漫周邊及聯名商品（Pokemon, Sanrio, 鬼滅, 咒術廻戰 等）
- 日本時裝及設計師品牌（Uniqlo, GU, Issey Miyake, Yohji Yamamoto 等）
- 日本手袋品牌（Porter Yoshida, Bao Bao, Furla Japan 限定等）
- 日本限定球鞋及鞋履（Asics, Onitsuka Tiger, New Balance Japan 等）
- 國際名牌日本限定版（LV, Chanel, Gucci, Bottega, Loewe Japan exclusive 等）

重點提示：${promptHint}

輸出規則：
1. 只輸出合法 JSON 陣列，絕不輸出其他文字、說明或 markdown
2. 每件商品必須是真實品牌真實商品（或非常可能存在的商品）
3. ai_summary 必須包含：品牌名稱 + 商品特色 + 為何值得代購/關注
4. 強調日本限定、亞洲限定或日本先行發售的獨特性

JSON 格式（嚴格遵守）：
[
  {
    "title": "商品完整名稱（繁體中文，包含品牌名，35字以內）",
    "description": "一句簡介（20字以內）",
    "ai_summary": "為何值得關注：品牌背景、商品特色、適合人群、代購價值（100字以內，繁體中文）",
    "source": "品牌名稱（英文或日文）",
    "source_url": "官方網站或商品頁面URL（如有），否則空字串",
    "category": "${category}"
  }
]`;
}

// ─────────────────────────────────────────────────────────────
// WEB SEARCH PROMPT — for Responses API
// ─────────────────────────────────────────────────────────────
function buildWebSearchPrompt(topic: string, category: string, promptHint: string): string {
  const catLabel = CATEGORY_CONFIG[category]?.label ?? category;

  return `你是日本「${catLabel}」商品情報專家。

請搜尋以下主題的最新日本商品資訊（2024-2025年）：
「${topic}」

搜尋重點：${promptHint}

找到 2-3 件真實商品後，只輸出以下 JSON 陣列格式，不要任何其他文字：
[
  {
    "title": "商品完整名稱（繁體中文，包含品牌，35字以內）",
    "description": "一句簡介（20字以內）",
    "ai_summary": "品牌特色＋商品亮點＋代購價值（100字以內，繁體中文）",
    "source": "品牌或媒體名稱",
    "source_url": "商品頁面URL或空字串",
    "category": "${category}"
  }
]

只輸出 JSON 陣列。`;
}

// ─────────────────────────────────────────────────────────────
// Parse JSON from AI response
// ─────────────────────────────────────────────────────────────
function parseJSON(text: string, category: string): ProductRow[] {
  try {
    // Strip markdown fences
    const clean = text
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();

    // Find JSON array
    const start = clean.indexOf('[');
    const end = clean.lastIndexOf(']');
    if (start === -1 || end === -1) return [];

    const arr = JSON.parse(clean.slice(start, end + 1));
    if (!Array.isArray(arr)) return [];

    return arr
      .filter((item: any) => item?.title && item?.ai_summary)
      .map((item: any): ProductRow => ({
        title:        String(item.title ?? '').slice(0, 255),
        description:  String(item.description ?? '').slice(0, 500),
        category:     String(item.category ?? category),
        source:       String(item.source ?? 'Japan').slice(0, 100),
        source_url:   String(item.source_url ?? ''),
        image_url:    null,
        ai_summary:   String(item.ai_summary ?? '').slice(0, 1000),
        published_at: new Date().toISOString(),
        ai_generated: true,
      }));
  } catch {
    console.warn('[parseJSON] Failed to parse:', text.slice(0, 200));
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Save to Supabase (dedup by title)
// ─────────────────────────────────────────────────────────────
async function saveProducts(products: ProductRow[]): Promise<number> {
  if (products.length === 0) return 0;

  // Dedup against existing
  const { data: existing } = await supabase
    .from('products')
    .select('title')
    .in('title', products.map(p => p.title));

  const existingTitles = new Set((existing ?? []).map((r: { title: string }) => r.title));
  const newOnes = products.filter(p => !existingTitles.has(p.title));

  if (newOnes.length === 0) return 0;

  const { error } = await supabase.from('products').insert(newOnes);
  if (error) {
    console.error('[saveProducts] Supabase insert error:', error.message);
    return 0;
  }

  return newOnes.length;
}