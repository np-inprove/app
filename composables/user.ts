import { acceptHMRUpdate, defineStore } from 'pinia'
import { apiFetch } from './api'

export const useUserStore = defineStore('user', () => {
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const points = ref(0)
  const pointsAwardedCount = ref(0)
  const pointsAwardedResetTime = ref(Date.now())
  const godMode = ref(false)

  /**
   * init populates the store with the current user data, and does nothing if the user is unauthenticated.
   */
  async function init() {
    await apiFetch('/auth/whoami')
  }

  async function login(email: string, password: string) {
    await apiFetch('/auth/login', {
      method: 'POST',
      body: {
        email, password,
      },
    })
  }

  return {
    firstName,
    lastName,
    email,
    points,
    pointsAwardedCount,
    pointsAwardedResetTime,
    godMode,

    init,
    login,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
