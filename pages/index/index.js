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
            id: 'gridCard',
            url: '/pages/gridCard/index',
            name: '九宫格翻盘'
          },
          
        ],
      },
      {
        title: '页面demo',
        children: [
          {
            id: 'filter',
            url: '/pages/filter/index',
            name: '筛选'
          },
        ]
      },
      
    ]
  }
})
