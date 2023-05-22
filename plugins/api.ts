export default defineNuxtPlugin(() => {
  const {
    public: {
      apiUrl = (globalThis as any).NUXT_PUBLIC_API_URL,
    },
  } = useRuntimeConfig()

  console.log('help', JSON.stringify(globalThis))

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
