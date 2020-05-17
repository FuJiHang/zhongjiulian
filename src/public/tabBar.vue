/*
 * @Author: fujihang 
 * @Date: 2018-12-25 15:11:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-28 14:48:55
    底部按钮导航条
 */
<template>
  <div id="tabBar">
    <van-tabbar
      v-model="active"
      active-color="#07c160"
    >
      <van-tabbar-item
        v-for="(item,index) in tabList"
        :key="index"
        @click="activeFN(item)"
      >
        <!-- {{item.name}} -->
        <span>{{item.name}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active? item.icon.active1:item.icon.normal"
        >
      </van-tabbar-item>
    </van-tabbar>
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in tabList" :key="index" @click="activeFN(item)">
        <span>{{ item.name}}</span>
        <img slot="item.icon" slot-scope="props" :src="props.active ? item.icon.active : item.icon.normal">
        <img src="" >
      </van-tabbar-item>
      
    </van-tabbar> -->
    <!-- :src="props.active? item.icon.normal:item.icon.active1" -->
    <!-- require("../img/领券中心.svg") -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [
        {
          name: "首页",
          info: "",
          icon: {
            normal: require("../img/首页_未选中.svg"),
            active1: require("../img/首页_选中.svg")
          },
          to: "/fuIndex",
          act: 0
        },
        {
          name: "分类",
          info: "",
          icon: {
            normal: require("../img/分类_未选中.svg"),
            active1: require("../img/分类_选中.svg")
          },
          to: "/fuClassify",
          act: 1
        },
        {
          name: "发现",
          info: "",
          icon: {
            normal: require("../img/发现_未选中.svg"),
            active1: require("../img/发现_选中.svg")
          },
          to: "/HJFind",
          act: 2
        },
        {
          name: "购物车",
          info: "",
          icon: {
            normal: require("../img/购物车_未选中.svg"),
            active1: require("../img/购物车_选中.svg")
          },
          to: "/fuCart",
          act: 3
        },
        {
          name: "个人中心",
          info: "",
          icon: {
            normal: require("../img/我的_未选中.svg"),
            active1: require("../img/我的_选中.svg")
          },
          to: "/fuMy",
          act: 4
        }
      ]
    };
  },
  methods: {
    activeFN(data) {
      for (let i = 0; i < this.tabList.length; i++) {
        if (data.to == this.tabList[i].to) {
          this.active = this.tabList[i].act;
          if (data.to == "/fuMy") {
            if (this.userData.IsSupplier == 2)
              return this.$router.replace({ path: "/fuDistributor" });
          }
          this.$router.replace({ path: data.to });
        }
      }
    }
  },
  mounted() {
    //    解决刷新时按钮响应不对
    setTimeout(() => {
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.$route.path == "/fuDistributor") return (this.active = 3);
        if (this.$route.path == this.tabList[i].to)
          this.active = this.tabList[i].act;
      }
    }, 500);
  }
};
</script>

<style lang="less">
@import "../style/base.less";
#tabBar {
  .van-tabbar {
    position: relative;
    .van-tabbar-item--active {
      .jG;
    }
  }
}

.van-tabbar-item--active {
  fill: red;
}
.van-tabbar-item{
text-align: center;
}
.van-tabbar-item .van-tabbar-item__icon{
    width: 3rem;
    height: 3rem;
    margin: -0.5rem auto;
}
.van-tabbar-item .van-tabbar-item__icon img{
      width: 100%;
    height: 100%;
    display: inline-block;

}
</style>