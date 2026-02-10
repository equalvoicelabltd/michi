# 🌸 Michi - Your Path to Japan's Best

**Michi (道/みち)** - 在代購的世界裡，我們是那道引導光線。

一個連接全球買家與日本代購商的信任平台，提供 AI 驅動的商品發現、實時翻譯和無仲介的直接溝通。

---

## ✨ 核心功能

### 🛤️ Michi 代購商市場
- 來自日本全國的認證代購商
- 買家評分系統（5星制）
- 佣金率透明化
- 支持多語言交流
- 地區和專長篩選

### 🎯 Michi 商品發現
- AI 驅動的日本最新商品爬蟲
- 每日自動更新（Vercel Cron）
- 多語言 AI 摘要
- 多幣別參考價格
- 來源連結追蹤

### 💬 Michi 對話
- 買家與賣家直接連接
- 實時 Google 翻譯
- 無平台介入
- 多語言支持 (繁體中文、簡體中文、English、日本語、ไทย)
- 翻譯歷史記錄

### 🌍 多語言支持
```
支援語言:
├─ 繁體中文 (香港、台灣)
├─ 簡體中文 (馬來西亞)
├─ English
├─ 日本語
└─ ไทย (泰國)

自動語言檢測和轉換
```

### 💳 多幣別支援
```
支援幣別:
├─ HKD (香港)
├─ TWD (台灣)
├─ MYR (馬來西亞)
├─ THB (泰國)
└─ JPY (日本)
```

---

## 🚀 快速開始

### 前置要求
```
- Node.js 18+
- npm 9+
- Supabase 帳戶
- OpenAI API 金鑰
- Google OAuth 認證
```

### 安裝步驟

1. **複製專案**
```bash
git clone <repository-url>
cd michi
npm install
```

2. **配置環境變數**
```bash
cp .env.local .env.local
```

在 `.env.local` 中填入：
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# 可選
GOOGLE_TRANSLATE_API_KEY=your_translate_key
```

3. **設置數據庫**
- 進入 Supabase 儀表板
- 執行 `supabase/migrations/001_init_schema.sql` 中的 SQL
- 或使用 Supabase CLI: `supabase db push`

4. **本地開發**
```bash
npm run dev
```
訪問 `http://localhost:3000`

5. **部署到 Vercel**
```bash
# 推送到 GitHub
git push origin main

# 在 Vercel 上匯入項目
# 設置環境變數
# 自動部署
```

---

## 📁 項目結構

```
michi/
├── src/
│   ├── app/
│   │   ├── [locale]/              # 多語言路由
│   │   │   ├── layout.tsx         # 主佈局
│   │   │   ├── page.tsx           # 首頁
│   │   │   ├── globals.css        # 全局樣式 (Michi 品牌)
│   │   │   └── [page]/
│   │   │       ├── buyers/        # 代購商市場
│   │   │       ├── products/      # 商品發現
│   │   │       └── chat/          # 對話區域
│   │   └── api/
│   │       ├── auth/              # NextAuth Google OAuth
│   │       ├── products/          # 商品 API
│   │       ├── chat/translate.ts  # 翻譯 API
│   │       └── cron/scrape.ts     # AI 爬蟲 (Vercel Cron)
│   ├── components/
│   │   ├── Navbar.tsx             # 導航欄 (Michi 品牌)
│   │   ├── Footer.tsx             # 頁腳
│   │   ├── LanguageSwitcher.tsx   # 語言切換器
│   │   └── sections/
│   │       ├── BuyersSection.tsx   # 代購商展示
│   │       ├── ProductsSection.tsx # 商品展示
│   │       └── HeroSection.tsx     # 英雄區
│   ├── lib/
│   │   ├── supabase.ts           # Supabase 客戶端
│   │   └── types.ts              # TypeScript 類型
│   ├── i18n.ts                   # next-intl 配置
│   └── middleware.ts             # 語言路由中間件
├── messages/
│   ├── zh.json                   # 繁體中文 (Michi 品牌)
│   ├── zh-CN.json                # 簡體中文
│   ├── en.json                   # 英文
│   ├── ja.json                   # 日文
│   └── th.json                   # 泰文
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql   # 數據庫初始化
├── public/
│   ├── favicon.ico               # Michi Logo
│   └── images/                   # 品牌圖片
├── MICHI_BRAND_GUIDE.md          # Michi 品牌指南
├── CONTENT_STRATEGY.md           # 內容策略
├── README.md                     # 本文件
├── SETUP.md                      # 詳細設置指南
├── package.json                  # 項目配置
├── tsconfig.json                 # TypeScript 配置
├── tailwind.config.js            # Tailwind (Michi 顏色)
├── next.config.js                # Next.js 配置
└── vercel.json                   # Vercel Cron 配置
```

---

## 🎨 品牌顏色系統

所有設計都遵循 **Michi 品牌指南**：

```css
主色 (Primary Color):    #003366 (深藍 - 信任、專業)
副色 (Secondary Color):  #FF69B4 (粉紅 - 溫暖、親切)
亮色 (Accent Color):     #FFD700 (金色 - 品質、精選)
背景色 (Light):          #F8F9FA (淺灰)
文字色 (Dark):           #666666 (深灰)
```

### 使用規範
- CTA 按鈕: 粉紅色 (#FF69B4)
- 認證徽章: 深藍色 (#003366)
- 精選標籤: 金色 (#FFD700)
- 邊框與分隔線: 淺灰 (#E8E8E8)

詳見 `MICHI_BRAND_GUIDE.md`

---

## 🔐 Google OAuth 設置

1. **Google Cloud Console**
   - 創建新項目
   - 啟用 Google+ API
   - 建立 OAuth 2.0 認證

2. **認證詳情**
   ```
   Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://your-domain.com/api/auth/callback/google
   ```

3. **環境變數**
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   NEXTAUTH_SECRET=generate_with: openssl rand -base64 32
   ```

---

## 🤖 AI 商品爬蟲

### 工作流程
```
1. Vercel Cron Job (每日 08:00 GMT)
   ↓
2. OpenAI GPT-4 分析日本商品新聞
   ↓
3. 生成繁體中文、簡體中文、英文摘要
   ↓
4. 計算多幣別參考價格
   ↓
5. 存入 Supabase products 表
```

### 配置
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/scrape-products",
    "schedule": "0 8 * * *"
  }]
}
```

---

## 📊 數據庫架構

### 核心表格
```sql
users              -- 用戶帳戶 (Google OAuth)
buyers             -- 代購商檔案
shopping_requests  -- 購物請求
products           -- AI 爬蟲商品
conversations      -- 聊天對話
chat_messages      -- 聊天訊息
chat_translations  -- 翻譯記錄
buyer_reviews      -- 代購商評價
```

詳見 `supabase/migrations/001_init_schema.sql`

---

## 🌐 多語言路由

```
所有頁面都支持多語言 URL:

/zh/              → 繁體中文
/zh-CN/           → 簡體中文
/en/              → 英文
/ja/              → 日文
/th/              → 泰文

默認語言: /zh/ (繁體中文)
```

---

## 🛡️ 安全性

### 行級安全性 (RLS)
```sql
-- 用戶只能看自己的數據
SELECT * FROM shopping_requests
WHERE requester_id = auth.uid()

-- 公開數據
SELECT * FROM products
WHERE status = 'published'
```

### API 金鑰保護
- OpenAI: 使用 `.env` 變數
- Google: 使用 service_role_key 進行服務器端調用
- Supabase: 使用 RLS 策略

---

## 📱 響應式設計

- 移動優先設計
- 使用 Tailwind CSS
- Michi 品牌顏色系統
- 流暢的用戶體驗

```
斷點:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
```

---

## 🚢 部署到 Vercel

### 自動部署
```bash
# 只需推送到 GitHub
git push origin main

# Vercel 自動部署
# 環境變數已配置
# Cron 任務自動啟動
```

### 手動部署
```bash
npm run build
npm start
```

---

## 📚 文檔

- **`MICHI_BRAND_GUIDE.md`** - 完整品牌指南 (顏色、字體、用語)
- **`CONTENT_STRATEGY.md`** - 內容策略和文案範本
- **`SETUP.md`** - 詳細設置步驟
- **`PROJECT_OVERVIEW.md`** - 系統架構概述

---

## 🤝 貢獻

歡迎貢獻！請：

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📞 支持

遇到問題？

- 檢查 `SETUP.md` 詳細指南
- 查看 Supabase 文檔: https://supabase.com/docs
- OpenAI API: https://platform.openai.com/docs
- Next.js: https://nextjs.org/docs

---

## 📄 許可

MIT License - 詳見 LICENSE 文件

---

## 🌸 Michi 品牌故事

> 過去10年，我走遍日本各地。
> 現在，我想帶你找到最值得的。
> 
> 日本有茶道、劍道。
> 我們有代購之道。
> 
> **歡迎進入 Michi。**
> **這是通往最好日本商品的道路。**

---

## 版本資訊

- 版本: 1.0.0
- 上次更新: 2025年2月
- 狀態: 🚀 生產就緒

**Michi - 你的日本代購之道。** 🌸
