Page({
    data: {
        // 九宫格数据
        card: [
            {
                id: 1,
                prizeName: '10金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0 //   :0 反面 , 1 正面
            },
            {
                id: 2,
                prizeName: '10金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            },
            {
                id: 3,
                prizeName: '100金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            },
            {
                id: 4,
                prizeName: '10金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            },
            {
                id: 5,
                prizeName: '40金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            },
            {
                id: 6,
                prizeName: '20金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            },
            {
                id: 7,
                prizeName: '50金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            },
            {
                id: 8,
                prizeName: '60金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            },
            {
                id: 9,
                prizeName: '10金币',
                img: 'https://gitee.com/sunniejs/sol-weapp/raw/master/prize.png',
                status: 0
            }
        ],
        ready: false // 是否点击开始抽奖
    },
    onLoad: function(options) {},
    /**
     * 点击开始抽奖
     */
    start() {
        if (this.data.ready) {
            wx.showToast({
                title: `已经开启抽奖`,
                icon: 'none'
            })
            return
        }
        // 触发组件开始方法
        this.selectComponent('#sol-grid-card').start(() => {
            // 动画结束后可以点击
            this.setData({
                ready: true 
            })
        })
    },

    // 子组件触发，点击打开单个卡片奖品
    openCard(e) {
        const { item, index } = e.detail
        // 动画没有结束，或已经点开
        if (!this.data.ready || item.status == 1) {
            return
        }
        // 改变卡片翻转状态 status :0 反面 , 1 正面
        this.setData({
            [`card[${index}].status`]: 1
        })
        wx.showToast({
            title: `你点击了第${index + 1}个`,
            icon: 'none'
        })
        // 为了防止作弊，洗牌动画并不能打乱奖品数据顺序，抽出什么奖项通过再次访问接口获得
    },
    /* 转发*/
    onShareAppMessage: function(ops) {
        return {
            title: 'SOL-九宫格翻牌',
            path: '/pages/grid-card/index'
        }
    }
})
