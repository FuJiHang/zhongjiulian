/*
 * @Author: fujihang 
 * @Date: 2018-12-27 19:14:28 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-02-21 11:50:29
    优惠卷
 */
<template>
    <div id="fuCouponList" > 
        <div class="coupon">
            <van-tabs v-model="active" swipeable type="card"  sticky :offset-top="45.6" @change="getData">
                <van-tab v-for="(item,index) in listCon" :title="item.name" :key="index">
                    
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getData"
                    >
                        <div v-for="(itemL,indexL) in listCon" :key="indexL" v-show="active==indexL">
                            <couChild :cou="it" v-for="(it,indexX) in itemL.list" :key="indexX"></couChild>
                        </div>
                    </van-list>
                    


                </van-tab>
            </van-tabs>
        </div>
        
    </div>
</template>

<script>
import couChild from '../components/couChild'
    export default {
        components:{
            couChild,
        },
        data(){
            return{
                active:0,
                loading: false, //是否处于加载
                finished: false,  //是否加载完成
                listCon:[
                    {
                        name:'可使用',
                        finished:false,
                        page:1,
                        type:1,
                        list:[],
                    },
                    {
                        page:1,
                        type:2,
                        name:'已使用',
                        finished:false,
                        list:[],

                    },
                    {
                        page:1,
                        type:-1,
                        name:'已过期',
                        finished:false,
                        list:[],
                    },
                ]
            }
        },
        methods:{
            // 获取优惠卷列表
            getData(){
                if(this.listCon[this.active].finished){
                    this.loading=false
                    this.finished=true
                    return ;
                }else{
                    this.finished=false
                    this.loading=true
                }
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "userId" : this.userId, "pageIndex" : this.listCon[this.active].page, "pageSize" : 10, "type" : this.listCon[this.active].type },
                        method:'Shop.Coupon.MyCunpon',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        if(!r.data.result.List){
                            this.listCon[this.active].finished=true
                            this.loading=false
                            return ;
                        } 
                        let dataList=r.data.result.List
                        for(let i=0;i<dataList.length;i++){
                            let dataC={
                                name:dataList[i].couponName,
                                type:'',
                                time:dataList[i].endDate,
                            }
                            this.listCon[this.active].list.push(dataC)
                        }
                        if(dataList.length<10){
                            this.listCon[this.active].finished=true
                            this.loading=false
                            return ;
                        }
                        this.listCon[this.active].page++;
                        this.loading=false
                    }else {
                        this.loading=false
                        this.errFN('获取优惠卷信息')
                    }
                })
            }
        },
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuCouponList{
    height: 100%;
    .nC;
    .coupon{
        height: 100%;
        overflow: hidden;
         .van-tabs{
            height: 100%;
            .van-tabs__content{
                height: 100%;
            }
        }
        .van-tabs__wrap{
            padding: .8rem 0;
            background: white;
            border-bottom:1px solid rgb(240, 240, 240);
            .van-tabs__nav{
                margin: 0 .8rem;
            }
        }
        .van-tab__pane{
            height: 100%;
            overflow: auto;
            padding: 1.6rem .8rem 3.8rem;
            box-sizing: border-box;
        }
        
        
    }
    
    
   
}

</style>