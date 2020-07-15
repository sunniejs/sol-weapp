// 保存到相册
function saveImageToAlbum(temps) {
    return PromiseForEach(temps, url => {
        return new Promise((resolve, reject) => {
            wx.saveImageToPhotosAlbum({
                filePath: url,
                success: function(res) {
                    resolve(res);
                },
                fail: function(err) {
                    resolve(err);
                }
            });
        });
    });
}
/**
 * Promise 顺序执行
 */

function PromiseForEach(arr, cb) {
    let realResult = [];
    let result = Promise.resolve();
    arr.forEach((a, index) => {
        result = result.then(() => {
            return cb(a).then(res => {
                realResult.push(res);
            });
        });
    });
    return result.then(() => {
        return realResult;
    });
}
/**
 * 多文件下载并且保存
 * @param {Array} urls 网络图片数组
 */
export function downloadImgs(urls) {
    return new Promise((resolve, reject) => {
        const imageList = [];
        urls.forEach(url => {
            imageList.push(getTempPath(url));
        });
        Promise.all(imageList)
            .then(res => {
                const temps = [];
                res.forEach(el => {
                    if (el.statusCode === 200) {
                        temps.push(el.path);
                    }
                });
                // 保存到相册
                saveImageToAlbum(temps).then(res => {
                    const success = res.filter(
                        el => el.errMsg === "saveImageToPhotosAlbum:ok"
                    );
                    resolve(`下载完成共${urls.length}张,成功${success.length}张`)
                });
            })
            .catch(e => {
                reject(e);
            });
    });
}
/**
 * 下载内容,临时文件路径
 * @param {String} url 单张网络图片
 */
function getTempPath(url) {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url: url,
            success: function(res) {
                resolve({
                    statusCode: res.statusCode,
                    path: res.tempFilePath
                });
            },
            fail: function(err) {
                reject(url + JSON.stringify(err));
            }
        });
    });
}
