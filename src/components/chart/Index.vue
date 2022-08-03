<template>
    <div ref='chartDom' />
</template>

<script setup lang="ts">
import {
    onMounted, onUnmounted, ref, watch,
} from 'vue'
import { debounce } from 'lodash-es'
import { addListener, removeListener } from 'resize-detector'
import echarts from './echarts'

const props = defineProps({
    option: {
        type: Object,
        default: () => ({}),
    },
})

// 类型声明写法
// const props = withDefaults(defineProps<{
//   id: string | number
//   visible: boolean,
// }>(), {
//     id: '',
//     visible: true,
// })

const chartDom = ref<HTMLDivElement | null>(null)

type ECharts = ReturnType<typeof echarts.init>
let chart: ECharts | null = null

const resizeChart = () => {
    chart?.resize()
}

const resize = debounce(resizeChart, 300)

const disposeChart = () => {
    if (chartDom.value) {
        removeListener(chartDom.value, resize)
    }
    chart?.dispose()
    chart = null
}

const initChart = () => {
    disposeChart()
    if (chartDom.value) {
        chart = echarts.init(chartDom.value)
        chart.setOption(props.option)
        addListener(chartDom.value, resize)
    }
}

onMounted(() => {
    watch(
        () => props.option,
        () => {
            chart?.setOption(props.option)
        },
        { deep: true, flush: 'post' },
    )
    initChart()
})

onUnmounted(() => {
    disposeChart()
})
</script>
