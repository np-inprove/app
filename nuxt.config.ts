// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/vars.css',
    '~/styles/colors.css',
    '~/styles/global.css',
  ],
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      // This is the same as defined in nuxt.config.ts
      apiUrl: (globalThis as any).NUXT_PUBLIC_API_URL ?? process.env.NUXT_PUBLIC_API_URL ?? 'http://localhost:3333',
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
})
