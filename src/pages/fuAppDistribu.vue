/*
 * @Author: fujihang 
 * @Date: 2019-01-12 18:11:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-30 12:20:07
    申请分销
 */
<template>
    <div id="fuAppDistribu">
        <!-- 头部 -->
        <div class="person">
            <div class="img">
                <img src="../img/酒杯3.svg">
                <div class="name" >中酒联</div>
            </div>
        </div>

        <!-- 中间 -->
        <div class="infor_in">
            <div class="infor_chil" v-for="(item,index) in infor" :key="index">
                <span class="left">
                    {{item.name}}
                </span>
                <input v-model="item.val" :placeholder="item.plr" v-show="index!=2">
                <span class="right" v-show="index==2" @click="showAdd=true">
                    {{item.plr}}
                </span>
                <van-icon name="arrow" v-show="index==2"  @click="showAdd=true"/>
                <van-button round @click="countDown" v-show="index==4" type="danger" size="small">{{yzm.yzmBtn}}</van-button>
            </div>
            <div class="check">
                <van-checkbox v-model="checked" checked-color="red">同意中酒联分销协议</van-checkbox>
            </div>
        </div>

        <!-- 分销特权 -->
        <div class="infor_qu">
            <div class="top">
                分销商特权
            </div>
            <div class="child" v-for="(item,index) in quan" :key="index">
                <img src="../img/pro02.jpg">
                <span>
                    <div class="name">
                        {{item.name}}
                    </div>
                    <div class="val">
                        {{item.val}}
                    </div>
                </span>
            </div>
            <div class="top">
                分销商的商品销售统一由厂家直接收款，直接发货，并且提供产品的售后服务，分销佣金由厂家统一设置。
            </div>
        </div>

        <div class="submit">
            <van-button @click="submitFN" type="danger"  size="normal">提交申请</van-button>
        </div>
        
        <!-- 三级联动 -->
        <van-popup v-model="showAdd" position="bottom" >
            <addressChil @cancel='showAdd=false' @addBack='addBack'></addressChil>
        </van-popup>
        
    </div>
</template>

<script>
import addressChil from "../components/addressChil"
    export default {
        components:{
            addressChil
        },
        data(){
            return{
                showAdd:false,//显示三级联动
                yzm:{
                    yzmBtn:'获取验证码',
                    time:5,
                },
                canClick:true,
                infor:[
                    {
                        name:'店面',
                        val:'',
                        plr:'请填写您的店面',
                        sub:'storeName',
                    },
                    {
                        name:'姓名',
                        val:'',
                        plr:'请填写您的姓名',
                    },
                    {
                        name:'地区',
                        val:'',
                        plr:'请选择地区',
                        sub:'regionId',

                    },
                    {
                        name:'手机号码',
                        val:'',
                        plr:'请填写您的联系号码',
                        sub:'phone',
                    },
                    {
                        name:'验证码',
                        val:'',
                        plr:'请填写验证码',
                        sub:'code',
                    },
                ],//填写信息
                checked:false,//同意
                quan:[
                    {
                        name:'独立微店',
                        val:'拥有自己的微店及推广二维码',
                    },
                    {
                        name:'销售拿佣金',
                        val:'微店卖出商品，您可以获得佣金',
                    },
                ],
            }
        },
        methods: {
            //获取验证码
            countDown () {
                if(!this.checkP(this.infor[3].val)) return this.notFN('手机号码不正确')
                if (!this.canClick) return;
                else{
                    this.canClick = false
                    this.yzm.yzmBtn = this.yzm.time + 's'
                    let clock = window.setInterval(() => {
                        this.yzm.time--
                        localStorage.setItem("timeClear",this.yzm.time)
                        this.yzm.yzmBtn = this.yzm.time + 's'
                        if (this.yzm.time < 0) {
                            window.clearInterval(clock)
                            this.yzm.yzmBtn = '重新获取'
                            this.yzm.time = 5
                            this.canClick = true //这里重新开启
                        }
                    },1000)
                }
                if(this.yzm.time==5){
                    this.postFN({
                        url:'/shop.aspx',
                        data:{
                            params:{ "phonenum" : this.infor[3].val, "vtype" : 9 },
                            method:'Common.GetVerificationCode',
                            id:this.userId,
                        }
                    }).then(r=>{
                        if(r.data.result.Error.SubCode==1) this.notFN('验证码已发送，请注意查收')
                        else this.notFN(r.data.result.Error.SubMsg)
                    })
                }
            },
            // 确认的地址
            addBack(data){
                this.infor[2]={
                    plr:data.name,
                    name:'地区',
                    val:data.id,
                    sub:'regionId'
                }
                this.showAdd=false
                console.log(this.infor)
            },
            // 提交申请
            submitFN(){
                // return console.log(this.infor)
                if(!this.checkDT(this.infor,'val','plr')) return
                let data={}
                for(let i=0;i<this.infor.length;i++){
                    if(this.infor[i].sub) data[this.infor[i].sub]=this.infor[i].val                  
                }
                if(!this.checked) return this.notFN("请同意分销协议！")
                data.userId=2547,
                console.log(data)
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params: data,
                        method:'User.Info.DistributorApplication',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Obj.Message=="申请成功") this.$router.push({path:'/fuAppOkorNo?typeP='+1})
                    else if(r.data.result.Obj.Message=='申请失败') this.$router.push({path:'/fuAppOkorNo?typeP='+2})
                    else this.notFN(r.data.result.Obj.Message)
                })
            },  
        },
        mounted(){
            var timeClear=localStorage.getItem("timeClear")
            if(timeClear>0){
                this.yzm.time=timeClear
                this.countDown();
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuAppDistribu{
    height: 100%;
    overflow: auto;
    position: relative; 
    padding-bottom: 5.5rem;
    box-sizing: border-box;
    .nC;
    // 头部
    .person{
        border-radius: .6rem;
        background: white;
        width: 100%;
        padding: .8rem;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(231, 231, 231);
        .mB;
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
    }
    // <!-- 中间 -->
    .infor_in{
        .bW;
        font-size: 1.3rem;
        .infor_chil{
            padding: .8rem 1.2rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .bBS;
            >input{   
                margin-left: .6rem;
                text-align: right;
                flex: 1;
            }
            .right{
                text-align: right;
                flex: 1;
            }
            .van-button{
                margin-left: .6rem;
            }
        }
        .check{
            padding: .8rem 1.2rem;
            box-sizing: border-box;
        }
        .mB;
        .bR;
    }

    // 分销特权
    .infor_qu{
        font-size: 1.3rem;
        .bW;
        .top{
            padding: .8rem 1.2rem;
            box-sizing: border-box;
        }
        .child{
            padding:.6rem;
            margin: .6rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border:1px solid rgb(243, 243, 243);
            >img{
                width: 3.8rem;
                height: 3.8rem;
                border-radius: 50%;
                object-fit: cover;
            }
            >span{
                flex: 1;
                margin-left: .6rem;
                .val{
                    color: #999;
                    font-size: 1.2rem;
                }
            }
        }
    }
    // 提交按钮
    .submit{
        position: fixed;
        bottom: 0;
        width: 100%;
        .van-button{
            width: 100%;
        }
    }
}
</style>