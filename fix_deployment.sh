#!/bin/bash

# 🌸 Michi JP 一鍵修復腳本
# 修復所有 Vercel 部署問題

echo "🌸 Michi JP 部署一鍵修復"
echo "========================"
echo ""

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 錯誤：請在 Michi 項目根目錄運行此腳本"
    echo "   cd /path/to/michi"
    echo "   bash fix_deployment.sh"
    exit 1
fi

echo "✅ 檢測到 Michi 項目"
echo ""

# 修復 1: next.config.js
echo "📝 修復 1/3: 修復 next.config 配置..."
rm -f next.config.ts next.config.js

cat > next.config.js << 'EOF'
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1', 'michi-jp.vercel.app'],
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async redirects() {
    return [{
      source: '/',
      destination: '/en',
      permanent: false,
    }];
  },
};

module.exports = withNextIntl(nextConfig);
EOF

echo "✅ next.config.js 已修復"
echo ""

# 修復 2: page.tsx
echo "📝 修復 2/3: 修復 page.tsx 組件..."

cat > src/app/\[locale\]/page.tsx << 'EOF'
import { Metadata } from 'next';
import MichiMarketplace from '@/components/MichiMarketplace';

export const metadata: Metadata = {
  title: 'Michi JP | 日本代購平台',
  description: '發現日本最新商品，連接可信任的代購職人。',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      <MichiMarketplace />
    </main>
  );
}
EOF

echo "✅ page.tsx 已修復"
echo ""

# 修復 3: Git 提交
echo "📝 修復 3/3: 提交到 GitHub..."
git add next.config.js src/app/\[locale\]/page.tsx
git commit -m "Fix: correct next.config and page.tsx for Vercel deployment"
git push origin main

echo "✅ 已推送到 GitHub"
echo ""
echo "========================"
echo "🎉 修復完成！"
echo ""
echo "Vercel 將自動重新部署..."
echo "預計 2-5 分鐘內完成"
echo ""
echo "部署完成後檢查："
echo "✅ https://michi-jp.vercel.app（或你的 Vercel URL）"
echo ""
echo "========================"
