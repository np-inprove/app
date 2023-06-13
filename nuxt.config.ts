// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
  ],
  app: {
    head: {
      script: [
        {
          type: 'text/javascript',
          children: [
            `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "hj2h2mzso4");`,
          ],
        },
      ],
    },
  },
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
