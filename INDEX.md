# 📚 Michi 項目完整文件索引

## 🎯 開始閱讀順序

### 第一步：了解 Michi 品牌 (5分鐘)
1. **README_MICHI.md** - 項目概述和快速開始
2. **MICHI_BRAND_GUIDE.md** - 完整品牌指南

### 第二步：設置項目 (15分鐘)
1. **SETUP.md** - 詳細設置步驟
2. **.env.example** - 環境變數配置

### 第三步：內容和營銷 (10分鐘)
1. **CONTENT_STRATEGY.md** - 網站內容策略
2. **SOCIAL_MEDIA_CONTENT.md** - 社群媒體文案庫

### 第四步：開始開發
1. **project_overview.md** - 技術架構
2. 進入 `src/` 目錄開始編碼

---

## 📁 完整文件列表

### 📋 文檔 (必讀)

| 文件名 | 用途 | 重要性 |
|--------|------|--------|
| **README_MICHI.md** | 項目概述、快速開始 | ⭐⭐⭐⭐⭐ |
| **MICHI_BRAND_GUIDE.md** | 完整品牌視覺和語言指南 | ⭐⭐⭐⭐⭐ |
| **CONTENT_STRATEGY.md** | 網站各頁面的內容策略 | ⭐⭐⭐⭐ |
| **SOCIAL_MEDIA_CONTENT.md** | Instagram、微信、小紅書文案 | ⭐⭐⭐⭐ |
| **SETUP.md** | 詳細的環境設置步驟 | ⭐⭐⭐⭐⭐ |
| **PROJECT_OVERVIEW.md** | 技術架構和系統設計 | ⭐⭐⭐⭐ |
| **INDEX.md** | 本文件，文件索引 | ⭐⭐⭐ |

### ⚙️ 配置文件

| 文件名 | 用途 |
|--------|------|
| **package.json** | Node.js 依賴和腳本 |
| **.env.example** | 環境變數模板 (複製為 .env.local) |
| **tsconfig.json** | TypeScript 配置 |
| **next.config.js** | Next.js 配置 |
| **tailwind.config.js** | Tailwind CSS + Michi 顏色 |
| **postcss.config.js** | PostCSS 配置 |
| **vercel.json** | Vercel 部署和 Cron 配置 |

### 🌐 翻譯文件 (messages/)

| 語言 | 文件名 | 地區 |
|------|--------|------|
| 繁體中文 | **messages/zh.json** | 🇭🇰 香港、🇹🇼 台灣 |
| 簡體中文 | **messages/zh-CN.json** | 🇲🇾 馬來西亞 |
| 英文 | **messages/en.json** | 🌍 全球 |
| 日文 | **messages/ja.json** | 🇯🇵 日本 |
| 泰文 | **messages/th.json** | 🇹🇭 泰國 |

### 🎨 React 組件 (src/components/)

| 組件 | 用途 |
|------|------|
| **Navbar.tsx** | 頂部導航欄 + 語言切換 |
| **Footer.tsx** | 頁腳 |
| **LanguageSwitcher.tsx** | 語言選擇下拉菜單 |
| **sections/HeroSection.tsx** | 首頁英雄區 |
| **sections/BuyersSection.tsx** | 代購商市場展示 |
| **sections/ProductsSection.tsx** | 商品發現展示 |

### 📄 頁面 (src/app/[locale]/)

| 路由 | 文件 | 功能 |
|------|------|------|
| **/** | **page.tsx** | 首頁 (所有內容) |
| **/buyers** | **buyers/page.tsx** | 代購商市場 |
| **/products** | **products/page.tsx** | 商品發現 |
| **/chat** | **chat/page.tsx** | 聊天區域 |
| **/dashboard** | **dashboard/page.tsx** | 個人檔案 |

### 🔧 API 路由 (src/app/api/)

| 路由 | 用途 |
|------|------|
| **/api/auth/[...nextauth]** | Google OAuth 認證 |
| **/api/products** | 商品 CRUD API |
| **/api/chat/translate** | 實時翻譯 API |
| **/api/cron/scrape-products** | AI 商品爬蟲 (Vercel Cron) |

### 🗄️ 數據庫 (supabase/)

| 文件 | 內容 |
|------|------|
| **migrations/001_init_schema.sql** | 完整數據庫架構、表格、RLS 策略 |

---

## 🚀 快速開始命令

### 開發環境
```bash
# 安裝依賴
npm install

# 複製環境變數
cp .env.local .env.local
# 編輯 .env.local，填入 API 金鑰

# 本地開發服務器
npm run dev

# 訪問
http://localhost:3000
```

### 構建與部署
```bash
# 檢查類型
npm run type-check

# 構建生產版本
npm run build

# 本地測試生產構建
npm start

# 格式化代碼
npm run format

# 構建 ZIP 文件準備部署
zip -r michi-complete.zip . -x "node_modules/*" ".next/*" ".git/*"
```

---

## 🎨 Michi 品牌核心

### 顏色系統
```
深藍   #003366  (信任、專業)
粉紅   #FF69B4  (溫暖、親切)
金色   #FFD700  (品質、精選)
淺灰   #F8F9FA  (背景)
深灰   #666666  (文字)
```

### 字體
- 英文: Segoe UI, -apple-system, sans-serif
- 中文: 思源黑體/PingFang SC/Microsoft YaHei
- 日文: 原文 Segoe UI

### 品牌宗旨
> "在代購的世界裡，我們是那道引導光線。"

### 核心故事
> "過去10年，我走遍日本各地。現在，我想帶你找到最值得的。"

---

## 📊 項目統計

| 項目 | 數量 |
|------|------|
| 文檔 | 7 份 |
| 配置文件 | 7 份 |
| 翻譯語言 | 5 種 |
| React 組件 | 6 個 |
| 頁面/路由 | 5 個 |
| API 端點 | 4 個 |
| 數據庫表 | 8 張 |
| 數據庫 RLS 策略 | 12 個 |

---

## 🔐 安全檢查清單

在部署前，確保：

- [ ] `.env.local` 文件已創建且包含所有必要的 API 金鑰
- [ ] `.env.local` 在 `.gitignore` 中
- [ ] Supabase RLS 策略已啟用
- [ ] Google OAuth 重定向 URI 配置正確
- [ ] OpenAI API 金鑰權限設置正確
- [ ] Vercel Cron 任務在 `vercel.json` 中配置
- [ ] 數據庫密碼和敏感信息未提交到 Git

---

## 📱 多語言路由

所有頁面都自動支持多語言：

```
/zh/           → 繁體中文 (香港、台灣)
/zh-CN/        → 簡體中文 (馬來西亞)
/en/           → 英文
/ja/           → 日本語
/th/           → ไทย (泰國)

默認重定向: /zh/
```

---

## 🌐 部署平台支持

### ✅ 已測試
- **Vercel** - 推薦 (最佳性能)
- **Netlify** - 支持
- **自託管** - Node.js 伺服器

### 數據庫
- **Supabase** - PostgreSQL (推薦)
- **其他 PostgreSQL** - 支持

### 翻譯 API
- **Google Translate API** - 推薦
- **DeepL API** - 可選替代

---

## 🆘 常見問題

### Q: 如何添加新的翻譯語言?
**A:** 
1. 複製 `messages/zh.json`
2. 翻譯所有文本
3. 在 `i18n.ts` 中註冊語言
4. 更新 `middleware.ts` 路由規則

### Q: 如何修改 Michi 顏色?
**A:**
1. 編輯 `tailwind.config.js` 中的顏色值
2. 更新 `MICHI_BRAND_GUIDE.md` 中的文檔
3. 確保所有頁面已更新

### Q: 如何測試 Cron 作業?
**A:**
1. 本地運行: `npm run dev`
2. 訪問 `http://localhost:3000/api/cron/scrape-products`
3. 或在 Vercel 儀表板手動觸發

### Q: 如何添加新的支付方式?
**A:**
1. 更新 `PAYMENT_METHODS` 常數
2. 在所有 `messages/*.json` 中添加翻譯
3. 更新 Supabase `payment_methods` JSONB 欄位

---

## 📞 技術支持資源

### 官方文檔
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- OpenAI: https://platform.openai.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### 社群
- Next.js 討論: https://github.com/vercel/next.js/discussions
- Supabase Discord: https://discord.supabase.com
- Stack Overflow: 搜索 `next.js` 或 `supabase`

---

## 📈 後續擴展建議

### 1. 短期 (1-3個月)
- [ ] 添加用戶評分和評價系統
- [ ] 實現支付集成 (Stripe)
- [ ] 優化 SEO
- [ ] 添加更多國家/地區支持

### 2. 中期 (3-6個月)
- [ ] 開發 iOS/Android 應用
- [ ] 實現訂單跟蹤系統
- [ ] 添加視頻聊天功能
- [ ] 建立品牌代購商培訓計畫

### 3. 長期 (6-12個月)
- [ ] 擴展到其他亞洲國家
- [ ] 建立物流合作夥伴網絡
- [ ] 開發 AI 個性化推薦
- [ ] 創建 Michi 品牌社區

---

## 🎓 學習路徑

如果你是新手，按此順序學習：

1. **閱讀** MICHI_BRAND_GUIDE.md (了解品牌)
2. **閱讀** SETUP.md (環境配置)
3. **閱讀** README_MICHI.md (項目概述)
4. **運行** `npm install && npm run dev`
5. **探索** `src/app/[locale]/page.tsx` (首頁代碼)
6. **修改** 一個簡單的文本字符串，看到實時更新
7. **學習** TypeScript 類型定義
8. **構建** 新的頁面或組件

---

## 📝 版本歷史

| 版本 | 日期 | 更新內容 |
|------|------|---------|
| 1.0 | 2025年2月 | 初始發布 - 完整的 Michi 品牌重設計 |

---

## 📄 許可

MIT License - 自由使用和修改

---

## 🎉 開始你的 Michi 之旅

準備好了嗎？

1. 複製 `.env.example` 為 `.env.local`
2. 填入你的 API 金鑰
3. 運行 `npm install`
4. 運行 `npm run dev`
5. 訪問 `http://localhost:3000`

**歡迎進入 Michi！** 🌸

---

最後修改: 2025年2月
版本: 1.0

**Michi - 你的日本代購之道。**
