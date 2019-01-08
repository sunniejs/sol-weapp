// pages/market/gridcard/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    card: [],
    animate: false,
    msgList: [
      {
        phone: '150****2569',
        money: 200
      },
      {
        phone: '151****2569',
        money: 300
      },
      {
        phone: '155****2569',
        money: 400
      },
      {
        phone: '158****2569',
        money: 500
      },
      {
        phone: '150****2569',
        money: 200
      },
      {
        phone: '151****2569',
        money: 300
      },
      {
        phone: '155****2569',
        money: 400
      },
      {
        phone: '158****2569',
        money: 500
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.init()
    this.showMarquee()
  },
  showMarquee() {
    this.setData({ msgList: this.data.msgList })
  },

  init() {
    this.setData({
      isOpen: true,
      card: [
        {
          status: 1,
          award: '小白鞋',
          img: 'https://tweapp.top1buyer.com/market/card/1.png',
          total: 10,
          finish: 2
        },
        {
          status: 0,
          award: '二等奖',
          img: 'https://tweapp.top1buyer.com/market/card/2.png',
          total: 10,
          finish: 0
        },
        {
          status: 2,
          award: '三等奖',
          img: 'https://tweapp.top1buyer.com/market/card/3.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '四等奖',
          img: 'https://tweapp.top1buyer.com/market/card/4.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '五等奖',
          img: 'https://tweapp.top1buyer.com/market/card/5.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '六等奖',
          img: 'https://tweapp.top1buyer.com/market/card/6.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '七等奖',
          img: 'https://tweapp.top1buyer.com/market/card/7.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '八等奖',
          img: 'https://tweapp.top1buyer.com/market/card/8.png',
          total: 10,
          finish: 0
        },

        {
          status: 0,
          award: '九等奖',
          img: 'https://tweapp.top1buyer.com/market/card/9.png',
          total: 10,
          finish: 0
        }
      ]
    })
  },
  emitGetCard() {
    console.log('emitGetCard')
    this.setData({
      isOpen: false,
      card: [
        {
          status: 0,
          award: '二等奖',
          img: 'https://tweapp.top1buyer.com/market/card/2.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '三等奖',
          img: 'https://tweapp.top1buyer.com/market/card/3.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '小白鞋',
          img: 'https://tweapp.top1buyer.com/market/card/1.png',
          total: 10,
          finish: 0
        },

        {
          status: 0,
          award: '五等奖',
          img: 'https://tweapp.top1buyer.com/market/card/5.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '六等奖',
          img: 'https://tweapp.top1buyer.com/market/card/6.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '七等奖',
          img: 'https://tweapp.top1buyer.com/market/card/7.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,

          award: '八等奖',
          img: 'https://tweapp.top1buyer.com/market/card/8.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '四等奖',
          img: 'https://tweapp.top1buyer.com/market/card/4.png',
          total: 10,
          finish: 0
        },
        {
          status: 0,
          award: '九等奖',
          img: 'https://tweapp.top1buyer.com/market/card/9.png',
          total: 10,
          finish: 0
        }
      ]
    })
  },
  onStart() {
    this.cardcom = this.selectComponent('#card')
    this.cardcom.start()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
