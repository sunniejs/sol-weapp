Page({
  data: {},
  onLoad: function(options) {
    this.init()
  },
  // 初始化红包雨
  init() {
    this.setData({
      time: 15, // 游戏时间
      readyTime:0, // 准备时间
      min: 1, // 金额最小是1
      max: 2  // 金额最大是2
    })
  }
})
