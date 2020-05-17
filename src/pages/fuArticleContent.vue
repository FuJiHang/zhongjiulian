/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 19:12:26
    文章内容
 */
<template>
    <div id="fuArticleContent">
        <!-- 头部 -->
        <div class="AC_top">
            <div class="Tline">{{context.title}}</div>
            <div class="bot">
                <span class="name">中酒联</span>
                <span class="time">2018.2.3</span>
                <van-tag round type="danger" >热</van-tag>
            </div>
        </div>
        <!-- 中间 -->
        <div class="AC_mid" v-html="context.content">
            
            

               

        </div>
       <!-- 底部推荐 -->
       <div class="AC_bot">
           <div class="top">
               <span>相关阅读</span>
               <!-- <van-button round type="danger" size="mini">换一换</van-button> -->
           </div>
           <ArticleChild v-for="(item,index) in txList" :key="index" :data="item"></ArticleChild>
       </div>
    </div>
</template>

<script>
import ArticleChild from '../components/ArticleChild'
    export default {
        components:{
            ArticleChild,
        },
        data(){
            return{
                id:this.$route.query.id,//文章id
                context:'',//文章信息
                txList:[],//文章推荐
            }
        },
        methods:{
            // 获取文章详细信息
            getData(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "aid" : this.id },
                        method:'CMS.HelpDetail',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                       this.context=r.data.result.Obj
                    }else this.errFN('获取文章详细')
                })
            },
            Recommend(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "classid" : 0 },
                        method:'CMS.HelpList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        let data=r.data.result.List[2].childlist
                        for(let i=0;i<data.length;i++){
                            if(this.txList.length>3) break;
                            data[i].time=this.timestampToTime(data[i].time)
                            this.txList.push(data[i])
                        }
                    }else this.errFN('获取推荐文章')
                })

                
            },
            
        },
        mounted(){
            this.getData()
            this.Recommend()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuArticleContent{
    .hO;.nC;.bW;
    font-size: 1.2rem;
    // 头
    .AC_top{
        .bBS;
        padding: .8rem .8rem 0;
        box-sizing: border-box;
        .bot{
            padding: .8rem 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .name{margin-right:1.6rem }
            .time{
                color: #999;
                flex: 1;
            }
            .van-tag--round{
                padding: .4rem 1.2rem;
            }
        }
    }
    // 中间
    .AC_mid{
        padding: .8rem;
        box-sizing: border-box;
        .bBS;
        img{
            width: 100%;
        }
    }
    // 推荐
    .AC_bot{
        .mB;
        .top{
            text-align: center;
            box-sizing: border-box;
            display: flex;
            padding: .8rem;
            align-items: center;
            >span{
                flex: 1;
            }
           .van-button{
               min-width: 6rem;
               min-height: 2.3rem;
           } 
        }
    }
}
</style>