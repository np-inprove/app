import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ValidationError } from './errors'
import { parseError } from './errors'

interface User {
  first_name: string
  last_name: string
  email: string
  points?: number
  points_awarded_count?: number
  points_awarded_reset_time?: string
  god_mode?: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const isLoading = ref(true)
  const error = ref<ValidationError>({
    message: '',
  })

  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const points = ref(0)
  const pointsAwardedCount = ref(0)
  const pointsAwardedResetTime = ref(new Date(Date.now()))
  const godMode = ref(false)

  const authenticated = computed(() => !!email.value)

  /**
   * init populates the store with the current user data, and does nothing
   * if the user is unauthenticated.
   *
   * init should be called in any root level layout (example: layouts/app.vue)
   */
  async function init(cookie?: string) {
    try {
      const res = await $api<User>('/auth/whoami', {
        headers: cookie
          ? {
              cookie,
            }
          : undefined,
      })
      populate(res)
    }
    catch (e) {
      error.value = parseError(e)
      console.error('[composables/user.ts] failed to init store', e)
    }
    isLoading.value = false
  }

  /**
   * login authenticates the user and populates the store
   * @param email email of the user
   * @param password password of the user
   */
  async function login(email: string, password: string) {
    isLoading.value = true
    try {
      const res = await $api<User>('/auth/login', {
        method: 'POST',
        body: {
          email, password,
        },
      })
      populate(res)
    }
    catch (e) {
      error.value = parseError(e)
      console.error('[composables/user.ts] failed to login', e)
    }
    isLoading.value = false
  }

  /**
   * populate fills up the store with response data
   * @param data data to populate the store with
   */
  function populate(data: User) {
    firstName.value = data.first_name
    lastName.value = data.last_name
    email.value = data.email

    if (data.god_mode)
      godMode.value = data.god_mode

    if (data.points)
      points.value = data.points

    if (data.points_awarded_count)
      pointsAwardedCount.value = data.points_awarded_count

    if (data.points_awarded_reset_time) {
      const d = new Date(data.points_awarded_reset_time)
      if (d.getFullYear() !== 1) { // Zero value in Go time.TIme
        pointsAwardedResetTime.value = d
      }
    }
  }

  return {
    isLoading,
    error,

    firstName,
    lastName,
    email,
    points,
    pointsAwardedCount,
    pointsAwardedResetTime,
    godMode,

    authenticated,

    init,
    login,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
