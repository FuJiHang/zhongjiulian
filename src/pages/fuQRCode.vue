/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-11 16:33:19
    推广二维码
 */
<template>
    <div id="fuQRCode">
        
        <div class="help">
             <canvas id="ewmImg"></canvas>
            <div class="child">
                我的微信号：1399597362
            </div>
            
        </div>
        <div class="bot">
            请长按图片选择保存到手机
            <br>
            二维码有效期至2019-02-02到期请重新生成
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
    export default {
        data(){
            return{
                
            }
        },
        methods:{
            newEWM(){
                let ewmImg= document.getElementById('ewmImg')
                QRCode.toCanvas(ewmImg, 'http://gzh.kagamikun.com/Account/login?invitationCode='+this.userData.UE_InvitationCode, function (error) {
              })
            }
        },
        mounted(){
            this.newEWM();
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuQRCode{
    .hO;.nC;
    text-align: center;
    position: relative;
    
    .help{
        margin:0 .8rem;
        .bW;.bR;
        padding: 4rem .8rem 2rem;
        box-sizing: border-box;
        margin-top: 5%;
        font-size: 1.3rem;
        .ewmImg{
            width: 15rem;
            height: 15rem;
        }
        .child{
            margin-top: 4rem;
            
        }
    }
    .bot{
        border-top: 1px solid rgb(219, 219, 219);
        font-size: 1.2rem;
        box-sizing: border-box;
        position:absolute;
        bottom: 0;
        padding: .8rem;
        .bW;.bR;
        width: 100%;
    }
    
}
</style>