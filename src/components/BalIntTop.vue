/*
 * @Author: fujihang 
 * @Date: 2018-12-29 15:10:19 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-20 20:01:10
    积分和金钱头部
 */
<template>
    <div class="BalIntTop">
        <div class="help_bal" v-show="topList.g=='积分'" @click="toHelp('/fuHelpDes')">获得积分</div>
        <div class="val_b">{{topListVal.t}}</div>
        <div class="name_b" @click="toFN(topList,topList.t)">{{topList.t}}</div>
        <div class="deal">
            <div class="child" @click="toFN(topList,topList.l)">
                <div class="val">{{topListVal.l}}</div>
                <div class="name" >{{topList.l}}</div>
            </div>
            <div class="child" @click="toFN(topList,topList.r)">
                <div class="val">{{topListVal.r}}</div>
                <div class="name" >{{topList.r}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['topList','topListVal'],
        methods:{
            toFN(type,name){
                if(type.g=="积分") this.$router.push({path:'/fuInterDes?name='+name})
            },
            toHelp(to){
                this.$router.push({path:to})
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.BalIntTop{
    position: relative;
    background: white;
    font-size: 1.4rem;
    .help_bal{
        top: .8rem;
        right: .8rem;
        position:absolute;
        color: #999;
        font-size: 1.2rem;
    }
        .val_b{
            padding-top: 2rem;
            font-size: 2rem;
            .jG;
            text-align: center;
        }
        .name_b{
            margin-top: .8rem;           
            text-align: center;
        }
        .deal{
            margin-top: 2rem;
            border-top: 1px solid rgb(240, 240, 240);
            align-items: center;
            display: flex;
            >:first-child{
                border-right: 1px solid rgb(240, 240, 240);
            }
            .child{
                width: 50%;
                text-align: center;
                padding: .8rem 0;
                .val{
                    .jG;
                }
                .name{
                    font-size: 1.2rem;
                    margin-top: .6rem;
                }
            }
        }
}
</style>