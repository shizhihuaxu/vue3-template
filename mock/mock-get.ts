import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
    {
        url: '/api/mock/get',
        method: 'get',
        response: ({ query }) => {
            if (query) {
                return {
                    code: 200,
                    data: {
                        total: 10,
                        data: Mock.mock({
                            'array|10': [
                                {
                                    'name|+1': [
                                        'Hello',
                                        'Mock.js',
                                        '!',
                                    ],
                                },
                            ],
                        }),
                    },
                }
            }

            return {
                code: 200,
                data: {
                    total: 20,
                    data: Mock.mock({
                        'array|20': [
                            {
                                'name|+1': [
                                    'Hello',
                                    'Mock.js',
                                    '!',
                                ],
                            },
                        ],
                    }),
                },
            }
        },
    },
] as MockMethod[]
