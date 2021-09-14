## 滚动数字

数字滚动效果

## 引入

```json
{
  "usingComponents": {
    "sol-animate-number": "/dist/animate-number/index"
  }
}
```

## 使用

 
```html
 <sol-animate-number random id="animate1"  value="{{100}}" min="{{50}}" max="{{150}}" len="{{100}}" options="{{options}}"></sol-animate-number>

```


## API

| 参数        | 类型     | 描述                         | 默认值 |
| ----------- | -------- | ---------------------------- | ------ |
| value        | Number    |  值   | ''   |
| min           | Number   | 数字区间，最小值 |    min 最小值 不传默认为 0  |
| options       | Object |    during: 动画时间 , height: 滚动行高 px,  width: 组件整体宽度,  ease: 动画过渡效果 , color: 字体颜色 , columnStyle: 字体单元 覆盖样式       |    {}  |
| random        | Boolean    |  数字区间是否随机生成   | false   |
| max          | Number |max 数字区间，最大值 不传默认为 value, random 为true 生效     |  -    |
| len           | Number | len 数字区间数值个数 ，random 为true 生效        | 100     |

1.在某个数字区间`顺序`滚动时候只需要设置 value 和 min （区间跨度最大500）。
2.在某个数字区间`随机`滚动时候 ，设置random 为true 时，配合 min  max 和 len（默认100，最多500） 使用 。
 
## 效果展示

![logo](../_images/8.gif)
