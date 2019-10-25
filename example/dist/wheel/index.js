Component({
    externalClasses: ['sol-class'],
    properties: {
        // 划分区域
        areaNumber: {
            type: Number,
            value: 6
        },
        // 中奖区域 从1开始
        awardNumer: {
            type: Number,
            value: 1
        },
        // 速度
        speed: {
            type: Number,
            value: 16
        },
        //模式:1:盘转,2:指针旋转
        mode: {
            type: Number,
            value: 2,
            observer(newVal, oldVal) {
                // 切换模式的时候重置
                this.setData({
                    deg: 0
                })
            }
        }
    },
    data: {
        deg: 0,
        singleAngle: '', // 每片扇形的角度
        isStart: false
    },
    methods: {
        init() {
            let { areaNumber } = this.data
            const singleAngle = 360 / areaNumber
            this.setData({
                singleAngle: singleAngle
            })
        },
        // 点击开始
        start() {
            this.triggerEvent('start')
        },
        // 点击开始
        begin() {
            let { deg, awardNumer, singleAngle, speed, isStart, mode } = this.data
            if (isStart) return
            this.data.isStart = true
            let endAddAngle = 0
            if (mode == 2) {
                endAddAngle = 360 - ((awardNumer - 1) * singleAngle + singleAngle / 2) // 中奖角度
            } else {
                endAddAngle = (awardNumer - 1) * singleAngle + singleAngle / 2 + 360 // 中奖角度
            }
            const rangeAngle = (Math.floor(Math.random() * 4) + 4) * 360 // 随机旋转几圈再停止
            console.log(endAddAngle)
            let cAngle
            deg = 0
            this.timer = setInterval(() => {
                if (deg < rangeAngle) {
                    deg += speed
                } else {
                    cAngle = (endAddAngle + rangeAngle - deg) / speed
                    cAngle = cAngle > speed ? speed : cAngle < 1 ? 1 : cAngle
                    deg += cAngle
                    if (deg >= endAddAngle + rangeAngle) {
                        deg = endAddAngle + rangeAngle
                        this.data.isStart = false
                        clearInterval(this.timer)
                        this.triggerEvent('success')
                    }
                }
                this.setData({
                    singleAngle,
                    deg,
                    mode
                })
            }, 1000 / 60)
        }
    },

    attached() {
        this.init()
    }
})
