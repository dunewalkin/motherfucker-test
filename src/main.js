import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'
import App from './App.vue'
import router from './router'
import './assets/styles/base.scss'
import './assets/styles/fonts.scss'

const userLang = navigator.language.toLowerCase()
const i18n = createI18n({
   legacy: false,
   locale: userLang.startsWith('ru') ? 'ru' : 'en',
   fallbackLocale: 'en',
   messages: { ru, en },
   escapeParameterHtml: false
})

createApp(App)
   .use(createPinia()) 
   .use(router)
   .use(i18n)
   .mount('#app')
