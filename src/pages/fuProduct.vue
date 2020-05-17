/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 23:03:38
    商品
 */
<template>
    <div id="fuProduct">
        <div class="contact_over">

        
        <!-- 头部 -->
        <div class="product_top">
            <van-swipe :autoplay="30000" indicator-color="red" >
                <van-swipe-item v-for="(item,index) in product.bigPic" :key="index">
                    <img :src="imgSrc+item"  @click="scaleFN(index)" :style="{'height':wwWH+'px'}">
                </van-swipe-item>
            </van-swipe>

            <!-- 右上角按钮 -->
            <div class="proAnniu">
                <div  v-for="(item,index) in anniu" :key="index" @click="topLeftFN(item,index)">
                    <img :src="item.img" >
                </div>
            </div>
        </div>
        <div class="product_name">
            <div class="mon">￥{{product.saleprice}}</div>
            <div class="name">
                {{product.name}}
            </div>
            <div class="des">
                {{product.ShortDescription}}
            </div>
            <!-- <div class="address">
                <span>快递：0.00</span>
                <span>月销：100</span>
                <span>广东省广州市</span>
            </div> -->
            <div class="type" @click="buyFN('type')" v-if="!product.stockcount">
                <span>选择</span>
                <span class="flex">{{depict}}</span>
                <van-icon name="arrow" />
            </div>
            <div class="type" v-else>
                <span>数量</span>
                <span class="flex"></span>
                <van-stepper v-model="value" :max='product.stockcount'/>
            </div>


        </div>

        <!-- 关注店铺 -->
        <follow :data="brandData" @callbackGZ='brandData.hasAttention=true'></follow>

        
        <!-- 商品介绍 -->
        <div class="product">
            <van-tabs v-model="active" swipeable  sticky :offset-top="45.6">
                <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index">
                   <div v-show="index==0" v-html="product.xmltext">   
                    </div>
                    
                    <div v-show="index==1" class="tuijian">
                        <productChildT v-for="(itemP,indexP) in product.RelatedProduct" :product="itemP" :key="indexP"></productChildT>
                    </div>
                </van-tab>
            </van-tabs>
        </div>

        <!-- 底部购买栏 -->
        <van-goods-action>
            <van-goods-action-mini-btn
                :icon="product.favId==0?'like-o':'like'"
                text="收藏"
                @click="buyFN('sc')"
            />
            <van-goods-action-mini-btn
                icon="cart-o"

                text="购物车"
                @click="buyFN('gwc')"
            />
            <van-goods-action-big-btn
                text="加入购物车"
                @click="buyFN('jrgwc')"
            />
            <van-goods-action-big-btn
                primary
                text="立即购买"
                @click="buyFN('ljgm')"
            />
        </van-goods-action>
    </div>

        <van-popup class="sku_vp" v-model="skuBte.status" position="bottom" ref="anb">
            <sku @rteSkuFN="rteSkuFN"  :skuDes='skuDes' :skuData='product.skuData' :skuBte="skuBte"></sku>
        </van-popup> 
        <!-- 搜索 -->
        <van-popup  :lazy-render='false'  v-model="seach" position="top" >
            <seachT ref="seachTOO" placeholder='请输入搜索的商品'></seachT>
        </van-popup>    
        
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
import seachT from '../components/seachT'
import sku from '../components/sku'
import productChildT from '../components/productChildT'
import follow from '../components/follow'
    export default {
        components:{
            seachT,sku,productChildT,follow
        },
        data(){
            return{
                value:1,//没有sku时的购买数量
                productId:this.$route.query.id,//产品ID
                product:{},//产品信息
                seach:false,//显示搜索板
                skuDes:[],//SKU描述
                skuBte:{
                    status:false,//显示SKU板
                    type:1,//判断是什么按钮按的 1规格，2加入购物车，3立即购买
                },//判断是否存在SKU，要不要显示sku面板
                skuPN:{

                },//选择的sku
                depict:'请选择规格',//规格描述
                anniu:[
                    {
                        img:require('../img/home.svg'),
                        to:'/fuIndex'
                    },
                    {
                        img:require('../img/seach@3x.svg'),
                    },
                    {
                        img:require('../img/zhuzj.svg'),
                        to:'/fuFootprint'
                    },
                ],//按钮信息
                active:0,//商品介绍，为你推荐
                listBal:[
                    {
                        name:'商品介绍',
                    },
                    {
                        name:'为你推荐',
                    },
                ],//商品介绍，为你推荐名字
                SupCode:localStorage.getItem("supCode"),//店铺id
                brandData:{},//店铺信息


            }
        },
        methods:{
            // 图片放大
            scaleFN(i){ 
                ImagePreview({
                    images:this.product.bigPic,
                    startPosition: i,
                })
            },

            // 四个按钮
            buyFN(type){
                switch(type){
                    case 'sc'://收藏
                        if(this.product.favId==0){
                            this.postFN({
                                url:'/shop.aspx',
                                data:{
                                    params:{ "productId" : this.productId,'userId':3},
                                    method:'Shop.Collection.ProductAddFav',
                                    id:this.userId,
                                }
                            }).then(r=>{
                                if(r.data.result.Error.SubCode==1){
                                    this.product.favId=r.data.result.Obj.favId
                                    this.notFN('收藏成功！',1000)                                    
                                }
                                else this.errFN('收藏')
                            })
                        }
                        else{
                            this.postFN({
                                url:'/shop.aspx',
                                data:{
                                    params:{ 'userId':this.userId,"favId":this.product.favId},
                                    method:'Shop.Collection.CancelFav',
                                    id:this.userId,
                                }
                            }).then(r=>{
                                if(r.data.result.Error.SubMsg=='取消收藏成功!'){
                                    this.notFN("取消收藏成功!")
                                    this.product.favId=0
                                }else this.errFN('取消收藏')
                            })
                        }
                    break;
                    case 'gwc'://去购物车
                        this.$router.push({path:'/fuCart'})
                    break;
                    case 'jrgwc'://加入购物车
                        if(this.product.stockcount){
                            //无sku
                            setTimeout(()=>{
                                this.postFN({
                                    url:'/shop.aspx',
                                    data:{
                                        params:{
                                            userID:this.userId,
                                            Count: this.value,
                                            PointsRuleID: 0,
                                            SKU: this.product.sku
                                        },
                                        method:'Shop.ShoppingCart.AddShoppingCart',
                                        id:this.userId,
                                    }
                                    }).then(r=>{
                                        if(r.data.result.Error.SubCode==1){
                                        this.okFN("加入购物车")
                                        }else this.errFN('加入购物车')
                                        delete this.skuPN.userID
                                })
                            },50)
                            
                        }else{
                            // 有sku
                            if(this.skuPN.SKU){
                                this.skuPN.userID=this.userId
                                this.postFN({
                                    url:'/shop.aspx',
                                    data:{
                                        params:this.skuPN,
                                        method:'Shop.ShoppingCart.AddShoppingCart',
                                        id:this.userId,
                                    }
                                    }).then(r=>{
                                        if(r.data.result.Error.SubCode==1){
                                        this.okFN("加入购物车")
                                        }else this.errFN('加入购物车')
                                        delete this.skuPN.userID
                                })
                            }else this.skuBte={
                                status:true,
                                type:2,
                            }
                        }
                        
                    break;
                    case 'ljgm'://立即购买
                        if(this.product.stockcount){
                            //无sku
                            setTimeout(()=>{
                                let cartBuyList=[{
                                    Count: this.value,
                                    PointsRuleID: 0,
                                    SKU: this.product.sku
                                }]
                                localStorage.setItem("cartBuyList",JSON.stringify(cartBuyList))
                                if(this.userData.hasDefaultAddress)  this.$router.push({path:'/fuPlaceOrder'})
                                else this.$router.push({path:'/fuReceiving'})
                            },50)
                            
                        }else{
                            //有sku
                            if(this.skuPN.SKU){
                                let cartBuyList=[this.skuPN]
                                localStorage.setItem("cartBuyList",JSON.stringify(cartBuyList))
                                if(this.userData.hasDefaultAddress)  this.$router.push({path:'/fuPlaceOrder'})
                                else this.$router.push({path:'/fuReceiving'})
                            }else this.skuBte={
                                status:true,
                                type:3,
                            }
                        }
                        
                    break;
                    case 'type'://选择规格
                        this.skuBte={
                            status:true,
                            type:1,
                        }
                    break;
                    
                }
            },

            // sku面板返回的信息
            rteSkuFN(skuP,skuD,skuNum){
                this.skuPN={
                    SKU:skuP.sku,
                    Count:skuNum,       
                    PointsRuleID:0
                }
                this.depict=''
                for(let i in skuD){
                    this.depict+=skuD[i].value+' '
                }
                this.depict+='     数量：'+skuNum
                this.skuBte.status=false
            },
            // 右上角三个按钮
            topLeftFN(item,index){
                if(index==1){
                    this.seach=true
                    this.$refs.seachTOO.onFous();
                    
                }
                else this.$router.push({path:item.to})
            },
            // 获取产品信息
            getData(){
                this.tipFN();
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "pId" : this.productId,'uid':this.userId,"SupCode":this.SupCode},
                        method:'Shop.Product.ProductDetail',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN();
                    if(r.data.result.Error.SubCode==1){
                        let data=r.data.result.Obj
                        this.product=data
                        this.brandData={
                            stoGravatar:data.supimg,
                            stoNick:data.supname,
                            TestCode:data.supcode,
                            hasAttention:data.hasAttention
                        }
                        if(!data.productProperty) return ;
                        let j=0;
                        for(let i in data.productProperty){
                            this.skuDes[j]={name:i}      
                            this.skuDes[j].child=[]          
                            for(let x=0;x<data.productProperty[i].length;x++){
                                data.productProperty[i][x].choose=false
                                data.productProperty[i][x].index=j
                                this.skuDes[j].child.push(data.productProperty[i][x])
                            }
                            j++
                        }
                    }else this.errFN('获取商品信息')
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
#fuProduct{
    .nC;
    position: relative;
    height: 100%;
    .contact_over{
        .hO; //解决苹果弹窗被导航条覆盖
    }
    // 头部轮播图
    .product_top{
        position: relative;
        .van-swipe{
            .bBS;
            img{
                object-fit:  scale-down;
                width: 100%;
                // height: 414px;
            }
        }
        // 右上角三个按钮
        .proAnniu{
            top: .8rem;right: .8rem;
            position:absolute;
            >div{
                .mB;
                border-radius: 50%;
                background: rgba(255, 255, 255,.8);
                height: 3.2rem;
                width: 3.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                >img{
                    height: 2rem;
                    width: 2rem;
                    object-fit: cover;
                }
            }
            :last-child{
                >img{
                    margin-left: .2rem;
                }
            }
        }
    }
    // 描述价格等等
    .product_name{
        padding: .8rem;
        box-sizing: border-box;
        .bBS;.bW;.bR;.mB;
        .mon{
            font-size: 1.5rem;
            .jG;
            margin-bottom: .4rem;
        }
        .name{
            .mB;
            font-size: 1.3rem;
        }
        .des{
            .mB;
            font-size: 1.2rem;
            color: #999;
            .Tline;
        }
        .address{
            color: #999;
            display: flex;
            font-size: 1.1rem;
            >:nth-child(2){
                text-align: center;
                flex: 1;
            }
            .mB;
        }
        .type{
            display: flex;
            align-items: center;
            padding: .8rem 0;
            font-size: 1.3rem;
            border-top: 1px solid rgb(245, 245, 245);
            .bBS;
            .flex{
                flex: 1;
                margin-left: .8rem;
                color: #999;
            }
        }
    }

    // 商品介绍
    .product{
        .bW;
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
            height: 100%;
            overflow: auto;
            padding: 10px 0 70px;
            box-sizing: border-box;
            .bW;
            text-align: center;
            img{
                width: 100%;
            }
            .tuijian{
                display: flex;
                flex-wrap: wrap;
            }
        }
        
    }
    

    .van-goods-action{
        z-index: 99;
    }
    // sku
    .sku_vp{
        height: 60%;
        overflow-y:visible;
    }
    // 收藏颜色
    .van-icon-like{
        color: red;
    }
}
</style>