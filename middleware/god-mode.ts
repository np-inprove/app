export default defineNuxtRouteMiddleware((to) => {
  if (process.server)
    return

  const user = useUserStore()
  if (!user.authenticated)
    return navigateTo('/login')

  if (!user.godMode)
    return navigateTo('/dashboard')
})
