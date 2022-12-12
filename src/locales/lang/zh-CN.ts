import elementPlus from 'element-plus/es/locale/lang/zh-cn'
import dayjs from 'dayjs/locale/zh-cn'
import pages from './pages/zh-CN'

const locales = {
    localeName: 'zhCN',
    dayjsLocaleName: 'zh-cn',
    elementPlus,
    dayjs,

    ...pages,
}

export default {
    ...locales,
}
