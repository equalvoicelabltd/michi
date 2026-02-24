import { useTranslations } from 'next-intl';
import BuyersSection from '@/components/sections/BuyersSection';

export const metadata = {
  title: '尋找日本代購職人 | Michi JP',
  description: '連接專業的日本代購買手，為您搜羅日本限定商品。',
};

export default function BuyersPage() {
  const t = useTranslations('buyers');

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      {/* 頂部標題區域 */}
      <div className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            {t('pageSubtitle')}
          </p>
        </div>
      </div>

      {/* 買手列表區域 - 直接調用您現有的組件 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('verifiedBuyers')}
          </h2>
        </div>

        {/* 這就是您寫好的 BuyersSection */}
        <BuyersSection />
      </div>
    </div>
  );
}