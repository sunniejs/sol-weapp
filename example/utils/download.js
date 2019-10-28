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
 * 多文件下载并且保存，所有文件下载成功才算返回成功
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
        imageList.push(getTempPath(urls[i], i, urls.length))
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
                    .catch(res => {
                        reject(res)
                    })
            })
        )
    }
    // Promise.all
    Promise.all(loadTask).then(res => {
        resolve('success')
    })
}
/**
 *
 * @param {String} url 单张网络图片
 */
//下载内容,临时文件路径
function getTempPath(url, index, amount) {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url: url,
            success: function(res) {
                var temp = res.tempFilePath
                wx.saveImageToPhotosAlbum({
                    filePath: temp,
                    success: function(res) {
                        wx.showLoading({
                            title: `正在下载${index}/${amount}`,
                            icon: 'none'
                        })
                        return resolve(res)
                    },
                    fail: function(err) {
                        console.log(err)
                        reject(err)
                    }
                })
                //  resolve(temp)
            },
            fail: function(err) {
                reject(err)
            }
        })
    })
}
