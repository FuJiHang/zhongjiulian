/*
 * @Author: fujihang 
 * @Date: 2018-12-29 14:25:10 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-21 11:53:44
    我的收藏
 */
<template>
    <div id="fuCollection">
        <van-list
            class="contact"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
            <ColFoot :data="item" v-for="(item,index) in dataList" :key="index"></ColFoot>
        </van-list> 
        
        
    </div>
</template>

<script>
import ColFoot from '../components/ColFoot'
    export default {
        components:{
            ColFoot,
        },
        data(){
            return{
                loading: false,//是否处于加载状态
                finished: false,  //是否加载完成
                dataList:[],
                page:1,
            }
        },
        methods:{
            getData(){
                this.loading=true
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "pageIndex" : this.page,'userId':this.userId,'pageSize':10},
                        method:'Shop.Collection.MyFavorList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.List){
                            this.finished=true
                            this.loading=false
                            return ;
                        }                
                        let listData=r.data.result.List
                        for(let i=0;i<listData.length;i++){
                            this.dataList.push(listData[i])
                        }
                        if(listData.length<10){
                            this.finished=true
                            this.loading=false
                            return ;
                        }
                        this.page++;
                        
                        
                    }else{
                        this.loading=false
                        this.errFN('获取商品信息')
                    }
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
#fuCollection{
    .hO;.nC;
    box-sizing: border-box;
    padding-bottom: .8rem;
}
</style>