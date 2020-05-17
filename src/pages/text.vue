/*
 * @Author: fujihang 
 * @Date: 2019-02-21 17:50:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-16 18:39:20
    测试
 */
<template>
    <div id="text" @click="aaa">
        <!-- <span :class="ss?a:b">asdasd</span> -->
        <c :ss="asda"></c>

        <input ref="ddd">
    </div>
</template>

<script>
import c from '../components/c'
    export default {
        components:{
           c,
        },
        data(){
            return{
                ss:true,
                a:'aasdasd',
                b:'b',
            }
        },
        methods: {
            aaa(){
                
                this.ss=!this.ss
            }
        },
      
    }
</script>

<style lang="less">
#text{
    width: 100%;
    display: flex;
    .a{
        color: red;
    }
    .b{
        color: aqua;
    }
}
</style>