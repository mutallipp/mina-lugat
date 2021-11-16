const app=getApp()
Component({
  data: {
    selected: 1,
    // color: "#7A7E83",
    color: "rgba(210, 210, 216, 100);",
    // selectedColor: "#3cc51f",
    selectedColor: "#fff",
    // "backgrodColor": "#4169E1",
    taBarList:[
      {
        "pagePath": "/pages/us/us",
        "text": "ئەپچە ھەققىدە",
        "iconPath": "/img/icon/tabBar/report.png",
        "selectedIconPath": "/img/icon/tabBar/unreport.png"
      },
      {
        "pagePath": "/pages/index/index",
        "text": "تەرجىمە قىلىش ",
        "iconPath": "/img/icon/tabBar/index.png",
        "selectedIconPath": "/img/icon/tabBar/unindex.png"
      }
    ],
  },
   
 
  lifetimes: {
    // 在组件实例进入页面节点树时赋值
      attached () {
        
      },
     
    },
    created(){
      // console.log("--------");
    },
  methods: {
    change(){
      // this.setData({list:[{pagePath: "/pages/index/index",text: "我的"}]}) 
      app.logger('i am change')
      t.setData({
        selected: data.index
      })
    },
    switchTab(e) {
      const t=this;
      var data = e.currentTarget.dataset
      var path = data.path
      wx.switchTab({
        url: path,
      })
      app.logger(data.index)
      t.setData({
        selected: data.index
      })
    }
  },
  ready(){
    // 缓存tabber栏的高度
   const query = wx.createSelectorQuery().in(this)
   query.select('.tab-bar').boundingClientRect((rect) => {
      //  console.log(rect)
       wx.setStorageSync('tabbarHeight', rect.height)
   }).exec()
 }
})