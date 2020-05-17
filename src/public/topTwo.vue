/*
 * @Author: fujihang 
 * @Date: 2018-12-28 17:33:30 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-19 18:33:24
    第二个头部
 */
<template>
    <van-nav-bar
        id="topTwo"
        :title="name"
        left-arrow
        @click-left="onClickLeft"
        
    />
</template>

<script>
    export default {
        props:['name'],
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#topTwo{
    width: 100%;
    position: absolute;
    top: 0;
    .van-icon{
        color:red !important;
    }
}

</style>