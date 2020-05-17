/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 22:43:50
    我的团队详细页面
 */
<template>
    <div id="fuTeamDes">
        <!-- 头部 -->
        <div class="teamDes_top">
            <div class="child left">
                <div class="name">
                    {{name}}
                </div>
                <div>
                    规模：{{person}}人
                </div>
            </div>
            <!-- <div class="child">
                <div >
                    {{name}}总收益
                </div>
                <div  class="val">
                    842.00
                </div>
            </div> -->
        </div>
        
        <!-- 搜索款 -->
        <!-- <seach placeholder="输入微信名，手机号码搜索成员"></seach> -->

        <!-- 底部 -->
        <div class="teamDes_bot">
            <!-- <van-tabs v-model="active" swipeable type="card" animated sticky :offset-top="45.6">
                <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index">
                    
                    <distributorList v-show="index==0"></distributorList>
                    <Customer v-show="index==1"></Customer>
                </van-tab>
            </van-tabs> -->
            <!-- <distributorList ></distributorList> -->
            
            <div class="nativeList">
                <div class="top" v-for="(item,index) in topList" :key="index">
                    {{item.name}}
                </div>
            </div>

            <div class="contact">
                <van-list
                    
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getData"
                >
                    <div class="card" v-for="(item,index) in list" :key="index">
                        <div class="gon">
                            <img :src="imgSrc+item.headImage">
                            <div class="name" >
                                {{item.userName}}
                            </div>
                        </div>
                        <div class="gon" >
                             {{item.open?item.money.Fees:'***'}}
                        </div>

                        <div class="gon jG" @click="item.open=!item.open">
                            {{item.open?'隐藏佣金':'显示佣金'}}
                        </div>
                      
                    </div>
                </van-list>
            </div>
        </div>


    </div>
</template>

<script>
import seach from '../components/seach'
import distributorList from '../components/distributorList'
import Customer from '../components/Customer'
    export default {
        components:{
            seach,distributorList,Customer,
        },
        data(){
            return{
                name:this.$route.query.name,
                level:this.$route.query.level,
                loading:false,
                finished:false,
                active:0,
                topList:[
                    {
                        name:'昵称/头像'
                    },
                    {
                        name:'他的收益'
                    },
                    {
                        name:'操作'
                    },
                ],
                listBal:[
                    {
                        name:'分销商（50）',
                    },
                    {
                        name:'客户（45）',
                    },
                ],
                list:[],//数据列表
                person:0,
            }
        },
        methods:{
            getData(){
                this.loading=false
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "uf_UserID" : this.userId, "level" : this.level, "pageIndex" : 1, "pageSize" : 15 },
                        method:'User.Distribution.SearchDis',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.person=r.data.result.Property.TotalSize
                        if(!r.data.result.List){
                            this.finished=true
                            this.loading=false
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
                            dataList[i].open=true
                            this.list.push(dataList[i])
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
                        this.finished=true
                        this.notFN(r.data.result.Error.SubMsg)
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
#fuTeamDes{
    height: 100%;
    .nC;
    display: flex;
    flex-direction: column;
    overflow: hidden;
        // <!-- 头部 -->
    .teamDes_top{
        .bW;.bR;.mB;
        display: flex;
        align-items: center;
        height: 8rem;
        padding:0 .8rem;
        box-sizing: border-box;
        .left{
            flex: 1;
            text-align: center;
        }
        .child{
            color: #999;
            font-size: 1.1rem;
            .name{
                .nC;
                font-size: 1.3rem;
                .mB;
            }
            .val{
                .nC;
                text-align: right;
                margin-top: .8rem;
                font-size: 1.3rem;

            }
        }
    }

    // 底部
    .teamDes_bot{
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .nativeList{
            display: flex;
            background: white;
            padding: .8rem 0;
            box-sizing: border-box;
            .top{
                font-size: 1.2rem;
                text-align: center;
                width: 33.33%;
            }
        }
        .contact{
            flex: 1;
            overflow: auto;
            // 卡片
            .card{
                display: flex;
                align-items: center;
                .bW;.bBS;
                padding: .4rem 0;
                box-sizing: border-box;
                .gon{
                    font-size: 1.3rem;
                    text-align: center;
                    width: 33.33%;
                    .name{
                        font-size: 1.2rem;
                    }
                    >img{
                        height: 3rem;
                        width: 3rem;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
            }
        }
        
    }
    

    
}
</style>