import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGroupStore = defineStore('group', () => {
  return {}
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
