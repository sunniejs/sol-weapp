Page({
    data: {
        endDate: '2019/11/21 09:00:00',
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
                        show: false
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
                        show: false
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
                    },
                    {
                      id: 'share-sheet',
                      url: '/pages/share-sheet/index',
                      name: '微信分享组件(转发好友/分享图)',
                      show: false
                    },
                    {
                      id: 'float-icon',
                      url: '/pages/float-icon/index',
                      name: '悬浮按钮',
                      show: false
                    }
                ]
            },
            // {
            //     title: '页面demo',
            //     children: [
            //         {
            //             id: 'filter',
            //             url: '/pages/filter/index',
            //             name: '筛选'
            //         },
            //         {
            //             id: 'saveImgs',
            //             url: '/pages/saveImgs/index',
            //             name: '保存多张图片'
            //         }
            //     ]
            // }
        ],
        icons:['home','cart']
    },
    onShow() {
        var myDate = new Date().getTime()
        var endData = new Date(this.data.endDate).getTime()
        
        if (endData - myDate < 0) {
            for (let i = 0; i < this.data.components.length; i++) {
              for (let j = 0; j< this.data.components[i].children.length; j++) {
                this.setData({
                  [`components[${i}].children[${j}].show`]: true
                })
              }
            }
        }
    },

    /* 转发*/
    onShareAppMessage: function(ops) {
        return {
            title: 'sol-weapp营销组件',
            path: '/pages/index/index',
            imageUrl: 'https://imgs.solui.cn/weapp/qrcode.jpg'
        }
    }
})
