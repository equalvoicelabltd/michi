import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['zh', 'zh-CN', 'en', 'ja', 'th'],
  defaultLocale: 'zh',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
