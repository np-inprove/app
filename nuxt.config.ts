// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
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
      apiURL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:5000',
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
})
