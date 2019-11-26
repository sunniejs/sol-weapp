var app = getApp();
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部栏目
    footStyle:{
      width:'',
      ani_width:0
    },
    // 到最后一个的时候倒数第二个的距离去除
    second_left:false,
    allweidth:0,
    widthchild:0.00,
    // 设置外面总长
    boxWidth:'',
    movedistance:'',
    currentindex:1,
    moveLeft:'',
    startX:'',
    userinfo:{
      avater:'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2197057864,1501761411&fm=58',
      name:'张三',
      role_name:'啦啦啦'
    },
    height:'',
    fontFamily: 'youth',
    style:{
      width:'',
      marginw:'',
      defaultw:''
    },
    boxwarp: [
      { url: 'http://img4.imgtn.bdimg.com/it/u=1188387633,958216909&fm=26&gp=0.jpg', title: '点赞', data: [{ name: '肥皂' }, { name: '宅男' }, { name: '帅气' }, { name: '漂亮' }, { name: '无敌自恋' }, { name: '人渣' }, { name: '钢铁直男' }, { name: '一亩良田' }] }, { url: 'http://img4.imgtn.bdimg.com/it/u=1188387633,958216909&fm=26&gp=0.jpg', title: '点赞', data: [{ name: '肥皂' }, { name: '宅男' }, { name: '帅气' }, { name: '漂亮' }, { name: '无敌自恋' }, { name: '人渣' }, { name: '钢铁直男' }, { name: '一亩良田' }] }, { url: 'http://img4.imgtn.bdimg.com/it/u=1188387633,958216909&fm=26&gp=0.jpg', title: '点赞', data: [{ name: '肥皂' }, { name: '宅男' }, { name: '帅气' }, { name: '漂亮' }, { name: '无敌自恋' }, { name: '人渣' }, { name: '钢铁直男' }, { name: '一亩良田' }] }, { url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1051544949,406233500&fm=26&gp=0.jpg', title: '点赞', data: [{ name: '肥皂' }, { name: '宅男' }, { name: '帅气' }, { name: '漂亮' }, { name: '无敌自恋' }, { name: '人渣' }, { name: '钢铁直男' }, { name: '一亩良田' }] },
      { url: 'http://img3.imgtn.bdimg.com/it/u=3821783495,1820055650&fm=26&gp=0.jpg', title: '点赞', data: [{ name: '肥皂' }, { name: '宅男' }, { name: '帅气' }, { name: '漂亮' }, { name: '无敌自恋' }, { name: '人渣' }, { name: '钢铁直男' }, { name: '一亩良田' }] },
      { url: 'http://img3.imgtn.bdimg.com/it/u=1119477383,166466296&fm=26&gp=0.jpg', title: 'diss', data: [{name: '老年痴呆' }, { name: '渣男' }, { name: '渣女' }, { name: '母老虎' }, { name: '马屁精' }, { name: '中二' }, { name: '飞鸟' }, { name: '清流' }]
      }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // loadFontFace() {
  //   const self = this
  //   wx.loadFontFace({
  //     family: this.data.fontFamily,
  //     source: 'url("")',
  //     success(res) {
  //     },
  //     fail: function (res) {
  //     },
  //     complete: function (res) {
  //     }
  //   });
  // },
  touchStart: function (e) {
    console.log('开始触碰');
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
 
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    var disabled = e.currentTarget.dataset.disable;
    if(disabled=='0'){
    return false;
    }
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.iflorr(e,0);
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.iflorr(e,1);
        moveFlag = false;
      }
     
    }

  },
  iflorr(e,type){
    let index = e.currentTarget.dataset.index;
    var length = this.data.boxwarp.length;
    if(type==1){
      console.log('往左边的时候', index, length);
      if (index == length){
        wx.showToast({
          title: '已经是最后一个了',
          icon:'none'
        })
       return false
      }else{
      index+= 1;
      if(index==length){
      this.setData({
        second_left:true
      })
      }
      this.move2left();
      }
      console.log('往左边的时候',index);
    }else{
      console.log('往右边的时候', index);
      this.setData({
        second_left: false
      })
      if (index == 1) {
        wx.showToast({
          title: '已经是第一个了哦',
          icon:'none'
        })
        return false
      }else{
      index -= 1;
      this.move2right();
      console.log('往右边的时候', index);
      }
    }
    this.setData({
      currentindex: index
    })
  },
  // 触摸结束事件
  touchEnd: function (e) {
    console.log('结束触碰');
    moveFlag = true; // 回复滑动事件

  },
  _anImates: function (data) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    animation.opacity(0.8).translate(data).step()
    this.setData({
      ani: animation.export()
    })
  },
  // 左滑
  move2left() {
    var that = this;
    let length = that.data.boxwarp;
   that.setData({
     allweidth: ~that.data.widthchild * that.data.currentindex,
    //  movedistance: '-' + that.data.widthchild*that.data.currentindex+'px'
   })
    that._anImates(that.data.allweidth);
    console.log('widthchild', that.data.widthchild, that.data.allweidth);
    console.log('leftmovedistance', that.data.movedistance);
  },
  
  move2right() {
    var that = this;
    var cuindex=that.setData.currentindex;
    console.log('allweidth', that.data.allweidth);
    let mwidth = that.data.allweidth + that.data.widthchild;
    console.log('mwidth', mwidth);
    that.setData({
      allweidth: mwidth,
      // movedistance:mwidth  + 'px'
    })
    that._anImates(that.data.allweidth);
    // console.log('rightmovedistance', that.data.movedistance);
  },
  getSystem(){
  var that=this;
  wx.getSystemInfo({
    success: function (res) {
      let width = res.screenWidth;
      console.log('res', width*0.7);
      that.setData({
        'style.width': width * 0.7+ "px",
        'footStyle.width': width * 0.4 + "px",
        'footStyle.ani_width':width*0.4,
        widthchild: width * 0.7 + width * 0.15 / 2,
        'style.marginw':width*0.15+'px',
        'style.defaultw': width * 0.15/2 + 'px',
      })
    }
  })
  },
  onLoad: function (options) {
    var that = this;
    // that.loadFontFace();
    that.getSystem();
    // wx.getStorageSync('userInfo', 'value');
    that.setData({
      boxWidth:that.data.boxwarp.length+'00%',
      // userinfo: wx.getStorageSync('userInfo', 'value'),
      // 'userinfo.avater': wx.getStorageSync('avater', 'value'),
      
    })

    console.log('avaters', that.data.userinfo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})