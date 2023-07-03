import { acceptHMRUpdate, defineStore } from 'pinia'

type Theme = 'light' | 'dark'

const toggleModeMap = {
  light: 'dark',
  dark: 'light',
} satisfies Record<Theme, Theme>

const toggleLinkMap = {
  light: '/themes/mdc-dark-deeppurple/theme.css',
  dark: '/themes/mdc-light-deeppurple/theme.css',
}

const modeToLinkMap = {
  dark: '/themes/mdc-dark-deeppurple/theme.css',
  light: '/themes/mdc-light-deeppurple/theme.css',
}

export const useThemeStore = defineStore('theme', () => {
  const cookie = useCookie<Theme>('theme')

  const mode = ref<Theme>('light')

  // This must be set as a Link in the HTML head
  const link = ref('/themes/mdc-light-deeppurple/theme.css')
  const preload = ref('/themes/mdc-dark-deeppurple/theme.css')

  function init() {
    if (cookie.value) {
      if (Object.keys(toggleLinkMap).includes(cookie.value)) {
        mode.value = cookie.value
        link.value = modeToLinkMap[mode.value]
        preload.value = toggleLinkMap[mode.value]
      }
    }
  }

  function toggle() {
    link.value = toggleLinkMap[mode.value]
    cookie.value = toggleModeMap[mode.value]
    mode.value = toggleModeMap[mode.value]
    preload.value = toggleLinkMap[mode.value]
  }

  return {
    link, preload, mode, init, toggle,
  }
})

export function useTheme() {
  const theme = useThemeStore()
  useAsyncData(async () => {
    theme.init()
    return true
  })
  onMounted(async () => {
    try {
      await $fetch(theme.preload)
    }
    catch (err) {
      console.error(err)
    }
  })
  return theme
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
