/*
 * @Author: fujihang 
 * @Date: 2019-03-17 11:35:44 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 17:18:59
    关注标签
 */
<template>
    <div :class="['follow',list?'followList':'']">
        <img :src="imgSrc+data.stoGravatar">
        <div class="name">
            {{data.stoNick}}
        </div>
        <div class="right">
            <van-button v-if="list" class="t_b" type="danger" size="small" @click="toFN">进入店铺</van-button>
            <van-button v-if="list" type="warning" size="small" @click="canclFN">取消关注</van-button>
            <van-button v-show="!data.hasAttention" v-if="!list" type="danger" size="small" @click="followFN">点击关注</van-button>
            <van-button v-show="data.hasAttention" v-if="!list" class="hui" size="small" >已关注</van-button>
        </div>
    </div>
</template>

<script>
export default {
    props:['list','data'],
    methods:{
        // 进入店铺
        toFN(){
            localStorage.setItem('supCode',this.data.TestCode)
        },
        // 关注
        followFN(){
            this.tipFN();
            this.postFN({
                url:'/shop.aspx',
                data:{
                    params:{ "stoCode" : this.data.TestCode, "userId" : this.userId },
                    method:'Shop.Collection.Attention',
                    id:this.userId,
                }
            }).then(r=>{
                this.tipHFN();
                if(r.data.result.Error.SubCode==1){
                    this.$emit("callbackGZ")
                    this.okFN('关注店铺')
                }else this.errFN('关注店铺')
            })
        },
        // 取消关注
        canclFN(){
            this.tipFN();
            this.postFN({
                url:'/shop.aspx',
                data:{
                    params:{ "stoCode" :this.data.TestCode, "userId" : this.userId },
                    method:'Shop.Collection.UnAttention',
                    id:this.userId,
                }
            }).then(r=>{
                this.tipHFN();
                if(r.data.result.Error.SubCode==1){
                    this.$emit("callback",this.data.TestCode)
                    this.okFN('取消关注店铺')
                }else this.errFN('取消关注店铺')
            })
        },
    },
    mounted () {
        console.log(this.data)  
    }
}
</script>

<style lang="less">
@import '../style/base.less';
.follow{   
     margin: .8rem 0 ;
    display: flex;
    align-items: center;
    background: white;
    padding: .8rem;
    box-sizing: border-box;
    border-radius: .6rem;
    >img{
        object-fit: cover;
        border-radius: 50%;
        width: 5.5rem;
        height: 5.5rem;
    }
    .name{
        .Oline;
        font-size: 1.3rem;
        flex: 1;
        margin-left: .8rem;
    }
    .right{
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        .t_b{
            margin-bottom: .8rem;
        }
    }
    .hui{
        background: rgb(172, 172, 172);
        color: white;
    }
}
.followList{
    margin: .8rem .8rem 0;
}
</style>