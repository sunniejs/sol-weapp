// pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   // 图片点击放大 
   previewImg: function (e) {
    var src = e.currentTarget.dataset.src;
    var imgList = [src] 
    //图片预览
    wx.previewImage({
      current: src,  
      urls: imgList  
    })
  },
  copy: function () {
    wx.setClipboardData({
      data: ' https://github.com/sunniejs/sol-weapp/',
      success: function (res) {
        wx.showToast({ title: '复制成功', icon: 'none' })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})