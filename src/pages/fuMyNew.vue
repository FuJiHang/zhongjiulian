/*
 * @Author: fujihang 
 * @Date: 2019-03-17 19:35:51 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 20:35:09
    我的消息
 */
<template>
    <div id="fuMyNew">
         <van-list
            class="contact"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getData"
        >
            <div class="news" v-for="(item,index) in dataList" :key="index"> 
                <div class="title">{{item.title}}</div>
                <div class="cont">
                    {{item.content}}
                </div>
                <div class="time">
                    {{item.sendTime}}
                </div>
            </div>
        </van-list> 
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                loading:false,
                finished:false,
                dataList:[],//消息列表
                page:1,
            }
        },
        methods:{
            getData(){
                this.loading=true
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "pageIndex" : this.page,'uid':this.userId,'pageSize':10},
                        method:'Chat.MyMeg',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==0){
                        if(r.data.result.List.length==0){
                            this.finished=true
                            this.loading=false
                            return ;
                        }                
                        let listData=r.data.result.List
                        for(let i=0;i<listData.length;i++){
                            listData[i].sendTime=this.timestampToTime(listData[i].sendTime)
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
                        this.errFN('获取消息')
                    }
                })
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuMyNew{
    .hO;.nC;
    padding: .8rem .8rem 0;
    box-sizing: border-box;
    .news{
        .bW;.mB;
        padding: .8rem;
        box-sizing: border-box;
        border-radius: .6rem;
        .title{
            font-size: 1.35rem;
            text-align: center;
            .mB;
            padding-bottom: .8rem;
            border-bottom: 1px solid rgb(233, 233, 233);
        }
        .cont{
            font-size: 1.25rem;
            .mB;
        }
        .time{
            font-size: 1.15rem;
            text-align: right;
        }
    }
}
</style>