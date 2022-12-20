<template>
    <div class='a'>
        {{ $t('pages.title') }}
    </div>
    <el-date-picker />
    <el-button
        type='primary'
        @click='changeLang'>
        切换语言
    </el-button>
    <hello-world msg='haha'/>
    <el-button
        type='primary'
        @click='mockUrl'>
        mock url
    </el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import request from '@/services/http/request'
import { ElMessage } from 'element-plus'
import HelloWorld from './hello-world.vue'

const router = useRouter()
const appStore = useAppStore()
const changeLang = () => {
    ElMessage.error('准备切换')
    const lang = appStore.lang === 'zh-CN' ? 'en-US' : 'zh-CN'
    appStore.changeLang(lang).then(() => {
        router.go(0) // reload page
    })
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
.a {
    background-color: global.$test-color;

    @include global.size(100px);
}
</style>
