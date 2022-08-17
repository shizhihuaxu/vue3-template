<template>
    <div class='a'>
        {{ $t('pages.title') }}
    </div>
    <a-date-picker />
    <a-button
        type='primary'
        @click='changeLang'>
        切换语言
    </a-button>
    <hello-world msg='haha'/>
    <a-button
        type='primary'
        @click='mockUrl'>
        mock url
    </a-button>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { useAppStore } from '@/store/app'
import request from '@/services/http/request'
import HelloWorld from './hello-world.vue'

const appStore = useAppStore()
const changeLang = () => {
    const lang = appStore.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
    appStore.changeLang(lang)
    message.success('success')
}

const mockUrl = () => {
    request.get('/api/mock/get').then((res) => {
        console.log('mock get', res)
    })
    request.post('/api/mock/post').then((res) => {
        console.log('mock post', res)
    })
}
</script>

<style scoped lang="scss">
$color: green;

.a {
    background-color: $test-color;

    @include size(100px);
}
</style>
