/*
 * @Author: fujihang 
 * @Date: 2018-12-29 17:57:35 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-08 18:41:44
    关于我们
 */
<template>
    <div id="fuAbout">
        <!-- 头部 -->
        <div class="about_bar">
            <img src="../img/酒杯3.svg">
        </div>

        <!-- 底部 -->
        <div class="about_bot" v-for="(item,index) in data" :key="index" @click="toFN(item)">
            <span class="name">
                {{item.ptitle}}
            </span>
            <van-icon name="arrow" />
        </div>
         <div class="about_bot" v-for="(item,index) in dataT" :key="index" @click="toFN(item,true)">
            <span class="name">
                {{item.ptitle}}
            </span>
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:[
                    // {
                    //     name:'招商加盟',
                    //     to:"/fuAboutDes?name=招商加盟"
                    // },
                    // {
                    //     name:'品牌信息',
                    //     to:"/fuAboutDes?name=品牌信息"
                    // },
                    // {
                    //     name:'联系我们',
                    //     to:"/fuAboutDes?name=联系我们"
                    // },
                    // {
                    //     name:'在线客服',
                    //     to:"/fuAboutDes?name=在线客服"
                    // },
                  
                ],
                dataT:[
                      {
                        ptitle:'意见反馈',
                    },
                ]
            }
        },
        methods:{
            toFN(data,isFeek){
                if(isFeek) return this.$router.push({path:'/fuFeedback'})
                this.$router.push({path:'/fuAboutDes?name='+data.ptitle+'&id='+data.id})
            },
            getData(){
                this.postFN({
                    url:'/shop.aspx',
                    data:{
                        params:{ "classid" : 141 },
                        method:'CMS.HelpList',
                        id:this.userId,
                    }
                }).then(r=>{
                    if(r.data.result.Error.SubMsg=='获取成功!'){
                        this.data=r.data.result.List[0].childlist
                    }else this.errFN('获取信息')
                })
            }
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
#fuAbout{
    .hO;
        // <!-- 头部 -->
        .nC;
    .about_bar{
        .bW;
        text-align: center;
        padding: 2.4rem ;
        margin-bottom: .8rem;
        .bBS;
        >img{
            height: 6rem;
            width: 6rem;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    // <!-- 底部 -->
    .about_bot{
        .bR;
        font-size: 1.3rem;
        .bW;
        display: flex;
        box-sizing: border-box;
        .bBS;
        padding: 1.4rem .8rem;
        .name{
            flex: 1;
        }
    }
}
</style>