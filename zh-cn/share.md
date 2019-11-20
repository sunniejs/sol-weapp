## 微信分享组件

点击分享，弹出分享弹出，方式包括：微信分享给好友生成二维码图片保存到相册。开发者可根据自身需求修改组件。
 注意！！！
- 该组件由多个组件组成，需要引入canvas-drawer(生成canvas图片) ， wux(弹窗组件) 和 image-btn(将button改成img用户触发微信方法)  
- 动态生成二维码功能集成在组件内部，开发者可根据自身需求修改组件。

## 引入

```json
{
  "navigationBarTitleText": "底部分享弹窗",
  "usingComponents": {
      "sol-share-sheet": "/dist/share-sheet/index"
  }
}

```

## 使用

```html
<sol-share-sheet visible="{{showShare}}" share-data="{{shareData}}" />
```


## API

| 参数        | 类型     | 描述                                                                                                 | 默认值 |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------- | ------ |
| shareData   | Object   | 分享数据                                                                                             | {}     |
| mode        | String   | bar: 分享弹出，可以转发好友，或者生成图片 popup: 无分享弹窗，直接显示图片弹出 path: 直接返回图片路径 | bar    |
| onlyFriend | Boolean | 只可通过微信分享                                                                                     | false      |
| visible | Boolean | 显示底部弹窗                                                                               | false      |
| transparent | Boolean | 弹出窗背景透明                                                                             | false      |


## 效果展示

![logo](../_images/6.gif)
