import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // 支持的語言（已移除泰文）
  locales: ['zh', 'zh-CN', 'en', 'ja'],

  // 默認語言
  defaultLocale: 'zh',

  // 路徑前綴策略
  localePrefix: 'always'
});