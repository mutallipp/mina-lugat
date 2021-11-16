App({
  getRecordAuth: function (o, c) {
    wx.getSetting({
      success: function (e) {
        e.authSetting["scope.record"] ? (console.log("record has been authed"), o && o()) : wx.authorize({
          scope: "scope.record",
          success: function () {
            console.log("succ auth"), o && o();
          },
          fail: function () {
            console.log("fail auth"), c && c();
          }
        });
      },
      fail: function (o) {
        console.log("fail"), console.log(o);
      }
    });
  },
  isAuthorizeRecord: function () {
    wx.getSetting({
      success: function (o) {
        return !!o.authSetting["scope.record"];
      },
      fail: function (o) {
        console.log("fail"), console.log(o);
      }
    });
  },
  logger:function(e){
    return console.log(e)
  },
  globalData: {
    // domain: "http://127.0.0.1:8000/dic",
    // host:'http://127.0.0.1:8000',
    domain: "https://mutallip.cn/dic",
    host: 'https://mutallip.cn',
    num:6,
    is_auth_record:0
  }
});