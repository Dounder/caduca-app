// Import PrimeVue and other libraries
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

// Import your App and configurations
import App from './App.vue'
import Aura from './config/app.theme'

// Import the Yup configuration
import './config/yup'

// Import locales for i18n
import en from './locales/en.json'
import es from './locales/es.json'

// Import router
import router from './router'

// Create the Vue app
const app = createApp(App)

// Set up i18n for Vue
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: { es, en }
})

// Configure the Vue app
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

// Mount the app to the DOM
app.mount('#app')
