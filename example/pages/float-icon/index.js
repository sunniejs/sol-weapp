const getList = (count = 30, step = 0) => [...new Array(count)].map((n, i) => ({
    title: `我是小仙女,爱你第 ${i + step}遍`,
    content: 'Wux Weapp'
}))
Page({
    data: {
        scrollTop: 0,
        scrollIng: false,
        items: [],
        count: 0
    },
    onLoad() {
        this.loadMore()
    },
    loadMore() {
          this.setData({
              items: [...this.data.items, ...getList(30, this.data.count)],
              count: this.data.count + 30
          })
    },
    // 微信到底
    onReachBottom: function () {
        this.loadMore()
    },
    // 页面滚动
    onPageScroll(e) {
        this.setData({
            scrollTop: e.scrollTop,
            scrollIng: true
        })
        let timer = setTimeout(() => {
            if (this.data.scrollTop === e.scrollTop) {
                this.setData({
                    scrollTop: e.scrollTop,
                    scrollIng: false
                })
                console.log('滚动结束')
                clearTimeout(timer)
            }
        }, 1000)
    },
    /* 转发*/
    onShareAppMessage: function (ops) {
        return {
            title: 'sol-weapp营销组件',
            path: '/pages/index/index',
            imageUrl: 'https://gitee.com/sunniejs/sol-weapp/raw/master/qrcode.jpg'
        }
    }
})
