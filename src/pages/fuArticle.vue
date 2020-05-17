/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 19:30:43
    文章列表
 */
<template>
    <div id="fuArticle">
        <div class="seach">
            <input v-model="seach" placeholder="输入您想要搜索的文章名称">
            <van-button round type="danger" size="small" @click="seachFN">搜索</van-button>
        </div>
        
        <!-- 底部 -->
        <div class="Article">  
            <ArticleChild  :data="item" v-for="(item,index) in dataList" :key="index"></ArticleChild>
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
                dataList:[],//数据
                seach:'',//搜索
            }
        },
        methods:{
            // 获取数据
            getData(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "classid" : 0 },
                        method:'CMS.HelpList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.dataList=this.dataCTime(r.data.result.List[2].childlist,'time')
                        
                    }else this.errFN('获取文章')
                })
            },
            // 搜索
            seachFN(){
                
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "name" : this.seach },
                        method:'CMS.SHelpList',
                        id:this.userId,
                    }
                }).then(r=>{
                    console.log(r.data)
                    if(r.data.result.Error.SubCode==1){
                        this.dataList=this.dataCTime(r.data.result.Obj,'createdDate')
                       
                        
                    }else this.errFN('搜索文章')
                })
            },
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuArticle{
    .nC;
    display: flex;
    flex-direction: column;
    height: 100%;
    // 搜索
    .seach{
        z-index: 99;
        .nC;.bW;.mB;
        display: flex;
        align-items: center;
        padding: .8rem; 
        box-sizing: border-box;
        input{
            font-size: 1.2rem;
            padding-left: .8rem;
            flex: 1;
            height: 2.8rem;
            border-radius: 1.5rem;
            border: 1px solid rgb(245, 245, 245);
            margin-right: .8rem;
        } 
    }
    // 底部
    .Article{
        flex: 1;
        overflow: hidden;
        .van-tabs{
            height: 100%;
            .van-tabs__content{
                height: 100%;
            }
        }
        .van-tabs__wrap{
            border-bottom:1px solid rgb(240, 240, 240);
        }
        .van-tab__pane{
            height: 100%;
            overflow: auto;
            padding: 0 0 44px;
            box-sizing: border-box;
        }
        
    }
    
    
}
</style>