var f=getApp()
module.exports = {
  check_day: check_day,
  ckeck_num: ckeck_num,
  get_num: get_num,
  get_share: get_share
}

function ckeck_num(){
  var t = this
  var is_share = get_share('is_share')
  if (is_share==1){
    return 2
  }else{
  var current_num=get_num()
    if (current_num > f.globalData.num){
    f.logger('请分享')
      return 1
  }
  else{
    counter()
    return 0
    }

  }
}
function counter(){
  var old_num=get_num()
  wx.setStorage({
    key: "num",
    data: parseInt(old_num)+1
  })
  f.logger('当前的次数')
  f.logger(old_num)
}

function get_num(){
  var value = wx.getStorageSync('num')
  if(value){
    // f.logger('get_num')
    // f.logger(value)
    return value
  }else{
    f.logger('请分享次数没了')
  }
}

function get_share(p){
  try {
    var value = wx.getStorageSync(p)
    if (value) {
      // f.logger('get_share')
      return value
    }
  } catch (e) {
    // Do something when catch error
  }
}

function check_day(){
  var t = new Date(), a = t.getFullYear() + "" + (t.getMonth() + 1) + t.getDate(), e = this;
  wx.getStorage({
    key: 'kun',
    success: function (t) {
      if(a == t.data ){
        f.logger('还没刷新日')
      }else{wx.setStorage({
        key: 'num',
        data: 1
    }),
        console.log("没有日子"), wx.setStorage({
          key: 'kun',
          data: a
        }),
        wx.setStorage({
          key: 'is_share',
          data: 0
        })
      }
    },
    fail: function () {
      console.log("没有日子"), wx.setStorage({
        key: 'kun',
        data: a
      }),
        wx.setStorage({
          key: 'num',
          data: 1
        }),
        wx.setStorage({
        key: 'is_share',
          data: 0
        })
    }
  });
}

