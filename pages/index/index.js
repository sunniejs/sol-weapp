Page({
  data: {
    components: [
      {
        title: '营销组件',
        children: [
          {
            id: 'wheel',
            url: '/pages/wheel/index',
            name: '大转盘'
          },
          {
            id: 'picketRain',
            url: '/pages/packetRain/index',
            name: '红包雨'
          },
          {
            id: 'gridCard',
            url: '/pages/gridCard/index',
            name: '九宫格翻牌'
          }
        ]
      },
      {
        title: '页面demo',
        children: [
          {
            id: 'filter',
            url: '/pages/filter/index',
            name: '筛选'
          },
          {
            id: 'saveImgs',
            url: '/pages/saveImgs/index',
            name: '保存多张图片'
          },
          {
            id: 'tabScroller',
            url: '/pages/tabScroller/index',
            name: '横向滚动'
          }
        ]
      }
    ]
  },
  /* 转发*/
  onShareAppMessage: function(ops) {
    return {
      title: 'sol-weapp营销组件',
      path: '/pages/index/index',
      imageUrl: '../../assets/qrcode.jpg'
    }
  }
})
