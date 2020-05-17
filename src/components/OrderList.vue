/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-22 11:53:53
    订单详细内容 订单卡
 */
<template>
    <div class="OrderList">
        <div class="top">
            <span>{{orderData.supplierName}}</span>
            <van-icon name="arrow" />
        </div>

        <div class="mid"  >
            <img :src="imgSrc+orderData.thumbnailsUrl">
            <span class="des">
                <div>
                    <!-- 法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒 -->
                    {{orderData.description}}
                </div>
                <div class="type">
                    规格：750ML
                </div>
            </span>
            <span class="type_mon">
                <div class="mon_t">
                    ￥{{orderData.sellPrice}}
                </div>
                <div class="mon_b">
                    x{{orderData.quantity}}
                </div>
            </span>
        </div>

        <!-- 快递 -->
        <div class="express_ol" v-show="express">
            <span>快递费：</span>
            <span>0元</span>
        </div>
        
        <div class="bot">
            <span>共{{orderData.quantity}}件商品 合计：</span>
            <span class="bot_mon">
                ￥{{orderData.sellPrice*orderData.quantity}}.<i>00</i>
            </span>
        </div>

        <!-- 底部按钮 -->
        <div class="button" v-show="!order">
            <van-button round type="default" size="small" @click="toFN">查看订单</van-button>
            <van-button round type="danger" size="small">确认收货</van-button>
            <!-- <van-button round type="danger">评价</van-button>
            <van-button round type="danger">申请退款</van-button> -->

        </div>


    </div>
</template>

<script>

    export default {
        props:['order','express','orderData'],
        data(){
            return{
            }
        },
        methods:{
            toFN(){
                this.$router.push({path:'/fuOrderDes'})
            },
        },
        mounted(){
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.OrderList{
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

    // <!-- 快递 -->
    .express_ol{
        .bBS;
        font-size: 1.15rem;
        box-sizing: border-box;
        display: flex;
        padding: .8rem;
        align-items: center;
        >:first-child{
            flex: 1;
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

    // 底部按钮
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