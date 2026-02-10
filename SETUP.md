# 詳細設置指南

## 步驟 1: Supabase 設置

### 1.1 創建 Supabase 項目
1. 訪問 [supabase.com](https://supabase.com)
2. 點擊 "New Project"
3. 填入項目信息：
   - Project Name: `jp-daigou`
   - Database Password: 設置強密碼
   - Region: 選擇距離最近的地區（建議亞洲）

### 1.2 初始化數據庫
1. 複製 `supabase/migrations/001_init_schema.sql` 的內容
2. 在 Supabase 儀表板中：
   - 點擊 "SQL Editor"
   - 點擊 "New Query"
   - 粘貼並執行 SQL

### 1.3 獲取 API 密鑰
1. 在 Supabase 中點擊 "Project Settings" > "API"
2. 複製：
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`

## 步驟 2: Google OAuth 設置

### 2.1 創建 Google OAuth 應用
1. 訪問 [Google Cloud Console](https://console.cloud.google.com)
2. 創建新項目："JP Daigou"
3. 啟用 APIs：
   - Google+ API
   - Google Translate API

### 2.2 創建 OAuth 2.0 認證
1. 點擊 "Create Credentials" > "OAuth 2.0 Client ID"
2. 應用類型：Web 應用
3. 添加授權重定向 URI：
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-domain.vercel.app/api/auth/callback/google
   ```
4. 複製 Client ID 和 Client Secret

## 步驟 3: OpenAI 設置

1. 訪問 [openai.com/api](https://openai.com/api)
2. 登入並創建 API Key
3. 在月度限額中設置使用限制（可選）
4. 複製 API Key → `.env.local` 的 `OPENAI_API_KEY`

## 步驟 4: Google Search 設置（可選，用於真實爬蟲）

### 4.1 創建自定義搜索引擎
1. 訪問 [Google Custom Search](https://cse.google.com)
2. 創建新搜索引擎
3. 添加站點：
   - `prtimes.jp` (新聞)
   - `wwdjapan.com` (時尚新聞)
   - `pr.leopalace21.jp` (商品新聞)

### 4.2 獲取 API 密鑰
1. 在 Google Cloud Console 中啟用 "Custom Search API"
2. 複製 API Key 和 Search Engine ID

## 步驟 5: NextAuth 設置

### 5.1 生成 NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

將輸出複製到 `.env.local`

### 5.2 配置 URL
```
# 開發
NEXTAUTH_URL=http://localhost:3000

# 生產（Vercel）
NEXTAUTH_URL=https://your-domain.vercel.app
```

## 步驟 6: 本地開發

### 6.1 安裝依賴
```bash
npm install
```

### 6.2 運行開發服務器
```bash
npm run dev
```

### 6.3 訪問應用
打開 [http://localhost:3000](http://localhost:3000)

## 步驟 7: 部署到 Vercel

### 7.1 連接 GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/jp-daigou.git
git push -u origin main
```

### 7.2 導入到 Vercel
1. 訪問 [vercel.com](https://vercel.com)
2. 點擊 "Add New" > "Project"
3. 連接 GitHub 倉庫
4. 配置環境變數：
   - 複製所有 `.env.local` 的變數到 Vercel

### 7.3 部署
點擊 "Deploy" 按鈕

## 🔧 故障排除

### 問題 1: Supabase 連接失敗
- 檢查 `NEXT_PUBLIC_SUPABASE_URL` 和 API Key 是否正確
- 確保 Supabase 項目已創建並初始化

### 問題 2: Google OAuth 失敗
- 檢查重定向 URI 是否正確添加
- 確保 Client ID 和 Secret 正確
- 清除瀏覽器 Cookie 並重試

### 問題 3: AI 爬蟲不工作
- 確保 OpenAI API Key 有效
- 檢查 API 使用配額
- 查看 Vercel 日誌了解錯誤信息

### 問題 4: 翻譯 API 失敗
- 確保 Google Translate API 已啟用
- 檢查 API Key 是否有效

## 📊 測試數據

### 創建測試用戶
使用 Google OAuth 登入即可自動創建用戶

### 添加測試買手
在 Supabase SQL Editor 中執行：
```sql
-- 先創建用戶
INSERT INTO users (auth_id, email, full_name, country, preferred_language)
VALUES (uuid_generate_v4(), 'buyer@example.com', 'Test Buyer', 'jp', 'ja');

-- 然後創建買手檔案
INSERT INTO buyers (user_id, name, base_location, commission_rate, rating, verified)
SELECT id, 'Test Buyer', 'Tokyo', 5.0, 4.8, true FROM users WHERE email = 'buyer@example.com';
```

### 添加測試商品
```sql
INSERT INTO products (title, source_url, category, published_at, ai_generated)
VALUES 
  ('新作コスメ', 'https://example.com', 'cosmetics', NOW(), true),
  ('新ファッション', 'https://example.com', 'fashion', NOW(), true);
```

## 🚀 生產檢查清單

在部署到生產前檢查：
- [ ] 所有環境變數已設置
- [ ] Supabase RLS 政策已啟用
- [ ] OpenAI API 配額充足
- [ ] Google OAuth 重定向 URI 已更新
- [ ] CRON 任務已配置
- [ ] 域名 SSL 已配置
- [ ] 備份計劃已制定
- [ ] 監控和日誌已設置

## 📞 支持資源

- [Next.js 文檔](https://nextjs.org/docs)
- [Supabase 文檔](https://supabase.com/docs)
- [NextAuth.js 文檔](https://next-auth.js.org)
- [OpenAI API 文檔](https://platform.openai.com/docs)
- [Vercel 部署文檔](https://vercel.com/docs)

---

祝部署順利！🎉
