// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
  ],
  css: [
    'primevue/resources/primevue.css',
    '~/styles/global.css',
  ],
  build: {
    transpile: ['primevue'],
  },
  devtools: {
    enabled: false,
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3333',
    },
  },
})
