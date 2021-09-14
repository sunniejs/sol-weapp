// pages/animate-number/index.js
Page({
    /**
     * Page initial data
     */
    data: {
      options:  {
        during: 4000,        // :number 动画时间
        height: 50,       // :number 滚动行高 px
        width: '100%',    // 组件整体宽度
        ease: 'cubic-bezier(0, 1, 0, 1)',   // 动画过渡效果
        color: '#02BE8A', // 字体颜色
        columnStyle: 'font-size:48rpx;'  // 字体单元 覆盖样式
      }
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {},

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {},

    /**
     * Lifecycle function--Called when page show
     */
    onReady: function () {
        this.start("animate0");
        this.start("animate1");
    },
    // 开始
    start(id) {
        this.selectComponent("#" + id) && this.selectComponent("#" + id).start();
    },
    // 重置
    reset(e) {
        const { id } = e.currentTarget.dataset;
        this.start(id);
    },
    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {},

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {},

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {},

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {},

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {},
});
