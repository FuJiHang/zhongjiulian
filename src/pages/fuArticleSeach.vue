/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-05 17:37:17
    文章搜索
 */
<template>
    <div id="fuArticleSeach">
        <seach placeholder="输入您想要搜索的文章名称"></seach>
        <div class="contect">
            <article-child v-for="i in 10" :key="i"></article-child>

        </div>
    </div>
</template>

<script>
import seach from '../components/seach'
import ArticleChild from '../components/ArticleChild'
    export default {
        components:{
            seach,ArticleChild,
        },
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuArticleSeach{
    .nC;
    display: flex;
    flex-direction: column;
    height: 100%;
    .contect{
        flex: 1;
        overflow: auto;
    }
    
    
}
</style>