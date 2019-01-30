Component({
  properties: {
    // 奖区数量
    areaNumber: {
      type: Number,
      value: 6
    },
    // 速度
    speed: {
      type: Number,
      value: 16
    },
    // 中奖区域 从1开始
    awardNumer: {
      type: Number,
      value: 1
    },
    // 抽奖模式，装盘转，指针旋转
    mode: {
      type: Number,
      value: 2
    },
    // 是否可以点击
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    deg: 0,
    singleAngle: '', // 每片扇形的角度
    isStart: false
  },
  methods: {
    init() {
      let { areaNumber, singleAngle, mode } = this.data
      this.data.singleAngle = 360 / this.data.areaNumber
      this.setData({
        singleAngle: this.data.singleAngle,
        mode: this.data.mode
      })
    },
    start() {
      // 如果已经抽过奖了
      if (this.data.disabled) {
        wx.showToast({
          title: '已经抽过奖了哦',
          icon:'none'
        })
        return
      }
      let { deg, awardNumer, singleAngle, speed, isStart, mode } = this.data
      if (isStart) return
      this.data.isStart = true
      const endAddAngle = (awardNumer - 1) * singleAngle + singleAngle / 2 + 360 // 中奖角度
      const rangeAngle = (Math.floor(Math.random() * 4) + 4) * 360 // 随机旋转几圈再停止
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
    },
    reset() {
      const { mode } = this.data
      this.data.deg = 0
      this.setData({
        singleAngle: this.data.singleAngle,
        deg: 0,
        mode
      })
    }
  },

  attached() {
    this.init()
  }
})
