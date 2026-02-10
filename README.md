# JP Daigou - 日本代購平台

一個連接全球買家與日本代購買手的現代平台。支持繁體中文、簡體中文、英文、日文和泰文。

## 🌟 功能特性

### 📍 Section 1: 代購買手市場
- 搜尋和篩選可信任的買手（按位置、類別、評分、佣金率）
- 查看買手檔案和評價
- 發起購物請求
- 實時聊天和翻譯服務

### 📰 Section 2: 日本新商品情報
- AI驅動的自動爬蟲，抓取最新日本商品發佈
- 多語言AI摘要（繁中、簡中、英文）
- 按類別篩選和搜索
- 實時更新通知

### 💬 翻譯通訊模組
- 支援5種語言的實時翻譯
- 平台不介入交易，買家和賣家自行協商
- 聊天記錄日誌（無個人身份信息）

## 🛠️ 技術棧

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js + Google OAuth
- **AI/ML**: OpenAI GPT-4 (內容生成)
- **Translation**: Google Translate API
- **Deployment**: Vercel

## 📦 多地區支持

| 市場 | 語言 | 貨幣 | 時區 |
|------|------|------|------|
| 香港 | 繁體中文 | HKD | Asia/Hong_Kong |
| 台灣 | 繁體中文 | TWD | Asia/Taipei |
| 馬來西亞 | 簡體中文 | MYR | Asia/Kuala_Lumpur |
| 泰國 | ไทย | THB | Asia/Bangkok |
| 日本 | 日本語 | JPY | Asia/Tokyo |

## 🚀 快速開始

### 1. 複製項目
```bash
git clone <repository-url>
cd jp-daigou
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 設置環境變數
複製 `.env.example` 為 `.env.local` 並填充：

```bash
cp .env.local .env.local
```

編輯 `.env.local`：
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key (generate: openssl rand -base64 32)

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Google APIs
GOOGLE_TRANSLATE_API_KEY=your-google-translate-api-key
GOOGLE_SEARCH_API_KEY=your-google-search-api-key
GOOGLE_SEARCH_ENGINE_ID=your-google-cse-id
```

### 4. 初始化 Supabase
```bash
# 創建 Supabase 項目
# 執行 supabase/migrations/001_init_schema.sql

npx supabase db push
```

### 5. 本地開發
```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000)

## 📁 項目結構

```
jp-daigou/
├── src/
│   ├── app/
│   │   ├── [locale]/              # i18n 動態路由
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # 首頁
│   │   │   ├── buyers/            # 買手市場
│   │   │   ├── products/          # 新商品
│   │   │   ├── dashboard/         # 用戶中心
│   │   │   └── chat/              # 聊天
│   │   └── api/
│   │       ├── auth/              # 認證
│   │       ├── products/          # 產品 API
│   │       ├── chat/translate     # 翻譯 API
│   │       └── cron/scrape        # AI 爬蟲
│   ├── components/                # React 組件
│   ├── lib/
│   │   └── supabase.ts            # Supabase 客戶端
│   ├── i18n.ts                    # 多語言配置
│   └── middleware.ts              # Next.js 中間件
├── messages/                      # 翻譯文件
│   ├── zh.json                    # 繁體中文
│   ├── zh-CN.json                 # 簡體中文
│   ├── en.json
│   ├── ja.json
│   └── th.json
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql    # 數據庫 Schema
└── public/                        # 靜態資源
```

## 🔐 安全性考慮

- **RLS 政策**: Supabase Row Level Security 確保用戶只能訪問自己的數據
- **OAuth**: Google OAuth 進行安全認證
- **無 PII 存儲**: 翻譯日誌不存儲個人身份信息
- **HTTPS**: 所有通信加密

## 📊 數據庫架構

### 主要表格
- `users` - 用戶信息
- `buyers` - 代購買手信息
- `products` - 日本商品信息
- `shopping_requests` - 購物請求
- `conversations` - 用戶對話
- `chat_messages` - 聊天消息
- `buyer_reviews` - 買手評價

## 🚀 部署到 Vercel

### 1. 連接 GitHub
```bash
git push origin main
```

### 2. 在 Vercel 上導入項目
- 訪問 [Vercel Dashboard](https://vercel.com/dashboard)
- 點擊 "Add New" > "Project"
- 選擇 GitHub 倉庫
- 配置環境變數

### 3. 設置 Cron Job（可選）
在 `vercel.json` 中配置：
```json
{
  "crons": [{
    "path": "/api/cron/scrape-products",
    "schedule": "0 8 * * *"
  }]
}
```

## 📱 移動優化

- ✅ 完全響應式設計
- ✅ 移動友好的導航
- ✅ 觸摸優化的按鈕

## 🌐 多語言

- 繁體中文 (香港/台灣)
- 簡體中文 (馬來西亞)
- English
- 日本語
- ไทย (泰國)

## 📝 API 文檔

### GET /api/products
獲取產品列表
```bash
?category=cosmetics&page=1&limit=20
```

### POST /api/chat/translate
翻譯消息
```json
{
  "message": "Hello",
  "sourceLanguage": "en",
  "targetLanguage": "zh",
  "conversationId": "uuid"
}
```

## 🤝 貢獻

歡迎 Pull Requests 和問題報告！

## 📄 許可證

MIT License

## 📞 支持

- Email: support@jpdaigou.com
- Issues: GitHub Issues
- Discussions: GitHub Discussions

---

**免責聲明**: 本平台僅提供翻譯和通訊服務。用戶之間的所有交易和協議由雙方自行承擔責任。平台不介入任何商業交易。
