import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const points = ref(0)
  const pointsAwardedCount = ref(0)
  const pointsAwardedResetTime = ref(new Date(Date.now()))
  const godMode = ref(false)

  const institutionName = ref('')
  const institutionShortName = ref('')
  const institutionDescription = ref('')

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
      await getuserinstitution(cookie)
    }
    catch (e) {
      console.error('[composables/user.ts] failed to init store', e)
      return parseError(e)
    }
  }

  async function getuserinstitution(cookie?: string) {
    try {
      const res = await $api<Institution>('/auth/myinstitution', {
        headers: cookie
          ? {
              cookie,
            }
          : undefined,
      })
      populateInst(res)
    }
    catch (e) {
      console.error('[composables/user.ts] failed to init store', e)
      return parseError(e)
    }
  }

  /**
   * login authenticates the user and populates the store
   *
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
      await getuserinstitution()
    }
    catch (e) {
      console.error('[composables/user.ts] failed to login', e)
      return parseError(e)
    }
  }

  /**
   * register creates a new user account and populates the store
   *
   * @param inviteCode invite code to use for registration
   * @param firstName first name of the user
   * @param lastName last name of the user
   * @param email email of the user, must be a domain which is registered in an institution
   * @param password password of the user, min length of 6
   * @returns ValidationError | undefined
   */
  async function register(inviteCode: string, firstName: string, lastName: string, email: string, password: string) {
    try {
      const res = await $api<User>('/auth/register', {
        method: 'POST',
        body: {
          inviteCode,
          firstName,
          lastName,
          email,
          password,
        },
      })
      populate(res)
      await getuserinstitution()
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
    firstName.value = data.firstName
    lastName.value = data.lastName
    email.value = data.email

    if (data.godMode)
      godMode.value = data.godMode

    if (data.points)
      points.value = data.points

    if (data.pointsAwardedCount)
      pointsAwardedCount.value = data.pointsAwardedCount

    if (data.pointsAwardedResetTime) {
      const d = new Date(data.pointsAwardedResetTime)
      if (d.getFullYear() !== 1) { // Zero value in Go time.TIme
        pointsAwardedResetTime.value = d
      }
    }
  }

  function populateInst(data: Institution) {
    institutionName.value = data.name
    institutionShortName.value = data.shortName
    institutionDescription.value = data.description
  }

  return {
    firstName,
    lastName,
    email,
    points,
    pointsAwardedCount,
    pointsAwardedResetTime,
    godMode,

    institutionName,
    institutionShortName,
    institutionDescription,

    authenticated,

    init,
    login,
    register,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
