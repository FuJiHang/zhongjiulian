/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-08 19:17:46
    意见反馈
 */
<template>
    <div id="fuFeedback">
        <!-- 底部 -->
        <!-- <van-tabs v-model="active" swipeable type="card" animated sticky :offset-top="45.6">
            <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index">
                
            <Feedback></Feedback>
                
            </van-tab>
        </van-tabs> -->


        <!--  -->
        <div class="feedback">
            <textarea placeholder="输入你的意见" v-model="feekVal.opinion"></textarea>
        </div>
        <div class="botton">
             <van-button @click="feekFN" type="danger">提交反馈</van-button>
        </div>
       
    </div>
</template>

<script>
// import Feedback from '../components/Feedback'
    export default {
        // components:{
        //     Feedback,
        // },
        data(){
            return{
                // active:0,
                // listBal:[
                //     {
                //         name:'体验问题',
                //     },
                //     {
                //         name:'商品，商家投诉',
                //     },
                // ]
                feekVal:{ "userid" :this.userId, "opinion" : "", "imgBase64" : null }
            }
        },
        methods:{
            feekFN(){
                if(this.feekVal.opinion.trim().length==0) return this.notFN('请输入反馈意见！')
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:this.feekVal,
                        method:'Usercenter.Feedback',
                        id:this.userId,
                    }
                }).then(r=>{
                    console.log(r)
                    if(r.data.result.Error.SubMsg=="反馈成功"){
                    this.okFN('反馈')
                    setTimeout(()=>{
                         this.$router.back(-1)
                    },1500)
                   
                    }else this.errFN('反馈')
                })
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuFeedback{
    height: 100%;
    .nC;
    // .van-tabs{
    //     height: 100%;
    //     .van-tabs__content{
    //         height: 100%;
    //     }
    // }
    // .van-tabs__wrap{
    //     padding: .8rem 0;
    //     background: white;
    //     border-bottom:1px solid rgb(240, 240, 240);
    //     .van-tabs__nav{
    //         margin: 0 .8rem;
    //     }
    // }
    // .van-tab__pane{
    //     height: 100%;
    //     overflow: auto;
    //     padding: 1.6rem .8rem 3.2rem;
    //     box-sizing: border-box;
    // }


    .feedback{
        .bW;
        margin: .6rem;
        >textarea{
            width: 100%;
            min-height: 10rem;
            padding: .6rem;
            box-sizing: border-box;
            font-size: 1.3rem;
        }
    }
    .botton{
        padding: 15% .6rem 0;
        box-sizing: border-box;
        .van-button{
            
            width: 100%;
        }
    }
    

}
</style>