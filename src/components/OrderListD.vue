/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-30 14:27:59
    订单详情内容 订单卡
 */
<template>
    <div class="OrderListD">
        <div class="top">
            <span>中酒联旗舰店</span>
            <van-icon name="arrow" />
        </div>

        <div class="mid" v-for="(item,index) in orderData.productlist" :key="index">
            <img :src="imgSrc+item.pic">
            <span class="des">
                <div>
                    <!-- 法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒 -->
                    {{item.name}}
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

        <!-- 快递 -->
        <div class="express_ol" >
            <span>快递费：</span>
            <span>{{payment.yunfei}}元</span>
        </div>
        <div class="bot">
            <span>共{{orderData.zonNum}}件商品 合计：</span>
            <span class="bot_mon">
                ￥{{payment.orderprice}}
            </span>
        </div>

        <!-- 底部按钮 -->
        <div class="button" >
            <van-button round @click="cancal" size="small" v-if="orderData.status=='等待付款'">取消订单</van-button>
            <van-button round @click="toPay" type="danger" size="small" v-if="orderData.status=='等待付款'">付款</van-button>
            <van-button round type="danger"  size="small" v-if="orderData.status=='已完成'">申请售后</van-button>
            <!-- <van-button round type="danger"  size="small" v-if="orderData.status=='未发货'">提醒发货</van-button> -->
            <van-button round @click="okOrder"  size="small" type="danger" v-if="orderData.status=='已发货'">确认收货</van-button>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
    export default {
        props:['orderData','payment'],
        data(){
            return{
          
            }
        },
        methods:{
            // 取消订单
            cancal(){
                Dialog.confirm({
                    message: '确定取消订单吗？',
                    closeOnClickOverlay:true
                }).then(() => {
                        this.tipFN();
                        this.postFN({
                            url:'/shop.aspx',
                            data:{
                                params:{ "id" : this.orderData.orderId, "userID" : this.userId },
                                method:'Shop.Order.CancelOrder',
                                id:this.userId,
                            }
                        }).then(r=>{
                            this.tipHFN();
                            if(r.data.result.Obj.result=='Success'){
                                this.okFN('取消订单')
                                this.$emit('cancal')
                            }else this.errFN('取消订单')
                        })

                })
            },
            // 确认收货
            okOrder(){
                this.tipFN();
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "oId" : this.orderData.orderId, "uId" : this.userId },
                        method:'Shop.Order.CompleteOrder',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN();
                    if(r.data.result.Error.SubMsg=='确定收货成功!'){
                        this.okFN('确定收货')
                        this.$emit('okOrder')
                    }else this.errFN('确定收货')
                })
            },
            // 支付
            toPay(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "oId" : this.orderData.orderId, "uId" : this.userId },
                        method:'Shop.Order.WeChatPay',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubMsg=='下单成功'){
                        this.wxFN(r.data.result.Obj).then(r=>{
                            if(r) this.okFN('支付')
                            else this.errFN('支付')
                        })
                    }else this.errFN('下单')
                })
            }
            
        },
     
    }
</script>

<style lang="less">
@import '../style/base.less';
.OrderListD{
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