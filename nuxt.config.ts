// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/vars.css',
    '~/styles/colors.css',
    '~/styles/global.css',
  ],
})
