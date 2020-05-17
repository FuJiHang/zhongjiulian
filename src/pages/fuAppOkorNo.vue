/*
 * @Author: fujihang 
 * @Date: 2019-02-28 18:26:29 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-07 18:04:15
    分销申请成功或失败
 */ 
<template>
    <div id="fuAppOkorNo">
        <topTwo :name="typeP==1?'申请成功':'申请不通过'"></topTwo>
        <div class="ok" v-show="typeP==1">
            <h1>恭喜您申请成功</h1>
            <div class="native">
                欢迎加入XXXX，请长按以下二维码联系团队服务人员，我们将邀请您进入XXXX微信群，长按保存二维码，扫码入群，一起交流学习。
            </div>
            <img src="../img/pro02.jpg">
            <div>长按保存二维码</div>
            <van-button size="small" round type="danger">进入分销中心</van-button>
        </div>
        <div class="ok" v-show="typeP==2">
            <h1>申请失败</h1>
            <div class="native">
                亲，很抱歉，您还未达到申请条件!
            </div>
            <img src="../img/pro02.jpg">
            <van-button size="small" round type="danger">去逛逛</van-button>
        </div>
    </div>
</template>

<script>
import topTwo from '../public/topTwo'
    export default {
        components:{
            topTwo,
        },
        data(){
            return{
                typeP:this.$route.query.typeP
            }
        },
        mounted()
        {
           this.typeP=this.$route.query.typeP
           console.log(this.typeP)
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuAppOkorNo{
    height: 100%;
    overflow: auto;
    position: relative;
    padding-top: 46px;
    .bW;.nC;
    .ok{
        display: flex;
        font-size: 1.1rem;
        flex-direction: column;
        align-items: center;
        >img{
            margin: 1.2rem 0;
            height: 15rem;
            width: 15rem;
            object-fit: cover;
        }
        >h1{
            font-size: 1.5rem;
            padding: 1.8rem 0;
        }
        .native{
            padding: .6rem;
            box-sizing: border-box;
            font-size: 1.2rem;
        }
        .van-button{
            margin-top: 1rem;
            padding:0 1.8rem;
        }
    }
    
}
</style>