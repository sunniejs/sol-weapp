Component({
    externalClasses: ['sol-class'],
    properties: {
        // 画图数据
        canvas: {
            type: Object,
            value: {}
        },
        // 数据
        radarData: {
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
        isPainting: false,
        radarRepeatData: {}
    },
    ready() {
        this.radCtx = wx.createCanvasContext('radarCanvas', this)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        readyPigment() {
            const defaultCanvas = {
                color: '#fff', // 蒙版颜色
                gridColor: '#fff', // 雷达线颜色
                labelColor: '#fff', // 字体颜色
                canvasWidth: 400, // canvas 宽度
                canvasHeight: 400, // canvas 高度
                fontSize: 20, // 字体大小
                categories: ['行动力', '影响力', '消费力'], // 字体大小
                MaxDimension: 100
            }
            Object.assign(defaultCanvas, this.properties.canvas)
            this.setData({
                canvas: defaultCanvas
            })
            const { canvasWidth } = this.properties.canvas
            // 数据
            const { radarData } = this.properties
            const numCount = radarData.length
            // 角度
            this.setData({
                numCount: numCount,
                mCenter: canvasWidth / 2, // 中心点
                mAngle: (Math.PI * 2) / numCount, // 单片角度
                mRadius: canvasWidth / 2 - 60 // 半径(减去的值用于给绘制的文本留空间)
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
            const { color, categories } = this.properties.canvas
            const { radarData } = this.data
            //调用
            this.drawArcEdge() // 画圆
            this.drawLinePoint()
            //设置数据
            this.drawRegion(radarData, color)
            //设置文本数据
            // draw label text

            this.drawTextCans(categories)
            this.drawCircle(radarData, 'white') //设置节点
            //开始绘制
            this.radCtx.draw()
        },

        // 绘制圆圈
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
                    //坐标 -1 * item + Math.PI / 2
                    var x = mCenter + rdius * Math.cos(-1 * mAngle * j + Math.PI / 2)
                    var y = mCenter + rdius * Math.sin(-1 * mAngle * j + Math.PI / 2)
                    this.radCtx.lineTo(x, y)
                }
                this.radCtx.closePath()
                this.radCtx.stroke()
            }
        },

        //  第一步：绘制6个圆，可以通过修改numSlot的数的大小，来确定绘制几个圆
        drawArcEdge: function() {
            const { gridColor } = this.properties.canvas
            const { mCenter, numSlot, mRadius } = this.data
            for (var i = 0; i < numSlot; i++) {
                // 计算半径
                // this.radCtx.beginPath()
                var rdius = (mRadius / numSlot) * (i + 1)
                var space = (2 * Math.PI) / rdius / 1.2
                // 画虚线圆
                this.radCtx.setLineWidth(2)
                this.radCtx.setStrokeStyle(gridColor)
                this.radCtx.setLineCap('square')
                var start = 0 //从原点开始画
                while (start <= 2 * Math.PI) {
                    var end = start + space
                    this.radCtx.beginPath() //开始一个新的路径
                    this.radCtx.arc(mCenter, mCenter, rdius, start, end, false)
                    start = space + end
                    this.radCtx.stroke() //对当前路径进行描边
                }

                // // 画6条线段
                // for (var j = 0; j < numSlot; j++) {
                //     // //计算半径
                //     this.radCtx.beginPath()
                //     var rdius = (mRadius / numSlot) * (i + 1) //计算每个圆的半径
                //     // this.radCtx.arc(mCenter, mCenter, rdius, 0, 2 * Math.PI) //开始画圆
                //     // this.radCtx.stroke()
                // }
                // this.radCtx.closePath()
                // this.radCtx.stroke()
            }
            this.radCtx.arc(mCenter, mCenter, rdius, 0, 2 * Math.PI) //开始画圆
        },
        drawDashCircle: function(cxt_arc, thex, they, raduis, space, gridColor) {
            space = space || (2 * Math.PI) / 100
            cxt_arc.setLineWidth(1)
            cxt_arc.setStrokeStyle(gridColor)
            cxt_arc.setLineCap('square')
            var start = 0 //从原点开始画
            while (start <= 2 * Math.PI) {
                var end = start + space
                cxt_arc.beginPath() //开始一个新的路径
                cxt_arc.arc(thex, they, raduis, start, end, false)
                start = space + end
                cxt_arc.stroke() //对当前路径进行描边
            }
        },

        // 绘制连接点
        drawLinePoint() {
            const { mCenter, mAngle, mRadius, numCount } = this.data
            this.radCtx.beginPath()
            for (var k = 0; k < numCount; k++) {
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
            const anchorList = []
            for (var m = 0; m < numCount; m++) {
                var x = mCenter + (mRadius * Math.cos(mAngle * m) * mData[m]) / 100
                var y = mCenter + (mRadius * Math.sin(mAngle * m) * mData[m]) / 100
                let tmp = {
                    x: x,
                    y: y
                }
                // 描边数组
                anchorList.push(tmp)
                this.radCtx.lineTo(x, y)
            }
            this.radCtx.closePath()
            this.radCtx.setFillStyle(color)
            this.radCtx.fill()
            // 描边
            this.drawLine(anchorList)
        },
        // 绘制连接点
        drawLine(anchorList) {
            this.radCtx.beginPath()
            this.radCtx.setLineWidth(2)
            for (let i = 0; i < anchorList.length; i++) {
                if (i == anchorList.length - 1) {
                    this.radCtx.moveTo(anchorList[i].x, anchorList[i].y)
                    this.radCtx.lineTo(anchorList[0].x, anchorList[0].y)
                } else {
                    this.radCtx.moveTo(anchorList[i].x, anchorList[i].y)
                    this.radCtx.lineTo(anchorList[i + 1].x, anchorList[i + 1].y)
                }
            }
            this.radCtx.stroke()
            // const { mCenter, mAngle, mRadius, numCount } = this.data
            // this.radCtx.beginPath()
            // for (var k = 0; k < numCount; k++) {
            //     var x = mCenter + mRadius * Math.cos(mAngle * k)
            //     var y = mCenter + mRadius * Math.sin(mAngle * k)
            //     // console.log(x, y)
            //     this.radCtx.moveTo(mCenter, mCenter)
            //     this.radCtx.lineTo(x, y)
            // }
            // this.radCtx.stroke()
        },
        // //绘制文字
        drawTextCans: function(mData) {
            const { labelColor, fontSize } = this.properties.canvas
            const { mCenter, mAngle, mRadius, numCount } = this.data
            this.radCtx.setFillStyle(labelColor)
            this.radCtx.setFontSize(fontSize)
            // this.radCtx.font = 'bold 17px cursive' //设置字体
            for (var n = 0; n < numCount; n++) {
                var x = mCenter + mRadius * Math.cos(mAngle * n)
                var y = mCenter + mRadius * Math.sin(mAngle * n)
                //通过不同的位置，调整文本的显示位置
                if (mAngle * n >= 0 && mAngle * n <= Math.PI / 2) {
                    this.radCtx.fillText(mData[n], x + 5, y + 5)
                } else if (mAngle * n > Math.PI / 2 && mAngle * n <= Math.PI) {
                    this.radCtx.fillText(mData[n], x - this.radCtx.measureText(mData[n]).width - 7, y + 5)
                } else if (mAngle * n > Math.PI && mAngle * n <= (Math.PI * 3) / 2) {
                    this.radCtx.fillText(mData[n], x - this.radCtx.measureText(mData[n]).width - 5, y)
                } else {
                    this.radCtx.fillText(mData[n], x + 7, y + 2)
                }
            }
        },
        //画点
        drawCircle: function(mData, color) {
            const { mCenter, mAngle, mRadius, numCount } = this.data
            var r = 4 //设置节点小圆点的半径
            for (var i = 0; i < numCount; i++) {
                var x = mCenter + (mRadius * Math.cos(mAngle * i) * mData[i]) / 100
                var y = mCenter + (mRadius * Math.sin(mAngle * i) * mData[i]) / 100

                this.radCtx.beginPath()
                this.radCtx.arc(x, y, r, 0, Math.PI * 2)
                this.radCtx.fillStyle = color
                this.radCtx.fill()
            }
        }
    }
})
