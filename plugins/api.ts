export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = (() => {
    console.log('creating plugin', process.client)

    if (process.client) {
      return $fetch.create({
        baseURL: config.public.apiUrl,
        credentials: 'include',
      })
    }

    const e = useRequestEvent()

    console.log(JSON.stringify(e.context.cloudflare))

    const baseURL = e.context.cloudflare ? e.context.cloudflare.NUXT_PUBLIC_API_URL : config.public.apiUrl

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
