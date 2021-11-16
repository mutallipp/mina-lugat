import {HOST,MAPPING,HTTP} from "./api"

// 翻译接口
function stranslateTxt(data={}){
  return HTTP(HOST+MAPPING.stranslateTxt,data)
}
function voiseRecognition(data={}){
  return HTTP(HOST+MAPPING.voiseRecognition,data,"POST")
}

module.exports={
  stranslateTxt,
  voiseRecognition
}