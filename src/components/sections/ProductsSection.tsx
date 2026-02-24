'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getSummary = (product: Product): string => {
    const langKey =
      locale === 'zh' ? 'summary_zh' : `summary_${locale}`;
    return (product[langKey as keyof Product] as string) || product.summary_en || '';
  };

  const getPrice = (product: Product): string | null => {
    if (!product.estimated_prices) return null;
    const currencyMap: Record<string, string> = {
      'zh': 'HKD',
      'zh-CN': 'CNY',
      'en': 'JPY',
      'ja': 'JPY',
      'th': 'THB',
    };
    const currency = currencyMap[locale];
    return product.estimated_prices[currency]?.toString() || null;
  };

  if (loading) {
    return <div className="text-center py-12">{t('common.loading')}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-12">{t('products.noProducts')}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {products.map((product) => (
        <div key={product.id} className="card overflow-hidden hover:shadow-xl transition">
          {/* Image */}
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-6">
            {/* Category Badge */}
            {product.category && (
              <div className="badge mb-2">
                {t(`products.categories.${product.category}` as any)}
              </div>
            )}

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {product.title}
            </h3>

            {/* Summary */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {getSummary(product)}
            </p>

            {/* Price */}
            {getPrice(product) && (
              <div className="text-lg font-semibold text-primary mb-4">
                ${getPrice(product)}
              </div>
            )}

            {/* AI Badge */}
            {product.ai_generated && (
              <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                <span>🤖</span>
                <span>{t('products.productCard.aiGenerated')}</span>
              </div>
            )}

            {/* Link to Source */}
            {product.source_url && (
              <a
                href={product.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full text-center"
              >
                {t('products.productCard.readMore')}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
