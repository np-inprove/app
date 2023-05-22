import { AUTHENTICATION_STATE_COOKIE_NAME } from './auth'

export default defineNuxtRouteMiddleware((to) => {
  const authenticated = useCookie(AUTHENTICATION_STATE_COOKIE_NAME)

  if (process.server) {
    if (!authenticated.value)
      return navigateTo('/login')

    if (authenticated.value === 'human')
      return navigateTo('/dashboard')
  }
  else {
    const user = useUserStore()

    if (!user.authenticated)
      return navigateTo('/login')

    if (!user.godMode)
      return navigateTo('/dashboard')
  }
})
