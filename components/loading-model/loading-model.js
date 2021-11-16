// components/loading-model/loading-model.js
const S=require("../../utils/string")
Component({
  options:{
    addGlobalClass:true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    title:S.TRANSLATEING,
    loadModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    start(title=S.TRANSLATEING){
      this.setData({
        title:title,
        loadModal:true
      })
    },
    stop(){
      this.setData({
        loadModal:false
      })
    }
  }
})
