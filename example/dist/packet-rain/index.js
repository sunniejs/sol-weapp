const innerAudioContext = wx.createInnerAudioContext();
const APP = getApp();
let readyTimer = null;
let rainTimer = null;
let redEnvelopes = [];
let animation = null;
const minWidth = 30; // 红包图片最小宽度
const maxWidth = 40; // 红包图片最大宽度
Component({
    properties: {
        // 是否开始展示游戏
        visible: {
            type: Boolean,
            value: false
        },
        // 游戏时间
        time: {
            type: Number,
            value: 10
        },
        // 倒计时单位秒
        readyTime: {
            type: Number,
            value: 3
        },
        //  速度
        createSpeed: {
            type: Number,
            value: 5
        },
        // 单个最小金额
        min: {
            type: Number,
            value: 0
        },
        // 单个最大金额
        max: {
            type: Number,
            value: 3
        }
    },
    data: {
        showRainTotalTime: 10, // 红包雨时间
        showStatus: 1, // 红包雨状态：1:准备倒计时，2:正在红包雨，3:红包雨结束
        windowWidth: 375,
        windowHeight: 555,
        rainResult: {},
        loading: false,
        showScore: 0,
        showChangeScore: 0,
        scoreStyle: ""
    },
    ready: function() {
        // 重置
        redEnvelopes = [];
        clearTimeout(readyTimer);
        clearTimeout(rainTimer);
        this.cancelCustomAnimationFrame(animation);
        // 开始准备倒计时
        this.cultdown();
        const { windowWidth, windowHeight } = APP.globalData.systemInfo;
        this.data.windowWidth = windowWidth;
        this.data.windowWidth = windowHeight;
    },
    detached: function() {
        readyTimer && clearInterval(readyTimer);
        rainTimer && clearInterval(rainTimer);
        animation && this.cancelCustomAnimationFrame(animation);
    },
    methods: {
        // 开始准备倒计时
        cultdown: function() {
            let _this = this;
            let { readyTime } = this.data;
            readyTimer = setInterval(function() {
                if (--readyTime <= 0) {
                    clearInterval(readyTimer);
                    // 显示红包雨
                    _this.showRain();
                }
                _this.setData({
                    readyTime: readyTime
                });
            }, 1000);
        },
        // 展示红包雨界面
        showRain: function() {
            let _this = this;
            // 显示红包雨
            this.setData({
                showStatus: 2
            });
            // 初始化红包雨
            this.initRain();

            // 倒计时进度条
            this.ininProgress();
            // 红包雨倒计时
            let showRainTotalTime = this.data.time;
            rainTimer = setInterval(function() {
                if (--showRainTotalTime <= 0) {
                    clearInterval(rainTimer);
                    if (animation) {
                        // 结束
                        _this.showRainResult();
                        _this.cancelCustomAnimationFrame(animation);
                    }
                }
                _this.setData({
                    showRainTotalTime
                });
            }, 1000);
        },
        // 倒计时进度条
        ininProgress() {
            const { time } = this.data;
            const animation = wx.createAnimation({
                duration: time * 1000
            });
            animation.translateX(-120).step();
            this.setData({
                progressAni: animation.export()
            });
        },
        //分数动画
        animationOfScore(x, y) {
            const position = wx.createAnimation({
                duration: 0
            });
            position
                .left(x)
                .top(y)
                .step();
            this.setData({
                scoreAni: position.export()
            });
            const animation = wx.createAnimation({
                duration: 300,
                timingFunction: "ease"
            });
            animation.opacity(1).step();
            setTimeout(
                function() {
                    animation.opacity(0).step();
                    this.setData({
                        scoreAni: animation.export()
                    });
                }.bind(this),
                10
            );
        },
        // 关闭
        handleClose: function() {
            this.triggerEvent("finish");
        },
        // 显示结果
        showRainResult: function() {
            // 结束动画
            this.cancelCustomAnimationFrame(animation);
            this.setData({
                showStatus: 3,
                rainResult: {
                    amount: 100
                }
            });
        },
        // 红包下落函数
        customRequestAnimationFrame: function(e) {
            let _this = this;
            let timer = setTimeout(function() {
                e.call(_this);
                clearTimeout(timer);
            }, 1000 / 60);
            return timer;
        },
        // 清除红包下落函数
        cancelCustomAnimationFrame: function(e) {
            e && (clearTimeout(e), (animation = null));
        },
        // 开始下落
        doDrawRain: function() {
            const context = this.context;
            const { windowWidth, windowHeight } = this.data;
            context.clearRect(0, 0, windowWidth, windowHeight);
            for (let n = 0; n < redEnvelopes.length; n += 1) {
                const i = redEnvelopes[n]; // 红包
                const { x, y, vx, vy, width, height, open } = i;
                const img = open ? this.openEnvelopeImg : this.redEnvelopeImg;
                const imgWidth = open ? width + 20 : width;
                const imgHeight = open ? height + 25 : height;
                context.drawImage(img, x, y, imgWidth, imgHeight);
                i.x += vx;
                i.y += vy;
                i.y >= windowHeight && ((i.y = 0), (i.open = false));
                i.x + width <= 0 &&
                    ((i.x = windowWidth - width), (i.open = false));
            }
            context.draw();
            // 下落函数
            animation = this.customRequestAnimationFrame(this.doDrawRain);
        },
        // 随机数
        randNum: function(min, max) {
            return Math.floor(min + Math.random() * (max - min));
        },
        // 准备红包雨下落
        initRainDrops: function() {
            const {
                windowWidth,
                windowHeight,
                createSpeed,
                max,
                min
            } = this.data;
            for (let n = 0; n < 10; n += 1) {
                const startX = Math.floor(Math.random() * windowWidth);
                const startY = Math.floor(Math.random() * windowHeight);
                // 红包图片宽度大小30~40
                const width = this.randNum(minWidth, maxWidth);
                // 宽度为红包高度的百分之八十
                const height = Math.floor(width / 0.8);
                // 速度
                const vy = 1 * Math.random() + createSpeed;
                // 红包金额
                const score = this.randNum(min, max + 1);
                redEnvelopes.push({
                    x: startX,
                    y: startY,
                    vx: -1, // x轴速度
                    vy: vy, // y轴速度
                    score: score,
                    width: width,
                    height: height,
                    open: false
                });
            }
            this.doDrawRain();
        },
        // 点击红包事件
        handleClickRain: function(e) {
            let touch = e.touches[0];
            let touchX = touch.x;
            let touchY = touch.y;
            let _this = this;
            for (let o = 0; o < redEnvelopes.length; o += 1) {
                let i = redEnvelopes[o],
                    rainX = i.x,
                    rainY = i.y,
                    width = i.width,
                    height = i.height,
                    gapX = touchX - rainX,
                    gapY = touchY - rainY;
                if (
                    gapX >= -20 &&
                    gapX <= width + 20 &&
                    gapY >= -20 &&
                    gapY <= height + 20
                ) {
                    _this.animationOfScore(touchX, touchY);
                    innerAudioContext.play();
                    i.open = true;
                    let score = _this.data.showScore + i.score;
                    _this.setData({
                        showScore: score,
                        showChangeScore: i.score
                    });

                    break;
                }
            }
        },
        // 初始化 canvas
        initRain: function() {
            this.context = wx.createCanvasContext("rain-canvas", this);
            (this.redEnvelopeImg = "./images/red-packet-rain.png"),
                (this.openEnvelopeImg = "./images/red-packet-rain-open.png");
            // 初始化红包雨
            this.initRainDrops();
            // 音效
            this.audioOfClick();
        },
        handleScrollTouch: function() {},
        audioOfClick() {
            innerAudioContext.autoplay = false;
            innerAudioContext.src = "https://imgs.solui.cn/weapp/dianji.mp3";
            innerAudioContext.onPlay(() => {});
            innerAudioContext.onError(res => {});
        }
    }
});
