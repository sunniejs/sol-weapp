## 老虎机

点击开始，表现出滚动效果，停止弹射效果的动画效果，随机产生三个滚轮停止对应位置，从 1 开始。
开发者可根据自身需求修改组件。

## 引入

```json
{
  "navigationBarTitleText": "老虎机",
  "usingComponents": {
    "sol-slot-machine": "/dist/slot-machine/index"
  }
}
```

## 使用

```html
<sol-slot-machine result="{{result}}" id="sol-slot-machine" bind:finish="doFinish" />
```

```js
// 通过调用组件开始方法开始动画效果
this.selectComponent('#sol-slot-machine').start()
```

## API

| 参数        | 类型     | 描述                      | 默认值  |
| ----------- | -------- | ------------------------- | ------- |
| result      | Array    | 滚轮停止对应区域从 1 开始 | [2,2,2] |
| bind:finish | Function | 成功后的回调函数          | -       |

## 效果展示

![logo](../_images/5.gif)
