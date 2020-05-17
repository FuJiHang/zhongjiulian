/*
 * @Author: fujihang 
 * @Date: 2018-12-29 14:29:36 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-22 15:27:43
    足迹
 */
<template>
    <div class="footList"  @click="toFN">
        <div class="time">
            {{data.time}}
        </div>
        <div class="foot">
            <img :src="imgSrc+data.pic">
            <div class="right">
                <div class="top_des">
                   {{data.proname}} {{data.shortdescription}}
                </div>
                <!-- <div class="size">
                    规格：&nbps;&nbps;750ML
                </div> -->
                <div class="mon">
                    <span>￥{{data.saleprice}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['data'],
        data(){
            return{
            }
        },
        methods:{
            
            toFN(){
                this.$router.push({path:'/fuProduct?id='+this.data.pid})
            },
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.footList{
    .bBS;
    .bR;
    margin: .8rem .8rem 0;
    .bW;
    .time{
        box-sizing: border-box;
        font-size: 1.1rem;
        padding: .8rem .8rem;
        .bBS;
    }
    .foot{
        display: flex;
        padding: .8rem .8rem;
        box-sizing: border-box;
        >img{
            object-fit: cover;
            width: 8rem;
            height: 8rem;
        }
        .right{
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: .8rem;
            .top_des{
                flex: 1;
                font-size: 1.2rem;
                .Tline;
            }
            .size{
                font-size: 1.1rem;
                .Oline;
                margin-top: .35rem;
            }
            .mon{
                display: flex;
                .jG;
                margin-top: .3rem;
                font-size: 1.5rem;
                >span{
                    flex: 1;
                }
            }
        }
    }
}

</style>