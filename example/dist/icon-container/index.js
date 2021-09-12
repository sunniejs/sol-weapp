/*
 * @Author: Sunnie 
 * @Date: 2021-09-06 18:42:25 
 * @Last Modified by: Sunnie
 * @Last Modified time: 2021-09-06 18:42:59
 */
const App = getApp()

Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['sol-class'],
    options: {
        multipleSlots: true
    },
    properties: {
        // 容器高度
        height: {
            type: Number,
            value: 0,
            observer: 'updated'
        },
        // 距离顶部高度
        top: {
            type: Number,
            value: 80
        },
        // 距离底部高度
        bottom: {
            type: Number,
            value: 100
        },
        // 回到初始位置
        reset: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal) {
                this.setData({
                    y: this.data.areaH - this.data.height
                })
            }
        }
    },
    /**
     * 组件的初始数据
     */

    data: {
        x: 10,
        y: 0,
        areaH: 0,
        areaBottom: 0,
        iphoneX: App.globalData.isIphoneX, // 适配iphoneX
        windowHeight: App.globalData.mobile.windowHeight
    },
    /**
     * 组件的方法列表
     */
    methods: {
        updated() {
            // 如果是iphoneX添加安全距离
            const areaBottom = this.data.iphoneX ? this.data.bottom + 34 : this.data.bottom
            //  计算可以移动的高度
            const areaH = this.data.windowHeight - areaBottom - this.data.top
            this.setData({
                areaBottom: areaBottom, // 底部位置
                areaH: areaH, // 移动区域
                y: areaH - this.data.height // 当前位置
            })
        }
    }
})
