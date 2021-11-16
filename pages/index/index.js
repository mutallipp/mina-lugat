var t = wx.getBackgroundAudioManager(), app = getApp(), e = null;
var s = require("../../utils/share.js");
var util=require('../../utils/util.js')
const REQ=require("../../utils/request")
var c = void 0, o = wx.getRecorderManager(), n = {
  duration: 3e4,
  sampleRate: 16e3,
  encodeBitRate: 96e3,
  numberOfChannels: 1,
  // format: "mp3"
},
  r = function (t) {
    o.onStop(function (e) {
      t && t(e);
    });
  };

Page({
  data: {
    hidden:true,
    txt:'',
    netije:'',
    winWidth: 0,
    winHeight: 0,
    mezmun: "",
    kilixim: 1,
    kun:0,
    is_use:0,
    tarkat:false,
    recodePath:null,
    isRecode:false,
    is_auth_record:0,
    til:1,
    pinyin:null,
    resultList:util.getStorageSync("resultList")||[],
    scrollTop:"{{scrollTop}}",
    toView:"item0",
    showModal:false,
    showModalData:{
      content:"请给权限",
      confimText:"确认",
      isGetUserInfo:true
    }
  },
  onLoad: function () {
      // this.check_kilxim()
      this.check_auth()
      s.check_day()
    let t = new Date(), c = t.getFullYear() + "" + (t.getMonth() + 1) + t.getDate(),self=this
    // 拿到加载组件UI
    this.loading=this.selectComponent('#loading-model');
    setTimeout(()=>{
      self.toViewBottomFun(self.data.resultList.length-1)
    })
    
  },

  confim(e){
    console.log()
  },

  checkPremisstion(){
    // 查看是否授权
    let t=this
    return new Promise((resolve,reject)=>{
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                t.setData({
                  showModal:false
                })
                resolve()
              }
            })
          }else{
            t.setData({
              showModal:true
            })
            reject()
          }
        }
      })
    })
    
},
  onTapStart: function (res) {
    var t = this;
    t.setData({
      show:true,
      herket:true
    })
    app.getRecordAuth(
      function(e){
        app.logger(e)
      },
      function(){}
      )
    // wx.startRecord({
    //   success: function (res){
    //     var tempFilePath = res.tempFilePath;
        
    //     t.setData({ recodePath: tempFilePath, isRecode: true });
    //     app.logger(t.data.recodePath)

    //   },
    //   fail: function (res){
    //     app.logger('recordstart fail')
    //   }
    // })
    o.start(n)
  },

  toViewBottomFun: function(len) {
    // 设置屏幕自动滚动到最后一条消息处
    console.log(this.data.resultList.length);
    this.setData({
      toView:`item${len}`
    })

  },

  onTapEnd:function(e){
    var t=this;
    let {from,filePath}=e.detail
    const base64   = 'data:image/jpg;base64,'+ wx.getFileSystemManager().readFileSync( filePath, 'base64' );
    console.log(filePath);
    this.voiseRecognition(base64)
    // this.translateBytext(content,convert,false)
    t.setData({
      show: false,
      herket: false
    })
    app.logger('end record')
    // o.stop()
    // wx.showToast({
    //   title: 'تەرجىمە قىلىۋاتىدۇ ',
    //   icon: 'loading',
    //   duration: 20000,

    // })

    // o.onStop(function(res){
    //   app.logger(res.tempFilePath)
    //   t.setData({ isRecode: false });

    //   app.logger('upload=' + res.tempFilePath)
    //   // 开始上传文件
    //   utils.upload_file('/uploadmp3/', res.tempFilePath, 'mp3', 'kong',
    //     function (res) {
    //         app.logger(res)
    //     },
    //     function (res) {

    //     }
    //   )
    //   wx.hideToast()

    // })
  },
  voiseRecognition(base64fale){
    let data={
      audio:base64fale,
      lang:"uyghur",
      domain: "common"
    }
    REQ.voiseRecognition(data).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  },

  bindsendTxt(e){
    let content=e.detail.inputValue,t=this,
    isSelf=this.data.til,
    convert=this.data.til? 1 :7
 
    this.translateBytext(content,convert,isSelf)
  },

  translateBytext(content,convert,isSelf){
    let t=this
    this.checkPremisstion().then(res=>{
      this.loading.start()
      REQ.stranslateTxt({convert,content}).then(res=>{
        console.log(res.data.result);
        // let time=new Date()
        let result={
          isSelf:isSelf,
          content:content,
          result:res.data.result,
          dateTime:util.formatTime(new Date()),
          avatarUrl:app.globalData.userInfo.avatarUrl
        }
        t.data.resultList.push(result)
        t.setData({
          resultList:t.data.resultList
        })
        util.setStorage("resultList",t.data.resultList)
        t.toViewBottomFun(t.data.resultList.length-1)
        this.loading.stop()
      }).catch(err=>{
        console.log(err);
        this.loading.stop()
      })
    }).catch(res=>{
      util.error("请给权限")
    })


  },
  cuBarInputShow(){
console.log("cuBarInputShow");
  },

  // onload结束了
  tazlax:function(){
    var self = this;
    this.setData({
      txt: '',
      netije: '',
    })
  },

  gettext:function(e){
    app.logger(e.detail.value)
    this.setData({ txt: e.detail.value })
  },
  til:function(){
    var t=this;
    var til=t.data.til
    t.setData({til:!til})
  },

  // tarjimakil:function(){
  //   if(this.data.txt!=''){
  //   var self=this,t=this;
  //     var convert=1;
  //     if(t.data.til){
  //       // 汉维翻译
  //       convert=1
  //       var r = t.data.txt
  //       var pinyin = utils.net(r, '/get_text/',
  //         function (data) {
  //           // app.logger('pinyin'+data)
  //           self.setData({
  //             pinyin: data + '\n' + t.data.txt
  //           })
  //         }
  //       )

  //     }else{
  //       convert=7

  //     }
  //     var m=s.ckeck_num()
  //     if (m == 1 ){
  //       self.setData({
  //         tarkat:true
  //       })
  //     }else{

  //   wx.request({
  //     url: 'https://www.aicloud.com/dev/ability/mt.html',
  //     data:{
  //       // str:this.data.txt
  //       convert: convert,
  //       content: this.data.txt
  //     },
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded" // 默认值
  //     },
  //     method: "POST",
  //     success:function(e){
  //       // app.logger(e.data)
  //       // app.logger(e.data)
  //       // self.setData({ netije: e.data.netije})
  //       self.setData({ netije: e.data.result })
  //       wx.hideToast()
  //       if (convert == 3) {
  //         // 获取拼音
  //         var content = e.data.result;
  //         var pinyin = utils.net(content, '/get_text/',
  //           function (data) {
  //             // app.logger('pinyin'+data)
  //             self.setData({
  //               pinyin: data
  //             })
  //           }
  //         )

  //       }
  //     }
  //   })

  //   }
      
  // }
  // else{
  //     wx.showToast({
  //       title: ' مەزمۇن كىرگۈزۈڭ ',
  //       icon: 'none',
  //       image:'',
  //       duration: 500,

  //     })
  //   }
  // },

  coppy:function(){
    var t=this;
    wx.setClipboardData({
      data: t.data.netije,
      success: function (e) {
        wx.showToast({
          title: "كۆچۈرۈلدى" + " "+t.data.netije,
          icon: "none",
          image: "",
          duration: 1500,
          mask: !0,
          success: function (t) { },
          fail: function (t) { },
          complete: function (t) { }
        });
      },
    })
  },
  kilixim: function (e) {
    var t=this
    app.logger('oooooo')
    if (e.detail.userInfo){
    this.setData({
      kilixim: 1
    }), wx.setStorage({
      key: "kelixim",
      data: "ok"
      // wx.setStorageSync(key, data)
      
    });
    }else{
      t.setData({
        kilixim: 0,
      })
    }
  },
  reject: function () {
    this.setData({
      kilxim: 0
    });
  },


  onLaunch: function () {
    app.logger("aaa");
  },

  onShow: function () {
    var t = this;
    // t.check_day()
    // this.toViewBottomFun(this.data.resultList.length-1)
    wx.getStorage({
      key: "kelixim",
      success: function (t) { },
      fail: function () {
        app.logger('onshow被调用了')
        t.check_kilxim()
        t.setData({
          kilixim: 1 
        });
      }
    });
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 0')
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  check_kilxim:function(){
    // 检查授权
    var n = this, i = this;
    app.logger("check_kilixim被调用了")
    wx.getStorage({
      // 缓存的字段
      key: "kelixim",
      success: function (t) {
        n.setData({
          kilixim: 1
        });
      },
      //如果还没授权
      fail: function () {
        n.setData({
          kilixim: 0
        });
        wx.setStorage({
          key: "kelixim",
          data: "ok"
          // wx.setStorageSync(key, data)

        });
      }
    }),

      // 获取屏幕的大小
      wx.getSystemInfo({
        success: function (t) {
          n.setData({
            winWidth: t.windowWidth,
            winHeight: t.windowHeight
          });
        }
      });
  },

  check_auth: function () {
    var t = this;
    var n = this, i = this;
    app.logger("check_kilixim被调用了")
    wx.getStorage({
      // 缓存的字段
      key: "kelixim",
      success: function (t) {
        n.setData({
          kilixim: 1
        });
      },
      //如果还没授权
      fail: function () {
        app.logger('检查授权情况')
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              t.setData({
                kilixim: 0
              })
              // wx.authorize({
              //   scope: 'scope.userInfo',
              //   success() {
              //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              //     // wx.startRecord()
              //     app.console('授权成功')

              //   }
              // })
            } else {
              t.setData({
                kilixim: 1,
              })
            }
          }
        })
      }

    })
    
  },

  onShareAppMessage: function (t) {
    var e = this, n = "";
    app.logger('分享启动了')
      e.setData({
        tarkat: false
      }), wx.setStorage({
        key: "num",
        data: "1"
      });
    wx.setStorage({
      key: 'is_share',
      data: 1
    })
    return  {
      title: 'قوش تىل تەرجىمانى',
        path: "/pages/index/index",
        imageUrl: '../../img/lughat.png'
      };
  },
  noshare:function(){
    var t=this;
    t.setData({ tarkat:false})
  }

})
//  wx.showShareMenu({
//   withShareTicket: true
// });