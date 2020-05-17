/*
 * @Author: fujihang 
 * @Date: 2019-01-03 12:01:43 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-08 14:22:07
    我的订单
 */
<template>
    <div class="myOrder">
        <div class="name">
            <span>我的订单</span>
            <!-- <span><van-icon name="arrow" @click="toFN('/fuOrder?active=0')"/></span> -->
        </div>
        <div class="myOrder_list" >
            <div class="order_type" v-for="(item,index) in listOrder" :key="index" @click="toFN(item.to)">
                <img :src="item.img">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                listOrder:[
                     {
                        name:'全部',
                        img:require('../img/wanc.svg'),
                        to:'/fuOrder?active=0'
                    },
                    {
                        name:'待付款',
                        img:require('../img/fuk.svg'),
                        to:'/fuOrder?active=1'
                    },
                    {
                        name:'待发货',
                        img:require('../img/fahuo.svg'),
                        to:'/fuOrder?active=2'
                    },
                    {
                        name:'待收货',
                        img:require('../img/shouh.svg'),
                        to:'/fuOrder?active=3'
                    },
                    
                   
                ],
            }
        },
        methods:{
            toFN(to){
                this.$router.push({path:to})
            }
        }
        
    }
</script>

<style lang="less">
@import '../style/base.less';

// 我的订单
.myOrder{
    margin-top: .8rem;
    background: white;
    padding:  .8rem 0;
    border-radius: .6rem;
    .name{
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        padding: 0 .8rem .8rem;
        border-bottom:1px solid rgb(245, 245, 245);
        :first-child{
            flex: 1;
        }
        span{
            .nC;
        }
    }
    .myOrder_list{
        display: flex;
        flex-wrap: wrap;
        .order_type{
            margin-top: .8rem;
            width: 25%;
            display: flex;
            align-items: center;
            flex-direction: column;
            height: 5rem;
            img{
                width: 30%;
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
}
</style>