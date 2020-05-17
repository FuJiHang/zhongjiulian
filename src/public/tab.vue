/*
 * @Author: fujihang 
 * @Date: 2018-12-25 14:41:41 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-19 18:33:39
    顶部导航条
 */
<template>

        <van-nav-bar
            :fixed="false"   
            :title="name"
            :left-arrow='but'
            @click-left="onClickLeft"
          
        />

</template>

<script>
    export default {
        props:['name','but'],
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            
        },
    }
</script>

<style lang="less">
@import '../style/base.less';
.van-nav-bar{
    .nC;
    position: relative;
    .van-icon{
        color:red !important;
    }
}
</style>