Page({
    data: {
        visible: false
    },
    onLoad: function(options) {
        this.setData({
          visible: true,
          createSpeed:5, // 速度
          time: 15, // 游戏时间
          readyTime: 3, // 准备时间
          min: 0, // 金币最小是0
          max: 10 // 金币最大是10
      })
    },
    // 结束
    success() {
        console.log('bind:finish')
        this.setData({
            visible: false //  隐藏界面
        })
    },
    onShareAppMessage: function(ops) {
        return {
            title: 'sol-红包雨',
            path: '/pages/packet-rain/index'
        }
    }
})
