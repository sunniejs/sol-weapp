Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['sol-class'],
    options: {
        multipleSlots: true
    },
    properties: {
        // 容器高度
        icons: {
            type: Array,
            value: []
        },
        // options 需要用到的所有参数都通过options属性传递
        options: {
            type: Object,
            value: {}
        }
    },
    /**
     * 组件的初始数据
     */
ready(){
console.log(this.data.icons)
},
    data: {
        status: {
            home: {
                img: 'https://imgs.solui.cn/weapp/home-icon.png',
                content: '首页',
                showText: false
            },
             home: {
              img: 'https://imgs.solui.cn/weapp/cart-icon.png',
              content: '购物车',
              showText: false
          },
            top: {
              img: 'https://imgs.solui.cn/weapp/back-top.png',
              content: '返回顶部',
              showText: false
          }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 点击
        iconsClick(e) {
            const { type } = e.currentTarget.dataset
            switch (type) {
                case 'home':
                    this.goHome()
                    break
                case 'favorite':
                    this.goFavorite()
                    break
                case 'cart':
                    this.goShopCart()
                    break
                case 'top':
                    this.backTop()
                    break
                case 'double11':
                    this.goMainGather()
                    break
                case 'spellNumber':
                    this.goSpellOrderList()
                    break
                case 'spellGoodsList':
                    this.goSpellGoodsList()
                    break
                default:
                    // 传递type类型
                    this.triggerEvent('iconClick', type)
                    break
            }
        }
    }
})
