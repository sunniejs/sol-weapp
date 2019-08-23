## 大转盘

点击抽奖，转盘转动，结束后弹出对应奖项

## 引入

```json
{
  "usingComponents": {
    "s-wheel": "/components/s-wheel/index"
  }
}
```

## 使用

```html
<s-wheel award-numer="{{award}}" disabled="{{disabled}}" bind:success="wheelSuccess"></s-wheel>
```

## API

| 参数       | 类型   | 描述 | 默认值   |
| ---------- | ------ | ---- | -------- |
| awardNumer | Number | 是   | 画布宽度 |
| disabled   | Number | 是   | 画布高度 |

## 效果展示

![logo](../_images/1.gif)
