import antd from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs/locale/zh-cn'
import pages from './pages/zh-CN'

const locales = {
    localeName: 'zhCN',
    dayjsLocaleName: 'zh-cn',
    antd,
    dayjs,

    ...pages,
}

export default {
    ...locales,
}
