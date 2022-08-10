import type { App } from 'vue'
import 'ant-design-vue/dist/antd.less'

import {
    // common
    Button,
    Typography,
    // layout
    Layout,
    Row,
    Col,
    Space,
    Divider,
    // nav
    Dropdown,
    Menu,
    Steps,
    PageHeader,
    // input
    Form,
    AutoComplete,
    Select,
    Checkbox,
    Radio,
    Input,
    InputNumber,
    DatePicker,
    TimePicker,
    Switch,
    Slider,
    Upload,
    // data show
    Card,
    Avatar,
    Badge,
    Empty,
    Popover,
    List,
    Tabs,
    Table,
    Tag,
    Tooltip,
    Statistic,
    Descriptions,
    // feedback
    Alert,
    Drawer,
    Modal,
    Popconfirm,
    Result,
    Spin,
    Progress,
    // other
    ConfigProvider,
} from 'ant-design-vue'

const components = [
// common
    Button,
    Typography,
    // layout
    Layout,
    Row,
    Col,
    Space,
    Divider,
    // nav
    Dropdown,
    Menu,
    Steps,
    PageHeader,
    // input
    Form,
    AutoComplete,
    Select,
    Checkbox,
    Radio,
    Input,
    InputNumber,
    DatePicker,
    TimePicker,
    Switch,
    Slider,
    Upload,
    // data show
    Card,
    Avatar,
    Badge,
    Empty,
    Popover,
    List,
    Tabs,
    Table,
    Tag,
    Tooltip,
    Statistic,
    Descriptions,
    // feedback
    Alert,
    Drawer,
    Modal,
    Popconfirm,
    Result,
    Spin,
    Progress,
    // other
    ConfigProvider,
]

export default function setupAtnd(app: App) {
    components.forEach((component) => {
        app.use(component)
    })
}
