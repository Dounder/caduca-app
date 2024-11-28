import 'primeicons/primeicons.css'
import './assets/main.css'

import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import FocusTrap from 'primevue/focustrap'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import Aura from './config/app.theme'
import './config/yup'
import en from './locales/en.json'
import es from './locales/es.json'
import router from './router'

const app = createApp(App)
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: { en, es }
})

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(PrimeVue, {
  theme: { preset: Aura, options: { darkModeSelector: '.dark' } },
  locale: { accept: 'Aceptar', reject: 'Rechazar' }
})
app.use(ToastService)
app.directive('focustrap', FocusTrap)
app.directive('tooltip', Tooltip)

app.mount('#app')
