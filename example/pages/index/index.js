Page({
    data: {
        endDate: "2023/01/17 14:00:00",
        components: [
            {
                title: "营销组件",
                children: [
                    {
                        id: "big-wheel",
                        url: "/pages/big-wheel/index",
                        name: "大转盘动画",
                        show: true,
                    },
                    {
                        id: "packet-rain",
                        url: "/pages/packet-rain/index",
                        name: "红包雨动画",
                        show: false,
                    },
                    {
                        id: "grid-card",
                        url: "/pages/grid-card/index",
                        name: "九宫格翻牌动画",
                        show: true,
                    },
                    {
                        id: "slot-machine",
                        url: "/pages/slot-machine/index",
                        name: "老虎机动画",
                        show: false,
                    },
                ],
            },
            {
                title: "业务组件",
                children: [
                    {
                        id: "scoll-nav",
                        url: "/pages/scoll-nav/index",
                        name: "滚动导航条",
                        show: false,
                    },
                    {
                        id: "share-sheet",
                        url: "/pages/painter/index",
                        name: "微信分享组件(转发好友/分享图)",
                        show: false,
                    },
                    {
                        id: "xuanfu",
                        url: "/pages/float-icon/index",
                        name: "悬浮按钮",
                        show: true,
                    },
                ],
            },
            {
                title: "简单组件",
                children: [
                    {
                        id: "shuzi",
                        url: "/pages/animate-number/index",
                        name: "滚动数字",
                        show: true,
                    },
                ],
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
        icons: ["home", "cart"],
    },
    onShow() {
        var myDate = new Date().getTime();
        var endData = new Date(this.data.endDate).getTime();

        if (endData - myDate < 0) {
            for (let i = 0; i < this.data.components.length; i++) {
                for (
                    let j = 0;
                    j < this.data.components[i].children.length;
                    j++
                ) {
                    this.setData({
                        [`components[${i}].children[${j}].show`]: true,
                    });
                }
            }
        }
        // 广告
        this.add();
    },
    add() {
        // 在页面中定义插屏广告
        let interstitialAd = null;

        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: "adunit-ac5a2e554ba363d2",
            });
            interstitialAd.onLoad(() => {});
            interstitialAd.onError((err) => {});
            interstitialAd.onClose(() => {});
        }

        // 在适合的场景显示插屏广告
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
                console.error(err);
            });
        }
    },

    /* 转发*/
    onShareAppMessage: function (ops) {
        return {
            title: "sol-weapp营销组件",
            path: "/pages/index/index",
            imageUrl: "https://gitee.com/sunniejs/sol-weapp/raw/master/qrcode.jpg",
        };
    },
});
