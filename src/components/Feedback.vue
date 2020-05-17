/*
 * @Author: fujihang 
 * @Date: 2018-12-29 18:45:01 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-01-04 15:59:16
    意见反馈模块
 */
<template>
    <div class="Feedback">
        <div class="type">请选择您要反馈的问题类型: <van-button @click="show=true" type="danger" size="mini">用户反馈</van-button></div>
        <van-field
            v-model="message"
            type="textarea"
            placeholder="请输入留言"
    
            autosize
        />
        <div class="submit">
            <van-button type="danger" class="submit_c" >提交</van-button>
        </div>

        <van-actionsheet
            v-model="show"
            :actions="actions"
            @select="onSelect"

        />
    </div>
</template>

<script>

    export default {
        data(){
            return{
                message:'',
                show: false,
                actions: [
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                    {
                        name: '选项'
                    },
                ]
            }
        },
        methods:{
            onSelect(item) {
                // 点击选项时默认不会关闭菜单，可以手动关闭
                this.show = false;
                console.log(item)
            }
        }
    }
</script>

<style lang="less">
@import '../style/base.less';
.Feedback{
    .nC;
    padding: 0 .8rem;
    box-sizing: border-box;
    .type{
        font-size: 1.2rem;
        padding: .8rem 0;
        box-sizing: border-box;
    }
    .area{
        overflow: hidden;
        width: 100%;
        min-height: 1rem;
        .bW;
    }
    // 提交
    .submit{
        margin: 3.2rem 0 ;
        .submit_c{
            width: 100%;
        }
    }
    .van-actionsheet{
        max-height: 44%;
    }
}
</style>