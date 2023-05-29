import { acceptHMRUpdate, defineStore } from 'pinia'

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
   *
   * @param cookie cookie to use for authentication
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
      console.error('[composables/user.ts] failed to init store', e)
      return parseError(e)
    }
  }

  /**
   * login authenticates the user and populates the store
   * @param email email of the user
   * @param password password of the user
   */
  async function login(email: string, password: string) {
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
      console.error('[composables/user.ts] failed to login', e)
      return parseError(e)
    }
  }

  /**
   * register creates a new user account and populates the store
   *
   * @param firstName first name of the user
   * @param lastName last name of the user
   * @param email email of the user, must be a domain which is registered in an institution
   * @param password password of the user, min length of 6
   * @returns ValidationError | undefined
   */
  async function register(firstName: string, lastName: string, email: string, password: string, confirm_password: string) {
    try {
      const res = await $api<User>('/auth/register', {
        method: 'POST',
        body: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          confirm_password,
        },
      })
      // populate(res)
    }
    catch (e) {
      console.error('[composables/user.ts] failed to register', e)
      return parseError(e)
    }
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
    register,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
