// pages/wheel/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    award:1,
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      award: Math.floor(Math.random() * 6 + 1) // 生成1到6随机
    })
  },
  // 抽奖完成后操作
  wheelSuccess() {
    console.log('loginSuccess')
    wx.showToast({
      title: '恭喜你获得'+this.data.award+'等奖',
      icon:'none'
    })
    this.setData({
      disabled:true // 只能抽奖一次
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