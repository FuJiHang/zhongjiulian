<template>
  <div id="app">
    <!-- 导航条 -->
    <tab :name="$route.meta.name" :but="$route.meta.but" v-show="$route.meta.show"></tab>
    <!-- <div id="appNactive" :class="['appNactive',$route.meta.bar?'':'app_padding',$route.meta.show?'app_margin':'appHei']"> -->
    <div id="appNactive">

      <transition :name="transitionName">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive&&isRouterAlive"/>
          <!-- 被缓存的 -->
        </keep-alive>
          
      </transition>
      <transition :name="transitionName">
        <router-view v-if="!$route.meta.keepAlive&&isRouterAlive"/>
        <!-- 不被缓存的 -->
      </transition>
    </div>
    <!-- 底部导航条按钮 -->
    <tabBar v-show='$route.meta.bar' ref="tabBar" v-if="tabFixed"></tabBar>
  </div>
</template>

<script>
import { Toast } from 'vant';
import tab from './public/tab'
import tabBar from './public/tabBar'
export default {
  components:{
    tab,tabBar
  },
  data(){
    return{
      transitionName:'to',
      bodyheight:window.innerHeight,
      tabFixed:true,
      callBack:'',
      isRouterAlive:true,//同一个路由不刷新
    }
  },
  provide(){//同一个路由不刷新
    return{
      reload:this.reload
    }
  },
  methods: {
    reload(){//同一个路由不刷新
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    }
  },
  mounted() {
        // window.onresize监听页面高度的变化
        window.onresize = () => {
            return (() => {
                
                let pageHeight = document.getElementById('app').clientHeight      
                if (pageHeight < this.bodyheight-200) {
                  
                  this.tabFixed=false
                }
                else this.tabFixed=true
                

            })()
        }
  },
  watch:{
    $route(to,from){
    this.tipHFN()
    Toast.clear()//跳转路由删除提示
    if(this.callBack==to.name)this.transitionName='call'
    else this.transitionName='to'
    this.callBack=from.name
    this.$refs.tabBar.activeFN(to.name)
    }
  },
}
</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  top: 0;left: 0;
  display: flex;
  flex-direction: column;
  #appNactive{
    flex: 1;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    background: rgb(245, 245, 245);
  }
  
  // .app_margin{
  //   margin-top:45.6px;
  //   height: calc(100% - 95.6px);
  // }
  // .app_padding{
  //   height: calc(100% - 45.6px);
  // }
  // .appHei{
  //   height: 100%;
  // }
  .to-enter-active{
    transition: .3s;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    
  }
  .to-enter{
    transform: translate3d(0, -1%, 0);
    opacity: .1;
  }
  .call-enter-active{
    transition: .3s;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    
  }
  .call-enter{
    transform: translate3d(0, 1%, 0);
    opacity: .1;
  }
}
</style>
