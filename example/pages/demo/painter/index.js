import Card from '../../../palette/card';

// src/pages/xml2can/xml2can.js
Page({
  imagePath: '',

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    showShare:false,
    shareData:{},
    template: {},
    tempImgs:[{
      card:'https://img.mukewang.com/5a72827d0001cb8006000338-240-135.jpg',
      poster: 'https://img.mukewang.com/57075b250001044506000338-240-135.jpg'},{
        card:'https://img.mukewang.com/5a72827d0001cb8006000338-240-135.jpg',
        poster: 'https://img.mukewang.com/57075b250001044506000338-240-135.jpg'}]
  },  
  doShare(){
    // 分享信息
    let share = {
      shareType: 'index',// 模板类型，用户可生成不同样式的海报图
      shareTitle:`同样九年义务教育,你怎么能这么优秀，找到我！`,
      shareImg:'https://imgs.solui.cn/weapp/qrcode.jpg',
      sharePath: '/pages/index/index?id=123456',
      shareParams:'123456' // 传递用于生成二维码的scence参数
    }
    this.setData({
      showShare:true,
      shareData:share
    })
  },
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      image: this.imagePath
    })
    console.log(e);
  },

  saveImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      template: new Card().palette(),
    });
  },
});
