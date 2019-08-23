// components/s-float-icons/index.js
Component({
  externalClasses: ['ex-class'],
  properties: {
    padding: {
      type: String,
      value: '20 20 20 20',
      observer(newVal) {
        this.setData({
          safeArea: newVal.split('')
        })
      }
    }
  },

  options: {
    multipleSlots: true
  },
  data: {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    safeArea: ['20', '20', '20', '20']
  },
  attached() {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight * (750 / wx.getSystemInfoSync().windowWidth) - this.data.safeArea[0] - this.data.safeArea[2],
      width: 750 - this.data.safeArea[1] - this.data.safeArea[3]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart() {},
    touchMove(e) {
      if (e.touches.length == 1) {
        this.setData({
          x: e.touches[0].clientX * 2,
          y: e.touches[0].clientY * 2
        })
      }
    },
    touchEnd() {}
  }
})
