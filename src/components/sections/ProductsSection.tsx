'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
// 關鍵：必須使用自定義的導航組件
import { Link } from '@/navigation';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductsSection() {
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

  if (loading) return <div className="text-center py-20 font-serif italic text-stone-400">{tCommon('loading')}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {products.map((product) => (
        <div key={product.id} className="group flex flex-col bg-white border border-stone-100 hover:border-michi-gold transition-all duration-500 p-4">
          <div className="relative aspect-video overflow-hidden bg-stone-50">
            {product.image_url ? (
              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl opacity-10">道</div>
            )}
          </div>

          <div className="pt-8 space-y-4 flex-grow flex flex-col">
            <h3 className="font-serif font-black text-xl text-michi-ink">{product.title}</h3>

            <div className="mt-auto pt-6 border-t border-stone-50 flex justify-between items-center">
              {/* 內部連結：連結到產品詳情頁面 */}
              <Link
                href={`/products/${product.id}`}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-michi-ink border-b-2 border-michi-vermilion pb-1 hover:text-michi-vermilion transition-all"
              >
                {t('productCard.readMore')}
              </Link>

              {/* 外部連結：如果是跳轉到外部電商網站（如 Mercari） */}
              {product.source_url && (
                <a
                  href={product.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-stone-400 hover:text-michi-navy transition-colors"
                >
                  VIEW SOURCE ↗
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}