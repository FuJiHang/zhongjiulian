/*
 * @Author: fujihang 
 * @Date: 2019-03-11 10:41:25 
 * @Last Modified by: fujihang
 * @Last Modified time: 2019-03-11 11:30:51
    兼容苹果焦点问题
 */
 <template>
     <div :class="seachTF?'seachIos':'kaiSeach'" @click="seachOpen">
        <div :class="['sea',seachTF?'seaOpen':'']">
            <input @keyup.enter="seachFN" @focus="eventFN" @click="eventFN" v-model="seach">
            <img v-show="!seachTF" src="../img/seach@3x.svg">
        </div>
     </div>
 </template>
 
 <script>
     export default {
         data(){
             return{
                 seachTF:false,
                 seach:"",
             }
         },
         methods:{
            seachOpen(){
                this.seach=''
                this.seachTF=!this.seachTF
            },
            eventFN(event){
                if(this.seachTF){
                    event.stopPropagation();
                    event.preventDefault();
                }
                
            },
            // 搜索
            seachFN(){
                if(this.seach.trim()){
                    this.$router.push({path:'/fuSeach?seach='+this.seach.trim()})
                    this.seachTF=false
                    this.seach=''
                }else{
                    this.notFN('请输入搜索内容')
                }
            },

         }
     }
 </script>
 
 <style lang='less'>
 @import '../style/base.less';
 .seachIos{
    z-index: 999;
    background:rgba(0,0,0,.6);
    width: 100%;
    // height: 100%;
    height: calc(100% + 5rem);  
    transform: translateY(-5rem);  
    transition:background ease .4s ;
    position: absolute;
    top: 0;left: 0;
    .sea{              
            padding: .6rem;
            box-sizing: border-box;
            background: white;
            >input{
                .nC;
                box-sizing: border-box;
                padding-left: 1.2rem;
                font-size: 1.6rem;
                border-radius: 4rem;
                height: 3.2rem;
                width: 100%;
                border: 1px solid rgb(247, 247, 247);
            }
        }
        .seaOpen{
            transition: .3s;  
            transform: translateY(5rem);
        }
    }
.kaiSeach{
    border-radius: 50%;
    background: rgba(255, 255, 255, .9);
    height: 3.5rem;
    width: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 1rem;
    right: 1rem;
    position: absolute;
    .sea{
        input{
            border-radius: 50%;
            height: 3.5rem;
            width: 3.5rem;
            position:absolute;
            top: 0;
            left: 0;
        }
        >img{
            width: 2.2rem;
            object-fit: cover;
            height: 2.2rem;
        }
    }
}
 </style>
