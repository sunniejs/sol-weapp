//app.js
import util from "./utils/weapp";

App({
    onLaunch: function(options) {
        if (wx.canIUse("getUpdateManager")) {
            const updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function(res) {
                // 请求完新版本信息的回调
            });
            updateManager.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        } else if (res.cancel) {
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function() {
                // 新版本下载失败
                console.log("onUpdateFailed");
            });
        } else {
            wx.showModal({
                title: "提示",
                content: "您的微信版本过低，建议升级到最新版本。"
            });
        }
        this.getSystemInfo();
    },
    onShow: function(options) {
        let _this = this;
        wx.getSystemInfo({
            success: res => {
                // 全局存手机信息
                _this.globalData.mobile = res;
                if (res.model.search("iPhone X") != -1) {
                    _this.globalData.isIphoneX = true;
                }
            }
        });
    },
    getSystemInfo: function() {
        var info = util.getSystemInfoSync();
        var iphoneX = "";
        if (info) {
            var statusBarHeight = info.statusBarHeight;
            var model = info.model;
            var windowHeight = info.windowHeight;
            var totalTopHeight = 68;
            model.indexOf("iPhone X") !== -1
                ? ((totalTopHeight = 94), (iphoneX = "iphone-x"))
                : -1 !== model.indexOf("iPhone") ? (totalTopHeight = 64) : -1 !== model.indexOf("MI 8") && (totalTopHeight = 88);
            var titleBarHeight = totalTopHeight - statusBarHeight;
            this.globalData.systemInfo =Object.assign({},info, {
              statusBarHeight,
              titleBarHeight,
              totalTopHeight,
              iphoneX,
              windowHeight
          } )   
        }
    },
    globalData: {
        systemInfo: {},
        mobile: null, // 手机信息
        isIphoneX: null, // 是否是IphoneX
        userInfo: null
    }
});
