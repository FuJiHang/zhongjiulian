/*
 * @Author: fujihang 
 * @Date: 2018-12-25 14:13:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-30 14:58:28
    首页
 */
<template>
  <div
    id="fuIndex"
    @touchmove="_touchmove($event)"
    @touchstart="_touchstart"
  >
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item
          v-for="(item,index) in banner"
          :key="index"
        >
          <img
            :src="imgSrc+item.pic"
            :style="{'height':wwWH*3.5/7+'px'}"
            @click="banOpFN(item.url)"
          >
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- <div class="recommend_top">
      <img src="../img/homepage1.png" alt>
    </div>-->

    <!-- 功能模块 -->
    <div class="function">
      <div
        class="fun_child"
        @click="toFN(item.to)"
        v-for="(item,index) in Tweets"
        :key="index"
      >
        <img
          class="img"
          :src="item.img"
        >
        <div class="fun_des">{{item.name}}</div>
      </div>
    </div>

    <!-- 搜索模块 -->
    <!-- <div class="recommend_top">
      <img src="../img/homepage2.png" alt>
    </div>-->

    <!-- <div class="function_fen"></div> -->
    <seachT ref="seach_i"></seachT>
    <!-- <div class="function_fen"></div> -->
    <!-- 广告模块 -->
    <div class="function_fen"></div>
    <div class="recommend_top">
      <div class="recommend_top_hr">
        <hr>
      </div>
      <div class="recommend_top_img">
        <img src="../img/精品罗纳红.svg">
        <span class="recommend_top_h1">精品罗纳红</span>
      </div>

      <div class="recommend_top_hr">
        <hr>
      </div>
    </div>

    <div class="advert">
      <van-swipe
        vertical
        :autoplay="3000"
        :style="{'height':wwWH*2.5/7+'px'}"
      >
        <van-swipe-item
          v-for="(item,index) in advertList"
          :key="index"
        >
          <img
            :src="imgSrc+item.pic"
            @click="banOpFN(item.url)"
          >
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 推荐商品 -->
    <div class="function_fen"></div>
    <div class="recommend_top">
      <div class="recommend_top_hr">
        <hr>
      </div>
      <div class="recommend_top_img">
        <img src="../img/好酒推荐.svg">
        <span class="recommend_top_h1">好酒推荐</span>
      </div>

      <div class="recommend_top_hr">
        <hr>
      </div>
    </div>
    <div class="function_fen"></div>
    <div class="recommend">
      <van-tabs
        v-model="active"
        swipeable
        :ellipsis="false"
        sticky
        :offset-top="45.6"
      >
        <van-tab
          v-for="(items,indexs) in comProList"
          :title="items.stationname"
          :key="indexs"
        >
          <div class="recom_list">
            <productChild
              :product="item"
              v-for="(item,index) in items.pro"
              :key="index"
            ></productChild>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 品牌街 -->
    <div class="function_fen"></div>
    <div class="recommend_top">
      <div class="recommend_top_hr">
        <hr>
      </div>
      <div class="recommend_top_img">
        <img src="../img/热卖.svg">
        <span class="recommend_top_h1">热卖</span>
      </div>

      <div class="recommend_top_hr">
        <hr>
      </div>
    </div>

    <!-- <div class="recommend"> -->
    <!-- <van-tabs
        v-model="activeB"
        swipeable
        :ellipsis="false"
        sticky
        :offset-top="45.6"
        @change="getBrandList"
      >
        <van-tab v-for="(items,indexs) in brand" :title="items.brandName" :key="indexs">
          <van-list
            class="contact"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getBrandList"
    >-->
    <!-- <div class="recom_list">
              <productChild :product="item" v-for="(item,index) in items.brandList" :key="index"></productChild>
    </div>-->
    <!-- </van-list>
        </van-tab>
    </van-tabs>-->
    <!-- </div> -->
    <div class="recom_list">
      <remai
        :product="item"
        v-for="(item,index) in remai"
        :key="index"
      ></remai>
    </div>
  </div>
</template>

<script>
import productChild from "../components/productChild";

import seachT from "../components/seachT";

import remai from "../components/remai";
export default {
  components: {
    productChild,
    remai,
    seachT
  },

  data() {
    return {
      clientYS: 0,

      seach: "", //搜索字

      active: 0, //好酒推荐标签

      activeB: 0, //品牌街标签

      banner: [], //轮播图

      advertList: [], //广告轮播图

      comProList: [], //推荐商品

      remai: [],

      Tweets: [
        {
          name: "领券中心",

          img: require("../img/领券中心.svg"),

          to: "/fuIntegral?active=" + true
        },

        {
          name: "酒联新讯",

          img: require("../img/酒联资讯.svg"),

          to: "/fuArticle"
        },

        {
          name: "我的消息",

          to: "/fuMyNew",

          img: require("../img/我的消息.svg")
        },

        {
          name: "品牌街",

          to: "/fuBrandStreet",

          img: require("../img/品牌街.svg")
        }
      ], //推文

      brand: [], //品牌街列表

      loading: false, //品牌街是否处于加载

      finished: false //品牌街是否加载完成
    };
  },

  methods: {
    // 首页轮播图

    bannerFN() {
      this.postFN({
        url: "/shop.aspx",

        data: {
          params: {
            aid: 96,

            cid: 0,

            indexRec: 0,

            parentId: null,

            top: null
          },

          method: "Shop.Common.HomeIndex",

          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          this.banner = r.data.result.Obj.home_banner;
        } else this.errFN("获取轮播图");
      });
    },

    // 轮播图跳转页面

    banOpFN(url) {
      if (url.indexOf("http") != -1) window.open(url);
      else
        this.$router.push({
          path: "/fuProduct?id=" + url
        });
    },

    // 广告

    advertFN() {
      this.postFN({
        url: "/shop.aspx",

        data: {
          params: {
            aid: 97,

            cid: 0,

            indexRec: 0,

            parentId: null,

            top: null
          },

          method: "Shop.Common.HomeIndex",

          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          this.advertList = r.data.result.Obj.home_banner;
        } else this.errFN("获取轮播图");
      });
    },

    // 推荐商品

    recommendFN() {
      this.postFN({
        url: "/shop.aspx",

        data: {
          params: {
            cid: 0,

            indexRec: 0,

            top: 10
          },

          method: "Shop.Common.HomeProductList",

          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          this.comProList = r.data.result.Obj;

          for (let i = 0; i < this.comProList.length; i++) {
            for (let t = 0; t < this.comProList[i].pro.length; t++) {
              this.comProList[i].pro[t].saleprice = this.comProList[i].pro[
                t
              ].saleprice.toString();

              this.comProList[i].pro[t].Max = this.comProList[i].pro[
                t
              ].saleprice.split(".")[0];

              if (this.comProList[i].pro[t].saleprice.split(".")[1])
                this.comProList[i].pro[t].Min = this.comProList[i].pro[
                  t
                ].saleprice.split(".")[1];
              else this.comProList[i].pro[t].Min = "00";
            }
          }
        } else this.errFN("获取推荐商品");
      });
    },
    //热卖
    remaiFN() {
      this.postFN({
        url: "/shop.aspx",

        data: {
          params: {
            cid: 0,

            indexRec: 0,

            top: 10
          },

          method: "Shop.Common.HotSale",

          id: this.userId
        }
      }).then(r => {
        console.log(r);
        if (r.data.result.Error.SubCode == 1) {
          this.remai = r.data.result.List;
          console.log(this.remai);
          for (let i = 0; i < this.remai.length; i++) {
            for (let t = 0; t < this.remai[i].pro.length; t++) {
              this.remai[i].pro[t].saleprice = this.remai[i].pro[
                t
              ].saleprice.toString();

              this.remai[i].pro[t].Max = this.remai[i].pro[t].saleprice.split(
                "."
              )[0];

              if (this.remai[i].pro[t].saleprice.split(".")[1])
                this.remai[i].pro[t].Min = this.remai[i].pro[t].saleprice.split(
                  "."
                )[1];
              else this.remai[i].pro[t].Min = "00";
            }
          }
        } else this.errFN("获取推荐商品");
      });
    },
    // 跳转

    toFN(to) {
      this.$router.push({
        path: to
      });
    },

    // 品牌街列表

    getBrand() {
      this.postFN({
        url: "/shop.aspx",

        data: {
          method: "Shop.Brand.BrandsList",

          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubMsg == "获取成功！") {
          this.brand = [];

          let data = r.data.result.List;

          for (let i = 0; i < data.length; i++) {
            let bar = {
              finished: false,

              page: 1,

              brandId: data[i].BrandId,

              brandName: data[i].BrandName,

              brandList: []
            };

            this.brand.push(bar);
          }
        } else this.notFN(r.data.result.Error.SubMsg);
      });
    },

    // 品牌街内容

    getBrandList() {
      if (this.brand[this.activeB].finished) {
        this.loading = false;

        this.finished = true;

        return;
      } else {
        this.finished = false;

        this.loading = true;
      }

      this.postFN({
        url: "/shop.aspx",

        data: {
          params: {
            userid: this.userId,

            brandid: this.brand[this.activeB].brandId,

            pageIndex: this.brand[this.activeB].page,

            pageSize: 10
          },

          method: "Shop.Product.ProductsList",

          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          if (!r.data.result.List) {
            this.brand[this.activeB].finished = true;

            this.loading = false;

            return;
          }

          let dataList = r.data.result.List;

          for (let i = 0; i < dataList.length; i++) {
            dataList[i].saleprice = dataList[i].saleprice.toString();

            dataList[i].Max = dataList[i].saleprice.split(".")[0];

            if (dataList[i].saleprice.split(".")[1])
              dataList[i].Min = dataList[i].saleprice.split(".")[1];
            else dataList[i].Min = "00";

            this.brand[this.activeB].brandList.push(dataList[i]);
          }

          if (dataList.length < 10) {
            this.brand[this.activeB].finished = true;

            this.loading = false;

            return;
          }

          this.brand[this.activeB].page++;

          this.loading = false;
        } else {
          this.loading = false;

          this.errFN("获取品牌街商品");
        }
      });
    },

    // 解决苹果上下滑动不关闭输入法

    _touchmove(e) {
      let clientY = e.changedTouches[0].clientY;

      if (this.clientYS > clientY + 5 || this.clientYS < clientY - 5) {
        this.$refs.seach_i.blur();
      }
    },

    _touchstart(e) {
      this.clientYS = e.changedTouches[0].clientY;
    },

    // 获取个人信息

    getUserData() {
      let href = window.location.href;

      if (!this.getCookie("firstLoginZjl")) {
        if (!href.split("?Token=")[1]) {
          window.location.href = "/Account/Login?invitationCode=9D8Z0";
        } else {
          let query = href.split("?")[1].split("&");

          let tokenId = query[0].split("Token=")[1];

          let supCode = query[1].split("SupCode=")[1];

          localStorage.setItem("tokenId", tokenId);

          localStorage.setItem("supCode", supCode);

          this.tipFN();

          this.postFN({
            url: "/UserCenter.aspx",

            data: {
              params: {
                userId: tokenId
              },

              method: "User.Info.UserInfo",

              id: this.userId
            }
          }).then(r => {
            if (r.data.result.Error.SubCode == 1) {
              let data = r.data.result.Obj;

              localStorage.setItem("userData", JSON.stringify(data));

              this.setCookie("firstLoginZjl", true, 3600 * 24);

              setTimeout(() => {
                location.reload();

                this.tipHFN();
              }, 50);
            } else {
              this.tipHFN();

              this.errFN("获取个人信息");
            }
          });
        }
      }
    }
  },

  // activated(){

  //     this.bannerFN();

  //     this.advertFN();

  //     this.recommendFN();

  //     this.getBrand();

  // },

  mounted() {
    if (process.env.NODE_ENV == "development") {
      //开发用的
    } else if (process.env.NODE_ENV == "debug") {
      // 调试用的
      console.log("调试用的");
    } else if (process.env.NODE_ENV == "production") {
      // 线上环境
      this.getUserData();
    }

    this.bannerFN();

    this.advertFN();

    this.recommendFN();

    this.remaiFN();

    this.getBrand();

    // this.postFN({

    //     url:'/UserCenter.aspx',

    //     data:{

    //         params:{ "userId" : 2510 },

    //         method:'User.Info.UserInfo',

    //         id:this.userId,

    //     }

    // }).then(r=>{

    //     if(r.data.result.Error.SubCode==1){

    //         let data=r.data.result.Obj

    //         localStorage.setItem('userData',JSON.stringify(data))

    //         this.setCookie('firstLoginZjl',true,3600*24)

    //     }else{

    //         this.tipHFN();

    //         this.errFN('获取个人信息')

    //     }

    // })
  }
};
</script>

<style lang="less">
@import "../style/base.less";

#fuIndex {
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  overflow-x: hidden;
  // 轮播图

  .banner {
    .van-swipe-item {
      > img {
        width: 100%;

        object-fit: cover;
      }
    }
  }

  // 功能模块

  .function {
    display: flex;
    justify-content: space-around;
    background: white;
    padding: 0.8rem 1rem;
    align-items: center;

    .fun_child {
      display: flex;

      align-items: center;

      padding: 0.5rem 0.5rem;

      box-sizing: border-box;

      flex-direction: column;

      justify-content: center;

      .fun_des {
        .nC;
        padding-top: 0.8rem;

        text-align: center;

        font-size: 1.2rem;

        flex: 1;
      }

      .img {
        object-fit: cover;

        // border-radius: 50%;

        width: 3.8rem;

        height: 3.8rem;
      }
    }
  }
  .function_fen {
    width: 100%;
    height: 0.8rem;
    margin: 0 auto;
    background-color: white;
  }
  // 广告模块

  .advert {
    // margin-top: 0.8rem;

    .van-swipe-item {
      > img {
        height: 100%;

        width: 100%;

        object-fit: cover;
      }
    }

    .van-swipe__indicators--vertical {
      display: none;
    }
  }

  // 推荐商品

  .recommend_top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 3rem;

    .recommend_top_h1 {
      font-size: 1.4rem;
    }
    .recommend_top_img {
      > img {
        height: 1.2rem;

        width: 1.2rem;
      }
    }
    .recommend_top_hr {
      width: 33%;
      border-width: 1px;
    }
    .recommend_top_hr hr {
      background-color: rgb(199, 199, 199);
      border-width: 0px;
      width: 100%;
      height: 1px;
    }
  }
  .recom_list {
    flex-wrap: wrap;

    margin-left: -1%;

    display: flex;

    width: 100%;

    box-sizing: border-box;

    padding: 0 1%;

    padding-bottom: 0.8rem;

    background-color: white;
  }
  .recommend {
    .van-tabs__wrap {
      border-bottom: 1px solid rgb(245, 245, 245);
    }

    .van-tab__pane {
      background: white;

      .recom_list {
        flex-wrap: wrap;

        margin-left: -1%;

        display: flex;

        width: 100%;

        box-sizing: border-box;

        padding: 0 1%;

        padding-bottom: 0.8rem;
      }
    }
  }
}
</style>