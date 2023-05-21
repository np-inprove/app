export default defineNuxtPlugin(() => {
  const {
    public: {
      apiUrl = (globalThis as any).NUXT_PUBLIC_API_URL ?? 'http://localhost:3333',
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
