/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-21 17:20:55
    购买弹窗
 */
<template>
    <div id="sku">
        <!-- 头部 -->
        <div class="top">
            <div class="img" @click="scaleSKUFN(img)">
                <img :src="imgSrc+img">
            </div>
            <div class="des" v-if="skuPN.mb">
                <div class="name">
                    <span v-if="skuPN.price">￥{{skuPN.price}}</span>
                    <span v-else>暂无报价</span>
                </div>
                <div>库存 {{skuPN.count}}</div>
                <div class="Tline">已选择：
                    <span v-for="(item,index) in sku" :key>
                        {{item.value}}
                    </span>
                    <!-- {{skuPN.value}} -->
                </div>
            </div>
            <div class="des" v-else>
                <div class="name">
                    请选择类型
                </div>
            </div>
        </div>
        
        <!-- 颜色尺寸等 -->
        <div class="con_type">
            <div class="type" v-for="(items,indexs) in skuList" :key="indexs">
                <div>
                    {{items.name}}
                </div>
                <div class="choose">
                    <span v-for="(item,index) in items.child" :key="index" :class="[item.choose?'chooseT':'',item.disAble?'disable':'']" @click="chooseFN(index,indexs)">
                        {{item.value}}
                    </span>
                </div>
            </div>
            <div class="num">
                <span>购买数量</span>
                <van-stepper v-model="value" :min="1" integer :max="skuPN.count"/>
            </div>
        </div>
        

        <!-- 确定按钮 -->
        <van-button type="danger"class="ok" :disabled="!skuPN.price" @click="buyFN">确定</van-button>
       

    </div>
</template>

<script>
import { ImagePreview } from 'vant';
    export default {
        props:['skuDes','skuData',"skuBte"],
        data(){
            return{
                value:1,//购买数量
                img:require('../img/酒杯3.svg'),
                skuList:[],//可选选项
                sku:{},//选择的sku
                skuPN:{},//显示选择的价格信息等等
            }
        },
        methods:{
            // 选择
            chooseFN(c,f){
                for(let i=0;i<this.skuList[f].child.length;i++){
                    if(i==c) continue;
                    this.skuList[f].child[i].choose=false
                }
                this.skuList[f].child[c].choose=!this.skuList[f].child[c].choose
                if( this.skuList[f].child[c].choose) this.sku[this.skuList[f].name]={id:this.skuList[f].child[c].id,index:this.skuList[f].child[c].index,value:this.skuList[f].child[c].value}
                else delete this.sku[this.skuList[f].name]
                let skuLe=Object.getOwnPropertyNames(this.sku).length-1
                let skuT=''
                for(let i=0;i<skuLe;i++){
                    for(let j in this.sku){
                        if(this.sku[j].index==i){
                            skuT+=(this.sku[j].id).toString()
                        }
                    }
                    skuT+=','
                }
                if(this.skuDes.length==(skuT.split(',')).length-1){
                   skuT=skuT.substr(0, skuT.length - 1)
                   let j=0
                   for(let i in this.skuData){
                       if(this.skuData[i].id==skuT){
                           this.skuPN=this.skuData[i]
                        }else{
                            j++
                           if(j==Object.getOwnPropertyNames(this.skuData).length-1) this.skuPN={count:0,price:false}
                       }
                   }
                   this.skuPN.mb=true
                }else this.skuPN={}

                if(this.skuPN.pic) this.img=this.skuPN.pic
                else this.img=require('../img/酒杯3.svg')
                
            },
            // 图片放大
            scaleSKUFN(img){ 
                ImagePreview({
                    images:[img],
                })
            },
            // 确定
            buyFN(){
                setTimeout(()=>{
                    switch(this.skuBte.type){//判断是什么按钮按的 1规格，2加入购物车，3立即购买
                        case 1:
                            this.$emit('rteSkuFN',this.skuPN,this.sku,this.value)
                        break;
                        case 2:
                            this.postFN({
                                url:'/shop.aspx',
                                data:{
                                    params:{ "SKU" : this.skuPN.sku,'userID':this.userId,"count":this.value,"PointRuleID":0},
                                    method:'Shop.ShoppingCart.AddShoppingCart',
                                    id:this.userId,
                                }
                                }).then(r=>{
                                    if(r.data.result.Error.SubCode==1){
                                       this.okFN("加入购物车")
                                       this.$emit('rteSkuFN',this.skuPN,this.sku,this.value)
                                    }else this.errFN('加入购物车')
                            })
                        break;
                        case 3:
                            let skuCBuy=[{
                                SKU:this.skuPN.sku,
                                Count:this.value,       
                                PointsRuleID:0
                            }]
                            localStorage.setItem("cartBuyList",JSON.stringify(skuCBuy))
                            this.$router.push({path:'/fuPlaceOrder'})
                        break;
                    }
                },50)
                
            },
            
        },
        mounted(){
            this.skuList=JSON.parse(JSON.stringify(this.skuDes))
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#sku{
    position: relative;
    padding:7rem .8rem 0;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    //  <!-- 头部 -->
    .top{
        top: -2.5rem;
        position:absolute;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        .img{
            .bW;
            padding: .3rem;

            >img{
                height: 8rem;
                width: 8rem;
                object-fit: cover;
            }
        }
        .des{
            margin-left: .6rem;
            >div{
                font-size: 1.3rem;
                margin-bottom: .2rem;
            }
            .name{
                padding-top: 2.6rem;
                .jG;
                font-size: 1.5rem;
            }
        }
    }
        // <!-- 颜色尺寸等 -->
    .con_type{
        overflow: auto;
        padding-bottom: 44px;
    }
    .type{
        padding: .8rem 0;
        border-top: 1px solid rgb(245, 245, 245);
        font-size: 1.2rem;
        .choose{
            display: flex;
            flex-wrap: wrap;
            >span{
                margin: .8rem .8rem 0 0;
                padding: .3rem .6rem;
                background: rgb(230, 230, 230);
            }
            .chooseT{
                background:red;
                color: white;
            }
            .disable{
                opacity: .4;
            }
        }
    }   
    // 数量
    .num{
        padding: .8rem 0;
        border-top: 1px solid rgb(245, 245, 245);
        .bBS;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        >span{
            flex: 1;
        }
    }
    // 确定按钮
    .ok{
        margin-left: -.8rem;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    
}
</style>