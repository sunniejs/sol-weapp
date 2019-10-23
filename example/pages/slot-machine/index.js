// pages/slot-machine/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        spinDisabled: false,
        result: [] // 中奖池
    },

    // 开始
    start() {
        const { spinDisabled } = this.data
        // 点击开始后不可点击
        if (spinDisabled) return false
        // 随机设置奖项 该数据应该从后台接口获取
        let result = []
        for (var i = 0; i < 3; i++) {
            result.push(Math.floor(Math.random() * 6 + 1))
        }
        this.setData({ spinDisabled: true, result: result })
        // 触发组件开始方法
        this.selectComponent('#sol-slot-machine').start()
    },
    // 结束
    doFinish() {
        console.log('当前项=', this.data.result)
        wx.showToast({
            title: '恭喜你获奖了',
            icon: 'none'
        })
        this.setData({
            spinDisabled: false
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: 'SOL-老虎机',
            path: '/pages/slot-machine/index'
        }
    }
})
