Page({
    data: {
        // 九宫格奖项
        card: [
            {
                id: 1,
                prizeName: '一等奖',
                img: './image/prize.png',
                status: 0 //   :0 反面 , 1 正面
            },
            {
                id: 2,
                prizeName: '二等奖',
                img: './image/prize.png',
                status: 0
            },
            {
                id: 3,
                prizeName: '三等奖',
                img: './image/prize.png',
                status: 0
            },
            {
                id: 4,
                prizeName: '四等奖',
                img: './image/prize.png',
                status: 0
            },
            {
                id: 5,
                prizeName: '五等奖',
                img: './image/prize.png',
                status: 0
            },
            {
                id: 6,
                prizeName: '六等奖',
                img: './image/prize.png',
                status: 0
            },
            {
                id: 7,
                prizeName: '七等奖',
                img: './image/prize.png',
                status: 0
            },
            {
                id: 8,
                prizeName: '八等奖',
                img: './image/prize.png',
                status: 0
            },
            {
                id: 9,
                prizeName: '九等奖',
                img: './image/prize.png',
                status: 0
            }
        ],
        ready: false // 是否点击开始抽奖
    },
    onLoad: function(options) {
        // 获取卡片数据模板
        // this.fetchData()
    },
    /**
     * 点击开始抽奖
     */
    start() {
        // 触发组件方法
        this.selectComponent('#sol-grid-card').start()
        this.setData({
            ready: true
        })
    },

    // 子组件触发，点击打开单个卡片奖品
    openCard(e) {
        if (!this.data.ready) {
            wx.showToast({
                title: '请先点击开始抽奖',
                icon: 'none'
            })
            return
        }
        const { item, index } = e.detail
        // 为了防止作弊，洗牌动画并不能打乱奖品数据顺序，抽出什么奖项通过再次访问接口获得
        // 改变卡片翻转状态 status :0 反面 , 1 正面
        this.setData({
            [`card[${index}].status`]: 1
        })
        // 请求接口记录用户获得的奖项
    }
})
