/*
 * @Author: Sunnie
 * @Date: 2021-09-06 18:42:25
 * @Last Modified by: Sunnie
 * @Last Modified time: 2021-09-09 09:37:41
 */

const CONFIG = {
    during: 1000, // :number 动画时间
    height: 40, // :number 滚动行高 px
    width: "100%", // 组件整体宽度
    ease: "cubic-bezier(0, 1, 0, 1)", // 动画过渡效果
    color: "#000", // 字体颜色
    columnStyle: "", // 字体单元 覆盖样式
};
const LOCK = 500; // 锁止

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: String,
        // min 最小值 不传默认为 0
        min: String,
        // 是否生成随机
        random: {
            type: Boolean,
            value: false,
        },
        // max 最大值 不传默认为 value, random 为true 生效
        max: String,
        // len 随机数字个数 ，random 为true 生效
        len: {
            type: Number,
            value: 100,
        },
        options: {
            type: Object,
            value: {},
        },
    },
    data: {
        columns: [],
        _options: JSON.parse(JSON.stringify(CONFIG)),
        animationData: null,
    },

    attached() {
        this.renderStyle();
    },

    /**
     * 组件的方法列表
     */
    methods: {
      start() {
            let { animationData } = this.data;
            if (animationData) {
              this.reset()
              this.run()
            }else{
              this.run()
            }
        },
        run(){
          let { _options } = this.data;
            // 创建数组
            const arr = this.setRange();
            this.setData({
                columns: arr,
            });
            // 创建一个动画实例
            let animation = wx.createAnimation({
                duration: _options.during,
                timingFunction: _options.ease,
            });
            animation
                .translateY(-(arr.length - 1) * _options.height + "px")
                .step();
            this.setData({
                animationData: animation.export(),
            });
        },
        // 重置
        reset() {
          let animation = wx.createAnimation({
            duration: 0,
          });
          this.setData({
              animationData: animation.translateY(0).step().export(),
              columns: [],
          });
        },

        // 生成打乱的数组
        randArray(len, min, max) {
            return Array.from(
                { length: len },
                (v) => Math.floor(Math.random() * (max - min)) + min
            );
        },
        // 设置滚动数字
        setRange() {
            let { max, min, value, random, len } = this.properties;
            let arr = [];
            // 最小值
            if (min.trim() == "" || isNaN(min)) {
                min = 0;
            }
            if (value.trim() == "" || isNaN(value)) {
                value = 0;
            }
            if (max.trim() == "" || isNaN(max)) {
                max = value;
            }
            if (random) {
                min = parseInt(min);
                max = parseInt(max);
                if (min >= max) {
                    min = max;
                    return [value];
                }
                if (len > LOCK) {
                    len = LOCK;
                }
                arr = this.randArray(len, min, max - 1);
                arr.push(value);
                return arr;
            } else {
                min = parseInt(min);
                max = parseInt(value);
                if (min > max) {
                    min = max;
                }
                if (max - min > LOCK) {
                    min = max - LOCK;
                }
                for (let i = min; i <= value; i++) {
                    arr.push(i);
                }
                return arr;
            }
        },
        renderStyle() {
            /**
             * color,
             * columnStyle,
             * width,
             * height,
             * during,
             * ease,
             */
            let options = this.properties.options,
                _options = this.data._options;
            Object.keys(options).map((i) => {
                let val = options[i];
                switch (i) {
                    case "during":
                    case "height":
                        if (parseInt(val) || val === 0 || val === "0") {
                            _options[i] = val;
                        }
                        break;
                    default:
                        val && (_options[i] = val);
                        break;
                }
            });
            this.setData({
                _options,
            });
        },
    },
});
