import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import router from '@/router'
import ErrorMsg from './error-message'

export const REQUEST_TOKEN_KEY = 'Authorization'

// 创建 axios 实例
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    timeout: 6000,
})

// 异常拦截处理器
const errorHandler = (error: AxiosError): Promise<any> => {
    if (error.response) {
        const { status } = error.response
        const msg = ErrorMsg[status]

        if (status === 401 || status === 403) {
            router.push('/user/login')
        }

        if (msg) {
            ElNotification.error({
                message: msg,
            })
        }
    }

    return Promise.reject(error.response)
}

// 请求拦截器
const requestHandler = (
    config: AxiosRequestConfig,
): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    // TODO 从本地存储获取 token
    const token = 'my token'

    if (token && config?.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers[REQUEST_TOKEN_KEY] = `Bearer ${token}`
    }

    return config
}

// 响应拦截器
const responseHandler = (
    response: AxiosResponse,
): AxiosResponse<any> | Promise<any> => {
    // 处理二进制数据时返回所有响应信息
    if (response.config?.responseType === 'blob') return response

    return response.data
}

request.interceptors.request.use(requestHandler, errorHandler)
request.interceptors.response.use(responseHandler, errorHandler)

export type { AxiosResponse }
export default request
