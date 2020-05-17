/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 23:08:57
    分销商个人中心
 */
<template>
    <div id="fuDistributor">
        <!-- 头部 -->
        <div class="dis_top">
            <div class="one dis_chil">
                <div class="img" v-if="userData.parName!='false'">
                    <img :src="imgSrc+userData.parGr">
                    <span class="name">
                        {{userData.parName}}
                    </span>
                </div>
                <div class="img" v-else>
                    <span class="name">
                        <!-- 无 -->
                    </span>
                </div>
            </div>
            <div class="two dis_chil">
                <div class="img">
                    <img :src="imgSrc+userData.headImage">
                    <span class="name">{{userData.nickName}}</span>
                </div>
            </div>
            <div class="three dis_chil" @click="botToFn('/fuQRCode')">
                <div class="img" >
                    <canvas id="ewmImg"></canvas>
                    <span class="name" >我的推广二维码</span>
                </div>
            </div>
        </div>
        
        <!--  -->
        <div class="dis_mon">
            <div class="mon" v-for="(item,index) in monList" :key='index'>
                <div class="val">
                    {{item.val}}
                </div>
                <div class="name">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div class="dis_mon_bot">
            <span v-for="(item,index) in monBot" :key="index" @click="botToFn(item.to)">
                {{item.name}}
            </span>
        </div>

        <!--我的订单-->
        <myOrder></myOrder>
        <moreFun :listFun="listFun"></moreFun>
        
    </div>
</template>

<script>
import QRCode from 'qrcode'//二维码生成
import myOrder from '../components/myOrder'
import moreFun from '../components/moreFun'
    export default {
        components:{
            myOrder,moreFun,
        },
        data(){
            return{
                monList:[
                    {
                        name:'佣金总额',
                        val:this.userData.money.Fees,
                    },
                    // {
                    //     name:'团队累计销售金额',
                    //     val:100,
                    // },
                    {
                        name:'可提现佣金',
                        val:100,
                    },
                ],
                monBot:[
                    {
                        name:'查看佣金',
                        to:'/fuCommis'
                    },
                    {
                        name:'申请提现',
                        to:'/fuWithdrawal'
                    }
                ],
                listFun:[
                    {
                        name:'我的团队',
                        img:require('../img/women.svg'),
                        to:'/fuTeam'
                    },
                    {
                        name:'我的分销小店',
                        img:require('../img/xD.svg'),
                        to:'/fuIndex'
                    },
                    {
                        name:'我的余额',
                        img:require('../img/yve.svg'),
                        to:'/fuBalance'
                    },
                    {
                        name:'我的优惠券',
                        img:require('../img/yhj.svg'),
                        to:'/fuCouponList'
                    },
                    {
                        name:'我的积分',
                        img:require('../img/jifen.svg'),
                        to:'/fuIntegral'
                    },
                    {
                        name:'我的消息',
                        img:require('../img/xiaoxi.svg'),
                        to:'/fuMyNew'
                    },
                    {
                        name:'我的关注',
                        img:require('../img/gz.svg'),
                        to:'/fuFollow'
                    },
                    {
                        name:'浏览足迹',
                        img:require('../img/zhuzj.svg'),
                        to:'/fuFootprint'
                    },
                    {
                        name:'我的收藏',
                        img:require('../img/shouc.svg'),
                        to:'/fuCollection'
                        
                    },
                    {
                        name:"关于我们",
                        img:require('../img/about.svg'),
                        to:'/fuAbout'
                        
                    },
                    {
                        name:'设置',
                        img:require('../img/shez.svg'),
                        to:'/fuSetting'
                    },
                ]
            }
        },
        methods:{
            botToFn(item){
                this.$router.push({path:item})
            },
            QRFN(){
                let ewmImg= document.getElementById('ewmImg')
                QRCode.toCanvas(ewmImg, 'http://gzh.kagamikun.com/Account/login?invitationCode='+this.userData.UE_InvitationCode, function (error) {
                })
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
                        this.monList[1].val=r.data.result.Obj.TotoalPoints
                    }else this.errFN('查询余额')
                })
            }
        },
        mounted(){
           
           setTimeout(()=>{
               this.QRFN();
           },50)
            this.getMon()
		
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuDistributor{
    .hO;.nC;
    .dis_top{
        display: flex;
        height: 11rem;
        width: 100%;
        .bW;.bBS;
        .dis_chil{
            width: 33.33%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .one{
            height: 80%;
            img{
                width: 3.5rem;
                height: 3.5rem;
            }
            animation:shangxia 2s infinite;
            
        }
        .two{
            height: 100%;
            img{
                width: 4.5rem;
                height: 4.5rem;
            }
            animation:shangxia 2.5s infinite;
        }
        .three{
            height: 90%;
            
            #ewmImg{
                width: 3.7rem !important;
                height: 3.7rem !important;
            }
            animation:shangxia 3s infinite;
        }
        // 
        .img{
            display: flex;
            flex-direction: column;
            align-items: center;
            >img{
                object-fit: cover;
                border-radius: 50%;
            }
            .name{
                margin-top: .8rem;
                font-size: 1.2rem;
            }
        }
    }
    .dis_mon{
        .bW;
        padding: .8rem 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .bBS;
        .mon{
            text-align: center;
            width: 50%;
            .name{
                font-size: 1.1rem;
                margin-top: .6rem;
            }
            .val{
                .jG;
                font-size: 1.3rem;
            }
        }
    }
    .dis_mon_bot{
        font-size: 1.2rem;
        display: flex;
        padding: 1.2rem 0;
        text-align: center;
        .bW;
        span{
            width: 50%;
        }
        >:first-child{
            border-right: 1px solid rgb(235, 235, 235);
        }
    }
    // 我的订单底
    .dis_bw{
        .bW;.bR;
    }
    .distri_bot{
        display: flex;
        flex-wrap: wrap;
        margin-top: .8rem;
        .dis_child{
            margin-bottom: .8rem;
            width: 33.33%;
            text-align: center;
            >img{
                width: 22%;
            }
            .name{
                margin-top: .5rem;
            }
        }
    }
}
@keyframes shangxia {
    0%{
        transform: translateY(0);
    }
    50%{
        transform:translateY(5px);
    }
}
</style>