import type { App } from 'vue'
import 'element-plus/es/components/message/style/css'

import {
    ElButton,
    ElDatePicker,
    ElConfigProvider,
} from 'element-plus'

const components = [
    ElButton,
    ElDatePicker,
    ElConfigProvider,
]

export default function setupElement(app: App) {
    components.forEach((component) => {
        app.use(component)
    })
}
