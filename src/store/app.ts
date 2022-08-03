import { defineStore } from 'pinia'
import {
    STORAGE_LANG_KEY, Locale, defaultLang, loadLangAsync,
} from '@/locales'
import { localStorage } from '@/utils/local-storage'

export const useAppStore = defineStore('app', {
    state: () => ({
        lang: defaultLang as Locale,
    }),
    actions: {
        changeLang(lang: Locale) {
            loadLangAsync(lang)
                .then(() => {
                    this.lang = lang
                    localStorage.set(STORAGE_LANG_KEY, lang)
                })
                .catch(/** */)
        },
    },
})
