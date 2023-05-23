import { AUTHENTICATION_STATE_COOKIE_NAME } from './auth'

/**
 * Unlike auth.ts, pages with this middleware will only allow access when the user is anonymous
 */
export default defineNuxtRouteMiddleware(() => {
  const authenticated = useCookie(AUTHENTICATION_STATE_COOKIE_NAME)

  if (process.server) {
    if (authenticated.value)
      return navigateTo('/dashboard')
  }
  else {
    const auth = useAuthStore()

    if (auth.authenticated)
      return navigateTo('/dashboard')
  }
})
