export const AUTHENTICATION_STATE_COOKIE_NAME = 'b'

export default defineNuxtRouteMiddleware(() => {
  const authenticated = useCookie(AUTHENTICATION_STATE_COOKIE_NAME)

  if (process.server) {
    if (!authenticated.value)
      return navigateTo('/login')
  }
  else {
    const user = useUserStore()

    if (!user.authenticated)
      return navigateTo('/login')
  }
})
