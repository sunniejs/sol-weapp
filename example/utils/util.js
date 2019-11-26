//保存图片到相册
export const writePhotosAlbum = (successFun,failFun) =>{
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: function () {
            successFun && successFun()
          },
          fail: function (res) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: "小程序需要您的微信授权保存图片，是否重新授权？",
              showCancel: true,
              cancelText: "否",
              confirmText: "是",
              success: function (res2) {
                if (res2.confirm) { //用户点击确定'
                  wx.openSetting({
                    success: (res3) => {
                      if (res3.authSetting['scope.writePhotosAlbum']) {
                        //已授权
                        successFun && successFun()
                      } else {
                        failFun && failFun()
                      }
                    }
                  })
                } else {
                  failFun && failFun()
                }
              }
            });
          }
        })
      } else {
        successFun && successFun()
      }
    }
  })
}

 