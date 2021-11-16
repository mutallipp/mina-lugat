const util = require("../../utils/util"),
S=require("../../utils/string")

// components/result-chat/result-chat.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
addGlobalClass:true
  },
  properties: {
    result:{
      type:Array,
      value:[
        {
          isSelf:true,
          content:"喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！",
          dateTime:"2018年3月23日 13:23!"
        },
        {
          isSelf:false,
          content:"上发生的故事更广泛官方大哥捣鼓捣鼓代购发的风格多个电饭锅蛋糕蛋糕梵蒂冈电饭锅打个分电饭锅蛋糕电饭锅蛋糕蛋糕",
          dateTime:"2018年4月23日 13:23!"
        },
        {
          isSelf:false,
          content:"上发生的故事更广泛官方大哥捣鼓捣鼓代购发的风格多个电饭锅蛋糕蛋糕梵蒂冈电饭锅打个分电饭锅蛋糕电饭锅蛋糕蛋糕",
          dateTime:"2018年4月23日 13:23!"
        },        {
          isSelf:false,
          content:"上发生的故事更广泛官方大哥捣鼓捣鼓代购发的风格多个电饭锅蛋糕蛋糕梵蒂冈电饭锅打个分电饭锅蛋糕电饭锅蛋糕蛋糕",
          dateTime:"2018年4月23日 13:23!"
        },        {
          isSelf:false,
          content:"上发生的故事更广泛官方大哥捣鼓捣鼓代购发的风格多个电饭锅蛋糕蛋糕梵蒂冈电饭锅打个分电饭锅蛋糕电饭锅蛋糕蛋糕",
          dateTime:"2018年4月23日 13:23!"
        },        {
          isSelf:false,
          content:"上发生的故事更广泛官方大哥捣鼓捣鼓代购发的风格多个电饭锅蛋糕蛋糕梵蒂冈电饭锅打个分电饭锅蛋糕电饭锅蛋糕蛋糕",
          dateTime:"2018年4月23日 13:23!"
        },
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    InputBottom: wx.getStorageSync("tabbarHeight")||48,
    showKeyBoard:true,
    inputValue:null,
    avatarUrl:null,
    tabbarHeight:wx.getStorageSync("tabbarHeight")||48,
    disable:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // avatarUrl:app.globalData.userInfo.avatarUrl
  },
  observers:{
    "InputBottom":(e)=>{
      // console.log("监听 InputBottom",e);
    },
    "tabbarHeight":function(e){
      this.setData({
        InputBottom:e
      })
      // console.log("监听 tabbarHeight",e);
      // console.log(this);
    }
  },
  lifetimes: {
    // 在组件实例进入页面节点树时赋值
      attached () {
        let t=this
        wx.getUserInfo({
          success: function(res) {
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            // console.log(avatarUrl);

            t.setData({
              avatarUrl
            })
          }
        })
      },
      created(){
        let tabbarHeight= wx.getStorageSync("tabbarHeight")
        console.log(tabbarHeight);
        this.setData({
          tabbarHeight,
          InputBottom:tabbarHeight
        })
        console.log(`tabbarHeight:${tabbarHeight}`)


      },
    },

  /**
   * 组件的方法列表
   */
  methods: {
    coppy(e){
      let index=e.currentTarget.dataset.index,
      result=this.data.result[index].result
      // console.log(result);
      if(result){
        wx.setClipboardData({
          data: result,
          success:(res)=>{
            util.success(S.COPYED)
          },
          fail:(err)=>{
            util.error(err)
          }
        })
      }

    },
    onRecordEnd(e){
      let {from,filePath}=e.detail
      // console.log(filePath);
      this.triggerEvent("recordEnd", {
        from: from,
        filePath:filePath
    });
    },
    sendMessage(){
      let inputValue=this.data.inputValue
      if(inputValue==null){
        util.error("内容不能为空")
        return
      }
      // console.log(isNaN(inputValue));
      // console.log(typeof parseInt(inputValue));
      if(typeof inputValue !== 'string'||!isNaN(inputValue)){
        util.error("请输入文字")
        return
      }
      let myEventDetail = {
        inputValue
      } // detail对象，提供给事件监听函数
      let myEventOption = {} // 触发事件的选项
      if(!this.data.disable){
        this.triggerEvent('sendTxt', myEventDetail)
        this.setData({
          disable:true,
          inputValue:null
        })
        setTimeout(()=>{
          this.setData({
            disable:false
          })
        },1000)
      }
      

    },
    InputFocus(e) {
      console.log("InputFocus");
      console.log(this.data.showKeyBoard);
      if(this.data.showKeyBoard){
        this.setData({
          InputBottom: e.detail.height+this.data.tabbarHeight
        })
      }else{
        this.setData({
          InputBottom: e.detail.height
        })
      }
      
    },
    InputBlur(e) {
      // console.log("InputBlur");
      this.setData({
        InputBottom: this.data.tabbarHeight
      })
    },


    clickswitch(){
      // console.log("clickswitch");
      return
      this.setData({
        showKeyBoard:!this.data.showKeyBoard
      })
    },
  }
})
