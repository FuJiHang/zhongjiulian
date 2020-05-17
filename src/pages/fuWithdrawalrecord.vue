/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-28 15:34:24
    提现记录
 */
<template>
    <div id="fuWithdrawalrecord">
        <van-tabs v-model="active" swipeable  animated sticky :offset-top="45.6">
            <van-tab v-for="(item,index) in listBal" :title="item.name" :key="index">
                
                <div class="withRecord" v-for="i in 12" :key="i">
                    <div class="mB Record">
                        <span>微信红包</span>
                        <span class="r_s">提现中</span>
                    </div>
                    <div class="Record">
                        <span class="time">2017/04/06 14:12:30</span>
                        <span class="mon r_s">200</span>
                    </div>
                </div>
                

                

            </van-tab>
        </van-tabs>
        
    </div>
</template>

<script>

    export default {
        data(){
            return{
                active:this.$route.query.active,
                listBal:[
                    {
                        name:'全部',
                    },
                    {
                        name:'提现中',
                    },
                    {
                        name:'已提现',
                    },
                    {
                        name:'待确认',
                    },
                    
                ]
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuWithdrawalrecord{
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
    .withRecord{
        padding: .8rem;
        box-sizing: border-box;
        .bW;.bBS;
        font-size: 1.3rem;
        .Record{
            display: flex;
            align-items: center;
            .r_s{
                flex: 1;
                text-align: right;
            }
            .mon{
                font-size: 1.4rem;
                .jG;
            }
            .time{
                color: #999;
            }
        }
    }
}
</style>