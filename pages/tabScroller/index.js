// pages/tab-scroller/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { num: 20, barName: '全部', id: '097b0651ca000031b193e2bca6be792d' },
      { num: 7, barName: '爆款', id: '905cf8edf1dd45fcb821eeaba6485b07' },
      { num: 3, barName: '预告', id: '087b0651ca000031b193e2bca6be792d' },
      { num: 1, barName: '数码家电', id: 'c559a4fa5a174771867205af397d6414' },
      { num: 1, barName: '运动', id: 'a08476468ef144a99a4c7228c8909bb6' },
      { num: 2, barName: '大牌运动惠', id: 'ff1067b74999458c85ae234f046f06a7' },
      { num: 1, barName: '自营', id: 'da6aea26551a476dbbc0511182ef6b45' },
      { num: 4, barName: '日化品', id: '00bb0651caab4731b193e2bca6be792d' }
    ]
  },
  navChange(e) {
    console.log('detail', e.detail)
    var item = e.detail
    this.setData({
      name: item.barName
    })
  },
  /* 转发*/
  onShareAppMessage: function(ops) {
    return {
      title: '横向滚动',
      path: '/pages/tabScroller/index'
    }
  }
})
