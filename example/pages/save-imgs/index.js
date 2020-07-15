// pages/save-imgs/index.js
import { downloadImgs } from "../../utils/download";
import { wxSaveAuth } from "../../utils/wx";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        urls: [
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png1",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png",
            "https://imgs.solui.cn/weapp/me.png"
        ],
        isFire: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    onShow: function() {
        this.data.isFire = false;
    },
    download() {
        // 上锁
        if (this.data.isFire) return;
        this.data.isFire = true;
        // 获取保存到相册权限
        wxSaveAuth()
            .then(() => {
                wx.showLoading({
                    title: "图片下载中",
                    mask: true
                });
                // 保存多张图片到相册
                downloadImgs(this.data.urls)
                    .then(res => {
                        wx.showToast({
                            title: res,
                            icon: "none",
                            duration: 2000
                        });
                        this.data.isFire = false;
                    })
                    .catch(err => {
                        wx.showToast({
                            title: "下载失败",
                            icon: "none",
                            duration: 2000
                        });
                        this.data.isFire = false;
                    });
            })
            .catch();
        //  downloadImgs(this.data.urls)
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
