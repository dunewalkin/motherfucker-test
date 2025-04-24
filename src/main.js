import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'
import App from './App.vue'
import router from './router'
import './assets/styles/base.scss'
import './assets/styles/fonts.scss'

const i18n = createI18n({
   legacy: false,
  locale: 'ru',                
  fallbackLocale: 'en',
  messages: { ru, en }
})

createApp(App)
   .use(createPinia()) 
  .use(router)
  .use(i18n)
  .mount('#app')
