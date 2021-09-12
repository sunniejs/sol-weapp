/*
 * @Author: Sunnie 
 * @Date: 2021-09-06 18:42:25 
 * @Last Modified by: Sunnie
 * @Last Modified time: 2021-09-12 18:55:13
 */
import {  drawCard, drawPoster } from "../../utils/painter"
import {  wxSaveAuth } from "../../utils/wx"
import {equal,isEmpty} from "../../utils/util"
// 该接口是为获取动态二维码，并未对接开发者可自行修改
// import { getCodeUrl } from "../../api/common"
Component({
    externalClasses: ["sol-class"],
    properties: {
        shareData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) {
                if (!isEmpty(newVal) && !equal(newVal, oldVal)) {
                    this.paintStart();
                }
            },
        },
        // 展示方式
        mode: {
            type: String,
            value: "bar" //  bar: 分享弹出，可以转发好友，或者生成图片  popup: 无分享弹窗，直接显示图片弹出 path: 直接返回图片路径
        },
        // 显示底部弹窗
        visible: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal) {
                const {  mode } = this.data
                // 弹窗的时候显示
                if (mode !== 'popup') {
                    this.setData({
                        shareVisible: newVal
                    });
                }
            }
        },
        // 弹出背景透明
        transparent: {
            type: Boolean,
            value: false
        }
    },
    data: {
        // ========== 需要生成动态二维码，打开此段以下代码 start ==========
        // cache: {
        //  },
        // ========== 需要生成动态二维码，打开此段以上代码 end ==========
        imgVisible: false, // 生成弹窗
        painting: false, // 锁
        shareMsgData: {}, // 分享给好友数据，不能使用shareData污染之后会重新渲染
        sharePosterData: {}, // 海报图数据，不能使用shareData污染之后会重新渲染
        paintingCard: false, // 当前是否在绘制分享给好友分享图
        imgPath: ""
    },
    ready() {
        // ========== 需要生成动态二维码，打开此段以下代码 start ==========
        // wx.removeStorageSync("code_img_cache");
        // this.data.cache = wx.getStorageSync("code_img_cache") || {}
        // ========== 需要生成动态二维码，打开此段以上代码 end ==========
    },
    methods: {
        // 开始绘画
        paintStart() {
            console.log('paintStart')
            const {
                shareData,
                mode
            } = this.data
            // 默认
            const defaults = {
                cardPoster: false,
                shareType: '',
                shareParams: '',
                shareTitle: '',
                sharePath: '',
                shareImg: ''
            }
            const shareMsgData = Object.assign({}, defaults, shareData)
            // 设置默认数据
            this.setData({
                shareMsgData,
                shareImage:'' // 重置
            })
            // 分享给好友的卡片图需要生成图片
            if (shareData.cardPoster) {
                this.drawCardCanvas()
            }
            // 返回路径直接生成图片，直接生成弹窗图片
            if (mode == 'path') {
                this.drawPosterCanvas()
            }

        },
        // 分享给好友卡片图合成
        drawCardCanvas() {
            wx.showLoading({
                title: "正在加载",
                mask: true
            })
            const {
                shareData
            } = this.data
            this.data.paintingCard = true // 挡墙
            drawCard(shareData).then(res => {
                this.setData({
                    template: res
                });
            });
        },
        // 海报图合成
        drawPosterCanvas() {
            const {
                shareData,
                shareImage
            } = this.data
         
            // 如果已经生成过了图
            if (shareImage && shareImage.indexOf("//tmp") !== -1) {
                // 如果画过了就赋值,就会接显示
                this.setData({
                    visible: false,
                    imgVisible: true
                })
                return false
            }
            // 锁
            if (this.data.painting) return false
         
            this.data.painting = true
            // 获取模板json数据，无需生成动态二维码
            // ========== 需要生成动态二维码，注释此段以下代码 start ==========
              drawPoster(shareData).then(res => {
                  this.setData({
                      template: res
                  })
              })
            // ========== 需要生成动态二维码，注释此段以上代码 end ==========

            // ========== 需要生成动态二维码，打开此段以下代码 start ==========
            //  // ！！生成二维码路径 pages前面没有"/" 需要截取
            //  const sharePath = shareData.sharePath.substr(1).split("?")[0]
            //  // 生成动态二维码
            //  this.getQrcode(shareData.shareParams, sharePath, 200)
            // ========== 需要生成动态二维码，打开此段以上代码 end ==========

        },
        // 关闭显示弹窗
        onImgClose() {
            this.setData({
                swiperIndex: 0,
                imgVisible: false
            })
        },
        // 关闭分享弹窗
        onShareClose() {
            this.setData({
                visible: false
            })
        },

        // 图片生成成功
        onImgOK(e) {
            // 解锁
            this.data.painting = false
            wx.hideLoading();
            const imgPath = e.detail.path;
            this.data.imgPath = imgPath
            // 如果当前正在绘制分享给好友的分享图
            if (this.data.paintingCard) {
                // 单独赋值不需要合成的时候
                this.setData({
                    "shareMsgData.shareImg": imgPath // 分享给好友卡片图
                });
                // 完成后设置false
                this.data.paintingCard = false
                return false
            }
            // 直接返回路径模式
            if (this.data.mode == 'path') {
                this.triggerEvent('path', imgPath)
                return false
            }
            // 直接弹窗模式
            if (this.data.mode == 'popup') {
                this.setData({
                    shareImage: imgPath,
                    imgVisible: true
                });
                return false;
            }

            this.setData({
                visible: false, // 分享弹窗关闭
                shareImage: imgPath,
                imgVisible: true
            });
        },
        // 保存到相册
        saveImg() {
            const _this = this
            wxSaveAuth().then(res => {
                wx.saveImageToPhotosAlbum({
                    filePath: _this.data.imgPath,
                    success(res) {
                        wx.showToast({
                            title: "保存图片成功",
                            icon: "success",
                            duration: 2000
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

        },
        /**
         * 小程序生成动态二维码参数
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
                    const params = Object.assign(this.data.shareData, {
                        qrcode: codeImg
                    })
                    // 模板
                    return drawPoster(params)
                }).then(res => {
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
                    // getCodeUrl是为获取动态生成的二维码，并未对接，开发者可自行修改
                    getCodeUrl(parmas)
                        .then(res => {
                            this.data.cache[url] = res.codeUrl
                            resolve(res.codeUrl)
                        })
                        .catch(err => {
                            wx.showToast({
                                title: "生成二维码失败,请稍后重试",
                                icon: "none"
                            })
                            reject(err)
                        })
                }
            })
        }
    }
})
