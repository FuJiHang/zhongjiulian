/*
 * @Author: fujihang 
 * @Date: 2019-01-03 14:52:09 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-03 14:56:08
    更多功能
 */
<template>
    <div class="moreFun">
        <div class="more_type" v-for="(item,index) in listFun" :key="index" @click="toFN(item.to)">
                <img :src="item.img">
                <span>{{item.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:['listFun'],
        methods:{
            // 路由跳转
            toFN(to){
                this.$router.push({path:to})
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.moreFun{
    // 更多功能
    margin: .8rem 0;
    background: white;
    border-radius: .6rem;
    padding-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    .more_type{
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        height: 5rem;
        img{
            width: 22%;
        }
        span{
            display: flex;
            align-items: center;
            flex: 1;
            font-size: 1.1rem;
            .nC;
        }
    }
}
</style>