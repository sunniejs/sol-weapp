## 红包雨

红包雨,在规定时间内屏幕下落红包，点击获取随机金额。
红包发放模式分为两种

- 红包总金额有上限，比如：15 秒 100 块金额随机生成 10 个红包下落速度不可控制。
- 红包总金额无上限，比如：15 秒红包雨，可设置速度，设置每个红包随机金额的最大值最小值。

## 引入

```json
{
  "usingComponents": {
    "s-packetrain": "/components/s-packetrain/index"
  }
}
```

## 使用

```html
<s-packetrain
  visible="{{visible}}"
  total="{{total}}"
  mode="{{mode}}"
  createSpeed="{{createSpeed}}"
  decimal="{{decimal}}"
  number="{{number}}"
  time="{{time}}"
  readyTime="{{readyTime}}"
  min="{{min}}"
  max="{{max}}"
  bind:finish="success"
></s-packetrain>
```

## API

| 参数        | 类型     | 描述                                                                        | 默认值 |
| ----------- | -------- | --------------------------------------------------------------------------- | ------ |
| visible     | Boolean  | 是否开始展示游戏                                                            | false  |
| mode        | Number   | 红包发放模式<code> 1 </code>:红包总金额有上限<code>2 </code>:红包金额无上限 | 1      |
| createSpeed | Number   | 红包下落速度,数值越小，速度越快。<code>mode 为 2 时生效 </code> 。          | 400    |
| time        | Number   | 游戏时间，单位秒                                                            | 15     |
| readyTime   | Number   | 倒计时准备时间,单位秒                                                       | 5      |
| total       | Number   | 红包总金额 <code>mode 为 1 时生效 </code>                                   | 100    |
| number      | Number   | 红包个数 <code>mode 为 1 时生效 </code>                                     | 1      |
| min         | Number   | 单个红包，最小金额                                                          | 0      |
| max         | Number   | 单个红包，最大金额                                                          | 3      |
| decimal     | Number   | 金额小数点后位数                                                            | 0      |
| bind:finish | Function | 完成后的回调函数                                                            | -      |

## 效果展示

![logo](../_images/2.gif)
