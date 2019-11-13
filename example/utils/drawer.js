export  function drawTemplate(data) {
  return new Promise(function(resolve, reject) {
    switch (data.shareType) {
        case 'index':
          resolve(drawIndex(data)) 
        default:
          resolve(drawIndex(data)) 
    }
  })
}
 
// 分享个人中心
function drawIndex(index) {
    const padding = 10 // 图片padding
    let posWidth = 325 // 图片默认宽度
    let posHeight = 325 // 图片默认宽度
    let scale = 1.5
    let top = 0
    return {
        width: posWidth * scale,
        height: posHeight * scale,
        clear: true,
        views: [
            {
                type: 'rect',
                background: '#ffffff',
                top: 0,
                left: 0,
                width: posWidth * scale,
                height: posHeight * scale
            },
             // title
            {
              type: 'text',
              textAlign: 'center',
              content: index.shareTitle,
              width: 200 * scale,
              left: (posWidth / 2) * scale,
              top: (top + 40) * scale,
              bolder: true,
              breakWord: true,
              MaxLineNumber: 2,
              lineHeight: 25 * scale,
              fontSize: 18 * scale,
              color: '#333333',
            },
            {
                type: 'image',
                url: index.qrcode,
                top: (top + 97) * scale,
                left: 86 * scale,
                width: 155 * scale,
                height: 155 * scale
            },
            {
                type: 'text',
                content: '扫描或长按识别二维码',
                fontSize: 14 * scale,
                color: '#666666',
                top: (top + 282) * scale,
                left: 94 * scale
            }
        ]
    }
}