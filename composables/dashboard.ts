import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', () => {
  return {}
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
