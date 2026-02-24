import { useTranslations } from 'next-intl';
import MichiMarketplace from '@/components/MichiMarketplace';

// 設置元數據
export const metadata = {
  title: 'Michi Project | 日本代購平台 - 連接全球買家與日本專家',
  description: '發現日本最新商品，連接可信任的代購職人。支持繁體中文、簡體中文、英文、日文和泰文。',
  openGraph: {
    title: 'Michi Project - Your Path to Japan\'s Best',
    description: '日本代購平台 - 代購職人市場 + AI 商品情報',
    type: 'website',
  },
};

export default function Home() {
  const t = useTranslations();

  return (
    <main className="bg-[#F9F7F2] min-h-screen">
      {/* Michi 代購平台組件 - 包含所有 Section */}
      <MichiMarketplace />
    </main>
  );
}
