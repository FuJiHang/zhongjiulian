/*
 * @Author: fujihang 
 * @Date: 2018-12-29 16:12:48 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-09 11:24:33
    个人积分明细
 */
<template>
    <div id="fuInterDes">
        <!-- 底部 -->
        <div class="Integ_bot">
            <van-tabs  v-model="active" swipeable type="card"  sticky :offset-top="45.6">
                <van-tab v-for="(item,index) in listInt" :title="item.name" :key="index">
                    
                    <van-list
                        v-model="loadinggg"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getData"
                    >
                 
                        <BalIntChi :balInt="item" v-for="(item,index) in lnterList[item.act]" :key="index"></BalIntChi>
                    </van-list>
                    
                  
                    
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import BalIntChi from '../components/BalIntChi'
    export default {
        components:{
            BalIntChi,
        },
        data(){
            return{
                list: [],
                loadinggg: false,
                finished: false,  
                active:0,
                actName:this.$route.query.name,
                balInt:{
                    name:'提现',
                    val:'2018-05-05',
                    nub:-10,
                },
                listInt:[
                    {
                        name:'总明细',
                        type:'总积分',
                        act:'all',
                        active:0,
                    },
                    {
                        name:'获得',
                        type:'共获得',
                        act:'get',
                        active:1,
                    },
                    {
                        name:'使用',
                        type:'共使用',
                        act:'use',
                        active:2,
                    },
                ],
                lnterList:{
                    all:[],
                    get:[],
                    use:[],
                },//积分列表
                page:1,//页数
                dd:false
            }
        },
        methods:{
            // 获取金钱明细
            getData(){
                this.postFN({
                    url:'/Shop.aspx',
                    data:{
                        params:{ "userId" : this.userId, "pageIndex" : this.page, "pageSize" : 10 },
                        method:'Shop.Integral.Myintegral',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        let data=r.data.result.List
                        if(!data){
                            this.finished=true
                            return ;
                        }           
                        for(let i=0;i<data.length;i++){
                            let integralvalue
                            if(data[i].type) integralvalue= '-'+data[i].integralvalue
                            else integralvalue= '+'+data[i].integralvalue
                            let child={
                                name:data[i].describe,
                                val:data[i].time,
                                nub:integralvalue,
                            }
                            this.lnterList.all.push(child)
                            if(data[i].type) this.lnterList.use.push(child)
                            else this.lnterList.get.push(child)
                        }
                        if(data.length<10){
                            this.finished=true
                            // return ;
                        }
                        this.page++;    
                        this.loadinggg=false            
                    }else{
                        this.loadinggg=false
                        this.errFN('获取积分信息')
                    }
                })
            },
            //获取金钱总额
            getTop(){
                this.postFN({
                    url:'/Shop.aspx',
                    data:{
                        params:{ "userId" : this.userId, "pageIndex" : this.page, "pageSize" : 10 },
                        method:'Shop.Integral.Myintegral',
                        id:this.userId,
                    }
                }).then(r=>{
                    console.log(r.data)
                })
            }
            
            
        },
        mounted(){
            // this.getData();
            for(let i=0;i<this.listInt.length;i++){
                if(this.listInt[i].type==this.actName) this.active=this.listInt[i].active
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuInterDes{
    height: 100%;
    .nC;
    display: flex;
    flex-direction: column;
    padding-bottom: .8rem;
    box-sizing: border-box;
    .Integ_bot{
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
            overflow: auto;
            height: 100%;
            padding: 1.6rem .8rem 3.2rem;
            box-sizing: border-box;
        }
    }
}
</style>