import { defineStore } from 'pinia'
import {
    STORAGE_LANG_KEY, Locale, defaultLang, loadLangAsync,
} from '@/locales'
import { localStorage } from '@/utils/local-storage'

export const useAppStore = defineStore('app', {
    persist: true,
    state: () => ({
        lang: defaultLang as Locale,
    }),
    actions: {
        // NOTE 点击切换语言按钮需刷新页面，这里可以返回 promise 处理，不要将刷新的逻辑与此函数耦合
        // 而是与切换按钮事件耦合 router.go(0)
        changeLang(lang: Locale): Promise<any> {
            return loadLangAsync(lang)
                .then(() => {
                    this.lang = lang
                    localStorage.set(STORAGE_LANG_KEY, lang)
                })
                .catch(/** */)
        },
    },
})
