export default defineNuxtPlugin(() => {
  if (process.server) {
    const e = useRequestEvent()
    console.log(JSON.stringify(e.context.cloudflare), JSON.stringify(e.context.cf))
  }

  const {
    public: {
      apiUrl = (global as any).NUXT_PUBLIC_API_URL,
    },
  } = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: apiUrl,
    credentials: 'include',
  })

  return {
    provide: {
      api,
    },
  }
})
