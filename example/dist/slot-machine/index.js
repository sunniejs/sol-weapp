/*
 * @Author: Sunnie 
 * @Date: 2021-09-06 18:42:25 
 * @Last Modified by: Sunnie
 * @Last Modified time: 2021-09-06 18:44:02
 */
Component({
    externalClasses: ['sol-class'],
    properties: {
        // 中奖结果
        result: {
            type: Array,
            value: []
        }
    },
    data: {
        credits: 50, //积分
        curBet: 1, // 每局消耗积分
        stripHeight: 720, // 总高度
        alignmentOffset: 100, // 结果位置偏移量
        reelSpeed1Delta: 100, // 间隔位移
        positioningTime: 200, // 停止前动画时间
        bounceHeight: 200, // 结束弹射动画高度
        firstReelStopTime: 667, // 第一个动画延迟停止时间
        secondReelStopTime: 575, // 第二个动画延迟停止时间
        thirdReelStopTime: 568, // 第三个动画延迟停止时间
        payoutStopTime: 1500, // 触发结束延迟时间
        numIconsPerReel: 6, // 每个轮子几个格子
        timer: [],
        reels: [
            // 轮子动画属性
            {
                top: -1345, // 初始位置
                animation: '', // 结束滚动动画
                css: '' // 反弹动画css
            },
            {
                top: -977,
                animation: '',
                css: ''
            },
            {
                top: -1101,
                animation: '',
                css: ''
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        start() {
            const { firstReelStopTime, secondReelStopTime, thirdReelStopTime, result, payoutStopTime } = this.data
            // 开始滚动
            this.start_reel_spin(0)
            this.start_reel_spin(1)
            this.start_reel_spin(2)
            // 结束
            runAsync(firstReelStopTime)
                .then(() => {
                    this.stop_reel_spin(0, result[0])
                    return runAsync(secondReelStopTime)
                })
                .then(() => {
                    this.stop_reel_spin(1, result[1])
                    return runAsync(thirdReelStopTime)
                })
                .then(() => {
                    this.stop_reel_spin(2, result[2])
                    return runAsync(payoutStopTime)
                })
                .then(() => {
                    // 完成
                    // 重置
                    this.reset_reel_spin(0)
                    this.reset_reel_spin(1)
                    this.reset_reel_spin(2)
                    this.triggerEvent('finish')
                })
        },
        // 开始动画
        start_reel_spin(index) {
            const { stripHeight, reelSpeed1Delta } = this.data
            const position = parseInt(-(Math.random() * stripHeight * 2))

            this.setData({
                [`reels[${index}].top`]: position
            })
            // 循环动画
            this.data.timer[index] = setInterval(() => {
                this.setData({
                    [`reels[${index}].top`]: this.data.reels[index].top + reelSpeed1Delta
                })
                if (this.data.reels[index].top > 0) {
                    this.setData({
                        [`reels[${index}].top`]: 2 * -stripHeight
                    })
                }
            }, 20)
        },
        // 停止动画
        stop_reel_spin(index, lottery) {
            const { stripHeight, numIconsPerReel, alignmentOffset, positioningTime, bounceHeight } = this.data
            const cellHeight = stripHeight / numIconsPerReel
            const position = -stripHeight - (lottery - 1) * cellHeight + alignmentOffset
            // 清除滚动timer
            clearInterval(this.data.timer[index])
            // 最终位置
            this.setData({
                [`reels[${index}].top`]: position - stripHeight
            })
            // 到最终位置之前的动画
            var animation = wx.createAnimation({
                transformOrigin: '50% 50%',
                duration: positioningTime,
                timingFunction: 'linear',
                delay: 0
            })
            animation.translateY(bounceHeight).step()
            this.setData({
                [`reels[${index}].animation`]: animation.export()
            })
            // 弹射动画
            runAsync(positioningTime).then(() => {
                // translateY重置成0为下次做准备
                animation.translateY(0).step({ duration: 0 })
                this.setData({
                    [`reels[${index}].animation`]: animation.export(),
                    [`reels[${index}].css`]: 'bounce'
                })
            })
        },
        // 重置动画
        reset_reel_spin(index) {
            this.setData({
                [`reels[${index}].css`]: ''
            })
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
