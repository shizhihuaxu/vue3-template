import { createApp } from 'vue'
import setupElement from '@/components/element'
import locale from './locales'
import router from './router'
import pinia from './store'
import App from './App.vue'

const app = createApp(App)

setupElement(app)

app
    .use(router)
    .use(pinia)
    .use(locale)
    .mount('#app')
