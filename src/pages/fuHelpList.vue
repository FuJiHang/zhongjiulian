/*
 * @Author: fujihang 
 * @Date: 2018-12-29 11:17:53 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-11 11:32:28
    使用帮助列表
*/
<template>
    <div id="fuHelpList">
        <div class="help_L" @click="toFN">
            <span class="name_h">1、如何使用钱包</span>
            <van-icon name="arrow" />
        </div>
        
    </div>
</template>

<script>
    export default {
        methods:{
            toFN(){
                this.$router.push({path:'/fuHelp'})
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuHelpList{
    height: 100%;
    overflow: auto;
    padding-bottom: .8rem;
    box-sizing: border-box;
    .nC;
    .help_L{
        margin: .8rem .8rem 0;
        padding: .8rem;
        .bW;.bR;
        display: flex;
        align-items: center;
        height: 3rem;
        font-size: 1.2rem;
        .name_h{
            .Oline;
            flex: 1;
        }
    }
}
</style>