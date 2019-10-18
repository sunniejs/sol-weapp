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
        stripHeight: 720,
        alignmentOffset: 86, // 结果位置偏移量
        payoutStopTime: 700,
        reelSpeedDifference: 0,
        reelSpeed1Delta: 100,
        reelSpeed1Time: 0,
        reelSpeed2Delta: 100,
        positioningTime: 200,
        bounceHeight: 200,
        bounceTime: 1e3,
        winningsFormatPrefix: '',
        soundEnabled: !0,
        sounds: {},
        spinDisabled: false,
        credits: 50, //积分
        curBet: 1, // 每局消耗积分
        firstReelStopTime:  667, // 动画停止时间
        secondReelStopTime: 575,
        thirdReelStopTime: 568,
        reels: [{ top: null }, { top: null }, { top: null }],
        timer: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        spin: function() {
            const { credits, curBet, secondReelStopTime, thirdReelStopTime ,firstReelStopTime} = this.data
            if (this.data.spinDisabled) return !1
            this.setData({
                spinDisabled: true,
                credits: credits - curBet
            })
            this.start_reel_spin(0, 0)
            this.start_reel_spin(1, 0)
            this.start_reel_spin(2, 0)
            var b = function() {
              var a = 0
              window.setTimeout(function() {
                slotMachine._stop_reel_spin(1, d.reels[0])
              }, a);
                (a += slotMachine.secondReelStopTime);
                window.setTimeout(function() {
                  slotMachine._stop_reel_spin(2, d.reels[1])
                }, a);
                (a += slotMachine.thirdReelStopTime);
                window.setTimeout(function() {
                  slotMachine._stop_reel_spin(3, d.reels[2])
                }, a);
                (a += slotMachine.payoutStopTime);
                window.setTimeout(function() {
                  slotMachine.end_spin(d)
                }, a)
            };
            c = !1;
            d = { reels: ['1.0', '1.0', '1.0'], prize: null, success: true, credits: 96, dayWinnings: 69, lifetimeWinnings: 69 };
           // 第一个轮子停止滚动时间
              setTimeout( () =>{
                b()
            }, firstReelStopTime)
          },
            // this.start_reel_spin(1, secondReelStopTime)
            // this.start_reel_spin(2, secondReelStopTime + thirdReelStopTime)
        },
        // 开始选择动画
        start_reel_spin: function(index, b) {
            const { stripHeight, reelSpeed1Delta } = this.data
            const c = Date.now()
            const position = parseInt(-(Math.random() * stripHeight * 2))
            this.setData({
                [`reels[${index}].top`]: position
            })

            // var f = function() {
            //     // ;(e += Date.now() < c + slotMachine.reelSpeed1Time + b ? slotMachine.reelSpeed1Delta : slotMachine.reelSpeed2Delta),
            //     //     (e += a * slotMachine.reelSpeedDifference),
            //     //     e > 0 && (e = 2 * -slotMachine.stripHeight)
            // }
            //   console.log(index)
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
        stop_reel_spin: function(a, b) {
            var c = $('#reel' + a),
                d = c.data('spinTimer')
            if ((window.clearInterval(d), c.data('spinTimer', null), null != b)) {
                var e = slotMachine.stripHeight / window.numIconsPerReel,
                    f = -slotMachine.stripHeight - (b - 1) * e + slotMachine.alignmentOffset
                c.css({ top: f - slotMachine.stripHeight }).animate(
                    { top: f + slotMachine.bounceHeight },
                    slotMachine.positioningTime,
                    'linear',
                    function() {
                        c.animate({ top: f }, slotMachine.bounceTime, 'easeOutElastic')
                    }
                )
            }
        }
    }
})
