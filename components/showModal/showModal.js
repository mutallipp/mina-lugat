// components/showModal/showModal.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModalData:{
      type:Object,
      value:{
        content:"بۇگۇنكى ئىشلىتىش ھوقوقىڭىز تۈگىدى، بىر دانە توپقا يوللىۋەتكەندىن كىيىن بۈگۈن پۈتۈن بىركۈن چەكسىز ئشلىتەلەيسىز ",
        confimText:"ھەمبەھىرلەش",
        isGetUserInfo:false
      },
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    confim(e){
      console.log(e.detail.userInfo);
      app.globalData.userInfo=e.detail.userInfo
      this.triggerEvent("confim",{
        userInfo:e.detail.userInfo
      })
    }
  }
})
