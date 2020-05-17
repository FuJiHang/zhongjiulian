/*
 * @Author: fujihang 
 * @Date: 2019-01-29 11:56:42 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-19 15:17:41
    微信吊起支付
 */
import Vue from 'vue'
var wxFN=(data)=>{
	delete data.XML
	return new Promise((resolve, reject)=>{
		function onBridgeReady(){
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest', 
				// 
				data,
				function(res){
					if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						resolve(true)
					}else{
						resolve(false)
					}  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
				}
			);
		}
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		}else{
			onBridgeReady();
		}
	})
	
}


const install=()=>{
    Vue.prototype.wxFN=wxFN
}

export default install