/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-08 15:10:28
    个人资料
 */
<template>
    <div id="fuPersonData">
        <!-- 头部 -->
        <div class="mB">
            <div class="person">
                <span>
                    我的头像
                </span>
                <img v-if='!person.headImage' :src="img">
                <img v-else :src="imgSrc+person.headImage">
            </div>
            <div class="person">
                <span>
                    真实姓名
                </span>
                <span>
                    {{person.trueName}}
                </span>
            </div>
            <div class="person">
                <span>
                    昵称
                </span>
                <span>
                    {{person.nickName}}
                </span>
            </div>
            <div class="person">
                <span>
                    性别
                </span>
                <span>
                    {{person.SEX}}
                </span>
            </div>
            <div class="person">
                <span>
                    个性签名：
                </span>
                <span>
                     {{person.Singature}}
                </span>
            </div>
            <div class="person">
                <span>
                    所在地：
                </span>
                <span>
                     {{address}}
                </span>
            </div>
            <!-- <div class="person">
                <span>
                    我的邀请码：
                </span>
                <span>
                     {{person.UE_InvitationCode}}
                </span>
            </div>
             -->


        </div>
        

        <!-- 底部 -->
        <div class="person" v-for="(item,index) in personBot" :key="index" @click="toFN(item.to)">
            <span>
                {{item.name}}
            </span>
            <van-icon name="qr-invalid" size='2.5rem' class="ewm" v-show="item.e"/>
            <van-icon name="arrow" />
        </div>
        
    </div>
</template>

<script>

    export default {
        data(){
            return{
                person:{},//个人信息
                address:'',
                img:require('../img/酒杯3.svg'),
                // person:[
                //     {
                //         name:'头像：',
                //         img:require('../img/酒杯3.svg'),
                //     },
                //     {
                //         name:'昵称：',
                //         val:'中酒联',
                //     },
                //     {
                //         name:'性别：',
                //         val:'女',
                //     },
                //     {
                //         name:'个性签名：',
                //         val:'中酒联NB',
                //     },
                //     {
                //         name:'所在地：',
                //         val:'广东省广州市天河区',
                //     },
                //     {
                //         name:'我的邀请码：',
                //         val:'98K',
                //     },
                // ],
                personBot:[
                    {
                        name:'修改个人资料',
                        to:'/fuAccounts'
                    },
                    {
                        name:'我的二维码名片',
                        e:true,
                        to:'/fuQRCode'
                        
                    },
                    {
                        name:'我的收货地址',
                        to:'/fuReceiving'
                    },
                    
                ],
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
                        this.address=r.data.result.Obj.Region.RegionName
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
                this.address=this.userData.Region.RegionName
            }else this.getData();
            
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuPersonData{
    .hO;.nC;
    .person{
        padding:1rem .8rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .bW;.bBS;
        font-size: 1.2rem;
        >:first-child{
            flex: 1;
        }
        >img{
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            object-fit: cover;
        }
        .ewm{
           margin-right: .8rem; 
        }
    }

    
}
</style>