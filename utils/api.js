import request from './request.js'
// 获取九宫格翻牌信息
export function getCardTemplate(params) {
  return request({
    url: '/card/template',
    method: 'get'
  })
}
 