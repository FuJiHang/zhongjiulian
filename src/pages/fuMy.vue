/*
 * @Author: fujihang 
 * @Date: 2018-12-27 17:02:31 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 19:39:49
    我的
 */
<template>
    <div id="fuMy">
        <!-- 头部 -->
        <div class="person">
            <div class="editMy" @click="toFN('/fuAccounts')">编辑资料</div>
            <div class="img">
                <img :src="imgSrc+person.headImage">
                <div class="name" >{{person.nickName}}</div>
            </div>
            <div class="fenxiao">
                <van-button round type="danger" @click="toFN('/fuAppDistribu')">加入分销</van-button>
            </div>
        </div>

        <!-- 我的订单  -->
        <myOrder></myOrder>

        <!-- 更多功能 -->
        <moreFun :listFun="listFun"></moreFun>
    </div>
</template>

<script>
import myOrder from '../components/myOrder'
import moreFun from '../components/moreFun'
    export default {
        components:{
            myOrder,moreFun,
        },
        data(){
            return{
                person:{},//个人信息
                listFun:[
                    {
                        name:'我的余额',
                        img:require('../img/yve.svg'),
                        to:'/fuBalance'
                    },
                    {
                        name:'我的优惠券',
                        img:require('../img/yhj.svg'),
                        to:'/fuCouponList'
                    },
                    {
                        name:'我的积分',
                        img:require('../img/jifen.svg'),
                        to:'/fuIntegral'
                    },
                    {
                        name:'我的消息',
                        img:require('../img/xiaoxi.svg'),
                        to:'/fuMyNew'
                    },
                    {
                        name:'我的关注',
                        img:require('../img/gz.svg'),
                        to:'/fuFollow'
                    },
                    {
                        name:'浏览足迹',
                        img:require('../img/zhuzj.svg'),
                        to:'/fuFootprint'
                    },
                    {
                        name:'我的收藏',
                        img:require('../img/shouc.svg'),
                        to:'/fuCollection'
                        
                    },
                    {
                        name:"关于我们",
                        img:require('../img/about.svg'),
                        to:'/fuAbout'
                        
                    },
                    {
                        name:'设置',
                        img:require('../img/shez.svg'),
                        to:'/fuSetting'
                    },
                ]
            }
        },
        methods:{
            toFN(to){
                this.$router.push({path:to})
            },
            // 获取个人信息
            getData(){
                this.tipFN();
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userId" : this.userId },
                        method:'User.Info.UserInfo',
                        id:this.userId,
                    }
                }).then(r=>{
                    this.tipHFN();
                    if(r.data.result.Error.SubCode==1){
                        this.person=r.data.result.Obj
                        localStorage.setItem('userData',JSON.stringify(this.person))
                        setTimeout(()=>{
                            location.reload();
                        },10)
                    }else{
                        this.errFN('获取个人信息')
                    }
                })     
            },
        },
        mounted(){
            if(this.userData){
                this.person=this.userData
            }else this.getData();
        }
       

    }
</script>

<style lang="less">
@import '../style/base.less';
#fuMy{
    overflow: auto;
    height: 100%;
    // 头部
    .person{
        border-radius: .6rem;
        background: white;
        width: 100%;
        padding: .8rem;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(231, 231, 231);
        .nC;
        .editMy{
            font-size: 1.2rem;
            text-align: right;
        }
        .img{
            text-align: center;
            img{
                border-radius: 50%;
                object-fit: cover;
                height: 5.5rem;
                width: 5.5rem;
            }
            .name{
                font-size: 1.5rem;
                margin-top:.8rem; 
            }
        }
        .fenxiao{
            margin-top: .8rem;
            text-align: center;
            .van-button{
                padding: 0 2rem;
                line-height: 3rem;
                font-size: 1.2rem;
                height: 3rem;
            }
        }
    }
    
}
</style>