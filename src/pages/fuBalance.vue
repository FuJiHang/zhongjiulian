/*
 * @Author: fujihang 
 * @Date: 2018-12-28 18:28:40 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 21:20:16
    余额
 */
<template>
    <div id="fuBalance">

        <!-- 头部 -->
        <BalIntTop :topList="topList" :topListVal='topListVal'></BalIntTop>

        <!-- 底部 -->
        <div class="bal_bot">
            <van-tabs v-model="active" swipeable type="card"  sticky :offset-top="45.6" @change="getData">
                <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getData"
                    >
                        <div v-for="(itemB,indexB) in listBal" :key="indexB" v-show="active==indexB">
                            <BalIntChi :balInt="balInt" v-for="(balInt,indexX) in itemB.list" :key="indexX"></BalIntChi>
                        </div>
                        
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import BalIntTop from '../components/BalIntTop'
import BalIntChi from '../components/BalIntChi'
    export default {
        components:{
            BalIntTop,BalIntChi,
        },
        data(){
            return{
                topList:{
                    t:'余额',
                    l:'收入',
                    r:'支出',
                },
                topListVal:{
                    // t:0,
                    // l:0,
                    // r:0,
                },
                // balInt:{
                //     name:'提现',
                //     val:'2018-05-05',
                //     nub:-10,
                // },
                active:0,
                listBal:[
                    {
                        name:'总明细',
                        finished:false,
                        page:1,
                        list:[],
                        type:1,
                    },
                    {
                        name:'收入明细',
                        finished:false,
                        page:1,
                        list:[],
                        type:2,
                    },
                    {
                        name:'支出明细',
                        finished:false,
                        page:1,
                        list:[],
                        type:3,
                    },
                ],
                loading:false,//加载状态
                finished:false,//加载完全
            }
        },
        methods:{
            // 获取余额
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
                        params:{ "userId" : this.userId, "pageIndex" : this.listBal[this.active].page, "pageSize" : 10, "type" : this.listBal[this.active].type },
                        method:'Usercenter.MoneyDital',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1||r.data.result.Error.SubCode==3){
                        if(r.data.result.List.length==0){
                            this.listBal[this.active].finished=true
                            this.loading=false
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
                            let dataC={
                                name:dataList[i].Remark,
                                val:dataList[i].Date,
                                nub:dataList[i].Money,
                            }
                            this.listBal[this.active].list.push(dataC)
                        }
                        if(dataList.length<10){
                            this.listBal[this.active].finished=true
                            this.loading=false
                            return ;
                        }
                        
                        this.listBal[this.active].page++;
                        this.loading=false
                    }else{
                        this.loading=false
                        this.errFN('获取余额信息')
                    }
                })
            },
            //获取顶部余额
            getTop(){
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userid" : this.userId},
                        method:'Usercenter.UserMoney',
                        id:this.userId,
                    }
                }).then(r=>{
                     // t:0,
                    // l:0,
                    // r:0,
                    if(r.data.result.Error.SubCode==1){
                        this.topListVal={
                            t:r.data.result.Obj.TotoalPoints,
                            l:r.data.result.Obj.AddMoney,
                            r:r.data.result.Obj.ReduceMoney,
                        }
                    }else this.errFN('查询余额')
                })
            }
        },
        mounted(){
            this.getTop();
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuBalance{
    height: 100%;
    .nC;
    display: flex;
    flex-direction: column;
    padding-bottom: .8rem;
    box-sizing: border-box;
    

    // 底部
    .bal_bot{
        margin-top: .8rem;
        flex: 1;
        // background: red;
        overflow: hidden;
        .van-tabs{
            height: 100%;
            .van-tabs__content{
                height: 100%;
            }
        }
        .van-tabs__wrap{
            padding: .8rem 0;
            background: white;
            border-bottom:1px solid rgb(240, 240, 240);
            .van-tabs__nav{
                margin: 0 .8rem;
            }
        }
        .van-tab__pane{
            height: 100%;
            overflow: auto;
            padding: 1.6rem .8rem 3.2rem;
            box-sizing: border-box;
        }
    }
}
</style>