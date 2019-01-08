const App = getApp()
Page({
  data: {
    specialId: '',
    query: ['篮球鞋','36'], 
    searchList: [
      {
        type: 'radio',
        screenKey: '时尚',
        screenValue: ['篮球鞋', '运动鞋', '板鞋', '跑步鞋']
      },
      {
        type: 'radio',
        screenKey: '品牌',
        screenValue: ['阿迪达斯', '耐克', '皮尔卡丹']
      },
      {
        type: 'checkbox',
        screenKey: '尺码',
        screenValue: [
          '36',
          '36.5',
          '37',
          '37.5',
          '38',
          '38.5',
          '39',
          '39.5',
          '40',
          '40.5',
          '41',
          '41.5',
          '42',
          '42.5',
          '43',
          '43.5'
        ]
      }
    ] // 搜索关键词
  },
  onLoad: function(options) {
    console.log(options)
    // 上个页面传递搜索关键词数组，目前在data里query设置
    // this.data.query = options.query
    // 搜索关键词
    this.getSearchItems()
  },
  // 获取搜索选项
  getSearchItems() {
    const _this = this
    // 异步请求数据后处理，这里直接拿假数据
    const searchItems = this.data.searchList.map(n => {
      return Object.assign({}, n, {
        screenValue: n.screenValue.map(m =>
          Object.assign(
            {},
            {
              checked: _this.data.query.includes(m), // 回显query里有返回true
              value: m
            }
          )
        )
      })
    })
    this.setData({
      searchList: searchItems
    })
  },
 // 点击筛选项
  onChange(e) {
    const { parentIndex, item, index } = e.currentTarget.dataset
    // 如果选中状态
    if (item.screenValue[index].checked) {
      item.screenValue[index].checked = false // 取消选择
    } else {
      // 如果不是多选
      if (item.type != 'checkbox') {
        // 全部重置为未选择状态
        item.screenValue.map(n => (n.checked = false))
      }
      // 将点击的设置为选中
      item.screenValue[index].checked = true
    }
    this.setData({
      [`searchList[${parentIndex}]`]: item
    })
  },
  // 取消,清空数据返回上一个页面
  doCancel() {
    // var pages = getCurrentPages() // 获取页面栈
    // var prevPage = pages[pages.length - 2] // 前一个页面
    // prevPage.setData({
    //   query: [], // 重置
    //   isBack: true
    // })
    // // 返回登录之前的页面
    // wx.navigateBack({
    //   delta: 1
    // })
  },
  // 提交，携带数据返回上一个页面
  doSubmit() {
    let selected = []
    // 获取所有选中
    this.data.searchList.map(n => {
      n.screenValue.map(m => {
        if (m.checked == true) {
          selected.push(m.value)
        }
      })
    })
    console.log(selected)
    // var pages = getCurrentPages() // 获取页面栈
    // var prevPage = pages[pages.length - 2] // 前一个页面
    // // 携带数据，返回登录之前的页面
    // prevPage.setData({
    //   query: selected,
    //   isBack: true
    // })
    // wx.navigateBack({
    //   delta: 1
    // })
  }
})
