<template>
    <a-config-provider :locale='locale'>
        <router-view />
    </a-config-provider>
</template>

<script setup lang="ts">
import type { ConfigProviderProps } from 'ant-design-vue/lib/config-provider'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/store/app'
import { STORAGE_LANG_KEY, defaultLang } from '@/locales'
import { localStorage } from '@/utils/local-storage'

const i18n = useI18n()
const appStore = useAppStore()

const lang = localStorage.get(STORAGE_LANG_KEY)
if (lang) {
    appStore.changeLang(lang)
} else {
    appStore.changeLang(defaultLang)
}

const locale = computed(() => i18n.getLocaleMessage(i18n.locale.value).antd as ConfigProviderProps['locale'])
</script>
