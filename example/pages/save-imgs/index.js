// pages/save-imgs/index.js
import { wxSaveAuth, downloadImgs } from '../../utils/download'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        urls: [
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160008479.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160013201.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160015969.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160025498.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160031519.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160042689.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160108243.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190301160111756.jpg',
            'https://timgs.top1buyer.com/admin/special/special_img_20190304160141454.jpg'
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    download() {
        // 获取保存到相册权限
        wxSaveAuth()
            .then(() => {
                // 保存多张图片到相册
                return downloadImgs(this.data.urls)
            })
            .then(res => {
                wx.showToast({
                    title: '下载完成',
                    duration: 3000
                })
            })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})
