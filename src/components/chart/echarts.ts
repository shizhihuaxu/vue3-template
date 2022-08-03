// 按需引入图表
import * as echarts from 'echarts/core'

import {
    GridComponent,
    LegendComponent,
    LegendScrollComponent,
    TooltipComponent,
    TitleComponent,
    DataZoomComponent,
    SingleAxisComponent,
    PolarComponent,
    GeoComponent, // 地图地理位置
} from 'echarts/components'

import {
    BarChart,
    LineChart,
    PieChart,
    GraphChart,
    TreeChart,
    TreemapChart,
    SankeyChart,
    ScatterChart,
    MapChart, // 地图
    LinesChart, // 地图连线效果
    EffectScatterChart, // 地图上的点效果
} from 'echarts/charts'

// 注意，新的接口中默认不再包含 Canvas 渲染器，需要显示引入，如果需要使用 SVG 渲染模式则使用 SVGRenderer
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    // 基础组件
    GridComponent,
    LegendComponent,
    LegendScrollComponent,
    TooltipComponent,
    TitleComponent,
    DataZoomComponent,
    SingleAxisComponent,
    PolarComponent,
    // 基础图表
    BarChart,
    LineChart,
    PieChart,
    GraphChart,
    TreeChart,
    TreemapChart,
    SankeyChart,
    ScatterChart,
    // 地图相关
    GeoComponent,
    MapChart,
    LinesChart,
    EffectScatterChart,
    // 渲染器
    CanvasRenderer,
])

export default echarts
