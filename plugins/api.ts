export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = (() => {
    if (process.client) {
      return $fetch.create({
        baseURL: config.public.apiUrl,
        credentials: 'include',
      })
    }

    const e = useRequestEvent()

    const baseURL = e.context.cloudflare ? e.context.cloudflare.env.NUXT_PUBLIC_API_URL : config.public.apiUrl

    return $fetch.create({
      baseURL,
      credentials: 'include',
    })
  })()

  return {
    provide: {
      api,
    },
  }
})
