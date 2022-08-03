<template>
    <div class='a'>
        {{ $t('pages.title') }}
    </div>
    <a-date-picker />
    <a-button
        type='primary'
        @click='change'>
        切换语言
    </a-button>
    <hello-world msg='haha'/>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useAppStore } from '@/store/app'
import HelloWorld from './HelloWorld.vue'

const appStore = useAppStore()
const change = () => {
    const lang = appStore.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
    appStore.changeLang(lang)
    message.success('success')
}
</script>

<style scoped lang="scss">
$color: green;

.a {
    background-color: $test-color;

    @include size(100px);
}
</style>
