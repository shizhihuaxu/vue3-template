import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/api/mock/post',
        method: 'post',
        timeout: 200,
        response: {
            code: 0,
            data: {
                name: 'vben',
            },
        },
    },
] as MockMethod[]
