Page({
  data: {
    visible: true,
    time: 15,
    readyTime: 3,
    min: 1,
    max: 5
  },
  onLoad: function(options) {
    this.init()
  },
  // 初始化红包雨
  init() {
    this.setData({
      time: 15, // 游戏时间
      readyTime:3, // 准备时间
      min: 1, // 金额最小是1
      max: 5 // 金额最大是5
    })
  },
  // 结束
  doFinish() {
    this.setData({
      visible: false //  隐藏界面
    })
  }
})
