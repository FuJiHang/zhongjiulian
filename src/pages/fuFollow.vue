/*
 * @Author: fujihang 
 * @Date: 2018-12-29 10:53:56 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 15:27:33
    我的关注
 */
<template>
    <div id="fuFollow">
        <!-- <div class="follow">
            <img src="../img/酒杯3.svg">
            <div class="name">
                中酒联旗舰店
            </div>
            <div class="right">
                <van-button class="t_b" type="danger" size="small">进入店铺</van-button>
                <van-button type="warning" size="small">取消关注</van-button>
            </div>
        </div> -->
       <follow @callback="callback" :data="item" :list='true' v-for="(item,index) in dataList" :key="index"></follow>
        
    </div>
</template>

<script>
import follow from '../components/follow'
    export default {
       components:{
           follow,
       },
        data(){
            return{
                dataList:[],//关注列表
            }
        },
        methods:{
            // 获取数据
            getData(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "userid" : this.userId },
                        method:'Shop.Collection.MyAttention',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.dataList=r.data.result.List
                    }
                    else this.errFN('获取关注')
                })
            }, 
            // 回调取消关注
            callback(id){
                for(let i=0;i<this.dataList.length;i++){
                    if(id==this.dataList[i].TestCode){
                        this.dataList.splice(i,1)
                    }
                }
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuFollow{
    height: 100%;
    overflow: auto;
    padding-bottom: .8rem;
    box-sizing: border-box;
    .nC;
    // .follow{   
    //     margin: .8rem .8rem 0;
    //     display: flex;
    //     align-items: center;
    //     background: white;
    //     padding: .8rem;
    //     box-sizing: border-box;
    //     border-radius: .6rem;
    //     >img{
    //         object-fit: cover;
    //         border-radius: 50%;
    //         width: 5.5rem;
    //         height: 5.5rem;
    //     }
    //     .name{
    //         .Oline;
    //         font-size: 1.3rem;
    //         flex: 1;
    //         margin-left: .8rem;
    //     }
    //     .right{
    //         justify-content: center;
    //         align-items: center;
    //         display: flex;
    //         flex-direction: column;
    //         .t_b{
    //             margin-bottom: .8rem;
    //         }
    //     }
    // }
}
</style>