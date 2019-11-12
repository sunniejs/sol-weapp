// pages/save-imgs/index.js
import { wxSaveAuth, downloadImgs } from '../../utils/download'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        urls: [
            'https://avatars0.githubusercontent.com/u/35954879?s=120&v=4',
            'https://avatars0.githubusercontent.com/u/35954879?s=120&v=4',
            'https://avatars0.githubusercontent.com/u/35954879?s=120&v=4',
            'https://avatars0.githubusercontent.com/u/35954879?s=120&v=4',
            'https://avatars0.githubusercontent.com/u/35954879?s=120&v=4',
            'https://avatars0.githubusercontent.com/u/35954879?s=120&v=4',
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    download() {
        // 获取保存到相册权限
        wxSaveAuth().then(() => {
            // 保存多张图片到相册
            downloadImgs(this.data.urls)
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})
