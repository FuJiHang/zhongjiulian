
/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-09 14:57:57
    订单详情
 */
<template>
    <div id="fuOrderDes">
        <!-- 头部 -->
        <div class="des_top">
            <div class="left">
                <div>
                    {{orderData.status}}
                </div>
                <div class="time" v-if="orderData.status=='已发货'">
                    还剩4天10小时自动确认
                </div>
            </div>
            <img src="../img/dfkb.svg" v-if="orderData.status=='等待付款'">
            <img src="../img/kdi.svg" v-if="orderData.status=='未发货'">
            <img src="../img/kdi.svg" v-if="orderData.status=='已发货'">
            <img src="../img/ywcb.svg" v-if="orderData.status=='已完成'">
            <van-icon class="img_r" name="clear" color='#ffffff' size="6rem" v-if="orderData.status=='取消订单'" />
        </div>

        <!-- 快递信息 -->
        <div class="express" @click="show=true" v-if="orderData.status=='已发货'||orderData.status=='已完成'">
            <van-icon name="logistics" size='1.6rem' color="red" />
            <span class="des">
                <div>
                    {{logisticsOne.content}}
                </div>
                <div class="time">
                    {{logisticsOne.date}}
                </div>
            </span>
            <van-icon name="arrow"/>
        </div>
        
        <!-- 收货人信息 -->
        <Consignee :address="address_info"></Consignee>

        <OrderListD @cancal="orderData.status='取消订单'" @okOrder="orderData.status='已完成'" :orderData="orderData" :payment='payment'></OrderListD>

        <!-- 订单编号 -->
        <div class="identifier">
            <div>订单编号：{{orderData.orderCode}}</div>
            <div v-for="(item,index) in orderData.order_follows" :key="index">
                {{item.operation}} : {{item.time}}
            </div>
            <!-- <div>创建时间：{{orderData.orderTime}}</div> -->
            <!-- <div>付款时间：2019-01-10 15:55:00</div>
            <div>发货时间：2019-01-10 15:55:00</div> -->
        </div>

        <!-- 物流信息 -->
        <van-popup class="logistics" v-model="show" position="bottom" >
            <div class="log_top">
                <img :src="imgSrc+logistics.img">
                <div class="right">
                    <div class="code">
                        {{logistics.shipState}}
                    </div>
                    <div>
                        {{logistics.shipName}}：{{logistics.shipNum}}
                    </div>
                </div>
            </div>

            <div class="log_bot">
                <van-steps direction="vertical" :active="0" active-color="#f44">
                    <van-step v-for="(item,index) in logistics.value" :key="index">
                        <h3>{{item.content}}</h3>
                        <p>{{item.date}}</p>
                    </van-step>
               
                </van-steps>
            </div>
            
            
        </van-popup>
    </div>
</template>

<script>
import OrderListD from '../components/OrderListD'
import Consignee from '../components/Consignee'
    export default {
        components:{
            OrderListD,Consignee,
        },
        data(){
            return{
                orderId:this.$route.query.orderid,//订单id
                show:false,
                orderData:{},//订单详情
                payment:{},//运费和总价格
                address_info:{},//收货人地址
                logistics:{
                    value:[],
                    shipName:'',
                    shipNum:'',
                    shipState:'',
                },//物流信息
                logisticsOne:{},//第一条物流
            }
        },
        methods:{
            // 获取订单列表
            getData(){
                this.tipFN()
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "id" : this.orderId, "userID" : this.userId },
                        method:'Shop.Order.OrderDetail',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.orderData=r.data.result.Obj
                        this.payment=r.data.result.Obj.payment
                        this.address_info=r.data.result.Obj.address_info
                        let num=0;
                        for(let i=0;i<this.orderData.productlist.length;i++){
                            num+=this.orderData.productlist[i].number
                        }
                        this.orderData.zonNum=num
                        this.getLogistic();
                    }else{
                        this.tipHFN()
                        this.errFN('获取订单详情')
                    }
                })
            },
            //获取物流信息
            getLogistic(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "oid" : this.orderId, "type" : 2 },
                        method:'Shop.Common.GetExpressInfo',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN()
                    if(r.data.result.Error.SubCode==1){
                        this.logistics={
                            shipName:r.data.result.Obj.shipName,
                            shipNum:r.data.result.Obj.shipNum,
                            shipState:r.data.result.Obj.shipState,
                            img:this.orderData.productlist[0].pic,
                            value:this.dataCTime(r.data.result.Obj.Data,'date')
                        }
                        this.logisticsOne=this.logistics.value[0]
                    }else this.errFN('获取物流信息')
                })
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuOrderDes{
    .hO;.nC;
        // <!-- 头部 -->
    .des_top{
        padding: .8rem;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #ff9000 , #ff5000);
        .left{
            font-size: 1.3rem;
            color: white;
            .time{
                margin-top: .4rem;
                font-size: 1.2rem;
            }
        }
        >img{
            margin-left:15%;
            height: 7rem;
        }
        .img_r{
            margin-left:15%;
        }
    }
    // <!-- 快递信息 -->
    .express{
        .bW;.bBS;
        padding: .8rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .des{
            font-size: 1.3rem;
            margin:0 .8rem;
            flex: 1;
            color: rgb(255, 60, 0);
            .time{
                color: #999;
                margin-top: .6rem;
            }
        }
        
    }
    


    // <!-- 订单编号 -->
    .identifier{
        .bW;.bR;
        font-size: 1.25rem;
        margin: .8rem 0;
        padding: .8rem;
        box-sizing: border-box;
    }
    
    // <!-- 物流信息 -->
    .logistics{
        border-radius: .8rem .8rem 0 0;
        height: 55%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .log_top{
            box-sizing: border-box;
            display: flex;
            padding: .8rem;
            .bBS;.mB;
            >img{
                height: 6rem;
                width: 6rem;
                object-fit: cover;
            }
            .right{
                margin-left: .8rem;
                font-size: 1.3rem;
                .code{
                    .jG;
                    font-size: 1.4rem;
                }
            }
        }
        .log_bot{
            padding-bottom: .8rem;
            overflow: auto;
            flex: 1;
        }
    }
}
</style>