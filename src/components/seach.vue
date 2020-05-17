/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-11 14:18:57
    搜索框
 */
<template>
    <div class="seach">
        <input v-model="seach" :placeholder="placeholder">
        <van-button round type="danger" size="small" @click="toFN">搜索</van-button>
    </div>
</template>

<script>

    export default {
        props:['placeholder'],
        data(){
            return{
                seach:'',
            }
        },
        methods:{
            toFN(){
                if(this.placeholder=="输入您想要搜索的文章名称") this.$router.push({path:'/fuArticleSeach'})
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
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
</style>