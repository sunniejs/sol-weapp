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
    card: [],
    isFlip: false
  },
  ready() {
    //this.init()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    start() {
      const { card } = this.properties
      runAsync(100)
        .then(() => {
          for (let i = 0; i < 3; i++) {
            card[i].isBack = true
          }
          this.setData({ card })
          return runAsync(200)
        })
        .then(() => {
          for (let i = 3; i < 6; i++) {
            card[i].isBack = true
          }
          this.setData({ card })
          return runAsync(200)
        })
        .then(() => {
          for (let i = 6; i <= 8; i++) {
            card[i].isBack = true
          }
          this.setData({ card })
          return runAsync(800)
        })
        .then(() => {
          for (let i = 0; i < 9; i++) {
            card[i].isBack = false
          }
          this.setData({ card })
          return runAsync(1000)
        })
        .then(() => {
          // for (let i = 0; i < 9; i++) {
          //   card[i].isMove = true
          // }
          this.setData({ isMove: true })
          return runAsync(500)
        })
        .then(() => {
          // for (let i = 0; i < 9; i++) {
          //   card[i].isMove = false
          // }
          this.setData({ isMove: false })
          this.data.isFlip = true
          // this.data.card = card
          this.triggerEvent('getcard')
        })
    },
    // init() {
    //   const { card } = this.data
    //   for (let i = 0; i < 9; i++) {
    //     card[i] = { isBack: false, isMove: false, award: '' }
    //   }
    //   this.setData({ card })
    // },
    reset() {
      const { card } = this
      this.isFlip = false
      for (let i = 0; i < 9; i++) {
        card[i] = { isBack: false, isMove: false, award: card[i].award }
      }
      this.setData({ card })
      runAsync(800).then(() => {
        this.start()
      })
    },

    onClick(event) {
      const { card, isFlip } = this.data
     // if (!isFlip) return
      const idx = event.currentTarget.dataset.idx
      const award = event.currentTarget.dataset.award
      // 查询是否有正在分享的状态
      card.map(el => {
        // 如果有正在分享的卡片
        if (el.status == 1) {
          wx.showToast({
            title: '先完成分享吧',
            icon:'none'
          })
        }else if (el.status == 1) {
          wx.showToast({
            title: '前去领取奖励吧',
            icon:'none'
          })
        }
      })
      // 如果没有翻开
      if (card[idx].status==0) {
        card[idx].status = 1
      }
      console.log(card[idx].status)
      // card[idx].isBack = !card[idx].isBack
      this.setData({ card })
      // this.triggerEvent('getcard')
      // runAsync(600).then(() => {
      //   endCallBack(idx, award)
      // })
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
