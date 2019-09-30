const App = getApp()
// /**
//  *  获取权限
//  */
function downloadSaveFiles(obj) {
  let that = this
  let success = obj.success //下载成功
  let fail = obj.fail //下载失败
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        // 如果没有写入权限，则获取写入相册权限
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            // 用户已经同意小程序使用保存相册功能
            downloadSaveImgs(obj)
          },
          fail() {
            // 用户拒绝授权
            wx.showModal({
              content: '检测到您没打开头号买手的相册权限，是否去设置打开？',
              confirmText: '确认',
              cancelText: '取消',
              success: function(res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: res => {}
                  })
                }
              }
            })
          }
        })
      } else {
        // 已经授权过直接保存
        downloadSaveImgs(obj)
      }
    },
    fail(e) {
      if (fail) {
        fail(e)
      }
    }
  })
}
/**
   * 多文件下载并且保存，强制规定，必须所有文件下载成功才算返回成功
   */
function downloadSaveImgs(obj) {
  let that = this
  let success = obj.success //下载成功
  let fail = obj.fail //下载失败
  let urls = obj.urls //下载地址 数组，支持多个 url下载 [url1,url2]
  var count = urls.length
  var imageList = []
  wx.showLoading({
    title: '图片下载中',
    mask: true
  })
  //  Promise 数组
  for (let i = 0; i < urls.length; i++) {
    imageList.push(getTempPath(urls[i]))
  }
  Promise.all(imageList)
    .then(res => {
      if (success) {
        success(res)
      }
    })
    .catch(err => {
      console.log(err)
    })
}
// Promise 顺序执行
function PromiseForEach(arr, cb) {
  let realResult = []
  let result = Promise.resolve()
  arr.forEach((a, index) => {
    result = result.then(() => {
      return cb(a).then(res => {
        realResult.push(res)
      })
    })
  })
  return result.then(() => {
    return realResult
  })
}
// 保存到相册
function saveImageToAlbum(temps) {
 return PromiseForEach(temps, url => {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        filePath: url,
        success: function(res) {
          return resolve(res)
        },
        fail: function(err) {
          console.log(err)
        }
      })
    })
  })
   
}
//下载内容
function getTempPath(str) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: str,
      success: function(res) {
        var temp = res.tempFilePath
        resolve(temp)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  downloadSaveFiles: downloadSaveFiles,
  saveImageToAlbum: saveImageToAlbum
}
