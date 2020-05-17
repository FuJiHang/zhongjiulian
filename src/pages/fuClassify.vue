/*
 * @Author: fujihang 
 * @Date: 2018-12-26 15:20:04 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-11 11:08:28
    分类页面
 */
<template>
    <div id="fuClassify" @touchmove="touchmove" >
        <!-- 无缓存的 -->
        <!-- <van-tabs v-model="active" swipeable sticky  :offset-top="45.6" @change='getData(true)'>
           <reorder @Endian='EndianFN' :Endian='Endian' @reo='reoFN'></reorder>
            <van-tab v-for="(item,index) in type" :title="item.title" :key="index">
                <van-list
                    class="contact"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >
                    <productChild v-for="(item,index) in productList" :key="index" :product='item' :Endian='Endian'></productChild>
                </van-list>                                   
            </van-tab>
        </van-tabs> -->

        <!-- 有缓存的 -->
        <van-tabs v-model="active" swipeable sticky  :offset-top="45.6" @change='getData'>
           <reorder @Endian='EndianFN' :Endian='Endian' @reo='reoFN'></reorder>
            <van-tab v-for="(item,index) in type" :title="item.title" :key="index">
                <van-list
                    class="contact"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >
                    <div class="contact_list" v-for="(prol,indexP) in productListT" :key="indexP" v-show="indexP==active">
                        <productChild v-for="(item,index) in prol.productList" :key="index" :product='item' :Endian='Endian'></productChild>
                    </div>
                    
                </van-list>                                   
            </van-tab>
        </van-tabs>


        <!-- <div class="seach" @click="seachTFFN">
            <img src="../img/seach@3x.svg">
        </div>

        <van-popup  :lazy-render='false' v-model="seachTF" position="top" >
            <seachT :autofocus='true' ref="seachTOO"></seachT>    
        </van-popup>        -->

        <!-- <div :class="seachTF?'seachFat':'kaiSeach'" @click="seachOpen">
            <div :class="['sea',seachTF?'seaOpen':'']">
                <input @focus="eventFN" @click="eventFN" v-model="seach">
                <img v-show="!seachTF" src="../img/seach@3x.svg">
            </div>
        </div> -->

        <seachIos></seachIos>
    </div>
</template>

<script>
import reorder from '../components/reorder'
import productChild from '../components/productChild'
import seachT from '../components/seachT'
import seachIos from '../components/seachIos'
    export default {
        components:{
            reorder,productChild,seachT,seachIos
        },
        data(){
            return{
                loading: false, //是否处于加载
                finished: false,  //是否加载完成
                active:0,//当前
                typeA:null,//当前选择的商品类型
                type:[],//商品列表类型
                productList:[],//商品列表
                page:1,//页数
                Endian:false,//横竖类型
                seachTF:false,//搜索款的显示隐藏
                seach:'',//搜索字
                productListT:[
                    // {
                    //     finished:false,
                    //     loading:false,
                    //     page:1,
                    //     productList:[]
                    // }
                ],//缓存机制
                orderby:'default'
            }
        },
        methods:{
            // 
            touchmove(event){
                if(this.seachTF){
                    window.scrollTo(0,0);
                    event.preventDefault();
                }
                
            },
            eventFN(event){
                if(this.seachTF){
                    event.stopPropagation();
                event.preventDefault();
                }
                
            },
            seachOpen(){
                this.seach=''
                this.seachTF=!this.seachTF
                // console.log("qqwerri")
            },
            // 展示类型
            EndianFN(type){
                this.Endian=type
            },
            // 
            reoFN(reo){
                for(let i=0;i<reo.length;i++){
                    if(reo[i].cloo){
                        switch(reo[i].name){
                            case '按销量' :
                                if(reo[i].type=='arrow-up') this.orderby='sales'
                                else this.orderby='salesdesc'
                                // console.log('按销量')
                            break;
                            case "按价格" :
                                if(reo[i].type=='arrow-up') this.orderby='price'
                                else this.orderby='pricedesc'
                                // console.log("按价格")
                            break;
                            case "按人气" :
                                if(reo[i].type=='arrow-up') this.orderby='hot'
                                else this.orderby='new'
                                // console.log("按人气")
                            break;
                        }
                    }
                }
                for(let i=0;i<this.productListT.length;i++){
                    this.productListT[i]={
                        finished:false,
                        page:1,
                        productList:[]
                    }
                }
                this.getData();
            },
            // 商品类型
            typeList(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "cid" : 0, "top" : null },
                        method:'Shop.Category.CategoryList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.type=r.data.result.List 
                        for(let i=0;i<this.type.length;i++){ //有缓存的
                            this.productListT.push(
                                {
                                    finished:false,
                                    page:1,
                                    productList:[]
                                }
                            )
                        }
                        // this.getData();
                    }else this.errFN('获取商品分类列表')
                })
            },

            // 无缓存的
            // // 商品列表
            // getData(typeC){
            //     this.typeA=this.type[this.active].id
            //     if(typeC){
            //         this.productList=[]    
            //         this.page=1 
            //         this.finished=false
            //     }
            //     this.loading=true
            //     this.postFN({
            //         url:'/shop.aspx',
            //         data:{
            //             params:{ "orderby" : 'price', "cId" : this.typeA,'pageIndex':this.page,'pageSize':10 },
            //             method:'Shop.Product.ProductsList',
            //             id:this.userId,
            //         }
            //     }).then(r=>{
            //         if(r.data.result.Error.SubCode==1){
            //             if(!r.data.result.List){
            //                 this.finished=true
            //                 this.loading=false
            //                 return ;
            //             } 
            //             let dataList=r.data.result.List
            //             for(let i=0;i<dataList.length;i++){
            //                 dataList[i].saleprice=dataList[i].saleprice.toString();
            //                 dataList[i].Max=dataList[i].saleprice.split('.')[0]
            //                 if(dataList[i].saleprice.split('.')[1])  dataList[i].Min=dataList[i].saleprice.split('.')[1]
            //                 else dataList[i].Min='00'
            //                 this.productList.push(dataList[i])
            //             }
            //             if(dataList.length<10){
            //                 this.finished=true
            //                 this.loading=false
            //                 return ;
            //             }
            //             this.page++;
            //             this.loading=false
            //         }else this.errFN('获取商品')
            //     })
            // },

            // 有缓存的
            // 商品列表
            getData(){
                
                if(this.productListT[this.active].finished){
                    this.loading=false
                    this.finished=true
                    return ;
                }else{
                    this.finished=false
                    this.loading=true
                }
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "orderby" : this.orderby, "cId" : this.type[this.active].id,'pageIndex':this.productListT[this.active].page,'pageSize':10 },
                        method:'Shop.Product.ProductsList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.List){
                            this.productListT[this.active].finished=true
                            this.loading=false
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
                            dataList[i].saleprice=dataList[i].saleprice.toString();
                            dataList[i].Max=dataList[i].saleprice.split('.')[0]
                            if(dataList[i].saleprice.split('.')[1])  dataList[i].Min=dataList[i].saleprice.split('.')[1]
                            else dataList[i].Min='00'
                            this.productListT[this.active].productList.push(dataList[i])
                        }
                        if(dataList.length<10){
                            this.productListT[this.active].finished=true
                            this.loading=false
                            return ;
                        }
                        this.productListT[this.active].page++;
                        this.loading=false
                        
                    }else {
                        this.loading=false
                        this.errFN('获取商品')
                    }
                })
            },


            seachTFFN(){
                this.$refs.seachTOO.onFous();
                this.seachTF=true
            }
        },
        mounted(){
            this.typeList();
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuClassify{
    position: relative;
    height: 100%;
    overflow: hidden;
        .van-tabs{
            height: 100%;
            .van-tabs__content{
                height: 100%;
            }
        }
        .van-tabs__wrap{
            background: white;
            border-bottom:1px solid rgb(240, 240, 240);
            .van-tabs__nav{
                margin: 0 .8rem;
            }
        }
        .van-tab__pane{
            height: 100%;
            overflow: auto;
            padding: 0 0 4.8rem;
            box-sizing: border-box;
        }
    .contact{
        padding: 0 2%;
        margin-left: -2%;
        padding-top: 4rem;
        .van-list__finished-text{
            width: 100%;
        }
        .van-list__loading{
            margin-top: 1rem;
            width: 100%;
        }
        .contact_list{
            display: flex;
            flex-wrap: wrap;
        }
    }
    // 搜索图标
    .seach{
        border-radius: 50%;
        background: rgba(255, 255, 255, .9);
        height: 3.5rem;
        width: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 1rem;
        right: 1rem;
        position: absolute;
        >img{
            width: 2.2rem;
            object-fit: cover;
            height: 2.2rem;
        }
    }
    // .seachFat{
    //     z-index: 999;
    //     background:rgba(0,0,0,.6);
    //     width: 100%;
    //     // height: 100%;
    //     height: calc(100% + 5rem);  
    //     transform: translateY(-5rem);  
    //     transition:background ease .4s ;
    //     position: absolute;
    //     top: 0;left: 0;
    //     .sea{              
    //         padding: .6rem;
    //         box-sizing: border-box;
    //         background: white;
    //         >input{
    //             .nC;
    //             box-sizing: border-box;
    //             padding-left: 1.2rem;
    //             font-size: 1.6rem;
    //             border-radius: 4rem;
    //             height: 3.2rem;
    //             width: 100%;
    //             border: 1px solid rgb(247, 247, 247);
    //         }
    //     }
    //     .seaOpen{
    //         transition: .3s;  
    //         transform: translateY(5rem);
    //     }
    // }
    // .kaiSeach{
    //     border-radius: 50%;
    //     background: rgba(255, 255, 255, .9);
    //     height: 3.5rem;
    //     width: 3.5rem;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     bottom: 1rem;
    //     right: 1rem;
    //     position: absolute;
    //     .sea{
    //         input{
    //             border-radius: 50%;
    //             height: 3.5rem;
    //             width: 3.5rem;
    //             position:absolute;
    //         }
    //         >img{
    //             width: 2.2rem;
    //             object-fit: cover;
    //             height: 2.2rem;
    //         }
    //     }
    // }
}

</style>