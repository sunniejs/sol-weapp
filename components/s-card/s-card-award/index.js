const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    award: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    iphoneX: App.globalData.isIphoneX
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到营业执照
    goLicense() {
      const bannerUrl = 'https://admin.top1buyer.com/wxview/license?v=1'
      wx.navigateTo({
        url: `/pages/home/webview/index?bannerUrl=${bannerUrl}`
      })
    },
    // 已领取直接关闭
    closeAward() {
      this.setData({
        visible: false
      })
      
    },
    // 我也要免费领取重新进入页面
    reLoad() {
        wx.redirectTo({
            url: '/pages/marketing/gridcard/index'
          })
    },
    // 领取奖品
    triggerItemEvent(e) {
      const { id, index } = e.currentTarget.dataset
      this.triggerEvent('carditem', { id, index })
    }
  }
})
