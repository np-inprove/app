import { $fetch } from 'ofetch'

export const apiFetch = $fetch.create({
  // This is the same as defined in nuxt.config.ts
  baseURL: ((globalThis || process.env) as any).NUXT_PUBLIC_API_URL ?? 'http://localhost:3333',
  credentials: 'include',
})
