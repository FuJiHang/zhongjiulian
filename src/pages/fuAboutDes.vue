/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:15:49 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-08 18:36:52
    关于我们明细
 */
<template>
    <div id="fuAboutDes">
        <!-- 顶部导航 -->
        <topTwo :name="name"></topTwo>
        <!-- <div class="title">
            {{data.title}}
        </div> -->
        <div v-html="data.content">
           
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
            name:this.$route.query.name,
            data:{},//信息
        }
    },
    mounted(){
        this.postFN({
            url:'/shop.aspx',
            data:{
                params:{ "aid" : this.$route.query.id },
                method:'CMS.HelpDetail',
                id:this.userId,
            }
        }).then(r=>{
            if(r.data.result.Error.SubMsg=='获取成功!'){
                this.data=r.data.result.Obj
            }else this.errFN('获取信息')
        })
    }
}
</script>

<style lang="less">
@import '../style/base.less';
#fuAboutDes{
    .hO;.nC;.bW;
    padding: 46px .8rem .8rem;
    box-sizing: border-box;
    word-wrap:break-word;
    .title{
        text-align: center;
        font-weight:600;
        .jG;
        font-size: 1.5rem;
        padding:.8rem;
        box-sizing: border-box;
        .bBS;
    }
}
</style>