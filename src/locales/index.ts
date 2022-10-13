import { createI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import zhCN from './lang/zh-CN'

export type Locale = 'zh-CN' | 'en-US'
export const locales = ['zh-CN', 'en-US']
export const defaultLang = 'zh-CN'
export const STORAGE_LANG_KEY = 'lang'

// default
dayjs.locale(zhCN.dayjsLocaleName)

const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    missingWarn: false,
    fallbackLocale: false,
    // 如果不需要国际化，可以打开如下两个配置，取消控制台的警告
    // silentTranslationWarn: true,
    // silentFallbackWarn: true,
    locale: defaultLang,
    messages: {
        'zh-CN': zhCN as any,
    },
})

// 设置 i18n 语言
const setI18nLang = (lang: Locale) => {
    i18n.global.locale.value = lang as any

    //  设置 html lang 属性
    const HTML = document.querySelector('html')
    if (HTML) HTML.setAttribute('lang', lang)
}

// 加载语言
export function loadLangAsync(lang: Locale = defaultLang): Promise<string> {
    return new Promise<string>((resolve) => {
        const currentLocale = i18n.global

        if (currentLocale.locale.value !== lang) {
            import(`./lang/${lang}.ts`).then((res) => {
                const loaded = res.default

                currentLocale.setLocaleMessage(lang, loaded)
                dayjs.locale(loaded.dayjsLocaleName)
                setI18nLang(lang)

                resolve(lang)
            })

            return
        }

        resolve(lang)
    })
}

export default i18n
