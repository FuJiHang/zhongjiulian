/*
 * @Author: fujihang 
 * @Date: 2019-03-17 14:20:05 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-29 16:23:56
    品牌街详情
 */
<template>
    <div id="fuBrandDet">
        <!-- 导航条头部文字 -->
        <topTwo :name="name"></topTwo>
       
       <!-- 富文本编辑器 -->
       <div class="fwb" v-html="detail" >
         
       </div>

       <div class="recommend_top">
            <img src="../img/homepage6.png" alt="">
        </div>

        <!-- 商品 -->
        <div class="brandProduct">
            <van-list
                class="contact"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getData"
            >
                <productChild v-for="(item,index) in brandList" :key="index" :product='item' ></productChild>
            </van-list>  
        </div>

    </div>
</template>

<script>
import topTwo from '../public/topTwo'
import productChild from '../components/productChild'
    export default {
        components:{
            topTwo,productChild,
        },
        data(){
            return{
                id:this.$route.query.id,//品牌id
                name:this.$route.query.name,//品牌名字
                detail:localStorage.getItem("brandDet"),//品牌描述
                brandList:[],//商品数据
                loading:false,//加载状态
                finished:false,//是否完成加载
                page:1,
            }
        },
        methods:{
            getData(){
                if(this.finished) return;
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "userid" : this.userId, "brandid" : this.id,"pageIndex" : this.page, "pageSize" : 10 },
                        method:'Shop.Product.ProductsList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.List){
                            this.finished=true
                            this.loading=false
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
                            dataList[i].saleprice=dataList[i].saleprice.toString();
                            dataList[i].Max=dataList[i].saleprice.split('.')[0]
                            if(dataList[i].saleprice.split('.')[1])  dataList[i].Min=dataList[i].saleprice.split('.')[1]
                            else dataList[i].Min='00'
                            this.brandList.push(dataList[i])
                        }
                        if(dataList.length<10){
                            this.finished=true
                            this.loading=false
                            return ;
                        }
                        this.page++;
                        this.loading=false
                        
                    }else {
                        this.loading=false
                        this.errFN('获取品牌街商品')
                    }
                })
            }
        },
        mounted(){
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuBrandDet{
    .nC;
    padding-top:45.6px;
    box-sizing: border-box; 
    .hO;
    .fwb{
        .bW;
      width: 100%;
      >p{
        >span{
          >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }  
        }
      }
    }
    // 推荐商品
    .recommend_top{
        margin-top: .3rem;
        >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    // 商品列表
    .brandProduct{
        .contact{
            display: flex;
            flex-wrap: wrap; 
            .bW;
        }
        .van-list__finished-text{
            text-align: center;
            width: 100%;
        }
    }
}
</style>