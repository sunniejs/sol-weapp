import request from './request.js'
// 获取九宫格翻牌信息
export function getCardTemplate(params) {
    return request({
        url: '/card/template',
        method: 'get'
    })
}

// 线下特卖查询商品
export function getOfflinePrice(params) {
    return request({
        url: 'https://rest.flamia.net/rest/items/get',
        method: 'get',
        data: params
    })
}
