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