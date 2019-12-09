// 海报图
export function drawPoster(data) {
    return new Promise(function(resolve, reject) {
        switch (data.shareType) {
            case "index":
                // 个人分享图
                resolve(drawIndexPoster(data));
                case "goods":
                  // 商品分享图
                resolve(drawGoodsPoster(data));
            default:
                break;
        }
    });
}
// 分享给好友图片需要合成调用
export function drawCard(data) {
    return new Promise(function(resolve, reject) {
        switch (data.shareType) {
            case "goods":
                resolve(drawGoodsCard(data));
            default:
                break;
        }
    });
}
// 分享个人中心
function drawIndexPoster(index) {
    let startTop = 0;
    let padding=30;
    let posWidth = 325; // 图片默认宽度
    let posHeight = 325; // 图片高度
    const views = [
        
      {
        type: "text",
        text: index.shareTitle,
        css: {
            fontSize: "15rpx",
            color: "#333333",
            maxLines: 2,
            lineHeight:'25rpx',
            align: 'center',
            width: `${posWidth-padding}rpx`,
            top: `${startTop + 40}rpx`,
            left:`${posWidth/2}rpx`,
            fontWeight: "bold"
        }
    },
        {
            type: "image",
            url: index.shareImg,
            css: {
                top: `${startTop + 97}rpx`,
                left: "86rpx",
                width: "155rpx",
                height: "155rpx"
            }
        },
        {
            type: "text",
            text: "扫描或长按识别二维码",
            css: {
                fontSize: "14rpx",
                color: "#666666",
                bottom: '30rpx',
                left: "94rpx"
            }
        }
    ];
    return {
        width: `${posWidth}rpx`,
        height: `${posHeight}rpx`,
        background: "#fff",
        borderRadius: "5rpx",
        views: views
    };
}
// 分享商品海报图
function drawGoodsPoster(goods) {
  let startTop = 40;
  let padding=12;
  let posWidth = 325; // 图片默认宽度
  let posHeight = 479; // 图片高度
  // 折扣
  let discount= parseFloat(goods.goodsMoney / goods.goodsPrice*10).toFixed(1)
  const views = [
    {
        type: "text",
        text: goods.shareTitle,
        css: {
            left: `${padding}rpx`,
            top: "13rpx",
            fontSize: "14rpx",
            maxLines: 1,
            width: "300rpx"
        }
    },
    {
        type: "image",
        url: goods.shareImg,
        css: {
            width: "325rpx",
            height: "325rpx",
            top: `${startTop}rpx`
        }
    },
    {
      type: "text",
      text: "到手价",
      css:{
        left: `${padding}rpx`,
        fontSize: "13rpx",
        bottom: "81rpx",
        color: "#333333"
    }
    },
    {
        type: "text",
        text: "¥",
        css: {
            left: '54rpx',
            bottom: "80rpx",
            color: "#FF5000",
            fontSize: "15rpx"
        }
    },
    {
        id: "goods-money",
        type: "text",
        text: `${goods.goodsMoney}`,
        css: {
            left: '63rpx',
            bottom: "79rpx",
            color: "#FF5000",
            fontSize: "30rpx"
        }
    },
    // 折扣
    {
        type: "rect",
        css: {
            bottom: "80rpx",
            left: ['70rpx', "goods-money"],
            color: "#FFF4F4",
            borderRadius: "8rpx",
            width: "36rpx",
            height: "16rpx"
        }
    },
    {
        type: "text",
        text: `${discount == 10 ? "原价" :discount + "折"} `,
        css: {
            left: ['74rpx', "goods-money"],
            bottom: "83rpx",
            color: "#FF5000",
            fontSize: "11rpx"
        }
    },
    {
        type: "text",
        text: `¥${goods.goodsPrice}`,
        css: {
            left: ['112rpx', "goods-money"],
            bottom: "83rpx",
            color: "#9C9C9C",
            fontSize: "12rpx",
            textDecoration: "line-through"
        }
    },
    {
        type: "image",
        url: goods.qrcode,
        css: {
            width: "79rpx",
            height: "79rpx",
            bottom: "27rpx",
            right: "15rpx"
        }
    },
    {
        type: "text",
        text: "长按二维码选购",
        css: {
            right: "20rpx",
            bottom: "13rpx",
            color: "#666666",
            fontSize: "9rpx"
        }
    }
];
  return {
      width: `${posWidth}rpx`,
      height: `${posHeight}rpx`,
      background: "#FFFFFF",
      borderRadius: "5rpx",
      views: views
  };
}
// 分享商品卡片分享图
function drawGoodsCard(goods) {
    let padding = 3; // 图片padding
    let posWidth = 210; // 图片默认宽度
    let posHeight = 168; // 图片高度
    const views = [
        {
            type: "rect",
            css: {
                left: `${padding}rpx`,
                top: `${padding}rpx`,
                color: "#fff",
                borderRadius: "2rpx",
                width: "204rpx",
                height: "131rpx"
            }
        },
        {
            type: "image",
            url: goods.shareImg,
            css: {
                left: "6rpx",
                top: "6rpx",
                width: "126rpx",
                height: "126rpx"
            }
        },
        {
            type: "text",
            text: "¥",
            css: {
                fontSize: "14rpx",
                color: "#FF5000",
                top: "59rpx",
                right: "64rpx"
            }
        },
        {
            type: "text",
            text: `${goods.goodsMoney}`,
            css: {
                fontSize: "21rpx",
                color: "#FF5000",
                top: "53rpx",
                left: "149rpx"
            }
        },
        {
            type: "text",
            text: `${goods.goodsPrice}`,
            css: {
                left: "138rpx",
                top: "74rpx",
                color: "#999999",
                fontSize: "11rpx",
                textDecoration: "line-through"
            }
        },
        {
            type: "rect",
            css: {
                right: "6rpx",
                top: "102rpx",
                color: "#FF5000",
                borderRadius: "10rpx",
                width: "70rpx",
                height: "20rpx"
            }
        },
        {
            type: "text",
            text: "到手价：",
            css: {
                fontSize: "11rpx",
                color: "#333333",
                top: "39rpx",
                left: "137rpx"
            }
        },
        {
            type: "text",
            text: "立即购买",
            css: {
                fontSize: "11rpx",
                color: "#fff",
                top: "106rpx",
                right: "19rpx"
            }
        },
        {
            type: "text",
            text: "精选好物",
            css: {
                left: "109rpx",
                fontSize: "15rpx",
                bottom: "10rpx",
                color: "#fff"
            }
        }
    ];
    return {
        width: `${posWidth}rpx`,
        height: `${posHeight}rpx`,
        background: "#FF5000",
        borderRadius: "5rpx",
        views: views
    };
}
