// components/s-float-icons/index.js
Component({
  externalClasses: ['ex-class'],
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    theme: {
      type: String,
      value: 'white'
    },
    current: {
      type: Number,
      value: '',
      observer(newVal) {
        // 监听当前index值，切换
        this.updated(newVal)
      }
    }
  },
  data: {
    showNavDrap: false,
    activeIndex: 0,
    navScrollLeft: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 显示下拉框
     */
    showAllNav() {
      this.setData({
        showNavDrap: !this.data.showNavDrap
      })
    },
    /**
     * 触发 点击事件
     */
    onClick(e) {
      const { index, pop } = e.currentTarget.dataset
      this.updated(index, pop)
    },
    /**
     * 切换
     */
    updated(index, pop) {
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
        activeIndex: index
      })
      this.triggerEvent('change', { index: index })
    }
  }
})
