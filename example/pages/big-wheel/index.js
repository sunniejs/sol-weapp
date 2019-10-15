// pages/wheel/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        award: 1,
        mode: 2, // 旋转模式
        awardList: [
            { title: '10个金币' },
            { title: '20个金币' },
            { title: '30个金币' },
            { title: '50个金币' },
            { title: '80个金币' },
            { title: '200个金币' }
        ] // 顺时针对应每个奖项
    },
    onLoad: function(options) {},
    // 用户点击开始抽奖
    wheelStart() {
        // 设置奖项
        this.setData({
            award: Math.floor(Math.random() * 6 + 1) //安全起见生成奖项应该由后端完成，生成1到6随机
        })
        // 触发组件开始方法
        this.selectComponent('#sol-wheel').begin()
    },
    // 抽奖完成后操作
    wheelSuccess() {
        const index = this.data.award - 1
        console.log('bind:success', this.data.awardList[index])
        wx.showToast({
            title: `恭喜你获得${this.data.awardList[index].title}`,
            icon: 'none'
        })
    },
    // 切换模式
    switchMode(e) {
        const { type } = e.currentTarget.dataset
        this.setData({
            mode: type
        })
    },
    /* 转发*/
    onShareAppMessage: function(ops) {
        return {
            title: 'SOL-大转盘组件',
            path: '/pages/big-wheel/index'
        }
    }
})
