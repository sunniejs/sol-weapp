Component({
    properties: {
        // 是否可以开始
        ready: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (newVal) {
                    this.start()
                }
            }
        },
        // 九宫格卡片
        card: {
            type: Array,
            value: []
        },
        // 抽奖次数
        times: {
            type: Number,
            value: 1
        },

        // 是否已开启九宫格抽奖
        sign: Boolean
    },
    data: {
        move: ''
    },
    methods: {
        start() {
            // 洗牌
            const { card } = this.data
            for (let i = 0; i < 9; i++) {
                runAsync(i * 60)
                    .then(() => {
                        card[i].isMove = true
                        this.setData({
                            card
                        })
                        return runAsync(i * 60 + 1500)
                    })
                    .then(() => {
                        card[i].isMove = false
                        this.setData({
                            card
                        })
                    })
            }
        },
        onStart() {
            // 开始动画
            const { card } = this.properties
            runAsync(100)
                .then(() => {
                    // 延迟100毫秒翻转第一排牌面
                    for (let i = 0; i < 3; i++) {
                        card[i].status = 1
                    }
                    this.setData({
                        card
                    })
                    return runAsync(200)
                })
                .then(() => {
                    // 延迟200毫秒翻转第二排牌面
                    for (let i = 3; i < 6; i++) {
                        card[i].status = 1
                    }
                    this.setData({
                        card
                    })
                    return runAsync(200)
                })
                .then(() => {
                    // 延迟200毫秒翻转第三排牌面
                    for (let i = 6; i <= 8; i++) {
                        card[i].status = 1
                    }
                    this.setData({
                        card
                    })
                    return runAsync(800)
                })
                .then(() => {
                    // 将所有背面朝上
                    for (let i = 0; i < 9; i++) {
                        card[i].status = 0
                    }
                    this.setData({
                        card
                    })
                    return runAsync(1000)
                })
                .then(() => {
                    // 洗牌动画
                    this.setData({
                        isMove: true
                    })
                    return runAsync(500)
                })
                .then(() => {
                    this.setData({
                        isMove: false,
                        sign: true // 已开启九宫格抽奖
                    })
                })
        },
        // 点击打开单个卡片，开奖
        openCard(event) {
            const { item, index } = event.currentTarget.dataset
            // 触发父组件方法
            this.triggerEvent('open', { item, index })
        }
    }
})
/**
 * runAsync 延迟返回 promise 方法
 * @param  {Number} time 延迟时间
 * @return {type}   返回Promise对象
 */
function runAsync(time) {
    return new Promise(function(resolve, reject) {
        const timer = setTimeout(function() {
            resolve()
            clearTimeout(timer)
        }, time)
    })
}
