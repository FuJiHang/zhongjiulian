/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-17 23:06:24
    收货地址管理
 */
<template>
    <div id="fuReceiving" >
        <!-- 地址 -->
        <div class="receiving" v-for="(item,index) in receList" :key="index" @click="chooseFN(item)">
            <div class="left">
                <div class="top">
                    <span class="name">
                        {{item.name}}
                    </span>
                    {{item.phone}}
                </div>
                <div class="mid">
                    {{item.addressArea}}{{item.areaDetail}}
                </div>
                <div class="but" v-show="!addCR">
                    <van-checkbox  class="anniu" @change="modifyDFN(item)" :disabled='item.hasDefault'  v-model="item.hasDefault" checked-color="red">设为默认地址</van-checkbox>
                    <div class="right">
                        <div class="cha_del" @click="modifyFN(item)">
                            <van-icon size="1.6rem" name="orders-o" /><span>修改</span>
                        </div>
                        <div class="cha_del" @click="delectFN(item.id)">
                            <van-icon size="1.6rem"  name="delete" /> <span>删除</span>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div class="right" v-show="addCR">
                <van-icon v-if="item.id==choose.id"  name="checked" size='1.8rem' color="red"/>
                <van-icon v-else name="passed" size='1.8rem'/>
            </div>
        </div>

        


        <!-- 添加按钮 -->
        
        <div class="rece_but">
            <van-button type="danger" class="rece_but_c" @click="show=true">+新增收货地址</van-button>
        </div>


        <van-dialog
        v-model="showT"
        show-cancel-button
        :beforeClose="beforeClose"
        >
            <van-field
                v-model="person.name"
                label="姓名"
                placeholder="请输入收货人姓名"
            />
            <van-field
                v-model="person.celphone"
                label="手机号"
                placeholder="请输入收货人手机号"
            />
            <van-field
                v-model="person.areadetail"
                type="textarea"
                :autosize="{ maxHeight: 120}"
                label="详细地址"
                placeholder="请输入收货人详细地址"
            />
        </van-dialog>
        <van-popup v-model="show" position="bottom">
            <div class="mt_top_add">
                <span @click="cancel">取消</span>
                <span class="flex">
                    请选择地区
                </span>
                <span @click="areaOk">确定</span>
            </div>
            <div class="bot_address">
                <mt-picker :slots="province" @change="onValuesChangeP" value-key="name"></mt-picker>
                <mt-picker :slots="city" @change="onValuesChangeC" value-key="name"></mt-picker>
                <mt-picker :slots="area" @change="onValuesChangeA" value-key="name" ></mt-picker>
            </div>          
        </van-popup>
        
     
       
    </div>
</template>

<script>
    export default {
        data(){
            return{
                choose:{},//路由选择的地址
                addCR:this.$route.query.address,// 判断是选地址还是看地址
                person:{
                    id:0,//为0时添加
                    name:'',
                    celphone:'',
                    zipcode:'邮编',
                    areadetail:'',
                },//添加时信息
                personT:{
                    name:'姓名',
                    celphone:'手机号',
                    areadetail:'详细地址',
                },//提示信息
                regionId:null,//区域Id
                province:[
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex:0,
                    }
                ],
                //省
                city:[
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex:0,
                    }
                ],
                //市
                area:[
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex:0,
                    }

                ],//区
                address:[],//地级市
                receList:[],//收货地址
                modify:false,//修改地址or添加地址判断
                show:false,//地级市弹窗
                showT:false,//详细地址弹窗

            }
        },
        methods:{

            // 获取地级市信息
            getAddress(){
                if(localStorage.getItem('address')){
                    this.address=JSON.parse(localStorage.getItem('address')) 
                    this.province[0].values=this.address[0]
                    return;
                }
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "regionid" : 0 },
                        method:'Common.GetRegionList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        this.address=r.data.result.List
                         this.province[0].values=this.address[0]
                        localStorage.setItem('address',JSON.stringify(this.address))
                    }else this.errFN('获取地级市')
                })               
            }, 

            // 地级市联动，省改变时
            onValuesChangeP(picker) {
                if(picker.getValues()[0]){
                    let addressC=this.address[1]
                    this.city[0].values=[]
                    for(let i=0;i<addressC.length;i++){
                        if(picker.getValues()[0].id==addressC[i].ParentId) this.city[0].values.push(addressC[i])
                    }
                }
                
            },

            // 地级市联动，市改变时
            onValuesChangeC(picker) {
                if(picker.getValues()[0]){
                    let addressA=this.address[2]
                    this.area[0].values=[]
                    for(let i=0;i<addressA.length;i++){
                        if(picker.getValues()[0].id==addressA[i].ParentId) this.area[0].values.push(addressA[i])         
                    }
                }
            },

            // 地级市联动，地改变时
            onValuesChangeA(picker) {
                this.regionId=picker.getValues()[0]
            },

            // 地级市联动，确定时
            areaOk(){
                if(this.regionId){
                    this.show=false
                    this.notFN('已选择'+this.regionId.name,1200)
                    setTimeout(()=>{
                        this.showT=true
                    },1200)
                } 
            },
            
            // 添加详细地址
            beforeClose(action, done) {
                if (action === 'confirm') {
                    if(this.checkD(this.person,this.personT)){
                        this.person.regionId=this.regionId.id
                        this.person.userId=this.userId
                        this.postFN({
                            url:'/UserCenter.aspx',
                            data:{
                                params:this.person,
                                method:'User.Address.SaveAddress',
                                id:this.userId,
                            }
                        }).then(r=>{
                            if(this.modify){
                                if(r.data.result.Error.SubMsg=="修改成功"){
                                    this.okFN('修改')
                                    this.receList=[]
                                    this.getAddressList();
                                }else this.errFN('修改')
                            }else{
                                if(r.data.result.Error.SubMsg=="添加成功"){
                                    this.okFN('添加')
                                    this.receList=[]
                                    this.getAddressList();
                                    this.postFN({
                                        url:'/UserCenter.aspx',
                                        data:{
                                            params:{ "userId" : tokenId },
                                            method:'User.Info.UserInfo',
                                            id:this.userId,
                                        }
                                    }).then(r=>{
                                        if(r.data.result.Error.SubCode==1){
                                            let data=r.data.result.Obj
                                            localStorage.setItem('userData',JSON.stringify(data))
                                            this.setCookie('firstLoginZjl',true,3600*24)
                                            setTimeout(()=>{
                                                location.reload();
                                            },50)
                                        }else{
                                            this.errFN('获取个人信息')
                                        }
                                    })   
                                }else this.errFN('添加')
                            }
                            this.person={
                                id:0,//为0时添加
                                name:'',
                                celphone:'',
                                zipcode:'邮编',
                                areadetail:'',
                            }
                            this.modify=false
                            done()
                        })       
                    } 
                    else  done(false)
                } 
                else{
                    this.cancel();
                    done();
                }
            },
          
            // 获取地址
            getAddressList(){
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userId" : this.userId, "pageIndex" : 1, "pageSize" : 100 },
                        method:'User.Address.Addresslist',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubCode==1){
                        let listData=r.data.result.List
                        for(let i=0;i<listData.length;i++){
                            this.receList.push(listData[i])
                        }
                    }else this.errFN('获取收货信息')
                })     
            },

            // 删除地址
            delectFN(id){
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:{ "userId" : this.userId,"id":id},
                        method:'User.Address.DelShippAddress',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubMsg=='删除成功'){
                        this.okFN('删除')
                        this.receList=[]
                        this.getAddressList();
                    }else this.errFN('删除')
                })     
            },
            
            // 修改地址初始化
            modifyFN(item){
                this.modify=true
                this.person={
                    id:item.id,//为0时添加
                    name:item.name,
                    celphone:item.phone,
                    zipcode:'邮编',
                    areadetail:item.areaDetail,
                }
                if(item.hasDefault) this.person.isDefault=1
                this.show=true
            },

            // 修改默认地址
            modifyDFN(item){
                let pramData={
                    id:item.id,
                    userId:this.userId,
                    name:item.name,
                    celphone:item.phone,
                    regionId:item.regionId,
                    areadetail:item.areaDetail,
                    zipcode:item.zipCode,
                    isDefault:1
                }
                this.postFN({
                    url:'/UserCenter.aspx',
                    data:{
                        params:pramData,
                        method:'User.Address.SaveAddress',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubMsg=="修改成功"){
                        this.okFN('修改')
                        this.receList=[]
                        this.getAddressList();
                    }else this.errFN('修改')
                })     
            },

            // 取消修改
            cancel(){
                if(this.modify) {
                    this.person={
                        id:0,//为0时添加
                        name:'',
                        celphone:'',
                        zipcode:'邮编',
                        areadetail:'',
                    }
                    this.notFN('已取消修改')
                }
                this.show=false
                this.modify=false
            },

            //选择收货地址
            chooseFN(item){
                if(!this.addCR) return;  // 判断是选地址还是看地址
                this.choose=item
                setTimeout(()=>{
                    this.$router.replace({path:'/fuPlaceOrder',query:{address:JSON.stringify(this.choose)}})
                },200)
            },
           
        },

        mounted(){
            if(this.addCR) this.choose=JSON.parse(this.addCR) // 判断是选地址还是看地址
            this.getAddress()
            this.getAddressList()
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuReceiving{
    .hO;
    .nC;
    //列表
    .receiving{
        .bW;
        .bR;
        margin-bottom: .8rem;
        display: flex;
        .left{
            flex: 1;
        }
        .right{
            display: flex;
            align-items: center;
            margin-right: .8rem;
        }
        .top{
            padding: .8rem .8rem 0;
            box-sizing: border-box;
            font-size: 1.4rem;
            display: flex;
            .name{
                .Oline;
                width: 30%;
                margin-right: .8rem;
            }
        }
        .mid{
            padding: .8rem;
            box-sizing: border-box;
            font-size: 1.2rem;
            .bBS; 
        }
        .but{
            display: flex;
            align-items: center;
            padding: .8rem;
            box-sizing: border-box;
            font-size: 1.1rem;
            .anniu{
                flex: 1;
            }
            .right{
                display: flex;
                .cha_del{
                    display: flex;
                    align-items: center;
                    margin-left: .8rem;
                }
            }
        }
    }
    .mt_top_add{
        display: flex;
        .bBS;
        >span{
            font-size: 1.2rem;
            .jG;
            padding: 1rem;
        }
        .flex{
            .nC;
            text-align: center;
            flex: 1;
        }
    }
    .bot_address{
        display:flex;
        .picker{
            flex: 1;
        }
    }
    // 退出
    .rece_but{
        margin: 3.2rem 0 ;
        padding:0 .8rem;
        box-sizing: border-box;
        .rece_but_c{
            width: 100%;
        }
    }
    
}
</style>