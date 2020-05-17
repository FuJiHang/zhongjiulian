
<template>
    <div id="fuBrandDet">
       
       

        <!-- 商品 -->
        <div class="brandProduct">
            <van-list
                class="contact"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getData"
            >
                 <remai :product="item" v-for="(item,index) in brandList" :key="index"></remai>
            </van-list>  
        </div>

    </div>
</template>

<script>

import productChild from '../components/productChild'
import remai from "../components/remai"
    export default {
        components:{
            productChild,remai,
        },
        data(){
            return{
                id:this.$route.query.id,//品牌id
                // name:this.$route.query.name,//品牌名字
                // detail:localStorage.getItem("brandDet"),//品牌描述
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
                        params:{ "pId" : this.id,"startPage" : this.page, "pageSize" : 6 },
                        method:'Shop.Product.GetPromotionPro',
                        id:this.userId,
                    }
                }).then(r=>{
                    console.log(r)
                    
                    if(r.data.result.Error.SubCode==1){

                        if(!r.data.result.List){
                            this.finished=true
                            this.loading=false
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
            
                            this.brandList.push(dataList[i])
                        }
                        
                        if(dataList.length<6){
                            this.finished=true
                            this.loading=false
                            return ;
                        }
                        this.page++;
                        this.loading=false
                        // this.getData()
                        
                    }else {
                        this.loading=false
                        this.errFN('获取商品')
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
   
    box-sizing: border-box; 
    .hO;
    
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