// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/storybook',
    '@nuxtjs/i18n'
  ],

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false,
    theme: {
      colors: [
        'brand_primary',
        'brand_secondary',
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  },

  future: {
    compatibilityVersion: 4
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: true
    },

    strategy: 'no_prefix',
    defaultLocale: 'ru',
    baseUrl: 'http://localhost:3000',
    lazy: true,
    locales: [
      {code: 'en', name: "English", language: 'en', file: 'en.ts', flag: '🇬🇧'},
      {code: 'kk', name: "Қазақша", language: 'kk', file: 'kk.ts', flag: '🇰🇿'},
      {code: 'ru', name: "Русский", language: 'ru', file: 'ru.ts', flag: '🇷🇺'}
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18nRed',
      redirectOn: 'root',
    },
  },
  compatibilityDate: '2024-11-27'
})