/*
 * @Author: fujihang 
 * @Date: 2019-03-07 15:21:43 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-07 15:52:38
    地级市三级联动
 */
<template>
    <div class="addressChil">
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
    </div>
</template>

<script>
    export default {
        data(){
            return{
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
                         this.province[0].values.push(this.address[0])
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
                    this.$emit('addBack',this.regionId)
                } 
            },
            cancel(){
                this.$emit('cancel')
            }
        },
        mounted(){
            this.getAddress();
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.addressChil{
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
}
</style>