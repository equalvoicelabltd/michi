import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // 支持的所有語言
  locales: ['zh', 'zh-CN', 'en', 'ja', 'th'],

  // 默認語言
  defaultLocale: 'zh',

  // 路徑前綴策略
  localePrefix: 'as-needed'
});