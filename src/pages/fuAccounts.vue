/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-18 11:19:13
    账户与安全
 */
<template>
    <div id="fuAccounts">
        <!-- 列表 -->
        <div class="account" v-for="(item,index) in accList" @click="accFN(item,index)">
            <span>{{item.name}}</span>
            <span>{{item.val}}</span>
            <van-icon name="arrow" />
        </div>

        <!-- <div class="account last">
            <span>提现密码</span>
            <span>设置提现密码</span>
            <van-icon name="arrow" />
        </div> -->
        

        <!-- 弹窗 -->
        <van-dialog
            v-model="Accshow"
            show-cancel-button
            :before-close="beforeClose"
        >
            <van-field
                v-model="dialog.val"
                :type="dialog.type"
                :label="dialog.label+'：'"
                :placeholder="'请输入修改的'+dialog.label"
            />
        </van-dialog>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                accList:[
                    {
                        name:'修改手机号',
                        val:'',
                        label:'手机号',
                        type:'tel',
                    },
                    // {
                    //     name:'修改绑定邮箱',
                    //     // val:'13553570072@qq.com',
                    //     val:'',
                    //     label:'邮箱',
                    //     type:'tel',
                    // },
                    // {
                    //     name:'修改登录密码',
                    //     val:'修改个人密码',
                    //     label:'密码',
                    //     type:'password',
                    // },
                  
                ],//列表内容
                dialog:{
                    val:'',
                    type:"tel",
                    label:'',
                    post:{
                        userId:this.userId
                    }
                },//弹窗信息
                Accshow:false,//弹窗
            }
        },
        methods:{
            // 初始化弹窗
            accFN(data,index){
                this.Accshow=true;
                this.dialog.type=data.type;
                this.dialog.label=data.label
                this.dialog.index=index
                this.dialog.val=''
                // console.log(data)
            },
            //获取弹窗内容
            beforeClose(action, done) {
                if (action === 'confirm') {
                    this.dialog.post.phone=this.dialog.val
                    this.postFN({
                        url:'/UserCenter.aspx',
                        data:{
                            params:this.dialog.post,
                            method:'User.Info.UpdateUser',
                            id:this.userId,
                        }
                    }).then(r=>{
                        done();
                        if(r.data.result.Error.SubCode==1){
                            this.accList[this.dialog.index].val=this.dialog.val
                            this.okFN('修改')
                        }else this.errFN('修改')
                    })
                } else {
                    done();
                }
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
                       this.accList[0].val=r.data.result.Obj.phone
                    }else{
                        this.tipHFN();
                        this.errFN('获取个人信息')
                    }
                })     
            },
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuAccounts{
    .hO;
    .nC;
    .account{
        .bW;.bBS;
        display: flex;
        padding: 1.2rem .8rem; 
        font-size: 1.3rem;
        align-items: center;
        >:first-child{
            flex: 1;
        }
        >:last-child{
            margin-left: .8rem;
        }
    }
    .last{
        margin-top: .8rem;
    }
    
}
</style>