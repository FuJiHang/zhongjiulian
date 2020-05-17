/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-08 16:45:45
    我的订单 订单卡
 */
<template>
    <div class="OrderListT" @click="toFN">
        <div class="top">
            <span>订单号：{{orderData.orderCode}}</span>
            <i class="jG">{{orderData.ProductDetail.status}}</i>
        </div>

        <div class="mid"  v-for="(item,index) in productList" :key="index">
            <img :src="imgSrc+item.pic">
            <span class="des">
                <div>
                    法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒
                </div>
                <div class="type">
                    规格：750ML
                </div>
            </span>
            <span class="type_mon">
                <div class="mon_t">
                    ￥{{item.saleprice}}
                </div>
                <div class="mon_b">
                    x{{item.number}}
                </div>
            </span>
        </div>

        



        <div class="bot">
            <!-- <span>共{{orderData.quantity}}件商品 合计：</span> -->
            <span>合计：</span>
            <span class="bot_mon">
                ￥{{orderData.allprice}}
            </span>
        </div>

        <div class="button">
            <van-button round type="danger" size="small" v-show="orderData.status=='Complete'">申请售后</van-button>
            <van-button round type="danger" size="small" v-show="orderData.status=='Paying'">去付款</van-button>
            <!-- <van-button round type="danger" size="small" v-show="orderData.status=='Handling'">提醒发货</van-button> -->
            <van-button round type="danger" size="small" v-show="orderData.status=='Shiped'">确认收货</van-button>   
        </div>
    </div>
</template>

<script>

    export default {
        props:['orderData','productList'],
        data(){
            return{
            }
        },
        methods:{
            toFN(){
                this.$router.push({path:'/fuOrderDes?orderid='+this.orderData.orderid})
            },
            
        },
        mounted() {
        },
    }
</script>

<style lang="less">
@import '../style/base.less';
.OrderListT{
    font-size: 1.25rem;
    .nC;.bW;.bR;.mB;
    .top{
        font-size: 1.35rem;
        padding: .8rem;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        >span{
            flex: 1;
        }
    }
    .mid{
        margin-bottom: .2rem;
        background: rgb(245, 245, 245);
        box-sizing: border-box;
        padding:  .8rem ;
        display: flex;
        >img{
            object-fit: cover;
            height: 8rem;
            width: 8rem
        }
        .des{
            margin:0 .8rem;
            flex: 1;
            >div{
                .Tline;
            }
            .type{
                color: #999;
            }
        }
        .type_mon{
            text-align: right;
            .mon_b{
                color: #999;
            }
        }
    }
    


    .bot{
        .bBS;
        padding: .6rem .8rem .8rem;
        text-align: right;
        box-sizing: border-box;
        .bot_mon{
            .jG;
            font-size: 1.4rem;
        }
        i{
            font-size: 1.2rem;
            font-style:normal;
        }
    }
    .button{
        padding: .4rem .8rem;
        text-align: right;
        box-sizing: border-box;
        text-align: right;
        .van-button{
            margin-left: .4rem;
        }
    }
}
</style>