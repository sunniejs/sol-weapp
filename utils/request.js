import { baseURL } from './config.js'
export default function request(options) {
  // 如果没有http那么使用baseURL+ options.url
  let requestURL = options.url
  if (!/^http/.test(options.url)) {
    requestURL = `${baseURL}${options.url}`
  }
  return new Promise((resolve, reject) => {
    wx.request({
      //后台请求
      url: requestURL,
      method: options.method,
       data: options.data,
       header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
      success: function(response) {
        const res = response.data
        if (res.status !== 200) {
          reject(res || _responseFail)
        } else {
          resolve(res === undefined ? {} : res)
        }
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

const _responseFail = {
  status: -1,
  info: '服务器繁忙，请稍后重试'
}
