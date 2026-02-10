# 📦 JP Daigou - 完整項目概览

## 📂 文件結構說明

```
jp-daigou/
│
├── 📄 配置文件
│   ├── package.json              ← 項目依賴和腳本
│   ├── tsconfig.json             ← TypeScript 配置
│   ├── next.config.js            ← Next.js 配置
│   ├── tailwind.config.js         ← Tailwind CSS 配置
│   ├── postcss.config.js          ← PostCSS 配置
│   ├── vercel.json                ← Vercel 部署配置（包含 Cron）
│   ├── .env.example               ← 環境變數模板
│   └── .gitignore                 ← Git 忽略文件
│
├── 📚 文檔
│   ├── README.md                  ← 項目說明
│   ├── SETUP.md                   ← 詳細設置指南
│   ├── quick-start.sh             ← 自動化啟動腳本
│   └── PROJECT_OVERVIEW.md        ← 本文件
│
├── 🌐 國際化
│   └── messages/
│       ├── zh.json                ← 繁體中文（香港/台灣）
│       ├── zh-CN.json             ← 簡體中文（馬來西亞）
│       ├── en.json                ← 英文
│       ├── ja.json                ← 日本語
│       └── th.json                ← 泰文
│
├── 📊 數據庫
│   └── supabase/
│       └── migrations/
│           └── 001_init_schema.sql ← 初始化 SQL（必須執行）
│
├── 🔧 源代碼 (src/)
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx         ← 主布局
│   │   │   ├── page.tsx           ← 首頁
│   │   │   ├── globals.css        ← 全局樣式
│   │   │   ├── buyers/            ← 買手市場頁面
│   │   │   ├── products/          ← 新商品頁面
│   │   │   ├── dashboard/         ← 用戶中心
│   │   │   └── chat/              ← 聊天頁面
│   │   │
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts  ← Google OAuth 認證
│   │       ├── products/route.ts   ← 獲取產品列表 API
│   │       ├── chat/translate.ts   ← 翻譯 API
│   │       └── cron/scrape-products.ts ← AI 爬蟲（自動執行）
│   │
│   ├── components/
│   │   ├── Navbar.tsx             ← 導航欄
│   │   ├── Footer.tsx             ← 頁腳
│   │   ├── HeroSection.tsx         ← 英雄區塊
│   │   ├── LanguageSwitcher.tsx    ← 語言切換器
│   │   │
│   │   └── sections/
│   │       ├── BuyersSection.tsx   ← 買手列表區塊
│   │       └── ProductsSection.tsx ← 產品列表區塊
│   │
│   ├── lib/
│   │   └── supabase.ts            ← Supabase 客戶端和類型定義
│   │
│   ├── i18n.ts                    ← 多語言配置
│   └── middleware.ts              ← 語言路由中間件
│
└── 📸 靜態資源
    └── public/
        └── （favicon、logo 等）
```

## 🎯 核心功能模組

### 1️⃣ 代購買手市場 (Buyers Marketplace)
**位置**: `src/app/[locale]/buyers/`
- 買手搜尋和篩選
- 買手檔案展示
- 評價和評論系統
- 發起購物請求

**相關文件**:
- `components/sections/BuyersSection.tsx` - 主列表
- `api/buyers/route.ts` - API 端點
- Database: `buyers` 表

### 2️⃣ 日本新商品情報 (Product News)
**位置**: `src/app/[locale]/products/`
- 實時商品列表
- AI 生成的多語言摘要
- 分類篩選
- 商品詳情

**相關文件**:
- `components/sections/ProductsSection.tsx` - 主列表
- `api/products/route.ts` - 獲取產品
- `api/cron/scrape-products.ts` - AI 爬蟲（自動爬取最新商品）
- Database: `products` 表

### 3️⃣ 多語言翻譯聊天 (Multilingual Chat)
**位置**: `src/app/[locale]/chat/`
- 實時翻譯（繁中、簡中、英文、日文、泰文）
- 平台零介入交易
- 聊天記錄（無 PII）

**相關文件**:
- `api/chat/translate.ts` - 翻譯 API
- Database: `conversations`, `chat_messages` 表

### 4️⃣ 用戶認證 (Authentication)
**位置**: `src/app/api/auth/`
- Google OAuth 集成
- NextAuth.js 配置
- 自動用戶創建

**相關文件**:
- `api/auth/[...nextauth]/route.ts` - OAuth 處理
- Database: `users` 表

## 🔄 數據流

```
用戶訪問
    ↓
中間件 (middleware.ts) - 語言檢測
    ↓
動態路由 [locale] - 多語言 URL
    ↓
React 組件 (components/) - 使用 useTranslations()
    ↓
API 路由 (api/) - 後端邏輯
    ↓
Supabase - 數據存儲 + 認證
    ↓
OpenAI API - AI 摘要生成
    ↓
Google Translate API - 翻譯服務
```

## 🔑 關鍵技術決策

| 功能 | 選擇 | 原因 |
|------|------|------|
| 框架 | Next.js | 全棧、Edge Functions、最佳 SEO |
| 多語言 | next-intl | 完美的 Next.js 集成、動態路由 |
| 認證 | NextAuth.js | 簡單、安全、支援多種 OAuth |
| 數據庫 | Supabase | PostgreSQL、實時、RLS、免費層完整 |
| 樣式 | Tailwind CSS | 原子化、快速原型、響應式友好 |
| AI | OpenAI GPT-4 | 高質量摘要、多語言支持 |
| 翻譯 | Google Translate API | 準確、支援多語言 |
| 部署 | Vercel | 原生 Next.js 支援、自動 CI/CD、Cron Jobs |

## 📊 數據庫架構概要

```
┌─────────────────────────────────────────────┐
│           Supabase PostgreSQL               │
├─────────────────────────────────────────────┤
│                                             │
│  users (用戶表)                              │
│    ├─ id, email, full_name                  │
│    ├─ country, preferred_language          │
│    └─ auth_id (Google OAuth)               │
│                ↓                             │
│  buyers (買手檔案) ← one-to-one              │
│    ├─ rating, commission_rate              │
│    ├─ active_countries[]                   │
│    ├─ categories[], languages[]            │
│    └─ verified, verification_date         │
│                ↓                             │
│  shopping_requests (購物請求)                │
│    └─ requester_id, buyer_id              │
│                                             │
│  products (日本商品)                         │
│    ├─ title, summary_zh, summary_en       │
│    ├─ category, published_at               │
│    ├─ estimated_price_jpy                 │
│    └─ ai_generated = true                 │
│                                             │
│  conversations (對話)                       │
│    ├─ requester_id, buyer_id             │
│    └─ request_id                          │
│          ↓                                  │
│  chat_messages (聊天訊息)                   │
│    └─ message_text, language              │
│          ↓                                  │
│  chat_translations (翻譯日誌)               │
│    └─ 無 PII，僅統計用                     │
│                                             │
│  buyer_reviews (評價)                       │
│    ├─ rating, comment                     │
│    └─ reviewer_id, buyer_id              │
│                                             │
└─────────────────────────────────────────────┘
```

## 🌍 多地區支持對應表

| 市場 | 語言 | 貨幣 | 路由前綴 | Locale Code |
|------|------|------|---------|------------|
| 🇭🇰 香港 | 繁體中文 | HKD | `/zh/` | `zh` |
| 🇹🇼 台灣 | 繁體中文 | TWD | `/zh/` | `zh` |
| 🇲🇾 馬來西亞 | 簡體中文 | MYR | `/zh-CN/` | `zh-CN` |
| 🇹🇭 泰國 | ไทย | THB | `/th/` | `th` |
| 🇯🇵 日本 | 日本語 | JPY | `/ja/` | `ja` |
| 🌐 國際 | English | USD | `/en/` | `en` |

## ⚙️ 環境變數快速參考

```bash
# 三個必須的 API：

1. SUPABASE
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=xxx

2. GOOGLE OAUTH
   GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=xxx
   NEXTAUTH_SECRET=$(openssl rand -base64 32)

3. OPENAI
   OPENAI_API_KEY=sk-xxx

# 可選的翻譯/搜索：
GOOGLE_TRANSLATE_API_KEY=xxx
GOOGLE_SEARCH_API_KEY=xxx
```

## 🚀 部署檢查清單

- [ ] GitHub repo 已創建
- [ ] Supabase 項目已初始化（SQL 執行）
- [ ] Google OAuth 應用已配置
- [ ] OpenAI API Key 已設置
- [ ] 所有 env vars 已配置在 Vercel
- [ ] Cron job 路徑已驗證（`/api/cron/scrape-products`）
- [ ] 自定義域名 DNS 已指向 Vercel
- [ ] SSL 證書已自動配置
- [ ] 監控告警已設置

## 📈 擴展建議

### 短期（1-2 周）
- [ ] 實現買家完整檔案頁面
- [ ] 新增支付集成（Stripe/PayPal）
- [ ] 上線評價系統
- [ ] 實現實時 Cron 爬蟲

### 中期（1-3 個月）
- [ ] Mobile App（React Native）
- [ ] 實時通知系統（WebSocket）
- [ ] 信譽系統改進
- [ ] 高級搜索和推薦

### 長期（3-6 個月）
- [ ] 機器學習推薦引擎
- [ ] 供應商集成市場
- [ ] 多貨幣支付
- [ ] KYC/AML 驗證

## 📞 快速支持

- **SETUP 問題**: 查看 `SETUP.md`
- **代碼問題**: 查看相應的文件中的註解
- **部署問題**: 查看 Vercel 日誌
- **API 問題**: 查看 `api/` 文件夾中的實現

---

祝您開發順利！🚀✨
