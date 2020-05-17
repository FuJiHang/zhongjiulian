/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-05 17:37:41
    客户列表
 */
<template>
    <div class="Customer">
        <div class="topCust">
            <div class="child" v-for="(item,index) in topList" :key="index">
                <span>{{item.name}}</span>                
            </div>
        </div>
        <div class="nativeList">
            <div :class="['native',phone?'showPhoen':'']" v-for="i in 10" @click="phone=!phone" :key="i">
                <div class="native_child" >
                    <div class="child">
                        <div>符继航</div>
                    </div>
                    <div class="child">
                        100.00
                    </div>
                    <div class="child">
                        {{i}}
                    </div>
                    <div class="child">
                        <div>已完成</div>
                        <div class="des">查看详情</div>
                    </div>
                </div>
                <!-- 电话 -->
                <div class="phone">
                    电话：13316146305
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

    export default {
        data(){
            return{
                phone:false,
                topList:[
                    {
                        name:'用户名',
                    },
                    {
                        name:'累计购买金额',
                    },
                    {
                        name:'购买次数',
                    },
                    {
                        name:'最后一笔订单状态',
                    },
                ]
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.Customer{
    .nC;
    height: 100%;
    position: relative;
    .topCust{       
        top: 0;
        z-index: 2;
        height: 4rem;
        width: 100%;
        position:absolute;
        display: flex;
        align-items: center;
        .bBS;.bW;
        .child{
            width: 25%;
            font-size: 1.3rem;
            text-align: center;
            >span{
                display: block;
                padding: .4rem;
                box-sizing: border-box;
            }
        }
    }
    .nativeList{
        padding-top: 4rem;
        overflow:auto;
        height: 100%;
        box-sizing: border-box;
        .native{
            position: relative;
            overflow: hidden;
            height: 5rem;
            transition: .3s;
            .bBS;
            .phone{
                margin-left: .8rem;
                line-height: 3rem;
                height: 3rem;
                font-size: 1.2rem;
            }
        }
        .showPhoen{
            height: 8rem;
        }
        .native_child{
            display: flex; 
            align-items: center;
            height: 5rem;
            .bW;.bBS;
            .child{
                text-align: center;
                width: 32.5%;
                font-size: 1.3rem;
                .des{
                    font-size: 1.2rem;
                    .jG;
                    margin-top: .6rem;
                }
               
            }
        }
    }
    
    
}
</style>