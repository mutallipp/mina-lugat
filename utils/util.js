var app=getApp()
const S=require("./string")
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function same(){
  console.log('utlis')
}
function loading(title= S.TRANSLATEING){
  wx.showToast({
    title: title,
    icon: 'loading',
    // duration: 20000,
  })
}

function error(title="失败",duration=1500){
  wx.showToast({
    title: title,
    icon: 'error',
    duration: duration,
  })
}

function tip(title="失败",duration=1500){
  wx.showToast({
    title: title,
    icon: 'none',
    duration: duration,
  })
}

function success(title="失败",duration=1500){
  wx.showToast({
    title: title,
    icon: 'success',
    duration: duration,
  })
}

function setStorage(key,value){
  wx.setStorage({
    key:key,
    data:value
  })
}

function getStorage(key){
  wx.getStorage({
    key: 'key',
    success (res) {
      // console.log(res.data)
      return res
    },
    fail(err){
      return false
    }
  })
}

function setStorageSync(key,value){
  wx.setStorageSync(key, value)
}

function getStorageSync(key){
  return wx.getStorageSync(key)
}

module.exports = {
  formatTime: formatTime,
  same:same,
  upload_file: upload_file,
  is_Chinese: is_Chinese,
  net: net,
  error,
  setStorage,
  getStorage,
  setStorageSync,
  getStorageSync,
  tip,
  success
}

function is_Chinese(word){
  for(var i=0; i<word.length;i++){
    if (('\u4e00' <= i) && (i <= '\u9fff')){
      return true
    }else{
      return false
    }
  }
}

function upload_file(url, filePath, name, formData, success, fail) {
  wx.showToast({
    title: '上传中',
    icon: 'loading',
    duration: 10000,
  })
  console.log('a=' + filePath)
  wx.uploadFile({
    url: app.globalData.domain + url,
    filePath: filePath,
    name: name,
    header: {
      'content-type': 'multipart/form-data'
    }, // 设置请求的 header
    formData: formData, // HTTP 请求中其他额外的 form data
    success: function (res) {
      app.logger(res);
      if (res.statusCode == 200 && !res.data.result_code) {

        typeof success == "function" && success(JSON.parse(res.data));
      } else {
        typeof fail == "function" && fail(res.data);
      }
    },
    fail: function (res) {
      console.log(res);
      typeof fail == "function" && fail(res);
    }
  })
  wx.hideToast()
}

function net(data, url, success){
  wx.request({
    url: app.globalData.domain + url,
    method: "POST",
    data: {
      data: data
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    success:function (res){
      app.logger(res);
      if (res.data.status_code==200){
        
        typeof success == "function" && success(res.data.data);
      } else {
        typeof fail == "function" && fail(res.msg);
      }
    }
  })
}
