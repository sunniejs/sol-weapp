Page({
  /**
   * 页面的初始数据
   */
  data: {
    showShare:false,
    shareMode:'', 
    shareData:{},
    shareImgPath:''
  },
  /**
   * 分享给好友和生成海报图
   * 需要onShareAppMessage配合使用
   */
  doShare(){
    // 分享信息
    let share = {
      shareType: 'index',// 海报模板类型，用户可生成不同样式的海报图
      shareTitle:`同样九年义务教育,你怎么能这么优秀，找到我！`, //分享标题 
      shareImg:'https://gitee.com/sunniejs/sol-weapp/raw/master/qrcode.jpg',// 分享图片为空分享页面截图
      sharePath: '/pages/index/index?id=123456'
    }
    this.setData({
      shareMode:'bar', 
      showShare:true,
      shareData:share
    })
  },
  /**
   * 只分享给好友
   * shareMode传card
   * 需要onShareAppMessage配合使用
   */
  doCardOnlyShare () {
    // 分享信息
    let share = {
      shareTitle:`同样九年义务教育,你怎么能这么优秀，找到我！`,  
      shareImg:'https://gitee.com/sunniejs/sol-weapp/raw/master/qrcode.jpg', 
      sharePath: '/pages/index/index?id=123456',  
    }
    this.setData({
      shareMode:'card', // 只分享微信好友，不生成海报图
      showShare:true,
      shareData:share
    })
  }, 
   /**
   * 只生产海报图
   * shareMode传popup
   * showShare默认为false
   * 需要onShareAppMessage配合使用
   */
  doPopOnlyShare(){
    // 分享信息
    let share = {
      shareType: 'index',// 海报模板类型，用户可生成不同样式的海报图
      shareTitle:`同样九年义务教育,你怎么能这么优秀，找到我！`, 
      shareImg:'https://gitee.com/sunniejs/sol-weapp/raw/master/qrcode.jpg', 
      sharePath: '/pages/index/index?id=123456',  
    }
    this.setData({
      shareMode:'popup', // 只生成海报图
      shareData:share
    })
    // 调用组件生产图片方法
    this.selectComponent('#shareSheet').drawPosterCanvas()
  },

  /**
   * 只分享给好友图片需要合成
   * shareData.cardPoster传true
   * 需要onShareAppMessage配合使用
   */
  doShareGoods(){
    // 分享信息
    let share = {
      shareType: 'goods',// 海报模板类型，用户可生成不同样式的海报图
      cardPoster : true, // 分享给好友需要合成图片
      shareTitle:`分享给好友合成海报图！`,
      shareImg:"https://gitee.com/sunniejs/sol-weapp/raw/master/goods.png",
      qrcode:'https://gitee.com/sunniejs/sol-weapp/raw/master/qrcode.jpg',
      sharePath: '/pages/index/index?id=123456'
    }
    // 需要用到的参数用户可自行设置
    const goods={
        goodsMoney: 9499,
        goodsPrice: 9599
    }
      // 合并参数
     const options = Object.assign({}, share,goods)
    this.setData({
      shareMode:'bar', 
      showShare:true,
      shareData:options
    })
  },
   /**
   * 直接返回合成图路径
   * shareMode传path
   *  showShare默认为false
   */
  doGetPath(){
    // 分享信息
    let share = {
      shareType: 'index',// 海报模板类型，用户可生成不同样式的海报图
      shareTitle:`同样九年义务教育,你怎么能这么优秀，找到我！`,  
      shareImg:'https://gitee.com/sunniejs/sol-weapp/raw/master/qrcode.jpg', 
      sharePath: '/pages/index/index?id=123456'
    }
   this.setData({
      shareMode:'path', 
      shareData:share
    })
  },
  // 直接返回图片路径回调
  ImgPath(e){
      this.setData({
        shareImgPath :e.detail
      })
  },
  // 分享
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
  // 保存图片
  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    console.log('painter onLoad=', options)
    // 通过二维码进入
    if (options.scene) {
        let scene = decodeURIComponent(options.scene)
        // &是我们定义的参数链接方式
        this.data.id = scene.split('&')[0]
    } else {
        // 页面分享进入
        this.data.id = options.id  
    }
    // 直接拿生产海报图path
    this.doGetPath()
  },
});
