import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home-view.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
    routes,
})

export default router
