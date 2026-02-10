#!/bin/bash

# JP Daigou - 快速啟動腳本

echo "🚀 JP Daigou - 日本代購平台"
echo "=============================="
echo ""

# 檢查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安裝。請從 https://nodejs.org 下載安裝"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 檢查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安裝"
    exit 1
fi

echo "✅ npm 版本: $(npm -v)"
echo ""

# 複製環境變數
if [ ! -f .env.local ]; then
    echo "📋 複製 .env.example 為 .env.local..."
    cp .env.local .env.local
    echo "⚠️  請編輯 .env.local 並填入您的 API Keys"
    echo ""
fi

# 安裝依賴
echo "📦 安裝依賴..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 安裝失敗"
    exit 1
fi

echo ""
echo "✅ 安裝完成！"
echo ""
echo "📖 接下來的步驟："
echo "1. 編輯 .env.local 文件"
echo "2. 在 Supabase 中執行 supabase/migrations/001_init_schema.sql"
echo "3. 運行: npm run dev"
echo "4. 訪問: http://localhost:3000"
echo ""
echo "📚 詳細說明請查看 SETUP.md"
echo ""
