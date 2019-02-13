import { getCardTemplate, getCardAwardInfo } from '../../utils/api.js'
Page({
  data: {
    card: [], // 九宫格奖项
    msgList: [], // 获奖记录
    loading: true
  },
  onLoad: function(options) {
    // 获取卡片数据模板
    this.fetchData()
  },
  // 请求翻牌数据,用于数据请求/回显
  fetchData() {
    // 后台提供接口，这里使用easy-mock提供模拟数据,有点慢耐心等待
    // 接口请求统一封装在 /utils/api.js下，request封装在/utils/request.js
    getCardTemplate({})
      .then(res => {
        // 设置数据
        this.setData({
          card: res.data.prize, // 九宫格奖项
          sign: !!res.data.sign, // 是否抽过奖
          msgList: res.data.userList, // 获奖记录
          loading: false // 请求完成
        })
      })
      .catch(err => {
        this.setData({
          loading: false // 请求失败
        })
      })
  },
  // 子组件触发，点击打开单个卡片奖品
  emitGetCards(e) {
    const { item, index } = e.detail
    this.setData({
      [`card[${index}].isBack`]: true
    })
    // const userCode = App.globalData.userInfo.userCode
    // getCardAwardInfo({ sort: index + 1 })
    //   .then(res => {
    //     const prize = res.data.userPrize
    //     prize.user = res.data.user
    //     console.log(prize)
    //     this.setData({
    //       awardVisible: true,
    //       award: prize,
    //       [`card[${index}]`]: prize
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
})
