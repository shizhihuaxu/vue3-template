import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import checker from 'vite-plugin-checker'
import { viteMockServe } from 'vite-plugin-mock'
import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode, command }: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    // const isDev = mode === 'development'

    return {
        base: env.VITE_APP_PUBLIC_PATH,
        plugins: [
            vue(),
            vueJsx(),
            eslint({ cache: false }),
            stylelint(),
            legacy({
                targets: ['defaults', 'not IE 11'],
            }),
            checker({
                typescript: true,
                vueTsc: true,
            }),
            // element-plus 组件自动导入
            AutoImport({
                resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
            }),
            Components({
                resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
            }),
            ElementPlus({
                useSource: true,
            }),
            viteMockServe({
                mockPath: 'mock', // mock 数据的目录，相对于工作目录
                localEnabled: command === 'serve' && env.VITE_MOCK === 'true',
                supportTs: true,
                watchFiles: true,
            }),
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
                scss: {
                    additionalData: `
                        @use "@/styles/global/index.scss" as global;
                    `,
                },
            },
        },
        server: {
            open: true, // 运行完后直接打开
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
                'element-plus/es/locale/lang/en',
                'element-plus/es/locale/lang/zh-cn',
                'dayjs/locale/eu',
                'dayjs/locale/zh-cn',
            ],
        },
        build: {
            cssCodeSplit: false,
            chunkSizeWarningLimit: 2048,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vue: ['vue', 'vue-router', 'pinia'],
                        elementPlus: ['element-plus'],
                        dayjs: ['dayjs'],
                    },
                },
            },
        },
    }
}
