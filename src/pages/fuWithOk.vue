/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-11 12:05:27
    提现成功页面
 */
<template>
    <div id="fuWithOk">
        <div class="img">
            <van-icon name="checked" size='8rem' color="red" />
        </div>
        <div class="top">
            恭喜你提交申请成功！
        </div>
        <div class="mid">
            我们会在1个工作日（节假日顺延）处理您的申请，请耐心等待！
        </div>
        <van-button round type="danger" size="small" @click="toFN('/fuDistributor')">进入分销中心</van-button>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                
            }
        },
        methods:{
            toFN(to){
                this.$router.push({path:to})
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuWithOk{
    .hO;.nC;.bW;
    text-align: center;
    padding:0 .8rem;
    .img{
        margin-top: 10%;
        .mB;
    }
    .top{
        .mB;
        font-size: 1.4rem;
    }
    .mid{
        margin-bottom: 1.2rem;
        font-size: 1.1rem;
        color: #999;
    }
    .van-button{
        padding: 0 1.8rem;
    }
    
}
</style>