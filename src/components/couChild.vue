/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-21 15:01:45
    优惠卷
 */
<template>
    <div :class="['couChild',cou.use?'disable':'']" >
        <div class="c_left">
            <div class="c_top">
                <div class="left">
                    {{cou.name}}
                </div>
                <div class="right">
                    {{cou.type}}
                </div>
            </div>
            <div class="c_bot">
                有效期：{{cou.time}}
            </div>
        </div>
        <div class="c_right"  @click="toFN" v-show="!check">
            查    看
        </div>
        <van-icon name="checked" @click="CheckFN" v-show="check" v-if="!des" class='che_cC' :color="cou.checkToF?'red':'#999'"/>
        <!-- <van-checkbox v-model="checked" class='che_cC' checked-color="red"></van-checkbox> -->
        
    </div>
</template>

<script>

    export default {
        props:['cou','check','des'],
        data(){
            return{
                
            }
        },
        methods:{
            toFN(){
                this.$router.push({path:'/fuCoupon'})
            },
            // 选择优惠卷
            CheckFN(){
                if(this.cou.use) return this.notFN('该优惠卷无法使用！',1000)
                this.$emit('checkFN',this.cou)
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.couChild{
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: .6rem;
    height: 9rem;
    background:white;
    margin-top:.8rem;
    .c_left{
        flex: 1;
        height: 100%;
        padding:0 .8rem; 
        >div{
            font-size: 1.2rem;
            box-sizing: border-box;
            height: 50%;
            display: flex;
            align-items: center;
        }
        .c_top{
            border-bottom: 1px dashed  rgb(235, 235, 235);
            .left{
                .jG;
                font-size: 1.6rem;
                flex: 1;
                .Oline;
            }
            .right{
                color: #E6A23C;
            }
            
        }
    }
    .c_right{
        // border-radius: .6rem;
        color: white;
        font-size: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: red;
        height: 100%;
        width: 6rem;
    }
    .che_cC{
        margin-right: .8rem;
        font-size: 2rem;
    }
}
.disable{
    opacity: .4;
}
</style>