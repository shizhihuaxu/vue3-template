import { createApp } from 'vue'
import { createPinia } from 'pinia'
import setupElement from '@/components/element'
import locale from './locales'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

setupElement(app)

app
    .use(router)
    .use(pinia)
    .use(locale)
    .mount('#app')
