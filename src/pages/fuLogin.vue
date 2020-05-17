/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-09 14:35:23
    登录注册
 */
<template>
    <div id="fuLogin">
        <topTwo :name='typeData.name'></topTwo>

        <!-- logo -->
        <img class="logo" src="../img/酒杯3.svg">

        <!-- 输入框 -->
        <div :class="['input',item.yzm?'yzm':'']" v-for="(item,index) in loginList[typeData.type]" :key="index">
            <input  :class="item.cla?'red':''" :placeholder="item.pl" v-model="item.val" @focus='item.cla=true' @blur="item.cla=false">            
            <van-button type="primary" v-show="item.yzm"  round>
                {{item.yzm}}
            </van-button>
        </div>

        <!-- 按钮 -->
        <div class="but" v-for="(item,index) in butList">
            <van-button round type="primary" v-show="index==0&&typeData.type==item.fuType"  @click="changeFN(item.type)">{{item.name}}</van-button>
            <van-button round type="danger" v-show="index!=0&&typeData.type==item.fuType" @click="changeFN(item.type)">{{item.name}}</van-button>
        </div>

        <!-- 协议 -->
        <div class="xieyi" v-show="typeData.type==2">
            <van-checkbox v-model="checked" checked-color="red"></van-checkbox>
            <span>已同意《中酒联协议》</span>
        </div>

        <!-- 底部字体 -->
        <div class="dlmm">
            <span class="dl" @click="changeFN(4)" v-show="typeData.type==1">快速登录</span>
            <span class="dl" @click="changeFN(1)" v-show="typeData.type==2">直接登录</span>
            <div></div>
            <span class="mm" @click="changeFN(5)" v-show="typeData.type==1||typeData.type==2">忘记密码</span>
            <span class="mm" @click="changeFN(1)" v-show="typeData.type!=1&&typeData.type!=2">直接登录</span>
        </div>

    </div>
</template>

<script>
import topTwo from '../public/topTwo'
    export default {
        components:{
            topTwo,
        },
        data(){
            return{
                // 协议
                checked:false,

                //输入框
                loginList:[
                    [],
                    // 登录
                    [
                        {
                            val:null,  //值
                            pl:'请输入手机号',  //提示
                            cla:false,  //焦点触发时边框颜色
                            type:1  //根据当前的状态显示
                        },
                        {
                            val:null,
                            pl:'请输入密码',
                            cla:false,
                            type:1
                        },
                    ],

                    // 注册
                    [
                        {
                            val:null,
                            pl:'请输入手机号',
                            cla:false,
                            type:2

                        },
                        {
                            val:null,
                            pl:'请输入验证码',
                            cla:false,
                            type:2,
                            yzm:'获取验证码',  //是否有验证码
                        },
                        {
                            val:null,
                            pl:'请输入密码',
                            cla:false,
                            type:2
                        },
                        {
                            val:null,
                            pl:'请输入邀请码',
                            cla:false,
                            type:2,
                        },
                    ],
                    [],

                    // 快速登录
                    [
                        {
                            val:null,
                            pl:'请输入手机号',
                            cla:false,
                            type:4
                        },
                        {
                            val:null,
                            pl:'请输入验证码',
                            cla:false,
                            type:4,
                            yzm:'获取验证码',
                        },
                    ],
                    
                    // 忘记密码
                    [
                        {
                            val:null,
                            pl:'请输入手机号',
                            cla:false,
                            type:5
                        },
                        {
                            val:null,
                            pl:'请输入验证码',
                            cla:false,
                            type:5,
                            yzm:'获取验证码',
                        },
                    ],
                    // 设置新密码
                    [
                        {
                            val:null,
                            pl:'请输入新密码',
                            cla:false,
                            type:6
                        },
                    ],
                ],


                //按钮列表
                butList:[
                    {
                        name:'登录', //按钮名字
                        type:0,    //触发什么方法
                        fuType:1,  //根据当前的状态显示
                    },
                    {
                        name:'注册',
                        type:2,
                        fuType:1,
                    },
                    {
                        name:'注册',
                        type:3,
                        fuType:2,
                    },
                     {
                        name:'登录',
                        type:8,
                        fuType:4,
                    },
                    {
                        name:'下一步',
                        type:6,
                        fuType:5,
                    },
                    {
                        name:'确定',
                        type:7,
                        fuType:6,
                    },
                ],
               

                //当前是什么网页
                typeData:{
                    type:1,
                    name:'登录',

                }
                
            }
        },
        methods:{
            changeFN(id){
                switch(id){
                    // 登录
                    case 0:
                        console.log("=0-")
                    break;
                    case 1:
                        this.typeData={
                            name:'登录',
                            type:1
                        }
                    break;
                    case 2:
                        this.typeData={
                            name:'注册新用户',
                            type:2
                        }
                    break;
                    // 注册
                    case 3:
                        console.log("============")
                    break;
                    case 4:
                        this.typeData={
                            name:'快速登录',
                            type:4
                        }
                    break;
                    case 5:
                        this.typeData={
                            name:'忘记密码',
                            type:5
                        }
                    break;
                    case 6:
                        this.typeData={
                            name:'设置新密码',
                            type:6
                        }
                    break;
                    // 确定修改密码
                    case 7:
                        
                    break;
                    //快速登录
                    case 8: 
                        
                    break;
                    
                }
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuLogin{
    .hO;.nC;.bW;
    box-sizing: border-box;
    padding: 45.6px 0 0;
    text-align: center;
    .logo{
        margin: 10% 0 11%;
        border-radius: 50%;
        width: 8rem;
        height: 8rem;
        object-fit: cover;
    }

    // 输入框
    .input{
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        >input{
            font-size: 1.3rem;
            text-align: center;
            box-sizing: border-box;
            padding:0 .8rem ;
            border:1px solid rgb(202, 202, 202);
            border-radius: 3rem;
            width: 70%;
            height: 4rem;
        }
        .red{
            .jG;
            border-color: red;
        }
        .red::placeholder{
            color:red;
        }

    }
    .yzm{
        width: 70%;
        margin: 0 auto 1rem;
        >input{
            flex: 1;
        }
        .van-button{
            margin-left: 1rem;
            height:4rem;
            line-height: 4rem;
            padding:0 10px;
            font-size: 1.2rem;
        }
    }

    // 按钮
    .but{
        margin-bottom: 1rem;
        .van-button{
            width: 70%;
        }
    }

    // 底部导航
    .dlmm{  
        margin-top:10%;
        display: flex;
        font-size: 1.2rem;
        .dl{
            margin-left: 16%;
            text-align: left;
        }
        >div{
            flex: 1;
        }
        .mm{
            margin-right: 16%;
        }
    }

    .xieyi{
        display: flex;
        margin: 1.5rem auto 0;
        width: 70%;
        align-items: center;
        >span{
            margin-left: 1rem;
            font-size: 1.1rem;
        }
    }
}
</style>