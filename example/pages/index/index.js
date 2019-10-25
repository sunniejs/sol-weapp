Page({
    data: {
        components: [
            {
                title: '营销组件',
                children: [
                    {
                        id: 'big-wheel',
                        url: '/pages/big-wheel/index',
                        name: '大转盘动画'
                    },
                    {
                        id: 'packet-rain',
                        url: '/pages/packet-rain/index',
                        name: '下雨动画'
                    },
                    {
                        id: 'grid-card',
                        url: '/pages/grid-card/index',
                        name: '九宫格翻牌动画'
                    },
                    {
                        id: 'slot-machine',
                        url: '/pages/slot-machine/index',
                        name: '老虎机动画'
                    }
                ]
            },
            {
                title: '业务组件',
                children: [
                    {
                        id: 'scoll-nav',
                        url: '/pages/scoll-nav/index',
                        name: '滚动导航条'
                    }
                ]
            }
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
        ]
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
