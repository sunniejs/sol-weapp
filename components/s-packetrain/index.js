// components/s-packetrain/index.js
//获取应用实例
const App = getApp()
import cax from './cax/index.js'
const info = wx.getSystemInfoSync()
const innerAudioContext = wx.createInnerAudioContext()
var shapeArray = []
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    // 游戏事件单位秒
    time: {
      type: Number,
      value: 10
    },
    // 倒计时单位秒
    readyTime: {
      type: Number,
      value: 5
    },
    min: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: 3
    },
    // 初始速度
    createSpeed: {
      type: Number,
      value: 400
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    score: 0, // 总分数
    gameTimer: '', // 游戏Timer
    createPacketTimer: '', // 创建红包Timer
    packetMoveDownTimer: '', // 红包下落Timer
    readyRainTimer: null, // 准备时间Timer
    readyVisible: true, // 显示准备倒计时
    isGameOver: false
  },
  ready() {
    // 开始
    this.start()
  },
  methods: {
    // 倒计时开始
    start() {
      var that = this
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
      const bgStage = new cax.Stage(
        info.windowWidth,
        info.windowHeight,
        'myCanvas',
        this
      )
      // 创建红包
      this.createPacket(bgStage)
      // 红包下落
      this.packetMoveDown(bgStage)
      //倒计时关闭
      this.stopRain(bgStage)
    },
    // 创建红包
    createPacket(bgStage) {
      var that = this
      var indexNum = 1
      var n = this.data.createSpeed

      // 每 n 毫秒创建一个，n为 this.data.createSpeed
      this.data.createPacketTimer = setInterval(function() {
        indexNum++
        let redCardName = 'redCard' + String(indexNum)
        // 创建红包
        that.createShape(bgStage, redCardName)
      }, n)
    },
    //创建红包shape
    createShape(newStage, newName) {
      //创建随机位置
      var that = this
      var ranNum = Math.random() * (info.windowWidth - 80)
      // 红包背景
      newName = new cax.Bitmap('https://tweapp.top1buyer.com/soul/rdc.png')
      // 旋转角度
      var angle = Math.random() * 90 - 45
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
          for (var i = 0; i < this.length; i++) {
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
        // 随机产生红包金额 最小到最大值之间的金币数
        var changeOfScore = Math.floor(
          Math.random() * this.data.max + this.data.min
        )
        console.log(changeOfScore)
        // 当前总金额
        var nowScore = that.data.score + changeOfScore
        that.setData({
          score: nowScore,
          changeScore: changeOfScore
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
      var that = this
      // 不停地调用函数，直到 clearInterval()
      this.data.gameTimer = setInterval(function() {
        var nowTime = that.data.time - 1
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
    checkrule() {}
  }
})
