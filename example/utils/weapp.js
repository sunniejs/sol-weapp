var i = null
const util = {
    getSystemInfoSync: function () {
        return (i = i || wx.getSystemInfoSync()) || {};
    }
};
export default util
