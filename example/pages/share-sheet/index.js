// pages/share-sheet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    showShare:false,
    shareData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.scene) {
      let scene = decodeURIComponent(options.scene)
      // &是我们定义的参数链接方式
         this.data.id = scene.split('&')[0]
      } else {
          // 页面分享进入
          this.data.id = options.bossid // 分享人id
      }
    // 隐藏右上角分享功能
    wx.hideShareMenu()
  },
  // 点击分享
  doShare(){
    // 分享信息
    let share = {
      shareType: 'index',
      shareTitle:`同样九年义务教育,你怎么能这么优秀，找到我！`,
      shareImg:'https://tweapp.top1buyer.com/dg/weapp/qrcode.jpg',
      sharePath: '/pages/index/index?id=123456',
      shareParams:'123456' // 传递用于生成二维码的scence参数
    }
    this.setData({
      showShare:true,
      shareData:share
    })
  },
   // 转发
   onShareAppMessage: function(ops) {
    const { share } = ops.target.dataset
    console.log(share)
    let shareObj = {}
    if (share && ops.from === 'button') {
        shareObj.title = share.shareTitle
        shareObj.path = share.sharePath
        shareObj.imageUrl = share.shareImg
    }
    return shareObj
},
})