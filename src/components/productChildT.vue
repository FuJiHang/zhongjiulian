/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-23 15:34:23
    商品卡片
 */
<template>
    <div class="productChildT" @click="toFN(product.relatedProductId)">
        <div class="img" >
            <img :src="imgSrc+product.pic">
        </div>
        <div class="des_pd" >
            <span class="des_s_pd">
                {{product.relatedProductName}} {{product.shortdescription}}
            </span>
            <span class="money">
                ￥{{product.relatedPrice}}
            </span>
        </div>
        
    </div>
</template>

<script>

    export default {
        props:['product'],
        inject:['reload'],
        methods:{
            toFN(id){
                this.$router.replace({path:'/fuProduct?id='+id})
                this.reload();
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.productChildT{
    .bW;
    transition: .5s;
    margin-top: .8rem;
    margin-left: 2%;
    box-sizing: border-box;
    border-radius: .2rem;
    box-shadow: .1rem .1rem .1rem rgb(202, 202, 202);
    border: 1px solid rgb(245, 245, 245) ;
    width: 48%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    .img{
        height: 71%;
        >img{
            object-fit: cover;
            height: 100%;
            width: 100%;

            
        }
    }
    .des_pd{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: .5rem .5rem .3rem;
        .des_s_pd{
            .nC;
            font-size: 1.1rem;
            box-sizing: border-box;
            display:-webkit-box;
            -webkit-line-clamp: 2; //超出多少行
            overflow: hidden;
            -webkit-box-orient: vertical;
            word-break:break-all;
        }
        .money{
            flex: 1;
            display: flex;
            align-items: flex-end;
            font-size: 1.3rem;
            .jG;
        }
    }   
}
</style>