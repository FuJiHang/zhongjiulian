/*
 * @Author: fujihang 
 * @Date: 2018-12-27 16:50:06 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-08 16:51:51
    订单
*/
<template>
    <div id="fuOrder">
        <!-- 头部 -->
        <div class="Order_top">
            
            <!-- 无缓存 -->
            <!-- <van-tabs v-model="active" swipeable  animated sticky :offset-top="45.6" @change='getData(true)'>
                <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index"> -->
                    <!-- 下拉加载 -->

                    <!-- <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getData"
                    >
                        <OrderListT  v-for="(itemC,indexC) in orderlist" :orderData='itemC' class="mB" :key="indexC" :productList='itemC.ProductDetail.productlist'></OrderListT>
                    </van-list> 
                </van-tab>
            </van-tabs> -->

            <!-- 有缓存 -->
            <van-tabs v-model="active" swipeable   sticky :offset-top="45.6" @change='getData'>
                <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index">
                    <!-- 下拉加载 -->

                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getData"
                    >
                        <div v-for="(order,indexO) in orderlistT" :key="indexO" v-show="indexO==active">
                            <OrderListT  v-for="(itemC,indexC) in order.orderlist" :orderData='itemC' class="mB" :key="indexC" :productList='itemC.ProductDetail.productlist'></OrderListT>
                        </div>
                        
                    </van-list> 
                </van-tab>
            </van-tabs>

        </div>
    </div>
</template>

<script>
import OrderListT from '../components/OrderListT'
    export default {
        components:{
            OrderListT,
        },
        data(){
            return{
                active:this.$route.query.active,
                // orderlist: [],//订单信息
                loading: false,//是否处于加载状态
                finished: false,  //是否加载完成
                params:{},//请求参数
                num:1,//页数
                listBal:[
                    {
                        name:'全部',
                    },
                    {
                        name:'待付款',
                    },
                    {
                        name:'待发货',
                    },
                    {
                        name:'待收货',
                    },
                ],
                orderlistT:[
                    {
                        finished:false,
                        num:1,
                        orderlist:[],
                    },
                    {
                        finished:false,
                        num:1,
                        orderlist:[],
                    },
                    {
                        finished:false,
                        num:1,
                        orderlist:[],
                    },
                    {
                        finished:false,
                        num:1,
                        orderlist:[],
                    },
                ],//订单信息缓存版
            }
        },
        methods:{

            // 无缓存
            // 获取订单列表
            // getData(typeC){
            //     if(typeC){
            //         this.orderlist=[]    
            //         this.page=1 
            //         this.finished=false
            //     }
            //     switch(this.active){
            //         case 0:
            //             this.params={ "pageIndex" : this.page, "pageSize" : 10, "userID" : 3, "payType" : null, "orderType" : null, "shippingStatus" : null}
            //         break;
            //         case 1:
            //             this.params={ "pageIndex" : this.page, "pageSize" : 10, "userID" : 3, "payType" : null, "orderType" : 0, "shippingStatus" : null}
            //         break;
            //         case 2:
            //             this.params={ "pageIndex" : this.page, "pageSize" : 10, "userID" : 3, "payType" : 2, "orderType" : 1, "shippingStatus" : 0}
            //         break;
            //         case 3:
            //             this.params={ "pageIndex" : this.page, "pageSize" : 10, "userID" : 3, "payType" : 2, "orderType" : 1, "shippingStatus" : 2}
            //         break;
            //     }
            //     this.loading=true
            //     this.postFN({
            //         url:'/shop.aspx',
            //         data:{
            //             params:this.params,
            //             method:'Shop.Order.OrderList',
            //             id:this.userId,
            //         }
            //     }).then(r=>{
            //         if(r.data.result.Error.SubCode==1){
            //             if(!r.data.result.List){
            //                 this.finished=true
            //                 this.loading=false
            //                 return ;
            //             }                
            //             let listData=r.data.result.List
            //             for(let i=0;i<listData.length;i++){
            //                 this.orderlist.push(listData[i])
            //             }
            //             if(listData.length<10){
            //                 this.finished=true
            //                 this.loading=false
            //                 return ;
            //             }
            //             this.page++;
            //             this.loading=false
                        
            //         }else this.errFN('获取订单')
            //     })
            // },

            // 有缓存
            // 获取订单列表
            getData(){
                this.$router.replace({ query: { active: this.active } }) //修改路由参数，以便进去详情退出时不被覆盖
                if(this.orderlistT[this.active].finished){
                    this.loading=false
                    this.finished=true
                    return ;
                }else{
                    this.finished=false
                    this.loading=true
                }
                switch(this.active){
                    case 0:
                        this.params={ "pageIndex" : this.orderlistT[this.active].num, "pageSize" : 10, "userID" : this.userId, "payType" : null, "orderType" : null, "shippingStatus" : null}
                    break;
                    case 1:
                        this.params={ "pageIndex" : this.orderlistT[this.active].num, "pageSize" : 10, "userID" : this.userId, "payType" : null, "orderType" : 0, "shippingStatus" : null}
                    break;
                    case 2:
                        this.params={ "pageIndex" : this.orderlistT[this.active].num, "pageSize" : 10, "userID" : this.userId, "payType" : 2, "orderType" : 1, "shippingStatus" : 0}
                    break;
                    case 3:
                        this.params={ "pageIndex" : this.orderlistT[this.active].num, "pageSize" : 10, "userID" : this.userId, "payType" : 2, "orderType" : 1, "shippingStatus" : 2}
                    break;
                }
                
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:this.params,
                        method:'Shop.Order.OrderList',
                        id:this.userId,
                    }
                }).then(r=>{
                    
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.List){
                            this.orderlistT[this.active].finished=true
                            this.loading=false
                            return ;
                        }                
                        let listData=r.data.result.List
                        for(let i=0;i<listData.length;i++){
                            this.orderlistT[this.active].orderlist.push(listData[i])
                        }
                        if(listData.length<10){
                            this.orderlistT[this.active].finished=true
                            this.loading=false
                            return ;
                        }
                        this.orderlistT[this.active].num++;
                        this.loading=false
                        
                    }else {
                        this.loading=false
                        this.errFN('获取订单')
                    }
                })
            },
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style lang="less">
#fuOrder{
    height: 100%;
    overflow: hidden;
    // 头部
    .Order_top{
        height: 100%;
        overflow: hidden;
        .van-tabs{
            height: 100%;
            .van-tabs__content{
                height: 100%;
            }
        }
        .van-tabs__wrap{
            border-bottom:1px solid rgb(240, 240, 240);
        }
        .van-tab__pane{
            overflow: auto;
            height: 100%;
            padding: 0 0 44px;
            box-sizing: border-box;
        }
    }
}
</style>