Page({
    data: {
        times: 2,
        // 九宫格奖项
        card: [
            {
                id: 1,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0 //   :0 反面 , 1 正面
            },
            {
                id: 2,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            },
            {
                id: 3,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            },
            {
                id: 4,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            },
            {
                id: 5,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            },
            {
                id: 6,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            },
            {
                id: 7,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            },
            {
                id: 8,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            },
            {
                id: 9,
                prizeName: '金币',
                img: 'https://timgs.top1buyer.com/admin/marketing/gridcard_img_20190121140854599.png',
                status: 0
            }
        ],
        loading: true
    },
    onLoad: function(options) {
        // 获取卡片数据模板
        // this.fetchData()
        wx.request({
            url: 'https://rest.flamia.net/rest/items/get', //仅为示例，并非真实的接口地址
            data: {
                code: '12345'
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data)
            }
        })
    },
    /**
     * 点击开始抽奖
     */
    start() {
        // 触发组件方法
        this.selectComponent('#sol-grid-card').start()
    },

    // 子组件触发，点击打开单个卡片奖品
    openCard(e) {
        const { item, index } = e.detail
        // 改变卡片翻转状态 status :0 反面 , 1 正面
        this.setData({
            [`card[${index}].status`]: 1
        })
        // 请求接口记录用户获得的奖项
    }
})
