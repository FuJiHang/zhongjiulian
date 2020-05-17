/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 21:41:32
    佣金明细
 */
<template>
    <div id="fuCommis">


   


        <van-tabs v-model="active" swipeable  sticky :offset-top="45.6" @change="getData">
            <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index">
                <van-list
                    class="contact"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >
                    <div class="Commis" v-for="(j,inde) in item.list" :key="inde"> 
                        <img :src="imgSrc+j.BuyerGravatar">
                        <div class="name">
                            <div class="mB">{{j.NickName}}</div>
                            <!-- <div>{{i}}</div> -->
                        </div>
                        <div class="right">
                            <div class="right_d mB">
                                <span>订单实付金额：{{j.OrderAmount}}元</span>
                                <span class="child_r" v-show="j.CommissionStatus==1">已确认</span>
                                <span class="child_r" v-show="j.CommissionStatus==0">待确认</span>
                            </div>
                            <div class="right_d">
                                <span>收益：{{j.Fee}}元</span>
                                <span class="child_r">{{j.TradeDate}}</span>
                            </div>
                        </div>
                    </div>

                </van-list>    

               

            </van-tab>
        </van-tabs>
        
    </div>
</template>

<script>

    export default {
        data(){
            return{
                active:this.$route.query.active,
                loading:false,
                finished:false,
                listBal:[
                    {
                        name:'全部',
                        list:[],
                        finished:false,
                        page:1,
                        CommStatus:3
                    },
                    {
                        name:'已确认',
                        list:[],
                        finished:false,
                        page:1,
                        CommStatus:1

                    },
                    {
                        name:'待确认',
                        list:[],
                        finished:false,
                        page:1,
                        CommStatus:2
                    },
                ],
            }
        },
        methods:{
            getData(){
                if(this.listBal[this.active].finished){
                    this.loading=false
                    this.finished=true
                    return ;
                }else{
                    this.finished=false
                    this.loading=true
                }
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userid" : this.userId, "type" : 2, "pageIndex" : this.listBal[this.active].page, "pageSize" : 10, "CommStatus" : this.listBal[this.active].CommStatus },
                        method:'User.Distribution.GetURCommissionDetail',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.List){
                            this.listBal[this.active].finished=true
                            this.loading=false
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
                            dataList[i].TradeDate=dataList[i].TradeDate.substring(0, dataList[i].TradeDate.lastIndexOf(' '))
                    
                            this.listBal[this.active].list.push(dataList[i])
                        }
                        if(dataList.length<10){
                            this.listBal[this.active].finished=true
                            this.loading=false
                            return ;
                        }
                        this.listBal[this.active].page++;
                        this.loading=false
                        
                    }else {
                        this.loading=false
                        this.finished=true
                        this.notFN(r.data.result.Error.SubMsg)
                    }
                })
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuCommis{
    .nC;
    height: 100%;
    overflow: hidden;
    .van-tabs{
        height: 100%;
        .van-tabs__content{
            height: 100%;
        }
        .van-tab--active{
            .jG;
        }
    }
    .van-tabs__wrap{
        background: white;
        border-bottom:1px solid rgb(240, 240, 240);
    }
    .van-tab__pane{
        height: 100%;
        overflow: auto;
        padding: 0 0 44px;
        box-sizing: border-box;
    }
    // 卡片内容
    .Commis{
        padding: .8rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .bW;.bBS;
        font-size: 1.2rem;
        >img{
            object-fit: cover;
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            margin-right: .8rem;
        }
        .name{
            width: 15%;
            .Oline;
        }
        .right{
            flex: 1;
            .right_d{
                display: flex;
            }
            .child_r{
                flex: 1;
                color: #999;
                text-align: right;
            }
        }
        
    }
}
</style>