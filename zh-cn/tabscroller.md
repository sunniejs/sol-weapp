## Tab 滚动导航

Tab 滚动导航,可以通过点击 Tab ,下拉面板,滑动页面三种方式进行切换 ,并且计算 tab 滚动到中间位置。

## 引入

```json
{
  "usingComponents": {
    "sol-scoll-nav": "/dist/scoll-nav/index"
  }
}
```

## 使用

```html
<sol-scoll-nav tabs="{{list}}" current="{{index}}" bindchange="onTabsChange"></sol-scoll-nav>
<swiper class="container" current="{{index}}" duration="300" bindchange="onSwitchTab">
  <swiper-item wx:for="{{list}}" wx:key="index">
    <view class="content">
      {{index}}--{{item.title}}
    </view>
  </swiper-item>
</swiper>
```

## API

| 参数        | 类型     | 描述                         | 默认值 |
| ----------- | -------- | ---------------------------- | ------ |
| tabs        | Array    | tabs 数据                    | []     |
| current     | String   | 设置 tabs 滚动导航激活 index | 6      |
| bind:change | Function | 切换面板的回调函数           | -      |

## 效果展示

![logo](../_images/1.gif)
