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
    enabled: false,
  },
  runtimeConfig: {
    public: {
      apiUrl: '',
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
