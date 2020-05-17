/*
 * @Author: fujihang 
 * @Date: 2018-12-29 14:29:36 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-22 15:21:55
    足迹和收藏卡片(足迹另开了)
 */
<template>
    <div class="ColFoot" v-if="show" @click="toFN">
        <div class="time" v-show="c_or_f">
            2018.11.01 10:00:00
        </div>
        <div class="foot">
            <img :src="imgSrc+data.pic">
            <div class="right">
                <div class="top_des">
                   {{data.name}} {{data.ShortDescription}}
                </div>
                <!-- <div class="size">
                    规格：&nbps;&nbps;750ML
                </div> -->
                <div class="mon">
                    <span>￥{{data.saleprice}}</span><van-button round  v-show="!c_or_f" type="danger" size="mini" @click.stop="cancel">取消</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['c_or_f','data'],
        data(){
            return{
                show:true
            }
        },
        methods:{
            
            toFN(){
                this.$router.push({path:'/fuProduct?id='+this.data.id})
            },
            //取消收藏
            cancel(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ 'userId':this.userId,"favId":this.data.favId},
                        method:'Shop.Collection.CancelFav',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubMsg=='取消收藏成功!'){
                        this.notFN("取消收藏成功!")
                        this.show=false
                    }else this.errFN('取消收藏')
                })
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.ColFoot{
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