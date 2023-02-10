import { createApp } from 'vue'
import locale from './locales'
import router from './router'
import pinia from './store'
import App from './App.vue'

const app = createApp(App)

app
    .use(router)
    .use(pinia)
    .use(locale)
    .mount('#app')
