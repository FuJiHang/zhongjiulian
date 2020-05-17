/*
 * @Author: fujihang 
 * @Date: 2018-12-26 16:15:43 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-15 17:55:07
    排序模块
 */
<template>
    <div class="reorder">
        <div :class="['reo_child',item.cloo?'cloo':'']" v-for="(item,index) in reo" :key='index' @click="clooseFN(item,index)">
            <span>{{item.name}}</span><van-icon :name="item.type" />
        </div>
        <div class="reo_type" @click="typeFN">
            <van-icon v-show="type" name="bars" />
            <van-icon v-show="!type" name="apps-o" />
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            props: ['Endian']
            return{
                reo:[
                    {
                        name:'按销量',
                        type:'arrow-up',
                        cloo:false,
                    },
                    {
                        name:'按价格',
                        type:'arrow-up',
                        cloo:false,
                    },
                    {
                        name:'按人气',
                        type:'arrow-up',
                        cloo:false,
                    },
                ],
                up:'arrow-up',
                down:'arrow-down',
                type:this.Endian,
            }
        },
        methods:{
            // 切换列表
            typeFN(){
                if(this.type){
                    this.type=false
                }else{
                    this.type=true
                }
                this.$emit('Endian',this.type)
            },
            // 切换排序
            clooseFN(item,index){
                if(item.type=='arrow-up')this.reo[index].type='arrow-down'
                else this.reo[index].type='arrow-up'
                for(let i=0;i<this.reo.length;i++){
                    if(i==index) continue;
                    this.reo[i].type='arrow-up'
                    this.reo[i].cloo=false
                }
                this.reo[index].cloo=true
                this.$emit('reo',this.reo)
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.reorder{
    z-index: 2;
    position:fixed;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(245, 245, 245);
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    background: white;
    .reo_child{
        border-right: 1px solid rgb(240, 240, 240);
        .nC;
        height: 50%;
        flex: 1;
        display:flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        .van-icon{
            margin-left: .5rem;
            font-size: 1.1rem;
        }
    }
    .cloo{
        .jG;
    }
    .reo_type{
        box-sizing: border-box;
        padding: 1rem 1.5rem;
        height: 100;
        display: flex;
        align-content: center;
        .van-icon{
            font-size: 2rem;
        }
    }
}
</style>