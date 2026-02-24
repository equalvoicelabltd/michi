'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductsSection() {
  // 指定翻譯範圍為 products，避免路徑過長報錯
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
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
    const langKey = locale === 'zh' ? 'summary_zh' : `summary_${locale}`;
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
    const currency = currencyMap[locale] || 'JPY';
    // @ts-ignore
    return product.estimated_prices[currency]?.toString() || null;
  };

  if (loading) {
    return <div className="text-center py-20 font-serif italic text-stone-400">{tCommon('loading')}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-stone-200">
        <p className="font-serif text-stone-400">{t('noProducts')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8">
      {products.map((product) => (
        <div key={product.id} className="group flex flex-col bg-white border border-stone-100 hover:border-michi-gold transition-all duration-500 p-4">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden bg-stone-50">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl opacity-10">道</div>
            )}

            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-4 left-4 bg-michi-ink text-white text-[9px] font-black uppercase tracking-widest px-3 py-1">
                {t(`categories.${product.category}` as any)}
              </div>
            )}
          </div>

          <div className="pt-8 space-y-4 flex-grow flex flex-col">
            <h3 className="font-serif font-black text-xl text-michi-ink line-clamp-2 min-h-[3.5rem] group-hover:text-michi-vermilion transition-colors">
              {product.title}
            </h3>

            <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 font-light">
              {getSummary(product)}
            </p>

            <div className="mt-auto pt-6 border-t border-stone-50 flex justify-between items-end">
              <div>
                {getPrice(product) && (
                  <div className="text-xl font-serif italic text-michi-gold">
                    <span className="text-xs mr-1 opacity-50 font-sans not-italic">EST.</span>
                    ${getPrice(product)}
                  </div>
                )}
                {product.ai_generated && (
                  <div className="text-[9px] font-bold text-stone-300 uppercase tracking-tighter mt-1 flex items-center gap-1">
                    <span>🤖</span> {t('productCard.aiGenerated')}
                  </div>
                )}
              </div>

              {product.source_url && (
                <a
                  href={product.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-michi-ink border-b-2 border-michi-vermilion pb-1 hover:text-michi-vermilion transition-all"
                >
                  {t('productCard.readMore')}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}