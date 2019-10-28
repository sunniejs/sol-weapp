Page({
    data: {
        endDate: '2019/10/25 17:20:00',
        components: [
            {
                title: '营销组件',
                children: [
                    {
                        id: 'big-wheel',
                        url: '/pages/big-wheel/index',
                        name: '大转盘动画',
                        show: true
                    },
                    {
                        id: 'packet-rain',
                        url: '/pages/packet-rain/index',
                        name: '红包雨动画',
                        show: true
                    },
                    {
                        id: 'grid-card',
                        url: '/pages/grid-card/index',
                        name: '九宫格翻牌动画',
                        show: true
                    },
                    {
                        id: 'slot-machine',
                        url: '/pages/slot-machine/index',
                        name: '老虎机动画',
                        show: true
                    }
                ]
            },
            {
                title: '业务组件',
                children: [
                    {
                        id: 'scoll-nav',
                        url: '/pages/scoll-nav/index',
                        name: '滚动导航条',
                        show: true
                    }
                ]
            },
            {
                title: '页面demo',
                children: [
                    // {
                    //     id: 'filter',
                    //     url: '/pages/filter/index',
                    //     name: '筛选'
                    // },
                    {
                        id: 'save-imgs',
                        url: '/pages/save-imgs/index',
                        name: '保存多张图片',
                        show: true
                    }
                ]
            }
        ]
    },
    onShow() {
        var myDate = new Date().getTime()
        var endData = new Date(this.data.endDate).getTime()

        if (endData - myDate < 0) {
            for (let i = 0; i < this.data.components[0].children.length; i++) {
                this.setData({
                    [`components[0].children[${i}].show`]: true
                })
            }
        }
    },

    /* 转发*/
    onShareAppMessage: function(ops) {
        return {
            title: 'sol-weapp营销组件',
            path: '/pages/index/index',
            imageUrl: '../../assets/qrcode.jpg'
        }
    }
})
