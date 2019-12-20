// var e = require("../../../@babel/runtime/helpers/interopRequireDefault"),
//   a = e(require("../../../@babel/runtime/helpers/objectSpread")),
//   t = require("../../../D6907B75E8D50DDFB0F613724E004234.js"),
//   n = require("../../../A97144C6E8D50DDFCF172CC116714234.js"),
//   o = e(require("../../../D5245C73E8D50DDFB3423474ED804234.js")),
//   i = require("../../../C40FBB32E8D50DDFA269D335A08A4234.js"),
//   r = e(require("../../../C77B79B2E8D50DDFA11D11B5955B4234.js")),
//   s = e(require("../../../930D4FF0E8D50DDFF56B27F7492C4234.js")),
//   u = e(require("../../../3FA07343E8D50DDF59C61B440BDA4234.js")),
 var d = getApp(),
  l = null,
  h = null,
  redEnvelopes = [], // c
  m = null,
  p = 30,
  g = 40,
  f = 5,
  w = {
    title: "甩甩宝宝红包雨，我已领，人人有份，快去薅羊毛！！！",
    imageUrl: "https://cdn.webuy.ai/assets/img/2019/11/05/n_1572944564666_4506___size500x400.png"
  },
  v = {
    title: "就差你一次助力了，拆开红包一起拿！",
    imageUrl: "https://cdn.webuy.ai/assets/file/11/03/n_1541246418144_2454.jpg"
  },
  y = {
    title: "感谢老铁，我的红包已到手！送你一个红包种子，快来领取",
    imageUrl: "https://cdn.webuy.ai/assets/file/11/03/n_1541249080796_8793.jpg"
  },
  I = {
    title: "品牌直发 正品低至一折！",
    imageUrl: "https://cdn.webuy.ai/assets/img/2019/04/27/n_1556360689105_8121___size750x600.jpg"
  },
  S = {
    type: 2,
    code: 1,
    backUrl: "/pages/newIndex/newIndex",
    option: {}
  };

Component({
  properties: {
    showType: {
      type: String,
      default: "redEnvelopeRain",
      observer: function (e) {
        this.setData({
          showType: e
        });
      }
    },
    info: {
      type: Object,
      default: {
        showRainType: "everyDay"
      }
    },
    playType: {
      type: [Number, String],
      default: 0
    }
  },
  data: {
    rainShowHour: null,
    reminderCount: 3,
    showStatus: 2,
    groupStatus: 2,
    showRainTotalTime: 5,
    showShare: !1,
    filePath: "",
    windowWidth: 375,
    windowHeight: 555,
    rainResult: {},
    orderPrize: null,
    loading: !1,
    openGroupTeamId: null,
    groupTimes: ["24", "00", "00"],
    // moneyCount: "2019/12/12" === (0, u.default)().format("YYYY/MM/DD") ? "5.000.000" : "1.000.000"
  },
  ready: function () {
    c = [], clearTimeout(l), clearTimeout(h), this.cancelCustomAnimationFrame(m);
    var showType=this.data.showType
      if(showType=== "redEnvelopeRain" ){
        this.getRainShowHour()
        this.cultdown()
      }else if( showType==="openGroupEnvelope"){
        this.setData({
          groupStatus: 1
        })
      }else{
        this.updateCultDownTimes();
      }
      var userInfo= s.default.getStorageSync(s.default.constants.userInfo)
      var  systemInfo = d.globalData.systemInfo
      var windowWidth = systemInfo.windowWidth
      var windowHeight= systemInfo.windowHeight
      this.setData({
        windowWidth: windowWidth,
        windowHeight:windowHeight,
        userAvatar: userInfo.avatarUrl
      });
      // var e = this.data.showType;
    // "redEnvelopeRain" === e ? (this.getRainShowHour(), this.cultdown()) : "openGroupEnvelope" === e ? this.setData({
    //   groupStatus: 1
    // }) : this.updateCultDownTimes();

    // var a = s.default.getStorageSync(s.default.constants.userInfo),
    //   t = d.globalData.systemInfo,
    //   n = t.windowWidth,
    //   o = t.windowHeight;
    // this.setData({
    //   windowWidth: n,
    //   windowHeight: o,
    //   userAvatar: a.avatarUrl
    // });
  },
  detached: function () {
    d.globalData.shareConfig = null, l && clearInterval(l), h && clearInterval(h), m && this.cancelCustomAnimationFrame(m);
  },
  methods: {
    handleClose: function () {
      d.globalData.shareConfig = null, this.triggerEvent("onClose"), o.default.togglePageListStatus(!1);
    },
    getRainShowHour: function () {
     var rainDateShowMap=s.default.getStorageSync(s.default.constants.rainDateShowMap) || {}
     keys = Object.keys(rainDateShowMap);
      if(  keys.length > 0 ){
        this.setData({
          rainShowHour: keys[keys.length - 1]
        });
      }

      // var e = s.default.getStorageSync(s.default.constants.rainDateShowMap) || {},
      //   a = Object.keys(e);
      // a.length > 0 && this.setData({
      //   rainShowHour: a[a.length - 1]
      // });
    },
    updateCultDownTimes: function () {
      if (o.default.checkIfRainRangeDate()) {
        var e = new Date("2018-11-11 24:00:00"),
          a = (0, i.countDown)(e.getTime(), "d: hh : mm : ss", !0);
        a < 24 && this.setData({
          groupTimes: a
        });
      }
    },
    showRainResult: function () {
      var e = this,
        a = this.data,
        n = a.info;
      return !a.loading && (this.data.loading = !0, this.cancelCustomAnimationFrame(m),
        setTimeout(function () {
          if (1 === e.data.playType) {
            var a = {};
            d.globalData.fromRedShare && (a.shareUserId = d.globalData.shareUserId), t.redPackage.getCRoundRedpackage(a, S).then(function (a) {
              var t = a.entry;
              if (t) try {
                var s = t.coupons,
                  u = t.freeOrder,
                  d = t.amount,
                  l = t.redPackage;
                l && (l.prizeValue = r.default.formatAmountFixed2(l.prizeValue), l.gmtStart = (0,
                      i.formatTime)(l.gmtStart, "M.D h:m"), l.gmtEnd = (0, i.formatTime)(l.gmtEnd, "M.D h:m"),
                    102 === l.redPackageType && e.updateCultDownTimes()), "doubleDay" === n.showRainType && o.default.storeRainHour(),
                  e.setData({
                    showStatus: 3,
                    rainResult: {
                      couponList: s,
                      redPackageInfo: l,
                      freeOrder: u,
                      amount: d ? r.default.formatAmountFixed2(d) : 0
                    }
                  });
              } catch (a) {
                e.setData({
                  showStatus: 3,
                  rainResult: !1
                });
              } else e.setData({
                showStatus: 3,
                rainResult: !1
              });
            }, function () {
              e.setData({
                showStatus: 3,
                rainResult: !1
              });
            });
          } else t.redPackage.lotteryDraw({}, S).then(function (a) {
            var t = a.entry,
              u = a.date;
            if (t) try {
              var d = t.coupons,
                l = t.freeOrder,
                h = t.amount,
                c = t.redPackage;
              c && (c.prizeValue = r.default.formatAmountFixed2(c.prizeValue), c.gmtStart = (0,
                    i.formatTime)(c.gmtStart, "M.D h:m"), c.gmtEnd = (0, i.formatTime)(c.gmtEnd, "M.D h:m"),
                  102 === c.redPackageType && e.updateCultDownTimes()), "doubleDay" === n.showRainType && o.default.storeRainHour(),
                e.setData({
                  showStatus: 3,
                  rainResult: {
                    couponList: d,
                    redPackageInfo: c,
                    freeOrder: l,
                    amount: h ? r.default.formatAmountFixed2(h) : 0
                  }
                });
            } catch (a) {
              console.log("rain result err:", a), e.setData({
                showStatus: 3,
                rainResult: !1
              });
            } else e.setData({
              showStatus: 3,
              rainResult: !1
            });
            if (o.default.checkShouldShowPerRain(u)) {
              var m = new Date(u).getDate(),
                p = s.default.getStorageSync(s.default.constants.perRedPacketMap) || {};
              p[m] = !0, s.default.setStorageSync(s.default.constants.perRedPacketMap, p);
            }
            o.default.storeRainHour();
          }, function () {
            e.setData({
              showStatus: 3,
              rainResult: !1
            });
          });
        }, 200), !0);
    },
    showRain: function () {
    var _this=this;
    this.setData({
      showStatus: 2
    })
    this.initRain();
    var countDown=5;
    h = setInterval(function () {
      if(--countDown <= 0 ){
        clearInterval(h)
        if(m){
          _this.showRainResult()
          _this.cancelCustomAnimationFrame(m)
        }
      } 
      _this.setData({
        showRainTotalTime:countDown
      });
      // --a <= 0 && (clearInterval(h), m && (e.showRainResult(), e.cancelCustomAnimationFrame(m))),
      //   e.setData({
      //     showRainTotalTime: a
      //   });
    }, 1000);

      // var e = this;
      // this.setData({
      //   showStatus: 2
      // }), this.initRain();
      // var a = 5;
      // h = setInterval(function () {
      //   --a <= 0 && (clearInterval(h), m && (e.showRainResult(), e.cancelCustomAnimationFrame(m))),
      //     e.setData({
      //       showRainTotalTime: a
      //     });
      // }, 1e3);
    },
    cultdown: function () {
      var _this=this;
      var reminderCount= this.data.reminderCount;
      timer=setInterval(function () {
        if(--reminderCount <= 0 ){
          clearInterval(timer)
          _this.showRain()
        } 
        _this.setData({
          reminderCount:reminderCount
        });
        // --a <= 0 && (clearInterval(l), e.showRain()),
        //  e.setData({
        //   reminderCount: a
        // });
      }, 1000);
      // var e = this,
      //   a = this.data.reminderCount;
      // l = setInterval(function () {
      //   --a <= 0 && (clearInterval(l), e.showRain()), e.setData({
      //     reminderCount: a
      //   });
      // }, 1e3);
    },
    // 随机数
    // randNum: function (e, a) {
    //   return Math.floor(e + Math.random() * (a - e));
    // },
    customRequestAnimationFrame: function (e) {
      var a = this,
        t = setTimeout(function () {
          e.call(a), clearTimeout(t);
        }, 1e3 / 60);
      return t;
    },
    cancelCustomAnimationFrame: function (e) {
      e && (clearTimeout(e), m = null);
    },
    doDrawRain: function () {
      var context = this.context,
      _this = this.data,
        windowWidth = _this.windowWidth,
        windowHeight = _this.windowHeight;
       context.clearRect(0, 0,windowWidth, windowHeight);
      for (var index = 0; index < redEnvelopes.length; index += 1) {
        var i = redEnvelopes[index],
         x = i.x,
         y = i.y,
         vx = i.vx,
         vy = i.vy, 
          width = i.width,
          height = i.height,
          isOpen = i.open,
          img = isOpen ? this.openEnvelopeImg : this.redEnvelopeImg,
          width = isOpen ? width + 20 :width,
          height = isOpen ? height + 25 :height;
          context.drawImage(img, x, y,width,height),
           i.x += vx,  // 速度
           i.y += vy, // 速度
           i.y >= windowHeight && (i.y = 0, i.open =false), // 到底
           i.x + width <= 0 && (i.x = windowWidth - width, i.open = false);
      }
      context.draw()
      m = this.customRequestAnimationFrame(this.doDrawRain);
      // var e = this.context,
      //   a = this.data,
      //   t = a.windowWidth,
      //   n = a.windowHeight;
      // e.clearRect(0, 0, t, n);
      // for (var o = 0; o < c.length; o += 1) {
      //   var i = c[o],
      //     r = i.x,
      //     s = i.y,
      //     u = i.vx,
      //     d = i.vy,
      //     l = i.width,
      //     h = i.height,
      //     p = i.open,
      //     g = p ? this.openEnvelopeImg : this.redEnvelopeImg,
      //     f = p ? l + 20 : l,
      //     w = p ? h + 25 : h;
      //   e.drawImage(g, r, s, f, w), i.x += u, i.y += d, i.y >= n && (i.y = 0, i.open = !1),
      //     i.x + l <= 0 && (i.x = t - l, i.open = !1);
      // }
      // e.draw(), m = this.customRequestAnimationFrame(this.doDrawRain);
    },
      // 随机数
    randNum: function (min, max) {
      return Math.floor(min + Math.random() * (max - min));
    },
    initRainDrops: function () {
      var _this = this.data,
      windowWidth = _this.windowWidth, 
      windowHeight = _this.windowHeight
      for (var n = 0; n < 10; n += 1) {
        // Math.random() 返回0-1随机数
        var x = Math.floor(Math.random() *windowWidth),
          i = Math.floor(Math.random() *windowHeight),
          randNum = this.randNum(p, g),
          height = Math.floor(randNum / .8),
          startY = 1 * Math.random() + f;
          redEnvelopes.push({
            x: o,
            y: i,
            vx: -1,
            vy: startY,
            width: randNum,
            height: height,
            open: false
          });
      }
      this.doDrawRain();  
      // for (var e = this.data, a = e.windowWidth, t = e.windowHeight, n = 0; n < 10; n += 1) {
      //   var o = Math.floor(Math.random() * a),
      //     i = Math.floor(Math.random() * t),
      //     r = this.randNum(p, g),
      //     s = Math.floor(r / .8),
      //     u = 1 * Math.random() + f;
      //   c.push({
      //     x: o,
      //     y: i,
      //     vx: -1,
      //     vy: u,
      //     width: r,
      //     height: s,
      //     open: !1
      //   });
      // }
      // this.doDrawRain();
    },
    handleClickRain: function (e) {
      var touch = e.touches[0] 
      var touchX =touch.x 
      var touchY =touch.y 
      for (o = 0; o < redEnvelopes.length; o += 1) {
        var i = redEnvelopes[o],
        rainX = i.x,
        rainY = i.y,
        width = i.width,
        height = i.height,
        gapX = touchX - rainX,
        gapY = touchY - rainY;
        if (gapX >= -20 && gapX <= width + 20 && gapY >= -20 && gapY <= height + 20) {
          i.open = true;
          break;
        }
      }
      // for (var a = e.touches[0], t = a.x, n = a.y, o = 0; o < c.length; o += 1) {
      //   var i = c[o],
      //     r = i.x,
      //     s = i.y,
      //     u = i.width,
      //     d = i.height,
      //     l = t - r,
      //     h = n - s;
      //   if (l >= -20 && l <= u + 20 && h >= -20 && h <= d + 20) {
      //     i.open = !0;
      //     break;
      //   }
      // }

    },
    initRain: function () {
        this.context = wx.createCanvasContext("rain-canvas", this)
         this.redEnvelopeImg = "./images/red-packet-rain.png",
         this.openEnvelopeImg = "./images/red-packet-rain-open.png"
         this.initRainDrops();
    },
    handleOpenGroupEnvelope: function () {
      this.setData({
        groupStatus: 2
      });
    },
    handleCreateGroupEnvelope: function () {
      var e = this,
        n = this.data.info.activityBody;
      this.data.openGroupTeamId ? this.handleShare() : t.redPackage.creatFissionRedPackage({
        couponTemplateId: n,
        subBizType: 302
      }, (0, a.default)({}, S, {
        type: 0
      })).then(function (a) {
        var t = a.entry,
          n = t.marketTeamId;
        t && n ? (e.data.openGroupTeamId = n, e.handleShare()) : e.handleGotoHome();
      });
    },
    handleGotoHome: function () {
      this.triggerEvent("onClose"), d.toSomePages("/pages/newIndex/newIndex");
    },
    handleShare: function () {
      this.setData({
        showShare: !0
      }), this.setShareInfo(), this.getShareImg();
    },
    closeShareBox: function () {
      this.setData({
        showShare: !1
      });
    },
    closeShareImg: function () {
      this.setData({
        showImg: !1,
        showShare: !1
      });
    },
    setShareInfo: function () {
      var e = this.data,
        a = e.showType,
        t = e.rainResult,
        n = t && t.redPackageInfo && 102 === t.redPackageInfo.redPackageType;
      if ("groupEnvelope" === a || n) {
        var o = n ? t.redPackageInfo.marketTeamId : this.data.info.marketTeamId,
          i = v;
        i.path = "doubleEleven/pages/redEnvelope/redEnvelope?uId=".concat(s.default.getStorageSync(s.default.constants.myUId), "&mTeamId=").concat(o),
          d.globalData.shareConfig = i;
      } else if ("openGroupEnvelope" === a) {
        var r = this.data.openGroupTeamId,
          u = y;
        u.path = "doubleEleven/pages/redEnvelope/redEnvelope?uId=".concat(s.default.getStorageSync(s.default.constants.myUId), "&mTeamId=").concat(r),
          d.globalData.shareConfig = u;
      } else if (1 === this.data.playType) {
        var l = I;
        l.path = "pages/newIndex/newIndex?tag=825&uId=".concat(s.default.getStorageSync(s.default.constants.myUId)),
          d.globalData.shareConfig = l;
      } else {
        var h = w;
        h.path = "pages/newIndex/newIndex?uId=".concat(s.default.getStorageSync(s.default.constants.myUId)),
          d.globalData.shareConfig = h;
      }
    },
    shareMoments: function () {
      var e = this.data.filePath;
      d.saveImg(e);
    },
    getShareImg: function () {
      var e = this,
        a = this.data,
        t = a.showType,
        i = a.rainResult,
        r = i && i.redPackageInfo && 102 === i.redPackageInfo.redPackageType,
        u = o.default.getNextRainFormatTime(),
        d = s.default.getStorageSync(s.default.constants.userInfo),
        l = d.nickName,
        h = d.avatarUrl,
        c = {};
      if ("groupEnvelope" === t || r) {
        var m = this.data.info.marketTeamId;
        if (r) m = i.redPackageInfo.marketTeamId;
        c = {
          type: 27,
          nextRedRainTime: u,
          avatar: h,
          nickName: l,
          memberCount: 0,
          marketTeamId: m
        };
      } else if ("openGroupEnvelope" === t) {
        c = {
          type: 27,
          nextRedRainTime: u,
          avatar: h,
          nickName: l,
          memberCount: this.data.info.memberCount,
          marketTeamId: this.data.openGroupTeamId
        };
      } else {
        var p = i.couponList,
          g = i.redPackageInfo,
          f = i.freeOrder,
          w = i.amount;
        if (f) c = {
          type: 21,
          avatar: h,
          freeOrderAllAmount: w,
          nextRedRainTime: u
        };
        else if (1 === this.data.playType) c = {
          type: 1,
          linkType: 24,
          avatar: h,
          nickName: l,
          backgroundImgUrl: "assets/img/2019/08/13/n_1565698797828_8093___size1080x1920.jpeg"
        };
        else if (c = {
            type: 23,
            avatar: h,
            nickName: l,
            nextRedRainTime: u
          }, g && (c.redPackageAmount = g.prizeValue), p && p.length > 0) {
          var v = p[0];
          c.preferentialAmount = v.preferentialAmount / 100, c.constraintAmount = v.constraintAmount / 100,
            c.exhibitionParkName = v.exhibitionParkName, c.usePlaceType = v.usePlaceType, c.couponUseStartTime = v.gmtStart,
            c.couponUseEndTime = v.gmtEnd;
        }
      }
      wx.showShLoading({
        title: "图片正在生成",
        mask: !0
      }), n.share.shareToMoments(c, S).then(function (a) {
        wx.hideLoading();
        var t = "https://cdn.webuy.ai/".concat(a.entry);
        e.setData({
          filePath: t,
          showImg: !0
        });
      }, function () {
        wx.hideLoading(), e.setData({
          showImg: !1
        });
      });
    },
    handleScrollTouch: function () {}
  }
});