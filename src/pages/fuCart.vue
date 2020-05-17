/*
 * @Author: fujihang 
 * @Date: 2018-12-27 11:00:26 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-18 11:09:02
    购物车
 */
<template>
    <div id="fuCart">

        <div class="cart_cont" >

            <!--  -->
            <div class="store_cart">
                <div class="store_name">
                    <div class="left" >
                        <!-- <van-checkbox v-model="checked" checked-color="red">中酒联旗舰店</van-checkbox> -->
                        中酒联旗舰店
                    </div>
                    <div class="right" @click="toFNkagami('/fuCouponList')">
                        有优惠券<van-icon name="arrow" />
                    </div>
                </div>
                
                <div :class="['pro_zon',aa==index?'pro_zon_le':'']" 
                    @touchstart="_touchstart"
                    @touchmove="_touchmove($event,index)" 
                    v-for="(item,index) in cartList" :key="index"
                >
                    <div class="product">
                        <span @click="checkOne(item)">
                            <van-checkbox v-model="item.selected" checked-color='red'></van-checkbox>
                        </span>
                        <div class="pie">
                            <img :src="imgSrc+item.thumbnailsUrl">
                        </div>
                        <div class="right">
                            <div class="desc">
                                <span class="desc_s">
                                    {{item.name}}山东矿机三季度开始就冻死了的结论是规划局规划局规划局
                                </span>
                                <span class="cla">
                                    规格：
                                    <span v-for="(gg,indexgg) in item.skuValues" :key="indexgg">
                                        {{gg}}
                                    </span>
                                </span>
                            </div>
                            <div class="mon_nub">
                                <div class="mon">
                                    ￥{{item.sellPrice}}
                                </div>
                                <van-stepper
                                    @minus="checkOne(item,true)"
                                    @plus="checkOne(item,true)"
                                    @blur="checkOne(item,true)"
                                    v-model="item.quantity"
                                    :max='item.maxCount'
                                    integer 
                                   
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col_del" >
                        <div class="col cD" @click="shouChan(item)">
                            收藏
                        </div>
                        <div class="deld cD" @click="deleteOne(item.itemId)">
                            删除
                        </div>
                    </div>
                </div>
                    <!-- <input type="text" id="textInput"  v-on:focus="txtFocus" placeholder="Type here..."> -->
            </div>
        </div>

        <!-- 底部结算 -->
        <div class="settle">
            <div class="left" @click="checkAll">
                <van-checkbox v-model="checkedAll" checked-color="red" >全选</van-checkbox>        
            </div>
            <div class="mid">
                <div class="top">合计：{{allInfo.totalSellPrice}}元</div>
                <div class="but">共{{allInfo.quantity}}个，不含运费</div>
            </div>
            <div class="right" @click="toFN(allInfo.totalSellPrice)"  :style="allInfo.totalSellPrice?'':{opacity:.4}">
                结  算
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                checkedAll:false,//全选
                clientYS:0,//触摸
                clientXS:0,//触摸
                aa:-1,//哪个左滑
                allInfo:[],//购物车所有价格信息
                cartList:[],//购物车列表信息
                textInput:null,
                
            }
        },
        methods:{
            _touchstart(e){
                this.clientYS=e.changedTouches[0].clientY
                this.clientXS=e.changedTouches[0].clientX
            },
            _touchmove(e,index){
                let tou=e.changedTouches[0]
                if(this.clientYS+8>tou.clientY&&this.clientYS-8<tou.clientY){
                    if(this.clientXS+2<tou.clientX)  this.aa=-1
                    if(this.clientXS-2>tou.clientX)  this.aa=index
                }
            },

            // 去结算
            toFN(price){
                if(price){
                    let cartvBuyList=[]
                    for(let i=0;i<this.allInfo.items.length;i++){
                        cartvBuyList.push({
                            SKU:this.allInfo.items[i].sKU,
                            Count:this.allInfo.items[i].quantity,
                            PointsRuleID:6
                        })
                    }
                    localStorage.setItem("cartBuyList",JSON.stringify(cartvBuyList))
                    if(this.userData.hasDefaultAddress)  this.$router.push({path:'/fuPlaceOrder'})
                    else this.$router.push({path:'/fuReceiving'})
                }
            },

            // 获取购物车信息
            getData(){
                this.tipFN();
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "userID" : this.userId, },
                        method:'Shop.ShoppingCart.ShoppingCartList',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN();
                    if(r.data.result.Error.SubMsg=='获取成功!'){
                        this.cartList=r.data.result.Obj.AllCartInfo.items
                        this.checkedAll=r.data.result.Obj.isSelect
                        this.allInfo=r.data.result.Obj.SelectedCartInfo
                    }else this.errFN('获取购物车信息')
                })
            },

            // 是否选中所有
            checkAll(){
                let params
                if(!this.checkedAll) params={ "userID" : this.userId,'isSelected':2 }
                else params={ "userID" : this.userId,'isSelected':1 }
                this.tipFN();
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:params,
                        method:'Shop.ShoppingCart.SelectedAllShoppingCart',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN();
                    if(r.data.result.Error.SubMsg=='获取成功!'){
                        this.cartList=r.data.result.Obj.AllCartInfo.items
                        this.checkedAll=r.data.result.Obj.isSelect
                        this.allInfo=r.data.result.Obj.SelectedCartInfo
                    }else this.errFN('操作')
                })
            },

            // 修改购物车数量 是否选择这个商品
            checkOne(item,num){
                setTimeout(()=>{
                    let params
                    if(item.selected) params={ "userID" : this.userId,'isSelected':1,'count':item.quantity,'itemId':item.itemId,'SKU':item.sKU,}
                    else {
                        if(num) return;
                        params={ "userID" : this.userId,'isSelected':2,'count':item.quantity,'itemId':item.itemId,'SKU':item.sKU,}
                    }
                    this.tipFN();
                    this.postFN({
                        url:'/shop.aspx',
                        data:{
                            params:params,
                            method:'Shop.ShoppingCart.UpdataShoppingCart',
                            id:this.userId,
                        }
                    }).then(r=>{
                        this.tipHFN();
                        if(r.data.result.Error.SubMsg=='获取成功!'){
                            this.cartList=r.data.result.Obj.AllCartInfo.items
                            this.checkedAll=r.data.result.Obj.isSelect
                            this.allInfo=r.data.result.Obj.SelectedCartInfo
                        }else this.errFN('操作')
                    })
                },10)
                
            },

            // 删除购物车
            deleteOne(id){
                this.tipFN();
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{"userID":this.userId,"itemID":id},
                        method:'Shop.ShoppingCart.DelShoppingCart',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN();
                    if(r.data.result.Error.SubMsg=='删除成功!'){
                        this.getData()
                        this.aa=-1
                    }else this.errFN('删除')
                })
            },

            // 收藏
            shouChan(item){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "productId" : item.productId,'userId':this.userId},
                        method:'Shop.Collection.ProductAddFav',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.notFN('收藏成功！',1000)                                    
                    }
                    else this.errFN('收藏')
                })
            },


            txtFocus(){
            
               
              

            
            },
            txtBlur(){
                this.textInput.blur()   
            },
            toFNkagami(to) {
    
                this.$router.push({
    
                    path: to
    
                })
    
            },
        },
        mounted(){
            this.getData();
            let inp=document.getElementsByClassName("van-stepper__input")
             setTimeout(()=>{
                 for(let i=0;i<inp.length;i++){
                    inp[i].addEventListener('focus',()=>{
                         setTimeout(() => {
                            document.getElementsByClassName('cart_cont')[0].scrollTop=9999
                        }, 400)
                    })
                 }
                
             },150)
        },
        watch:{
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuCart{
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    .cart_cont{
        flex: 1;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        // 
        .store_cart{
            box-sizing: border-box;
            width: 100%;
             overflow: hidden;
            background: white;        
            .store_name{
                padding: 0 .8rem;
                display: flex;
                align-items: center;
                height: 4rem;
                .left{
                    .nC;
                    font-size: 1.4rem;
                    .van-checkbox__label{
                        // font-size: 1.4rem;
                    }
                }
                .right{
                    font-size: 1.1rem;
                    color: #999;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .van-icon-arrow{
                        margin-left: .5rem;
                        font-size: 1.5rem;
                    }
                }
            }
            .pro_zon{
                // transform: translateX(-9rem);
                // margin-left: -9rem;
                transition: .2s;
                width: 100%;
                padding:.8rem;            
                border-top: 1px solid rgb(245, 245, 245);
                position: relative;
                box-sizing: border-box;
                .product{
                    display: flex;
                    align-items: center;
                    .pie{
                        margin-left: .6rem;
                        img{
                            width: 9rem;
                            height: 9rem;
                            object-fit: cover;
                        }
                    }
                    .right{
                        margin-left: .5rem;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        .desc{
                            display: flex;
                            flex-direction: column;
                            font-size: 1.2rem;
                            .nC;
                            .desc_s{
                                .Tline;
                            }
                            .cla{
                                .Oline;
                                color: #999;
                                font-size: 1.1rem;
                                margin-top: .8rem;
                                >span{
                                    margin-right: .4rem;
                                }
                            }
                        }
                        .mon_nub{
                            flex: 1;
                            align-items: center;
                            display: flex;
                            .mon{
                                flex: 1;
                                .jG;
                                font-size: 1.5rem;
                                .Oline;
                            }
                            .van-stepper{
                                width: 115px;
                            }
                        }
                    }
                }
                .col_del{
                    background: red;
                    top: 0;left: 100%;
                    position:absolute;
                    width: 9rem;
                    height: 100%;
                    .cD{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        background: #E6A23C;
                        height: 50%;
                        width: 100%;
                        font-size: 1.3rem;
                    }
                    .deld{
                        background:red;
                    }
                }
            }
            .pro_zon_le{
                transform: translateX(-9rem);
            }
        }

    }
    
    // 底部购物车导航条
    .settle{
        background: white;
        display: flex;
        width: 100%;
        height: 4.5rem;
        align-items: center;
        .nC;
        .left{
            margin-left: .8rem;
        }
        .mid{
            margin-right: .5rem;
            flex: 1;
            text-align: right;
            .top{
                font-weight: 600;
                font-size: 1.45rem;
                margin-bottom: .3rem;
            }
        }
        .right{
            font-size: 1.4rem;
            color: white;
            .tB;
            width: 8rem;
            text-align: center;
            line-height: 4.5rem;
            height: 100%;
        }
    }
    .van-checkbox__label{
        .nC;
        font-size: 1.2rem;
        margin-left: .5rem;
    }
}

</style>