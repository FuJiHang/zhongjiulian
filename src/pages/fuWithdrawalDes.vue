/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 22:55:36
    提现
 */
<template>
    <div id="fuWithdrawalDes">
        <!-- 头部 -->
        <div class="walDesTop">
            <div class="child">
                <span >提现金额</span>
                <input class="value" v-model="money" type="number" placeholder="填写提现金额">
            </div>
            <div class="child">
                <span>提现方式</span>
                <!-- <span class="value" @click="show=true">{{active}}</span> -->
                <span class="value">提现到零钱</span>
            </div>
        </div>
        
        <!-- 底部 -->
        <div class="walDesBot">
            <div class="des">
                注：提现申请需经人工审核，一个工作日内（节假日顺延）。审核通过后，提现金额将通过企业支付发到当前微信号的零钱中，请注意查收。
            </div>
            <!-- <van-button round type="danger" size="small" @click="toFN('/fuWithOk')">提交申请</van-button> -->
            <van-button round type="danger" size="small" @click="subMit">提交申请</van-button>            
            <div class="help">
                提现金额必须小于可提现佣金
            </div>
        </div>

        <van-actionsheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
        />
    </div>
</template>

<script>

    export default {
        data(){
            return{
                show: false,
                active:'微信红包',
                actions: [
                    {
                        name: '微信红包',
                    },
                    {
                        name: '支付宝红包',
                    },
                    
                ],
                money:0,
            }
        },
        methods: {
            onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
                this.show = false;
                this.active=item.name
            },
            toFN(to){
                this.$router.push({path:to})
            },
            // 提交申请
            subMit(){
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userID" : this.userId, "bankCardId" : 44, "Amount" : this.money, "clientPoundage" : 1 },
                        method:'User.Distribution.UserWithdRawal',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.$router.replace('/fuWithOk')
                    }else this.notFN(r.data.result.Error.SubMsg)
                })
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuWithdrawalDes{
    .hO;.nC;
    // 头部
    .walDesTop{
        .bW;
        margin: .8rem;
        .bR;
        .child{
            font-size: 1.3rem;
            padding:1.2rem .8rem;
            box-sizing: border-box;
            display: flex;
            .value{
                margin-left: .8rem;
                text-align: right;
                flex: 1; 
            }
        }
        >:first-child{
            .bBS;
        }
    }

    // 底部
    .walDesBot{
        margin: .8rem;
        .bW;.bR;
        box-sizing: border-box;
        text-align: center;
        font-size: 1.1rem;
        .des{
            padding: .8rem;
            text-align: left;
        }
        .van-button{
            margin: .4rem 0 1.2rem;
            width: 30%;
            font-size: 1.3rem;
        }
        .help{
            .jG;
            padding-bottom: 1rem;
        }
    }
    
}
</style>