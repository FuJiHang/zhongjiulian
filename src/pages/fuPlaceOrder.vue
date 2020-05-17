/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 23:10:17
    提交订单
 */
<template>
    <div id="fuPlaceOrder">
        <div class="PlOr_contant">
             
            <!-- 收货信息 -->
            <div @click="toFN">
                <Consignee place="true" :address='address'></Consignee>
            </div>
            <OrderList order='true' express='true' :orderData='item' v-for="(item,index) in orderData.items" :key="index"></OrderList>

            <div class="coupon_po" @click="show=true">
                <span>优惠券</span>
                <span>已选{{isCoupon.num}}张</span>
            </div>

            <!-- 积分 -->
            <div class="coupon_po" >
                <span>可用积分{{getIntList.AccountsPoints}}</span>
                <input class="int" v-model="intVal" type="number" @change="getData" onkeyup="value=value.replace(/[^\d]/g,'')" @input="intFN">
                <van-icon v-show="getIntList.UsePoints" color="red" @click="tipInt" name="info-o" size="1.8rem"/>
                <span v-show="!getIntList.UsePoints">该订单不可用积分</span>
            </div>

            <textarea class="beizu" placeholder="请输入备注" v-model="remark">
                
            </textarea>
        </div>
        <div class="bot_place">
            <span class="flex">共 <i class="jG">{{orderData.quantity}}</i> 件商品，</span>
            <span class="mon">
                <div class="min">总额：{{Price.z}}元</div>
                <div>实付：{{Price.s}}元</div>
                <!-- ￥{{orderData.totalSellPrice}} -->

            </span>
            <van-button type="danger" @click="orderOkFN">提交订单</van-button>
        </div>
        

        <!-- 优惠卷 -->
        <van-popup v-model="show" position="bottom">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getCoupon"
            >
                <couChild @checkFN='checkFN' v-for="(item,index) in list" :key="index" check="true" :cou='item'></couChild>
                
            </van-list>
        </van-popup>


        
    </div>
</template>

<script>
import Consignee from '../components/Consignee'
import OrderList from '../components/OrderList'
import couChild from '../components/couChild'
    export default {
        components:{
            Consignee,OrderList,couChild
        },
        data(){
            return{
                sku:JSON.parse(localStorage.getItem('cartBuyList')),
                show:false,//优惠卷显示
                address:{},//收货地址
                addCR:this.$route.query.address,// 判断是选地址还是第一次下单
                list:[],//优惠卷信息
                loading:false,//优惠卷加载状态
                finished:false,//优惠卷是否加载完全
                page:1,//优惠卷页数
                isCoupon:{
                    num:0,
                },//选择的优惠卷
                getCouList:[],//获取订单能使用的优惠卷
                getIntList:{},//获取积分使用
                intVal:0,//积分数量
                remark:'',//备注
                orderData:{},//订单信息
                Price:{
                    z:0,//商品总价
                    s:0,//实际付款
                },
            }
        },
        methods:{
            toFN(){
                this.$router.push({path:'/fuReceiving',query:{address:JSON.stringify( this.address)}})
            },

            // 获取默认收货地址
            getAddress(){
                this.tipFN();
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userId" : this.userId, "pageIndex" : 1, "pageSize" : 1 },
                        method:'User.Address.Addresslist',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.address=r.data.result.List[0]
                        this.getData()
                    }else{
                        this.tipHFN();
                        this.errFN('获取收货信息')
                    }
                })     
            },


            // 实时检验订单情况
            getData(){
                this.tipFN();
                let params
                if(this.isCoupon.num) params={ 'conpon':this.isCoupon.couponCode,"userID" : this.userId, "shippingAddressId" : this.address.id, "shippingTypeId" : 1, "paymentModeId" : 6, "productList" : this.sku,"submitType":3 }
                else params={ "userID" : this.userId, "shippingAddressId" : this.address.id, "shippingTypeId" : 1, "paymentModeId" : 6, "productList" : this.sku,"submitType":3 }
                if (this.intVal){
                    params.isUsePoints=1
                    params.points=this.intVal
                }
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:params,
                        method:'Shop.Order.SubmitOrderInfo',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN();
                    if(r.data.result.Error.SubMsg=='获取成功!'){
                        let data=r.data.result.Obj
                        this.orderData=data.ShoppingCartInfo
                        this.getCouList=data.couponList
                        this.getIntList=data.checkout_addup[0]
                        if(this.getIntList.AccountsPoints<this.getIntList.MaxDynamicPoints){
                            this.getIntList.MaxDynamicPoints=this.getIntList.AccountsPoints
                        }
                        this.Price={
                            z:data.checkout_addup[0].totalprice,
                            s:data.checkout_addup[0].payprice
                        }   
                    }else this.errFN('订单创建')
                })
            },

            // 提交订单
            orderOkFN(){
                let supCode=localStorage.getItem('supCode')
                this.tipFN();
                let params
                if(this.isCoupon.num) params={ 'couponCode':this.isCoupon.couponCode,"userId" : this.userId, "shipId" : this.address.id, "shipTypeId" : 1,'regionId': this.address.regionId, "paymentId" : 6, "productList" : this.sku,"submitType":3 ,'remark':this.remark}
                else params={ "userId" : this.userId, "shipId" : this.address.id, "shipTypeId" : 1,'regionId': this.address.regionId, "paymentId" : 6, "productList" : this.sku,"submitType":3 ,'remark':this.remark}
                if (this.intVal){
                    params.isUsePoints=1
                    params.points=this.intVal
                }
                params.SupCode=supCode
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:params,
                        method:'Shop.Order.SubmitOrder',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.okFN('下单')
                        setTimeout(()=>{
                            this.$router.replace({path:'/fuOrder?active=0'})
                        },2000)
                        
                    }else this.errFN('提交订单')
                })
            },

            //获取优惠卷
            getCoupon(){
                if(this.finished) return;
                this.loading=true
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "userId" : this.userId, "pageIndex" : this.page, "pageSize" : 10, "type" : 1 },
                        method:'Shop.Coupon.MyCunpon',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.loading=false
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.List){
                            this.finished=true
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
                            var dataC={
                                name:dataList[i].couponName,
                                type:'',
                                time:dataList[i].endDate,
                                couponCode:dataList[i].couponCode,
                                checkToF:false,
                            }
                            for(let c=0;c<this.getCouList.length;c++){
                                if(this.getCouList[c].couponCode==dataList[i].couponCode) dataC.use=!this.getCouList[c].canUseCoupon
                            }
                            this.list.push(dataC)
                        }
                        if(dataList.length<10){
                            this.finished=true
                            return ;
                        }
                        this.page++;
                    }else this.errFN('获取优惠卷信息')
                })
            },

            //选择的优惠卷
            checkFN(data){
                if(!data.checkToF){
                   this.isCoupon=data
                   this.isCoupon.num=1
                }else{
                   this.isCoupon={}
                   this.isCoupon.num=0
                }
                for(let i=0;i<this.list.length;i++){
                    if(data.couponCode==this.list[i].couponCode) this.list[i].checkToF=!data.checkToF
                    else this.list[i].checkToF=false
                }
                this.show=false
                this.getData()
            },

            // 提示积分规则
            tipInt(){
                this.notFN(this.getIntList.DynamicPointsMessage)
            },
            //
            intFN(){
                if(this.intVal<this.getIntList.MinDynamicPoints&&this.intVal!=0) this.intVal=this.getIntList.MinDynamicPoints
                if(this.intVal>this.getIntList.MaxDynamicPoints) this.intVal=this.getIntList.MaxDynamicPoints
                if(this.intVal=='') this.intVal=0
                if(this.intVal.charAt('0')==0) this.intVal=this.intVal.substring(1,this.intVal.length);
            }
        },
        mounted(){
            // 判断是选地址还是第一次下单
            if(!this.addCR) this.getAddress()
            else{
                this.address=JSON.parse(this.addCR)
                this.getData()
            }
            
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuPlaceOrder{
    .nC;
    height: 100%;
    display: flex;
    flex-direction: column;
    .PlOr_contant{
        flex: 1;
        overflow: auto;
        padding-bottom: .8rem;
        .coupon_po{
            font-size: 1.25rem;
            padding: .8rem;
            box-sizing: border-box;
            .bW;.mB;
            display: flex;
            align-items: center;
            >:first-child{
                flex: 1;
            }
            .int{
                text-align: center;
                margin: 0 .8rem;
                width: 3rem;
                border:1px solid rgb(240, 240, 240);
            }
        }
    }
    .bot_place{
        .bW;
        font-size: 1.2rem;
        width: 100%;
        display: flex;
        align-items: center;
        .flex{
            text-align: right;
            flex: 1;
        }
        .mon{
            .min{
                text-align: center;
                font-size: 1.2rem
            }
            margin: 0 .8rem ;
            .jG;
            font-size: 1.4rem;
        }
    }
    .van-popup{
        max-height:60% ;
        padding: .8rem;
        box-sizing: border-box;
        background: rgb(245, 245, 245);
    }
    .beizu{
        padding: .8rem;
        box-sizing: border-box;
        background: white;
        height: 15%;
        width: 100%;
        font-size: 1.2rem;
    }
    .beizu::placeholder{
        .jG;
    }

}
</style>