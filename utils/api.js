const HOST="https://www.aicloud.com"

const MAPPING={
  stranslateTxt             :"/dev/ability/mt.html",
  voiseRecognition          :"/dev/ability/asr.html"
}

const HTTP=(url, data = {}, method = 'POST')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      method:method,
      data:data,
      header: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      success(res){
        resolve(res)
      },
      fail(err){
        console.log(err)
        reject(err)
      }
    })
  })
}
export {
  HOST,
  MAPPING,
  HTTP
}