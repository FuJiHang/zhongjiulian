/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-05 17:37:29
    分销商列表
 */
<template>
    <div class="distributorList">
        <div class="topAbus">
            <div class="child" v-for="(item,index) in topList" :key="index">
                <span>{{item.name}}</span>
                <span class="mini" v-if="item.mini">
                    隐藏
                </span>
            </div>
        </div>
        <div class="nativeList">
            <div :class="['native',phone?'showPhoen':'']" v-for="i in 10" @click="phone=!phone" :key="i">
                <div class="native_child" >
                    <div class="child one">
                        <div>符继航</div>
                        <div class="jion">加入10天，推荐{{i}}人</div>
                    </div>
                    <div class="child">
                        <span>100.00</span><span class="mini">隐藏</span>
                    </div>
                    <div class="child">
                        <span>100.00</span><span class="mini">隐藏</span>
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
                        name:'昵称/姓名',
                        mini:false
                    },
                    {
                        name:'他的收益',
                        mini:true,
                    },
                    {
                        name:'我的收益',
                        mini:true,
                    },
                ]
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.distributorList{
    .nC;
    height: 100%;
    position: relative;
    .topAbus{       
        top: 0;
        z-index: 2;
        height: 4rem;
        width: 100%;
        position:absolute;
        display: flex;
        align-items: center;
        .bBS;.bW;
        .child{
            font-size: 1.3rem;
            width: 33.33%;
            text-align: center;
            .mini{
                font-size: 1.1rem;
                .jG;
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
                .jion{
                    font-size: 1rem;
                    color: #999;
                    margin-top: .8rem;
                }
                .mini{
                    .jG;
                    margin-left: .8rem;
                    font-size: 1.1rem;
                }
            }
            .one{
                width: 35%;
            }
        }
    }
    
}
</style>