/*
 * @Author: fujihang 
 * @Date: 2019-01-22 16:47:29 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-23 14:34:02
    搜索的商品
 */
<template>
    <div id="fuSeach" @touchmove="_touchmove($event)"  @touchstart="_touchstart">
        <div class="seach">
            <input placeholder="请输入要搜索的商品" ref="seach_i" v-model="seach" @keyup.enter="seachFN">
        </div>
        <van-list
           
            class="contact"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
            <productChild v-for="(item,index) in productList" :key="index" :product='item' ></productChild>
        </van-list>              
    </div>
</template>

<script>
import productChild from '../components/productChild'
    export default {
        components:{
            productChild
        },
        data(){
            return{
                loading: false, //是否处于加载
                finished: false,  //是否加载完成
                page:1,//页数
                productList:[],//搜索信息
                seach:this.$route.query.seach,
                clientYS:0,
            }
        },
        methods:{
            // 搜索
            seachFN(){
                if(this.seach.trim()){
                    this.page=1;
                    this.productList=[]
                    this.getData();
                }else{
                    this.notFN('请输入搜索内容')
                }
            },
            // 获取搜索信息
            getData(){
                this.loading=true
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "keyword" :this.seach, "orderby" : "DisplaySequence", "pageIndex" : this.page, "pageSize" :10, "userid" : this.userId},
                        method:'Shop.Product.SearchProPageList',
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
                            this.productList.push(dataList[i])
                        }
                        if(dataList.length<10){
                            this.finished=true
                            this.loading=false
                            return ;
                        }
                        this.page++;
                        this.loading=false
                    }else this.errFN('搜索')
                })
            },

            // 解决苹果上下滑动不关闭输入法
            _touchmove(e){
                let clientY=e.changedTouches[0].clientY
                if(this.clientYS>clientY+5||this.clientYS<clientY-5){
                    this.$refs.seach_i.blur();
                }
            },
            _touchstart(e){
                this.clientYS=e.changedTouches[0].clientY
            }
           
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuSeach{
    height: 100%;
    display: flex;
    flex-direction: column;
    .seach{
        padding: .8rem 1rem;
        background: white;
        box-shadow: .1rem .1rem .1rem rgb(202, 202, 202);
        input{
            box-sizing: border-box;
            font-size: 1.2rem;
            padding-left: 1rem;
            .nC;
            border-radius: 10rem;
            width: 100%;
            border:1px solid rgb(245, 245, 245);
            height: 3rem;
        }
    }
    .contact{
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        flex: 1;
        margin-left: -2%;
        .van-list__finished-text{
            text-align: center;
            width: 100%;
        }
    }
}
</style>