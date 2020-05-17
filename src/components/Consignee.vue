/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-22 14:19:20
    收货地址
 */
<template>
    <div class="Consignee">
        <van-icon name="location-o" size='1.6rem' color="red"/>
        <div class="right">
            <div class="r_top">
                <span>收货人：{{address.name}}</span>
                <span>{{address.phone}}</span>
            </div>
            <div>
                收货地址：{{address.addressArea}}{{address.areaDetail}}
            </div>
        </div>
        <van-icon name="arrow" class="left" v-show="place"/>
    </div>
</template>

<script>
    export default {
        props:['place','address'],
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.Consignee{
    .bW;.bBS;.mB;.bR;
    padding: .8rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .right{
        flex: 1;
        font-size: 1.2rem;
        margin-left: .8rem;
        .r_top{
            display: flex;
            
            margin-bottom: .6rem;
            >:first-child{
                flex: 1;
            }
        }
    }
    .left{
        margin-left: .7rem;
    }
}
</style>