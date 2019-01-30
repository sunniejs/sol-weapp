// components/s-card/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    start() {
      // 开始动画
      const { card } = this.properties
      runAsync(100)
        .then(() => {
          for (let i = 0; i < 3; i++) {
            card[i].isBack = true
          }
          this.setData({
            card
          })
          return runAsync(200)
        })
        .then(() => {
          for (let i = 3; i < 6; i++) {
            card[i].isBack = true
          }
          this.setData({
            card
          })
          return runAsync(200)
        })
        .then(() => {
          for (let i = 6; i <= 8; i++) {
            card[i].isBack = true
          }
          this.setData({
            card
          })
          return runAsync(800)
        })
        .then(() => {
          for (let i = 0; i < 9; i++) {
            card[i].isBack = false
          }
          this.setData({
            card
          })
          return runAsync(1000)
        })
        .then(() => {
          this.setData({
            isMove: true
          })
          return runAsync(500)
        })
        .then(() => {
          this.setData({
            isMove: false
          })
        })
    },
    reset() {
      const { card } = this
      for (let i = 0; i < 9; i++) {
        card[i] = {
          isBack: false,
          isMove: false,
          award: card[i].award
        }
      }
      this.setData({
        card
      })
      runAsync(800).then(() => {
        this.start()
      })
    },

    // 点击开卡片
    openCard(event) {
      const { item, index } = event.currentTarget.dataset
      // 点击开始抽奖后才有status值，在start()方法里，没点击开始抽奖不让点卡片
      if (item.status == undefined) return
      this.triggerEvent('getcards', { item, index })
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
