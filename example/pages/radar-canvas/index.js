// pages/radar-canvas/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        canvas: {
            color: 'rgba(255, 255, 255, 0.5)',
            gridColor: 'rgba(255, 255, 255, 0.5)',
            canvasWidth: 300,
            canvasHeight: 300,
            fontSize: 12,
            categories: ['行动力', '影响力', '消费力'],
            MaxDimension: 100
        },
        radarData: [50, 50, 56]
        // chanel: [['行动力', 50], ['影响力', 20], ['消费力', 60]]
    },
    onShow() {
        // setTimeout(() => {
        //     const radarData = this.returnRadarData(this.data.dimension)
        //     this.setData({ radarData })
        // }, 500)
    },
    // 重组数据
    returnRadarData(dimension) {
        return {
            radarList: dimension
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})
