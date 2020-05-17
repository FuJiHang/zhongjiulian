/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 22:48:10
    我要提现
 */
<template>
    <div id="fuWithdrawal">
        <!-- 头部 -->
        <div class="walTop">
            <div class="child" v-for="(item,index) in topList" :key="index">
                <div>{{item.name}}</div>
                <div class="mon">{{item.val}}</div>
            </div>
        </div>
        <div class="walTopT">
            <van-button round type="danger" size="small" @click="toFN('/fuWithdrawalDes')">我要提现</van-button>
            <!-- <div class="help" @click="toFN('/fuWithdrawalExplain')">提现说明</div> -->
        </div>
        
        
        <!-- 底部 -->
        <div class="walBot">
            <!-- <div class="top">
                <div class="child" v-for="(item,index) in botList" :key='index' @click="toFN(item.to)">
                    <div class="num">
                        {{item.val}}
                    </div>
                    <div>
                        {{item.name}}
                    </div>
                </div>
            </div> -->
            <div class="bot" v-for="(item,index) in botT" :key='index'>
                <span class="name">
                    {{item.name}}
                </span>
                <span class="ck" @click="toFN(item.to)">查看</span>
                <van-icon name="arrow" />
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data(){
            return{
                topList:[
                    {
                        name:"佣金总额",
                        val:this.userData.money.Fees,
                    },
                    {
                        name:"可提现佣金",
                        val:409.00,
                    },
                ],
                botList:[
                    {
                        name:'提现中',
                        val:99,
                        to:'/fuWithdrawalrecord?active=1'
                    },
                    {
                        name:'已提现',
                        val:99,
                        to:'/fuWithdrawalrecord?active=2'
                    },
                    {
                        name:'待确认',
                        val:99,
                        to:'/fuWithdrawalrecord?active=3'
                    },
                ],
                botT:[
                    {
                        name:'待确认佣金明细',
                        to:'/fuCommis?active=2'
                    },
                    {
                        name:'已确认佣金明细',
                        to:'/fuCommis?active=1'
                    },
                    // {
                    //     name:'提现记录',
                    //     to:'/fuWithdrawalrecord?active=0'
                    // },
                ],
            }
        },
        methods:{
            toFN(to){
                this.$router.push({path:to})
            },
            //获取顶部余额
            getMon(){
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userid" : this.userId},
                        method:'Usercenter.UserMoney',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.topList[1].val=r.data.result.Obj.TotoalPoints
                    }else this.errFN('查询余额')
                })
            }
        },
        mounted(){
            this.getMon()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuWithdrawal{
    .hO;.nC;
    // 头部
    .walTop{
        box-sizing: border-box;
        padding: .8rem 0;
        .bW;.bR;
        display: flex;
        align-items: center;
        .child{
            font-size: 1.3rem;
            width: 50%;
            text-align: center;
            .mon{
                .jG;
                font-size: 1.2rem;
                margin-top: .8rem;
            }
        }
        .child:first-child{
            border-right:1px solid rgb(235, 235, 235);
        }
    }
    .walTopT{
        box-sizing: border-box;
        padding: 1.2rem 0 1rem;
        background: white;
        text-align: center;
        .mB;
        .van-button{
            width: 30%;
            .mB;
            font-size: 1.3rem;
        }
        .help{
            margin-top: .2rem;
            .jG;
            font-size: 1.2rem;
        }
    }
    // 底部
    .walBot{
        box-sizing: border-box;
        .bW;
        .top{
            padding: .8rem;
            display: flex;
            align-items: center;
            .child{
                text-align: center;
                width: 33.33%;
                font-size: 1.1rem;
                .num{
                    font-size: 1.3rem;
                    .mB;.jG;
                }
            }
            >:nth-child(2){
                border-left: 1px solid rgb(235, 235, 235);
                border-right: 1px solid rgb(235, 235, 235);
            }
        }
        .bot{
            border-top: 1px solid rgb(235, 235, 235);
            padding:1.2rem .8rem;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            .name{
                color: #999;
                flex: 1;
            }
            .ck{
                margin-right: .8rem;
            }
        }
    }
    
}
</style>