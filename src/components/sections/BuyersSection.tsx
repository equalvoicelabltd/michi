'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type Buyer = Database['public']['Tables']['buyers']['Row'];

export default function BuyersSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const { data, error } = await supabase
          .from('buyers')
          .select('*')
          .eq('verified', true)
          .order('rating', { ascending: false })
          .limit(6);

        if (error) throw error;
        setBuyers(data || []);
      } catch (error) {
        console.error('Error fetching buyers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  if (buyers.length === 0) {
    return <div className="text-center py-12">{t('common.noResults')}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {buyers.map((buyer) => (
        <div key={buyer.id} className="card p-6">
          {/* Buyer Info */}
          <div className="flex items-center gap-4 mb-4">
            {buyer.avatar_url && (
              <img
                src={buyer.avatar_url}
                alt={buyer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{buyer.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-600">
                  {buyer.rating.toFixed(1)} ({buyer.total_reviews})
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{buyer.bio}</p>

          <div className="space-y-2 mb-4 text-sm">
            <div>
              <span className="text-gray-600">{t('buyers.buyerCard.commission')}:</span>
              <span className="ml-2 font-semibold">{buyer.commission_rate}%</span>
            </div>
            <div>
              <span className="text-gray-600">{t('common.country')}:</span>
              <span className="ml-2 font-semibold">{buyer.base_location}</span>
            </div>
          </div>

          {/* Categories */}
          {buyer.categories && buyer.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {buyer.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {t(`buyers.categories.${cat}` as any)}
                </span>
              ))}
            </div>
          )}

          {/* Action Button */}
          <Link
            href={`/${locale}/buyers/${buyer.id}`}
            className="btn-primary w-full text-center"
          >
            {t('buyers.buyerCard.viewProfile')}
          </Link>
        </div>
      ))}
    </div>
  );
}
