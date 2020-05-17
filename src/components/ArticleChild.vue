/*
 * @Author: fujihang 
 * @Date: 2019-01-05 15:52:12 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 18:59:57
    文章列表
 */
<template>
    <div class="ArticleChild" @click="toFN">
        <img :src="data.cimg">
        <div class="right">
            <div class="Tline">{{data.ptitle}}</div>
            <div class="r_d">
                {{data.time}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['data'],
        methods:{
            toFN(){
                this.$router.push({path:'/fuArticleContent?id='+this.data.id})
            }
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.ArticleChild{
    display: flex;
    align-items: center;
    padding: .8rem;
    box-sizing: border-box;
    .bW;.bBS;
    .mB;
    >img{
        object-fit: cover;
        height: 7rem;
        width: 7rem;
    }
    .right{
        font-size: 1.2rem;
        padding-left:.8rem;
        .r_d{
            color: #999;
            margin-top: .8rem;
        }
    }
}
</style>