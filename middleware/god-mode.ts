import { AUTHENTICATION_STATE_COOKIE_NAME } from './auth'

export default defineNuxtRouteMiddleware(() => {
  const authenticated = useCookie(AUTHENTICATION_STATE_COOKIE_NAME)

  if (process.server) {
    if (!authenticated.value)
      return navigateTo('/login')

    if (authenticated.value === 'human')
      return navigateTo('/dashboard')
  }
  else {
    const auth = useAuthStore()

    if (!auth.authenticated)
      return navigateTo('/login')

    if (!auth.godMode)
      return navigateTo('/dashboard')
  }
})
