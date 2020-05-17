/*
 * @Author: fujihang 
 * @Date: 2019-03-16 18:49:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-29 14:47:04
    品牌街
 */
<template>
    <div id="fuBrandStreet">
         <!-- 轮播图 -->
        <!-- <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white" >
                <van-swipe-item v-for="(item,index) in banner" :key="index" >
                    <img :src="imgSrc+item.pic" :style="{'height':wwWH*3.5/7+'px'}" @click="banOpFN(item.url)">
                </van-swipe-item>
            </van-swipe>
        </div> -->

        <!-- <div class="recommend_top">
            <img src="../img/homepage1.png" alt="">
        </div> -->
        <!-- 品牌 -->

        <div class="function">
            <div class="fun_child" @click="toFN(item)" v-for="(item,index) in Tweets" :key="index">
                <div class="fun_des">
                    {{item.BrandName}}
                </div>
                <img class="img" :src="imgSrc+item.Logo">
            </div>  
        </div>

        <!-- 推荐商品 -->
        <!-- <div class="recommend_top">
            <img src="../img/homepage4.png" alt="">
        </div>
        <div class="recommend">
           <productChild :key="i" :product="product" v-for="i in 4"></productChild>
        </div> -->

        <!-- 推荐咨询 -->
        <!-- <div class="recommend_top" >
            <img src="../img/homepage4.png" alt="">
        </div>
        <ArticleChild v-for="i in 2" :key="i"></ArticleChild> -->

    </div>
</template>

<script>
import productChild from '../components/productChild'
import ArticleChild from "../components/ArticleChild"
    export default {
        components:{
            productChild,ArticleChild
        },
        data(){
            return{
                // product:{
                //     id:1,
                //     pic:require('../img/pro02.jpg'),
                //     title:'不知道',
                //     name:'不知道',
                //     shortdescription:'不知道',
                //     Max:"80",
                //     Min:"00",
                // },
                // banner:[],//轮播图
                Tweets:[],//品牌列表
            }
        },
        methods:{
            // 首页轮播图
            // bannerFN(){
            //     this.postFN({
            //         url:'/shop.aspx',
            //         data:{
            //             params:{ "aid" : 96, "cid" : 0, "indexRec" : 0, "parentId" : null, "top" : null },
            //             method:'Shop.Common.HomeIndex',
            //             id:this.userId,
            //         }
            //     }).then(r=>{
            //         if(r.data.result.Error.SubCode==1){
            //             this.banner=r.data.result.Obj.home_banner
            //         }else this.errFN('获取轮播图')
            //     })
            // },
            // // 轮播图跳转页面
            // banOpFN(url){
            //     console.log("asdasd")
            //     window.open(url)
            // },
            // 跳转品牌详情
            toFN(data){
                this.$router.push({path:'/fuBrandDet?id='+data.BrandId+'&name='+data.BrandName})
                localStorage.setItem('brandDet',data.Description)
                // console.log(data)
            },


            // 品牌街列表
            getBrand(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        method:'Shop.Brand.BrandsList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubMsg=="获取成功！") 
                    {
                        this.Tweets=r.data.result.List
                    }
                    else this.notFN(r.data.result.Error.SubMsg)
                })
            }
        },
        mounted(){
            // this.bannerFN();
            this.getBrand();
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuBrandStreet{
    overflow: auto;
    height: 100%;
    // 轮播图
    .banner{
        .van-swipe-item{
            >img{
                width: 100%;
                object-fit: cover;
            }
        }
    }
    // 推荐商品
    .recommend_top{
        margin-top: .3rem;
        >img{
            width: 100%;
        }
    }
    .recommend{
       display: flex;
       flex-wrap: wrap;
    }
    // 功能模块
    .function{
        display: flex;
        flex-wrap: wrap;
        margin-left:-2%; 
        .fun_child{
            margin-top: .5rem;
            height: 8rem;
            width: 48%;
            margin-left: 2%;
            display: flex;
            background: white;
            align-items: center;
            padding: .5rem .5rem;
            box-sizing: border-box;
            border-radius: .6rem;
            box-shadow: .1rem .1rem .1rem rgb(202, 202, 202);
            .fun_des{
                .nC;
                margin: 0 .5rem;
                text-align: center;
                font-size: 1.2rem;
                flex: 1;
                display:-webkit-box;
                -webkit-line-clamp: 2; //超出多少行
                overflow: hidden;
                -webkit-box-orient: vertical;
                word-break:break-all;
            }
            .img{
                object-fit: cover;
                // border-radius: 50%;
                width: 6rem;
                height: 6rem;
            }
        }
    }
}
</style>