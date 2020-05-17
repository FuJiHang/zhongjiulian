/*
 * @Author: fujihang 
 * @Date: 2018-12-28 16:51:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-14 12:00:13
    优惠卷说明
 */
<template>
    <div id="fuCoupon">
        <div class="name" :style="{color:color}">
            本券未使用
        </div>

        <couChild :cou='list' des="true" check="true" class="Coupon_des"></couChild>

        <div class="instruc">
            <div class="top">
                使用说明
            </div>
            <div class="but">
                本优惠券只限于中酒联旗舰店可用，罗纳红酒不可用，不可折现，所有权归公司所有
            </div>
        </div>
        <topTwo name="满100减50"></topTwo>
    </div>
</template>

<script>
import topTwo from '../public/topTwo'
import couChild from '../components/couChild'
    export default {
        components:{
            topTwo,couChild
        },
        data(){
            return{
                color:"red",
                list:{
                    name:'满100元减50元',
                    type:'免费',
                    time:'2018.03.05~2018.07.07',
                },
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuCoupon{
    overflow: auto;
    height: 100%;
    position: relative;
    padding-top: 45.6px;
    .nC;
    .name{
        font-size: 1.5rem;
        line-height: 4rem;
        text-align: center;
        background: white;
        height: 4rem;
    }
    .instruc{
        margin: .8rem .8rem 0;
        background: white;
        border-radius: .3rem;
        .top{
            font-size: 1.3rem;
            padding: .8rem;
            border-bottom: 1px dashed rgb(240, 240, 240);
        }
        .but{
            padding: .8rem;
            
        }
    }
    .Coupon_des{
        margin: .8rem .8rem 0;
    }
}
</style>