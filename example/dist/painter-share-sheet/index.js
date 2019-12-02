import { drawCard,drawPoster } from "../../utils/painter"
import { wxSaveAuth } from "../../utils/wx"
// 该接口是为获取二维码，并未对接开发者可自行修改
// import { getCodeUrl } from "../../api/common"
Component({
    externalClasses: ["sol-class"],
    properties: {
        shareData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) {
              if(newVal.shareType){
                this.paint()
              }

              // if (this.isNeedRefresh(newVal, oldVal)) {
              //   this.paintCount = 0;
              //   this.startPaint();
              // }
            },
        },
        // 模板图分享图
        tempImgs: {
          type: Array,
          value: [ ]  
       },
        // 展示方式
        mode: {
            type: String,
            value: "bar" //  bar: 分享弹出，可以转发好友，或者生成图片  popup: 无分享弹窗，直接显示图片弹出 path: 直接返回图片路径
        },
            // 分享给好友是否需要合成图片
        synthetic: {
            type: Boolean,
            value: false
          },
        //  只可以通过微信分享
        onlyFriend: {
            type: Boolean,
            value: false 
        },
        // 显示底部弹窗
        visible: {
            type: Boolean,
            value: false
        },
        // 弹出背景透明
        transparent: {
            type: Boolean,
            value: false
        }
    },
    data: {
      swiperIndex:0,
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,

        cache: {
          // 假数据，需要删除
          "pages/index/index123456":"https://imgs.solui.cn/weapp/qrcode.jpg"
          // 假数据，需要删除
        },
        imgVisible: false,
        shareImage: "",
        painting: {},
        shareMsgData:{}  // 分享给好友数据
    },
    ready() {
        // 开发时需要打开
        // wx.removeStorageSync("code_img_cache");
        // this.data.cache = wx.getStorageSync("code_img_cache") || {}
        // 开发时需要删除
        wx.setStorageSync("code_img_cache", this.data.cache)
    },
    methods: {
      // 开始绘画
      paint(){
        // 画海报图
        this.paintPoster()
        const { synthetic  } = this.data
        this.paintCardImg()
      },
      // 开始绘画
      paintPoster(){
        wx.showLoading({
           title: "图片正在生成",
           mask: true
        })
        // 切换的时候生成图片
        const {tempImgs,swiperIndex,shareData}=this.data
        this.setData({
          'shareMsgData.shareTitle': shareData.shareTitle, // 分享给好友 
          'shareMsgData.sharePath':  shareData.sharePath, // 分享给好友 
          'shareMsgData.shareImg':tempImgs[swiperIndex].card, // 分享给好友卡片图
           posterImg: tempImgs[swiperIndex].poster   // 海报图
        })
        // 海报图
        // 若无需动态生成二维码图片
        const sharePath = shareData.sharePath.substr(1).split("?")[0]
        this.drawCanvas(shareData.shareParams, sharePath, 340)
      },
         /**
         * 小程序生成二维码参数
         * scene 传递参数
         * page 路径
         * width 宽度
         */
        drawCanvas(scene, page, width = 200) {
          // 后台接口生成二维码需要的参数
          const params = {
              scene: scene,
              page: page,
              width: width,
              auto_color: false,
              r: "0",
              g: "0",
              b: "0",
              is_hyaline: false
          }
          // 获取小程序二维码
          this.getCacheImage(params)
              .then(codeImg => {
                // 获取二维码图片，合并分享信息
                  const params = Object.assign( this.data.shareData,{ qrcode: codeImg })
                 // 模板
                 return drawPoster(params) 
              }).then(res=>{
                wx.setStorageSync("code_img_cache", this.data.cache)
                console.log(res)
                this.setData({
                    template: res
                })
              })
              .catch(err => {
                  console.log(err)
              })
        },
        // 获取二维码，缓存里有就从缓存里拿
        getCacheImage(parmas) {
              // 生成唯一缓存键值
              const url = parmas.page + parmas.scene
              return new Promise((resolve, reject) => {
                  if (this.data.cache[url]) {
                      resolve(this.data.cache[url])
                  } else {
                      // 该接口是为获取动态生成的二维码，并未对接，开发者可自行修改
                      // 为程序正常运行，将二维码放到缓存里了！！！
                      // 开发时需要打开
                      // getCodeUrl(parmas)
                      //     .then(res => {
                      //         this.data.cache[url] = res.codeUrl
                      //         resolve(res.codeUrl)
                      //     })
                      //     .catch(err => {
                      //         wx.showToast({
                      //             title: "生成二维码失败,请稍后重试",
                      //             icon: "none"
                      //         })
                      //         reject(err)
                      //     })
                  }
              })
        },
        // 图片生成成功
        onImgOK(e) {
          wx.hideLoading()
          this.setData({
            [`tempImgs[${this.data.swiperIndex}].poster`]:  e.detail.path
          })
        },
      // 滑动分享图
       swiperChange(e) {
         const index=e.detail.current
        this.setData({
          swiperIndex:index,
        })
        // 如果没有画过图就生成图片
        if(this.data.tempImgs[index].poster.indexOf('http://tmp/') ===-1){
          this.paint()
        }
      },
        onImgClose() {
            this.setData({
                imgVisible: false
            })
        },
        // 关闭
        onShareClose() {
          this.setData({
            visible: false
          })
        },
        // 点击分享海报
        doShareDiscover() {
            const { shareData } = this.data
            // ！！生成二维码路径 pages前面没有"/" 需要截取
            const sharePath = shareData.sharePath.substr(1).split("?")[0]
            this.drawCanvas(shareData.shareParams, sharePath, 340)
        },
        // 保存到相册
        saveImg() {
            const _this = this
            wxSaveAuth().then(res => {
                wx.saveImageToPhotosAlbum({
                    filePath: _this.data.tempImgs[_this.data.swiperIndex].poster,
                    success(res) {
                        wx.showToast({
                            title: "保存图片成功",
                            icon: "success",
                            duration: 2000
                        })
                        // 关闭弹窗
                        _this.setData({
                            imgVisible: false
                        })
                    },
                    fail(res) {
                        wx.showToast({
                            title: "保存图片失败",
                            icon: "none",
                            duration: 2000
                        })
                    }
                })
            })
    
        }
    }
})
