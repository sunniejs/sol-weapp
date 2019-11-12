/**
 *  获取相册权限
 */
export function wxSaveAuth() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    // 如果没有写入权限，则获取写入相册权限
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            resolve()
                        },
                        fail(err) {
                            reject(err)
                            // 用户拒绝授权
                            wx.showModal({
                                content: '检测到您没打开捷买士的相册权限，是否去设置打开？',
                                confirmText: '确认',
                                cancelText: '取消',
                                success(res) {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: res => {}
                                        })
                                    }
                                }
                            })
                        }
                    })
                } else {
                    resolve()
                }
            },
            fail(e) {
                reject(e)
            }
        })
    })
}

/**
 * 多文件下载并且保存 
 * @param {Array} urls 网络图片数组
 */
export function downloadImgs(urls) {
    wx.showLoading({
        title: '图片下载中',
        mask: true
    })
    const imageList = []
    // 循环数组
    for (let i = 0; i < urls.length; i++) {
        imageList.push(getTempPath(urls[i]))
    }
    const loadTask = []
    let index = 0
    while (index < imageList.length) {
        loadTask.push(
            new Promise((resolve, reject) => {
                // 将数据分割成多个promise数组
                Promise.all(imageList.slice(index, (index += 8)))
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        )
    }
    // Promise.all 所有图片下载完成后弹出
    Promise.all(loadTask)
        .then(res => {
            wx.showToast({
                title: '下载完成',
                duration: 3000
            })
        })
        .catch(err => {
            wx.showToast({
                title: `下载完成`,
                icon: 'none',
                duration: 3000
            })
        })
}
/**
 *
 * @param {String} url 单张网络图片
 */
//下载内容,临时文件路径
function getTempPath(url) {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url: url,
            success: function(res) {
                var temp = res.tempFilePath
                wx.saveImageToPhotosAlbum({
                    filePath: temp,
                    success: function(res) {
                        return resolve(res)
                    },
                    fail: function(err) {
                        reject(url + JSON.stringify(err))
                    }
                })
            },
            fail: function(err) {
                reject(url + JSON.stringify(err))
            }
        })
    })
}
