// pages/wheel/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    award: 1,
    mode: 2, // 旋转模式
    ready: false,
    awardList: [
      { title: '10个金币' },
      { title: '20个金币' },
      { title: '40个金币' },
      { title: '50个金币' },
      { title: '80个金币' },
      { title: '200个金币' }
    ]
  },
  onLoad: function(options) {},
  // 用户点击开始抽奖
  wheelStart() {
    // 请求玩数据之后
    this.setData({
      award: Math.floor(Math.random() * 6 + 1), //安全起见生成奖项应该由后端完成，生成1到6随机
      ready: true // 开始抽奖
    })
    console.log(this.data.award)
  },
  // 抽奖完成后操作
  wheelSuccess() {
    console.log('bind:success')
    const index = this.data.award - 1
    wx.showToast({
      title: `恭喜你获得${this.data.awardList[index].title}`,
      icon: 'none'
    })
  },
  // 切换模式
  switchMode(e) {
    const { type } = e.currentTarget.dataset
    this.setData({
      mode: type,
      ready: false
    })
  },
  /* 转发*/
  onShareAppMessage: function(ops) {
    return {
      title: '大转盘组件',
      path: '/pages/wheel/index'
    }
  }
})
