/*
 * @Author: fujihang 
 * @Date: 2019-01-03 15:13:19 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 22:42:28
    我的团队
 */
<template>
    <div id="fuTeam">
        <!-- 头部 -->
        <div class="team_top">
            <div class="top child">
                <span class="o">我的团队</span>
                <span class="t"></span>
                <span class="th">我的总收益</span>                
            </div >
            <div class="bot child">
                <span class="o">规模：{{gm}}人</span>
                <span class="t">{{userData.money.Fees}}</span>    
            </div>
        </div>

        <!-- 搜索款 -->
        <!-- <seach placeholder="输入微信名，手机号码搜索成员"></seach> -->
        
        <!-- 团队 -->
        <div class="team_bot" v-for="(items,indexs) in team" :key="indexs">
            <div class="top">
                <span class="name">
                    {{items.name}}
                </span>
                <span class="xq" @click="toFN(items)">
                    查看详情
                </span>
                <van-icon name="arrow" />
            </div>
            <div class="bot">
                <div class="child" >
                    <div class="val">
                        {{items.data.directlytotal}}
                    </div>
                    <div>总人数</div>
                </div>
                <div class="child" >
                    <div class="val">
                        {{items.data.suptotal}}
                    </div>
                    <div>分销商</div>
                </div>
                <div class="child" >
                    <div class="val">
                        {{items.data.client}}
                    </div>
                    <div>客户</div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import seach from '../components/seach'
    export default {
        components:{
            seach,
        },
        data(){
            return{
                team:[
                    {
                        name:'直属团队',
                        data:{},
                        level:1,
                    },
                    {
                        name:'中层团队',
                        data:{},
                        level:2,
                    },
                ],
                gm:0,//规模
            }
        },
        methods:{
            toFN(items){
                this.$router.push({path:'/fuTeamDes?name='+items.name+'&level='+items.level})
            },
            // 获取数据
            getData(){
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "uf_UserID" : this.userId, "level" : 1, "pageIndex" : 1, "pageSize" : 10 },
                        method:'User.Distribution.SearchTeam',
                        id:this.userId,
                    }
                }).then(r=>{
                    
                    if(r.data.result.Error.SubCode==1){
                        let data=r.data.result.List
                        this.gm=data.totalpeople
                        this.team[0].data=data.directly
                        this.team[1].data=data.subgenus

                    }else if(r.data.result.Error.SubCode==0){
                        this.notFN('暂无团队')
                    }
                    else this.errFN('获取我的团队')
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
#fuTeam{
    .hO;
    .team_top{
        .bW;.bR;
        height: 8rem;
        margin-bottom: .8rem;
        .child{
            color: #999;
            font-size: 1.2rem;
            padding:0 .8rem;
            box-sizing: border-box;
            align-items: center;
            height: 50%;
            display: flex;
        }
        .top{
            .o{
                .nC;
                font-size: 1.5rem;
            }
            .t{
                margin-left: .8rem;
               flex: 1; 
            }
        }
        .bot{
            .o{
                flex: 1;
            }
            .t{
                .nC;
                // flex: 1;
                // text-align: right;
                font-size: 1.5rem;
            }
        }
    }
    // 直属团队
    .team_bot{
        .bW;.nC;.bR;.mB;
        .top{
            padding: .8rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .bBS;
            .name{
                font-size: 1.25rem;
                flex: 1;
            }
            .xq{
                color: #999;
                font-size: 1.1rem;
                margin-right: .8rem;
            }
        }
        .bot{
            padding: .8rem;
            box-sizing: border-box;
            display: flex;
            >:nth-child(2){
                border-right: 1px solid rgb(235, 235, 235);
                border-left: 1px solid rgb(235, 235, 235);
            }
            .child{
                font-size: 1.25rem;
                text-align: center;
                width: 33.33%;
                
                .val{
                    .mB;
                    font-size: 1.4rem;
                }
            }
        }
    }
}
</style>