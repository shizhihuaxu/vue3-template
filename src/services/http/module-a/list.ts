import request from '@http/request'

const API = {
    LISTS: '/lists',
}

// 获取列表
export async function getList(
    params?: Record<string, any>,
): Promise<any> {
    return request.get(API.LISTS, {
        params,
    })
}
