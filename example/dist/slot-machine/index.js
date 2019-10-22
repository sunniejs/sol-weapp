Component({
    externalClasses: ['sol-class'],
    properties: {
        tabs: {
            type: Array,
            value: []
        },
        current: {
            type: Number,
            value: '',
            observer(newVal) {
                // 监听当前index值，切换
                this.updated(newVal)
            }
        }
    },
    data: {
        stripHeight: 720, // 总高度
        alignmentOffset: 43, // 结果位置偏移量
        payoutStopTime: 700,
        reelSpeed1Delta: 100, // 间隔位移
        reelSpeed1Time: 0,
        positioningTime: 200, // 停止前动画时间
        bounceHeight: 200,
        winningsFormatPrefix: '',
        soundEnabled: !0,
        sounds: {},
        spinDisabled: false,
        credits: 50, //积分
        curBet: 1, // 每局消耗积分
        firstReelStopTime: 667, // 动画停止时间
        secondReelStopTime: 575,
        thirdReelStopTime: 568,
        reels: [
            {
                top: -1360,
                animation: '',
                css: ''
            },
            {
                top: -992,
                animation: '',
                css: ''
            },
            {
                top: -1116,
                animation: '',
                css: ''
            }
        ],
        timer: [],
        result: {
            reels: ['1.0', '1.0', '1.0'],
            prize: null,
            success: true,
            credits: 96,
            dayWinnings: 69,
            lifetimeWinnings: 69
        },
        numIconsPerReel: 6
    },

    /**
     * 组件的方法列表
     */
    methods: {
        spin: function() {
            const { credits, curBet, secondReelStopTime, thirdReelStopTime, firstReelStopTime, payoutStopTime, result } = this.data
            if (this.data.spinDisabled) return !1
            this.setData({
                spinDisabled: true,
                credits: credits - curBet
            })
            // 开始滚动
            this.start_reel_spin(0, 0)
            // this.start_reel_spin(1, 0)
            // this.start_reel_spin(2, 0)
            // 结束
            runAsync(firstReelStopTime).then(() => {
                this.stop_reel_spin(0, result.reels[0])
                return runAsync(secondReelStopTime)
            })
            // .then(() => {
            //     this.stop_reel_spin(1, result.reels[1])
            //     return runAsync(thirdReelStopTime)
            // })
            // .then(() => {
            //     this.stop_reel_spin(2, result.reels[2])
            //     return runAsync(payoutStopTime)
            // })
            // .then(() => {
            //     //     this.end_spin()
            // })
            // var b = function () {
            //     var a = 0
            //     setTimeout(() => {
            //         slotMachine.stop_reel_spin(1, d.reels[0])
            //     }, a);
            //     (a += slotMachine.secondReelStopTime);
            //     setTimeout(() => {
            //         slotMachine.stop_reel_spin(2, d.reels[1])
            //     }, a);
            //     (a += slotMachine.thirdReelStopTime);
            //     setTimeout(function () {
            //         slotMachine.stop_reel_spin(3, d.reels[2])
            //     }, a);
            //     (a += slotMachine.payoutStopTime);
            //     setTimeout(function () {
            //         slotMachine.end_spin(d)
            //     }, a)
            // };

            // var d = {
            //     reels: ['1.0', '1.0', '1.0'],
            //     prize: null,
            //     success: true,
            //     credits: 96,
            //     dayWinnings: 69,
            //     lifetimeWinnings: 69
            // };
            // // 第一个轮子停止滚动时间
            // console.log(firstReelStopTime)
            // setTimeout(() => {
            //     b()
            // }, firstReelStopTime)
        },
        // 开始选择动画
        start_reel_spin: function(index, b) {
            const { stripHeight, reelSpeed1Delta } = this.data
            const c = Date.now()
            const position = parseInt(-(Math.random() * stripHeight * 2))
            this.setData({
                [`reels[${index}].top`]: position
            })

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
            // d.data('spinTimer', g)
        },
        // 停止动画
        stop_reel_spin: function(index, lottery) {
            const { stripHeight, numIconsPerReel, alignmentOffset, bounceHeight, positioningTime } = this.data
            const cellHeight = stripHeight / numIconsPerReel
            const position = -stripHeight - lottery * cellHeight + alignmentOffset
            // 清除滚动timer
            clearInterval(this.data.timer[index])

            this.setData({
                [`reels[${index}].top`]: position - stripHeight
            })

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

            runAsync(positioningTime).then(() => {
                this.setData({
                    [`reels[${index}].css`]: 'bounce'
                })
            })
            // c.animate({ top: f }, 3000, 'easeOutElastic')
            // runAsync(1000).then(() => {
            //     var animation1 = wx.createAnimation({
            //         transformOrigin: '50% 50%',
            //         duration: 1000,
            //         timingFunction: 'ease',
            //         delay: 1000
            //     })
            //     animation1.translateY(-bounceHeight).step()
            //     this.setData({
            //         [`reels[${index}].animation`]: animation1.export()
            //     })
            // })
            // animation2.translateY(bounceHeight).step()
            // animation: easeInElastic .35s forwards;

            // if ((window.clearInterval(d), c.data('spinTimer', null), null != b)) {

            // const cellHeight = stripHeight / numIconsPerReel
            // const position = -stripHeight - lottery * cellHeight + alignmentOffset
            // this.setData({
            //     [`reels[${index}].top`]: position - stripHeight
            // })
            // c.css({
            //     top:
            // }).animate({
            //         top: f + slotMachine.bounceHeight
            //     },
            //     slotMachine.positioningTime,
            //     'linear',
            //     function () {
            //         c.animate({
            //             top: f
            //         }, slotMachine.bounceTime, 'easeOutElastic')
            //     }
            // )
            //  }
        }
        // this.start_reel_spin(1, secondReelStopTime)
        // this.start_reel_spin(2, secondReelStopTime + thirdReelStopTime)
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
