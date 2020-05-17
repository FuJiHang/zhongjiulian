/*
 * @Author: fujihang 
 * @Date: 2018-12-29 17:01:48 
 * @Last Modified by: fujihang
 * @Last Modified time: 2018-12-29 17:56:12
    积分使用帮助
 */
<template>
    <div id="fuHelpDes">
        <div class="name_Help">
            教你如何获取和使用积分
        </div>
        <div class="help_d_child" v-for="(items,index) in data" :key="index">
            <div class="name">
                {{items.name}}
            </div>
            <div class="value" v-for="(item,index2) in items.val" :key="index2">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:[
                    {
                        name:'如何获取积分？',
                        val:[
                            {
                                name:'1、每天签到，刮奖获积分'
                            },
                            {
                                name:'2、邀请好友，邀请1个+10分'
                            },
                            {
                                name:'3、点评商品，每点评1个+5分'
                            },
                            {
                                name:'4、逛店铺，随机获得积分奖励'
                            },
                            
                        ],
                    },
                    {
                        name:'如何使用积分？',
                        val:[
                            {
                                name:'1、兑换优惠券'
                            },
                            {
                                name:'2、兑换积分商品'
                            },
                            {
                                name:'3、兑换红包'
                            },
                        ],
                    }
                ]
                
            }
        }
        
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuHelpDes{
    .hO;.nC;
    .name_Help{
        .bW;.bBS;
        padding: .8rem;
        text-align: center;
        font-size: 1.6rem;
    }
    .help_d_child{
        .bW;.bR;
        margin: .8rem .8rem 0;
        padding:0 .8rem;
        .name{
            font-size: 1.2rem;
            padding: .8rem 0;
            box-sizing: border-box;
            .bBS;
        }
        .value{
            .hC;
            font-size: 1.3rem;
            padding: .8rem;
        }
    }
}
</style>