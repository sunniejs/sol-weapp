// pages/redBacketRain/redBacketRain.js
import cax from '../../components/cax/index.js'
const info = wx.getSystemInfoSync()
const innerAudioContext = wx.createInnerAudioContext()
 
//获取应用实例
const app = getApp()
var shapeArray = []
var shape2Array = []
//钻石Array
var diamondsArray = []
//boomArray
var boomArray = []
var speed = 1
var createSpeed = 300
var createSpeed2 = 2800
var createSpeed3 = 3400
//时间戳
var timestamp = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    numOfLife: 5,
    numOfTime: 15,
    animationData: {},
    changeScore: 0,
    isGameOver: false,
    interval1: "",
    interval3: "",
    interval5: "",
     
  },
  reflashSpeed() {
    speed = 1
    createSpeed = 300
    createSpeed2 = 2800
    createSpeed3 = 3400
  },
  //分数改变
  changeOfScore(myScore) {
    this.setData({
      score: myScore
    })
  },
  //游戏结束
  gameOverBtnClick() {
    wx.showToast({
      title: '游戏结束',
    })
  },
  //分数动画
  animationOfScore() {
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.opacity(1).step()
    setTimeout(function () {
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 10)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //开启一个倒计时关闭游戏
  stopGame(bgStage) {
    var that = this
    this.data.interval5 = setInterval(function () {
      var nowTime = that.data.numOfTime - 1

      //3S增加一次速度
      if (nowTime % 3 == 0) {
        that.speedChange(bgStage)
      }
      that.setData({
        numOfTime: nowTime
      })
    }, 1000)
    setTimeout(function () {
      that.gameOver(bgStage)

    }, 1000 * that.data.numOfTime)
  },
  //关闭游戏（gameover）
  gameOver(bgStage) {
    this.reflashSpeed()
    clearInterval(this.data.interval1)
    clearInterval(this.data.interval3)
    clearInterval(this.data.interval5)
    shapeArray.forEach(function (value, i) {
      value.destroy()
      bgStage.update()
    })

  },

  //开启定时器创建shape1
  startInterval1(bgStage) {
    var that = this
    var indexNum = 1
    this.data.interval1 = setInterval(function () {
      indexNum++
      let redCardName = "redCard" + String(indexNum)
      that.createShape(bgStage, redCardName)
    }, createSpeed)
  },
  //开启定时器移动红包雨
  startInterval3(bgStage) {
    let that = this
    this.data.interval3 = setInterval(function () {
      shapeArray.forEach(function (value, i) {
        value.y = value.y + speed
        if (value.y > info.windowHeight) {
          bgStage.remove(value)
          shapeArray.splice(i, 1)
          // that.setData({
          //   numOfContinuation: 0
          // })
        }
      })
      bgStage.update()
    }, 16)
  },
  //创建shape
  createShape(newStage, newName) {
    //创建随机位置
    var that = this
    var ranNum = Math.random() * (info.windowWidth - 80)
    newName = new cax.Bitmap('../../assets/images/rdc.png')
    // 旋转角度
    var angle = Math.random() * 90 - 45 
    console.log(angle)
     newName.rotation = angle
    // 随机大小0.4~0.5
    newName.scaleX = newName.scaleY = (Math.random() * 10 +40) / 100
    // x轴随机位置
    newName.x = ranNum
    // y轴-50
    newName.y = - 50
    newName.on("touchstart", () => {
      Array.prototype.indexValue = function (arr) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == arr) {
            return i;
          }
        }
      }
      let shapeIndex = shapeArray.indexValue(newName)
      shapeArray.splice(shapeIndex, 1)
      newName.destroy()
      that.animationOfScore()
      innerAudioContext.play()

      var nowScore = that.data.score + Math.round(Math.random() * 6)
      var changeOfScore = Math.round(Math.random() * 6)
      that.setData({
        score: nowScore,
        changeScore: changeOfScore,
      })
    })
    newStage.add(newName)
    //将shape都放入数组中
    shapeArray.push(newName)
  },
  //速度变量
  speedChange(newStage) {
    speed = speed + 1.5
    clearInterval(this.data.interval1)
    createSpeed = 300
    createSpeed2 = createSpeed2 - 350
    createSpeed3 = createSpeed3 - 350
    this.startInterval1(newStage)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.reflashSpeed()
    timestamp = Date.parse(new Date())
    timestamp = timestamp / 1000
    // console.log("当前时间戳为：" + timestamp)
    var that = this
    const bgStage = new cax.Stage(info.windowWidth, info.windowHeight, 'myCanvas', this)
    // 开启定时器创建shape1(+1红包)
    this.startInterval1(bgStage)
     // 开启定时器移动红包雨
    this.startInterval3(bgStage)
    //倒计时关闭
    this.stopGame(bgStage)
    this.audioOfClick()
  },
  //点击音效
  audioOfClick() {
    innerAudioContext.autoplay = false
    innerAudioContext.src = 'http://videoss.cdn.bcebos.com/dianji.mp3'
    innerAudioContext.onPlay(() => {

    })
    innerAudioContext.onError((res) => {

    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.interval1)
    clearInterval(this.data.interval3)
    clearInterval(this.data.interval5)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})