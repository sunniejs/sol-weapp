// pages/saveImgs/index.js
import { writePhotosAlbum } from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160008479.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160013201.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160015969.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160025498.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160031519.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160042689.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160108243.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190301160111756.jpg',
      'https://timgs.top1buyer.com/admin/special/special_img_20190304160141454.jpg'
    ],
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  // 下载图片
  downloadImgs() {
    var _this = this
    // 获取权限
    writePhotosAlbum(
      function success() {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        _this
          .queue(_this.data.list)
          .then(res => {
            wx.hideLoading()
            wx.showToast({
              title: '下载完成'
            })
          })
          .catch(err => {
            wx.hideLoading()
            console.log(err)
          })
      },
      function fail() {
        wx.showToast({
          title: '您拒绝了保存到相册'
        })
      }
    )
  },
  // 队列
  queue(urls) {
    let promise = Promise.resolve()
    urls.forEach((url, index) => {
      promise = promise.then(() => {
        return this.download(url)
      })
    })
    return promise
  },
  // 下载
  download(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: function(res) {
          var temp = res.tempFilePath
          wx.saveImageToPhotosAlbum({
            filePath: temp,
            success: function(res) {
              resolve(res)
            },
            fail: function(err) {
              reject(res)
            }
          })
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  }
})
