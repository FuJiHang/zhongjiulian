//新机推荐http

import axios from 'axios'
import Vue from 'vue'
import router from '../router'
var parameter = "data"; //请求是json还是parmas
var userId = 3 //用户id
var userData //用户资料
if (localStorage.getItem('tokenId')) userId = localStorage.getItem('tokenId')
if (localStorage.getItem('userData')) userData = JSON.parse(localStorage.getItem('userData'))
var BaseUrl; //请求路劲
var imgSrc; //全局图片路径
if (process.env.NODE_ENV == 'development') {
  //开发用的
  BaseUrl = "/v3"
  imgSrc = "http://hyk.hybirdapi.com"
} else if (process.env.NODE_ENV == 'debug') {
  // 调试用的
  console.log("调试用的");
} else if (process.env.NODE_ENV == 'production') {
  // 线上环境
  BaseUrl = "/api/v3"
  imgSrc = ''
}

var cartBuyList = [] //全局购买订单数据

export var BaseUrl = BaseUrl;

axios.interceptors.response.use(
  response => {
    return response
  }

);

export async function getFN(o) {
  //get方法
  // console.log(router,'路由信息')
  // console.log(router.getMatchedComponents())
  return new Promise((resolve, reject) => {
    requestFN({
      type: 'GET',
      url: BaseUrl + o.url
    }).then((r) => {
      resolve(r);
    })
  })
}

export async function postFN(o) {
  //post方法
  // console.log(router,'路由信息')
  // console.log(router.getMatchedComponents())
  var url = BaseUrl + o.url;
  var handleUrl = {
    type: 'POST',
    url: url,
    data: o.data
  }
  if (o.params != undefined) {
    parameter = "params"
    handleUrl = {
      type: 'POST',
      url: url,
      data: o.params
    }
  }
  return new Promise((resolve, reject) => {
    requestFN(handleUrl).then((r) => {
      resolve(r);
    })
  })

}
export async function putFN(o) {
  //put方法
  // console.log(router,'路由信息')
  // console.log(router.getMatchedComponents())
  var url = BaseUrl + o.url;
  var handleUrl = {
    type: 'POST',
    url: url,
    data: o.data
  }
  if (o.params != undefined) {
    parameter = "params"
    handleUrl = {
      type: 'POST',
      url: url,
      data: o.params
    }
  }
  return new Promise((resolve, reject) => {
    requestFN(handleUrl).then((r) => {
      resolve(r);
    })
  })

}

export async function delFN(o) {
  //delt方法
  return new Promise((resolve, reject) => {
    requestFN({
      type: 'DELETE',
      url: BaseUrl + o.url
    }).then((r) => {
      resolve(r);
    })
  })
}


export function requestFN(o) {
  //基础请求方法
  //o.type //请求类型
  //o.url //请求路径
  //o.data //请求参数
  return new Promise((resolve, reject) => {
    var obj = {
      method: o.type,
      url: o.url
    }
    var url = o.url;
    // if(o.type=="POST"||o.type=="PUT")obj.data=o.data
    if (o.type == "POST" || o.type == "PUT") {
      if (parameter == "params") {
        obj.params = o.data
      } else {
        obj.data = o.data
      }
    }
    axios(obj).then((r) => {
      resolve(r)
    })
  })
}







const install = () => {
  Vue.prototype.getFN = getFN;
  Vue.prototype.postFN = postFN;
  Vue.prototype.putFN = putFN;
  Vue.prototype.delFN = delFN;
  Vue.prototype.imgSrc = imgSrc;
  Vue.prototype.userId = userId;
  Vue.prototype.userData = userData
  Vue.prototype.cartBuyList = cartBuyList;
}
export default install
