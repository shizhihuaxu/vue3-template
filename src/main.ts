import { createApp } from 'vue'
import { createPinia } from 'pinia'
import setupAtnd from '@/components/antd'
import locale from './locales'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

setupAtnd(app)

app
    .use(router)
    .use(pinia)
    .use(locale)
    .mount('#app')
