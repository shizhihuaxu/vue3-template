import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'

export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    // const isDev = mode === 'development'

    return {
        base: env.VITE_APP_PUBLIC_PATH,
        plugins: [
            vue(),
            eslint({ cache: false }),
            stylelint(),
        ],
        resolve: {
            alias: {
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
                '@': resolve(__dirname, 'src'),
                '@http': resolve(__dirname, 'src/services/http'),
            },
        },
        css: {
            devSourcemap: true,
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        'primary-color': '#1DA57A',
                    },
                    // DO NOT REMOVE THIS LINE
                    javascriptEnabled: true,
                },
                scss: {
                    additionalData: '@import "@/styles/_variables.scss";@import "@/styles/_mixins.scss";', // 添加公共样式
                },
            },
        },
        server: {
            host: true,
            proxy: {
                '/api': {
                    target: 'http//:1.1.1.1',
                    ws: false,
                    changeOrigin: true,
                },
            },
        },
        optimizeDeps: {
            include: [
                'ant-design-vue/es/locale/en_US',
                'ant-design-vue/es/locale/zh_CN',
                'ant-design-vue/es/form',
                'dayjs',
                'dayjs/locale/eu',
                'dayjs/locale/zh-cn',
                'lodash-es',
            ],
        },
        build: {
            cssCodeSplit: false,
            chunkSizeWarningLimit: 2048,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vue: ['vue', 'vue-router'],
                        antdv: ['ant-design-vue'],
                        dayjs: ['dayjs'],
                    },
                },
            },
        },
    }
}
