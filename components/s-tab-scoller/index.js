// components/s-float-icons/index.js
Component({
  externalClasses: ['ex-class'],
  properties: {
    list: Array
  },

  options: {
    multipleSlots: true
  },
  data: {
    showNavDrap: false,
    navIndex: 0,
    navScrollLeft: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showAllNav() {
      this.setData({
        showNavDrap: !this.data.showNavDrap
      })
    },
    //选择
    chooseNav(e) {
      var item = e.currentTarget.dataset.item
      var index = e.currentTarget.dataset.index
      var pop = e.currentTarget.dataset.pop
      // 点击弹出的选项
      if (pop) {
        this.setData({
          showNavDrap: !this.data.showNavDrap
        })
      }
      var _this = this
      // 设置当前位置
      const query = wx.createSelectorQuery().in(this)
      query
        .selectAll('.label-item')
        .boundingClientRect(function(rect) {
          let width = 0
          for (let i = 0; i < index; i++) {
            width += rect[i].width
          }
          //大于屏幕一半的宽度则滚动
          let clientWidth = wx.getSystemInfoSync().windowWidth / 2

          if (width > clientWidth) {
            _this.setData({
              navScrollLeft: width + rect[index].width / 2 - clientWidth
            })
          } else {
            _this.setData({
              navScrollLeft: 0
            })
          }
        })
        .exec()
      //设置当前样式
      this.setData({
        navIndex: index
      })
      this.triggerEvent('change', item)
    }
  }
})
