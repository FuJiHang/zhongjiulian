/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-18 12:07:47
    设置
 */
<template>
    <div id="fuSetting">
        <div class="set" v-for="(item,index) in setList" :key="index" @click="toFN(item.to)">
           {{item.name}}
        </div>
        <div class="set last" @click="toFN('/fuFeedback')">
            意见反馈
        </div>
        <!-- <div class="set_but">
            <van-button type="danger" class="set_but_c" >退出登录</van-button>
        </div> -->
        
    </div>
</template>

<script>

    export default {
        data(){
            return{
                setList:[
                    {
                        name:'个人资料',
                        to:'/fuPersonData',
                    },
                    {
                        name:'账户与安全',
                        to:'/fuAccounts',
                    },
                    {
                        name:'地址管理',
                        to:'/fuReceiving',
                    },
                ]
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
#fuSetting{
    .hO;
    .nC;
    .set{
        .bW;
        display: flex;
        box-sizing: border-box;
        padding: 1.4rem .8rem;
        font-size: 1.3rem;
        .bBS;
    }
    .last{
        margin-top: .8rem;
    }
    // 退出
    .set_but{
        margin-top: 3.2rem;
        padding:0 .8rem;
        box-sizing: border-box;
        .set_but_c{
            width: 100%;
        }
    }
    
}
</style>