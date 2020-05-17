import Vue from 'vue'
import { Toast } from 'vant';
// 加载
var tipFN=(data)=>{
    let val="加载中..."
    if(data!=undefined) val=data
    Toast.loading({
        duration:0,
        forbidClick:true,
        mask: true,
        message: val
    });
}
// 关闭
var tipHFN=()=>{
    setTimeout(()=>{
        Toast.clear();
    },400) 
}
// 成功
var okFN=(data)=>{
    if(data==undefined) data=''
    Toast.success({
        message:data+'成功',
        duration:2000,
    });
}
// 失败
var errFN=(data)=>{
    if(data==undefined) data=''
    Toast.fail({
        message:data+'失败，请重试！',
        duration:2000,
    });
}
// 通知
var notFN=(data,timeC)=>{
    let time=3000
    if(timeC) time=timeC
    Toast({
        message:data,
        duration:time
    });
}

// 检查输入是否为空
var checkD=(data,tip)=>{
    for(let i in data){
        if(data[i].toString().trim().length==0){
            Toast({
                message: tip[i]+'不能为空',
                duration:800
              });
            return false
        }
    }
    return true
}
// 检查输入是否为空2
var checkDT=(data,val,tip)=>{
    for(let i=0;i<data.length;i++){
        if(data[i][val].toString().trim().length==0)  return notFN(data[i][tip],1500)
    }return true
}

//时间错转时间
var timestampToTime=function(timestamp){
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    if(D<10){
        D='0'+D
    }
    var h = date.getHours() + ':';
    var m = date.getMinutes();
    if(m<10){
        m='0'+m
    }
    return Y+M+D+h+m;
}

// 转时间进阶
var dataCTime=(data,timeName)=>{
    for(let i=0;i<data.length;i++){
        data[i][timeName]=timestampToTime(data[i][timeName])
    }
    return data
}

// 手机号
var checkP=(tel)=> {
    var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(tel);
}

// 屏幕像素
var wwWH=window.screen.width

// 设置cookie
var setCookie=(name,value,time)=>{
    var exp = new Date();
    exp.setTime(exp.getTime() + time);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
// 获取cookie
var getCookie=(name)=>{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

const install=()=>{
Vue.prototype.tipFN=tipFN
Vue.prototype.tipHFN=tipHFN
Vue.prototype.okFN=okFN
Vue.prototype.errFN=errFN
Vue.prototype.notFN=notFN
Vue.prototype.checkD=checkD
Vue.prototype.dataCTime=dataCTime
Vue.prototype.wwWH=wwWH
Vue.prototype.checkP=checkP
Vue.prototype.checkDT=checkDT
Vue.prototype.setCookie=setCookie
Vue.prototype.getCookie=getCookie
Vue.prototype.timestampToTime=timestampToTime

}

export default install