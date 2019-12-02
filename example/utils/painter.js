// 海报图
export  function drawPoster(data) {
  return new Promise(function(resolve, reject) {
    switch (data.shareType) {
        case 'index':
          resolve(drawIndexPoster(data)) 
        default:
          resolve(drawIndexPoster(data)) 
    }
  })
}
// 分享给好友图片需要合成是有调用
export function drawCard(data) {
  return new Promise(function (resolve, reject) {
      switch (data.shareType) {
          case 'index':
            resolve(drawIndexCard(data)) 
          default:
            resolve(drawIndexCard(data)) 
      }
  })
}
// 分享个人中心
function drawIndexPoster(index) {
  let startTop = 0
      return ({
        width: '325rpx',
        height: '325rpx',
        background: '#fff',
        views: [
          {
            type: 'text',
            text: index.shareTitle,
            css:{
              textAlign: 'center',
              width:'200rpx',
              top: `${startTop + 40}rpx`,
              maxLines: 2,
              fontSize: '18rpx'
            }
          }
        ],
      });
}
// 分享个人中心
function drawIndexCard() {
  const text = '锄禾日当午汗滴禾下土谁知盘中餐粒粒皆辛苦';
    const views = [];
    let tmpText = '';
    let index = 0;
    for (let i = 0; i < text.length; i++) {
      tmpText = `${tmpText}${text[i]}\n`;
      if (i % 5 === 4) {
        views.push({
          type: 'text',
          text: tmpText,
          css: {
            right: `${50 + index}rpx`,
            top: '60rpx',
            fontSize: '40rpx',
            lineHeight: '50rpx',
          },
        });
        index += 50;
        tmpText = '';
      }
    }
    return ({
      width: '654rpx',
      height: '500rpx',
      background: '#eee',
      views: views,
    });
}