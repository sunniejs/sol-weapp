Component({
    externalClasses: ['sol-class'],
    properties: {
        // 数据
        chanel: {
            type: Array,
            value: [],
            observer(newVal, oldVal) {
                if (!this.data.isPainting) {
                    if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                        if (newVal) {
                            this.setData({
                                isPainting: true
                            })
                            this.readyPigment()
                        }
                    }
                }
            }
        },
        color: {
            type: String,
            value: 'rgba(255, 0, 0, 0.5)'
        },
        bgColor: {
            type: String,
            value: 'white'
        },
        // 一条线上的总节点数,绘制圆的个数
        numSlot: {
            type: Number,
            value: 5
        },
        // Canvas的宽度
        width: {
            type: Number,
            value: 400
        }
    },
    data: {
        numCount: 0,
        mCenter: 0,
        mAngle: 0,
        mRadius: 0,
        isPainting: false
    },
    ready() {
        this.radCtx = wx.createCanvasContext('radarCanvas', this)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        readyPigment() {
            const { chanel, width } = this.data
            const numCount = chanel.length
            this.setData({
                numCount: numCount,
                mCenter: width / 2, // 中心点
                mAngle: (Math.PI * 2) / numCount, // 单片角度
                mRadius: width / 2 - 60 // 半径(减去的值用于给绘制的文本留空间)
            })
            const inter = setInterval(() => {
                if (this.radCtx) {
                    clearInterval(inter)
                    this.radCtx.clearActions()
                    this.radCtx.save()
                    this.drawRadar()
                }
            }, 100)
        },
        // 雷达图
        drawRadar() {
            const { chanel, color } = this.data
            //调用
            this.drawArcEdge() // 画圆
            this.drawLinePoint()
            //设置数据
            this.drawRegion(chanel, color) //第一个人的
            //设置文本数据
            this.drawTextCans(chanel)
            // //设置节点
            // this.drawCircle(chanel, 'red')
            // this.drawCircle(sourceData2, 'yellow')
            //开始绘制
            this.radCtx.draw()
        },
        // 绘制6条边
        drawEdge: function() {
            const { mCenter, mAngle, numSlot, mRadius } = this.data
            this.radCtx.setStrokeStyle('white')
            this.radCtx.setLineWidth(2) //设置线宽
            for (var i = 0; i < numSlot; i++) {
                //计算半径
                this.radCtx.beginPath()
                var rdius = (mRadius / numSlot) * (i + 1)
                //画6条线段
                for (var j = 0; j < numCount; j++) {
                    //坐标
                    var x = mCenter + rdius * Math.cos(mAngle * j)
                    var y = mCenter + rdius * Math.sin(mAngle * j)
                    this.radCtx.lineTo(x, y)
                }
                this.radCtx.closePath()
                this.radCtx.stroke()
            }
        },
        //  第一步：绘制6个圆，可以通过修改numSlot的数的大小，来确定绘制几个圆
        drawArcEdge: function() {
            const { mCenter, numSlot, mRadius, bgColor } = this.data
            this.radCtx.setStrokeStyle(bgColor)
            this.radCtx.setLineWidth(2) //设置线宽
            for (var i = 0; i < numSlot; i++) {
                // 计算半径
                this.radCtx.beginPath()
                var rdius = (mRadius / numSlot) * (i + 1)
                // 画6条线段
                for (var j = 0; j < numSlot; j++) {
                    // //计算半径
                    this.radCtx.beginPath()
                    var rdius = (mRadius / numSlot) * (i + 1) //计算每个圆的半径
                    this.radCtx.arc(mCenter, mCenter, rdius, 0, 2 * Math.PI) //开始画圆
                    // this.radCtx.stroke()
                }
                this.radCtx.closePath()
                this.radCtx.stroke()
            }
        },

        // 绘制连接点
        drawLinePoint() {
            const { mCenter, mAngle, mRadius, numCount } = this.data

            this.radCtx.beginPath()
            for (var k = 0; k < numCount; k++) {
                console.log(mAngle * k)
                var x = mCenter + mRadius * Math.cos(mAngle * k)
                var y = mCenter + mRadius * Math.sin(mAngle * k)
                // console.log(x, y)
                this.radCtx.moveTo(mCenter, mCenter)
                this.radCtx.lineTo(x, y)
            }
            this.radCtx.stroke()
        },
        //绘制数据区域(数据和填充颜色)
        drawRegion: function(mData, color) {
            const { mCenter, mAngle, mRadius, numCount } = this.data
            this.radCtx.beginPath()
            for (var m = 0; m < numCount; m++) {
                var x = mCenter + (mRadius * Math.cos(mAngle * m) * mData[m][1]) / 100
                var y = mCenter + (mRadius * Math.sin(mAngle * m) * mData[m][1]) / 100

                this.radCtx.lineTo(x, y)
            }
            this.radCtx.closePath()
            this.radCtx.setFillStyle(color)
            this.radCtx.fill()
        },

        // //绘制文字
        drawTextCans: function(mData) {
            const { mCenter, mAngle, mRadius, numCount } = this.data
            this.radCtx.setFillStyle('white')
            this.radCtx.font = 'bold 17px cursive' //设置字体
            for (var n = 0; n < numCount; n++) {
                var x = mCenter + mRadius * Math.cos(mAngle * n)
                var y = mCenter + mRadius * Math.sin(mAngle * n)
                // this.radCtx.fillText(mData[n][0], x, y);
                //通过不同的位置，调整文本的显示位置
                if (mAngle * n >= 0 && mAngle * n <= Math.PI / 2) {
                    this.radCtx.fillText(mData[n][0], x + 5, y + 5)
                } else if (mAngle * n > Math.PI / 2 && mAngle * n <= Math.PI) {
                    this.radCtx.fillText(mData[n][0], x - this.radCtx.measureText(mData[n][0]).width - 7, y + 5)
                } else if (mAngle * n > Math.PI && mAngle * n <= (Math.PI * 3) / 2) {
                    this.radCtx.fillText(mData[n][0], x - this.radCtx.measureText(mData[n][0]).width - 5, y)
                } else {
                    this.radCtx.fillText(mData[n][0], x + 7, y + 2)
                }
            }
        },
        //画点
        drawCircle: function(mData, color) {
            const { mCenter, mAngle, mRadius, numCount } = this.data
            var r = 3 //设置节点小圆点的半径
            for (var i = 0; i < numCount; i++) {
                var x = mCenter + (mRadius * Math.cos(mAngle * i) * mData[i][1]) / 100
                var y = mCenter + (mRadius * Math.sin(mAngle * i) * mData[i][1]) / 100

                this.radCtx.beginPath()
                this.radCtx.arc(x, y, r, 0, Math.PI * 2)
                this.radCtx.fillStyle = color
                this.radCtx.fill()
            }
        }
    }
})
