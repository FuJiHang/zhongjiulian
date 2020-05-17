/*
 * @Author: fujihang 
 * @Date: 2018-12-29 11:56:28 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-21 11:53:11
    我的足迹
 */
<template>
    <div id="fuFootprint" >
         <van-list
            class="contact"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
            <footList :data="item"  v-for="(item,index) in dataList" :key="index"></footList>
        </van-list> 
        
    </div>
</template>

<script>
import footList from '../components/footList'
    export default {
        components:{
            footList,
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
                        method:'Shop.Product.BrowseHistory',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.Obj){
                            this.finished=true
                            this.loading=false
                            return ;
                        }                
                        let listData=r.data.result.Obj
                        for(let i=0;i<listData.length;i++){
                            listData[i].time=this.timestampToTime(listData[i].time)
                            this.dataList.push(listData[i])
                        }
                        if(listData.length<10){
                            this.finished=true
                            this.loading=false
                            return ;
                        }
                        this.page++;
                        this.loading=false
                        
                    }else {
                        this.loading=false
                        this.errFN('获取浏览足迹')
                    }
                })
            }

        },
        mounted(){
            // this.getData()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuFootprint{
    .hO;.nC;
    padding-bottom: .8rem;
    box-sizing: border-box;
    
}
</style>