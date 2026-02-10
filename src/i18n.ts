import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['zh', 'zh-CN', 'en', 'ja', 'th'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: getTimeZoneForLocale(locale),
  };
});

function getTimeZoneForLocale(locale: string): string {
  const timeZones: Record<string, string> = {
    'zh': 'Asia/Hong_Kong',
    'zh-CN': 'Asia/Shanghai',
    'en': 'Asia/Tokyo',
    'ja': 'Asia/Tokyo',
    'th': 'Asia/Bangkok',
  };
  return timeZones[locale] || 'UTC';
}
