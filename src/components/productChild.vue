/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-27 16:23:46
    商品卡片
 */
<template>
    <div :class="['productChild',Endian?'productChild_E':'']" >
        <div class="img" @click="toFN(product.id)">
            <img :src="imgSrc+product.pic">
        </div>
        <div class="des_pd" >
            <span class="des_s_pd" @click="toFN(product.id)">
                {{product.title}}{{product.name}} {{product.shortdescription}}
            </span>
            <span class="money">
                <span class="fir" @click="toFN(product.id)">￥{{product.Max}}<i>.{{product.Min}}</i></span>
                <!-- <span class="share">分享</span> -->
                <span class="add"><van-icon @click="addCart" name="shopping-cart" color="red"/></span>
            </span>
        </div>
        
    </div>
</template>

<script>

    export default {
        props:['product','Endian'],
        methods:{
            toFN(id){
                this.$router.push({path:'/fuProduct?id='+id})
            },
            addCart(){
                if(this.product.stockcount==0) return this.notFN("该商品没有库存了！")
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{
                            userID:this.userId,
                            Count:1,
                            PointsRuleID: 0,
                            productId: this.product.id
                        },
                        method:'Shop.ShoppingCart.AddShoppingCart',
                        id:this.userId,
                    }
                    }).then(r=>{
                        if(r.data.result.Error.SubCode==1){
                            this.okFN('加入购物车')
                        }else if(r.data.result.Error.SubCode==3) this.notFN(r.data.result.Error.SubMsg)
                        else this.noFN("加入购物车") 
                })
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.productChild{
    .bW;
    transition: .5s;
    margin-top: .8rem;
    margin-left: 2%;
    box-sizing: border-box;
    border-radius: .2rem;
    box-shadow: .1rem .1rem .1rem rgb(202, 202, 202);
    border: 1px solid rgb(245, 245, 245) ;
    width: 48%;
    height: 23rem;
    display: flex;
    flex-direction: column;
    .img{
        height: 72%;
        >img{
            object-fit: cover;
            height: 100%;
            width: 100%;

            
        }
    }
    .des_pd{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: .5rem .5rem .3rem;
        .des_s_pd{
            .nC;
            font-size: 1.1rem;
            box-sizing: border-box;
            display:-webkit-box;
            -webkit-line-clamp: 2; //超出多少行
            overflow: hidden;
            -webkit-box-orient: vertical;
            word-break:break-all;
        }
        .money{
            flex: 1;
            display: flex;
            align-items: flex-end;
            .fir{
                flex: 1;
                .jG;
                font-size: 1.4rem;
                display:-webkit-box;
                -webkit-line-clamp: 1;
                overflow: hidden;
                -webkit-box-orient: vertical;
                word-break:break-all;
                i{
                    font-size: 1rem;
                }
            }
            .share{
                letter-spacing:.1rem;
                .nC;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid rgb(230, 230, 230);
                border-radius: .6rem;
                width: 3.5rem;
                height: 1.8rem;
            }
            .add{
                .van-icon{
                    font-size: 1.6rem;
                }
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1.9rem;
                height: 1.9rem;
                border: 1px solid rgb(230, 230, 230);
                border-radius: 50%;
                margin-left: 1rem;
            }
        }
    }   
}

.productChild_E{
    margin-top:.1rem;
    width: 100%;
    height: 10rem;
    flex-direction:row;
    box-shadow:none;
    .img{
        height: 100%;
        box-sizing: border-box;
        >img{
            width: 10rem;
        }
        
    }
}
</style>