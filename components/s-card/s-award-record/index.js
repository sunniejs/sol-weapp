const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: Boolean,
    record: Array
  },

  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭 s-popup
    closePopup() {
      this.setData({
        visible: false
      })
    },
    // 去首页
    goHome() {
      wx.reLaunch({
        url: `/pages/home/index`
      })
    }
  }
})
