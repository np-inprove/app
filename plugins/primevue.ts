import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.use(ToastService)

  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('Card', Card)
})
