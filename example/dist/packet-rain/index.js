// components/s-packetrain/index.js
import cax from './cax/index.js'
const info = wx.getSystemInfoSync()
const innerAudioContext = wx.createInnerAudioContext()
let shapeArray = []
Component({
  externalClasses: ['sol-class'],
  properties: {
    // 是否开始展示游戏
    visible: {
      type: Boolean,
      value: false
    },
    // 红包发放模式:1:红包总金额有上限,2:红包金额无上限
    mode: {
      type: Number,
      value: '1'
    },
    // 初始速度
    createSpeed: {
      type: Number,
      value: 400
    },
    // 游戏时间单位秒
    time: {
      type: Number,
      value: 15
    },
    // 倒计时单位秒
    readyTime: {
      type: Number,
      value: 5
    },
    // 金币、金额上限
    total: {
      type: Number,
      value: 100
    },
    // 红包个数
    number: {
      type: Number,
      value: 10
    },
    // 单个最小金额
    min: {
      type: Number,
      value: 0
    },
    // 单个最大金额
    max: {
      type: Number,
      value: 3
    },
    // 金额小数位
    decimal: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    score: 0, // 总分数
    showScore: 0,
    showChangeScore: 0,
    gameTimer: '', // 游戏Timer
    createPacketTimer: '', // 创建红包Timer
    packetMoveDownTimer: '', // 红包下落Timer
    readyRainTimer: null, // 准备时间Timer
    readyVisible: true, // 显示准备倒计时
    isGameOver: false,
    packetArr: []
  },
  ready() {
    // 开始
    this.start()
  },
  methods: {
    // 倒计时开始
    start() {
      let that = this
      this.data.readyRainTimer = setInterval(function() {
        if (that.data.readyTime == 0) {
          // 清除准备倒计时
          clearInterval(that.data.readyRainTimer)
          that.setData({
            readyVisible: false
          })
          // 开始红包雨
          that.play()
        } else {
          that.data.readyTime -= 1
          that.setData({
            readyTime: that.data.readyTime
          })
        }
      }, 1000)
    },
    // 游戏开始
    play() {
      const bgStage = new cax.Stage(info.windowWidth, info.windowHeight, 'myCanvas', this)
      // 创建红包
      this.createPacket(bgStage)
      // 红包下落
      this.packetMoveDown(bgStage)
      //倒计时关闭
      this.stopRain(bgStage)
      this.audioOfClick()
    },
    audioOfClick() {
      innerAudioContext.autoplay = false
      innerAudioContext.src = '/assets/dianji.mp3'
      innerAudioContext.onPlay(() => {})
      innerAudioContext.onError(res => {})
    },
    // 创建红包
    createPacket(bgStage) {
      const that = this
      let indexNum = 0
      let n = 0
      const { total, number, max, min, time, mode, createSpeed } = this.data
      // 红包总金额有上限,我上限必须设置createSpeed
      if (mode == 1) {
        n = (time * 1000) / number
        // 产生一组随机金额
        this.data.packetArr = this.randomRedPacketGenerator(number, total, min, max)
      } else {
        n = createSpeed
      }
      // 每 n 毫秒创建一个，n为 this.data.createSpeed
      this.data.createPacketTimer = setInterval(function() {
        let redCardName = 'redCard' + String(indexNum)
        // 创建红包
        that.createShape(bgStage, redCardName, indexNum)
        indexNum++
      }, n)
    },
    //创建红包shape
    createShape(newStage, newName, index) {
      //创建随机位置
      let that = this
      let ranNum = Math.random() * (info.windowWidth - 80)
      // 红包背景
      newName = new cax.Bitmap('/assets/images/rdc.png')

      // 旋转角度
      let angle = Math.random() * 90 - 45
      newName.rotation = angle
      // 随机大小缩放0.4~0.5
      newName.scaleX = newName.scaleY = (Math.random() * 10 + 40) / 100
      // x轴随机位置
      newName.x = ranNum
      // y轴-50
      newName.y = -50
      // 绑定 touchstart触摸事件
      newName.on('touchstart', () => {
        // 查询元素在数组中的索引值
        Array.prototype.indexValue = function(arr) {
          for (let i = 0; i < this.length; i++) {
            if (this[i] == arr) {
              return i
            }
          }
        }
        // 获取索引值
        let shapeIndex = shapeArray.indexValue(newName)
        // 从数组中删除
        shapeArray.splice(shapeIndex, 1)
        // 销毁
        newName.destroy()
        // 动态显示分数
        that.animationOfScore()
        innerAudioContext.play()
        // 随机产生红包金额 最小到最大值之间的金额数
        let changeOfScore = 0
        if (this.data.mode == 1) {
          changeOfScore = parseFloat(this.data.packetArr[index])
        } else {
          changeOfScore = parseFloat(Math.random() * this.data.max + this.data.min)
        }
        // 当前总金额
        let nowScore = that.data.score + changeOfScore
        that.setData({
          score: nowScore,
          showScore: nowScore.toFixed(this.data.decimal),
          showChangeScore: changeOfScore.toFixed(this.data.decimal)
        })
      })

      newStage.add(newName)
      //将创建的红包shape都放入数组中
      shapeArray.push(newName)
    },

    //分数动画
    animationOfScore() {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      })
      this.animation = animation
      animation.opacity(1).step()
      setTimeout(
        function() {
          animation.opacity(0).step()
          this.setData({
            animationData: animation.export()
          })
        }.bind(this),
        10
      )
    },
    // 红包下落
    packetMoveDown(bgStage) {
      let that = this
      this.data.packetMoveDownTimer = setInterval(function() {
        shapeArray.forEach(function(value, i) {
          value.y = value.y + 3
          if (value.y > info.windowHeight) {
            bgStage.remove(value)
            shapeArray.splice(i, 1)
          }
        })
        bgStage.update()
      }, 10)
    },
    //开启一个倒计时关闭下红包雨
    stopRain(bgStage) {
      let that = this
      // 不停地调用函数，直到 clearInterval()
      this.data.gameTimer = setInterval(function() {
        let nowTime = that.data.time - 1
        // 时间为0的时候结束
        if (nowTime == 0) {
          that.rainOver(bgStage)
        }

        that.setData({
          time: nowTime
        })
      }, 1000)
    },
    //关闭下红包雨（rainOver）
    rainOver(bgStage) {
      // 结束后清除
      clearInterval(this.data.createPacketTimer)
      clearInterval(this.data.packetMoveDownTimer)
      clearInterval(this.data.gameTimer)
      shapeArray.forEach(function(value, i) {
        value.destroy()
        bgStage.update()
      })
      this.setData({
        isGameOver: true
      })
    },
    // 点击我知道了
    finish() {
      this.triggerEvent('finish')
    },
    // 查看规则
    checkrule() {},
    // 打乱
    shuffle_pick(arr) {
      const arr2 = []
      for (let len = arr.length; len > 0; ) {
        let rnd = Math.floor(Math.random() * len)
        arr2.push(arr[rnd])
        arr[rnd] = arr[--len]
      }
      return arr2
    },
    // 生成红包
    randomRedPacketGenerator(num, total, min, max) {
      if (min * num > total || max * num < total) {
        throw Error(`没法满足最最少 ${min} 最大 ${max} 的条件`)
      }
      var rnds = [],
        randNum,
        _max,
        _min
      for (var i = num; i >= 1; i--) {
        _min = total - max * (i - 1) > min ? total - max * (i - 1) : min
        _max = total - min * (i - 1) < max ? total - min * (i - 1) : max
        randNum = parseFloat(Math.random() * (_max - _min) + _min).toFixed(this.data.decimal)
        total = parseFloat(total - randNum)
        rnds.push(randNum)
      }
      let result = []
      result = this.shuffle_pick(rnds)
      return result
    }
  }
})
