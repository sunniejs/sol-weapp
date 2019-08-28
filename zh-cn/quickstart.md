## 开始之前 😊

使用 Sol Weapp 前，请确保你阅读过微信官方的 [小程序简易教程](https://developers.weixin.qq.com/miniprogram/dev/) 和[自定义组件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/) 。

## 使用

下载 [GitHub](https://github.com/sunnie1992/sol-weapp) Sol Weapp 的代码，然后将 components/ 目录下你需要的组件拷贝到你的组件目录下

```bash
git clone https://github.com/sunnie1992/sol-weapp.git
```

## 引入组件

以 Wheel 大转盘组件为例，将 components/s-wheel/拷贝到你的组件目录下,在引用页面 json 文件中配置 Wheel 对应的路径即可。

```json
// index.json
{
  "usingComponents": {
    "s-wheel": "/components/s-wheel/index"
  }
}
```
