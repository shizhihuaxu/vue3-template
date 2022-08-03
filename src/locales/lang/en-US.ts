import antd from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs/locale/eu'
import pages from './pages/en-US'

const locales = {
    localeName: 'enUS',
    dayjsLocaleName: 'eu',
    antd,
    dayjs,

    ...pages,
}

export default locales
