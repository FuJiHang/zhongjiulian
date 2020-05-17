<template>
  <div id="HJFind">
    <div class="HJFind_list" v-for="(item,index) in findList" :key="index" @click="toFN(item)">
      <div class="HJFind_list_img">
        <img :src="GetPoTypeImg(item.Type)">
      </div>
      <div class="HJFind_list_funtion">
        <div class="HJFind_list_funtion_name">
          <span>活动名称:{{item.Name}}</span>
        </div>
        <div class="HJFind_list_funtion_time">
          <span class="stime">开始时间:{{item.StTime}}</span>
          <span class="etime">结束时间:{{item.EndTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import https from "../api/http.js";
export default {
  data() {
    return {
      findList: [] //
    };
  },
  methods: {
    toFN(data) {
      this.$router.push({
        path: "/HJFindeDet?id="+data.ID
      });
      // localStorage.setItem("brandDet", data.Description);
      // console.log(data)
    },
    addCart() {
      // if(this.product.stockcount==0) return this.notFN("该商品没有库存了！")
      this.postFN({
        url: "/shop.aspx",

        data: {
          params: {},

          method: "Shop.Product.GetPromotionList",

          id: this.userId
        }
      }).then(r => {
        console.log("asdasd");
        console.log(r);
        console.log(r.data.result.List[0].Type);

        if (r.data.result.Error.SubCode == 1) {
          this.findList = r.data.result.List;
          if (this.findList[0].Type == 2) {
            this.img.da = this.img.xian;
          }
        }
      });
    },

    GetPoTypeImg(id) {
      var imgurl;
      switch (id) {
        case 1:
          imgurl = require("../img/打折.svg");
          break;
        case 2:
          imgurl = require("../img/限时.svg");
          break;
        case 3:
          imgurl = require("../img/特价1.svg");
          break;
        case 4:
          imgurl = require("../img/满减.svg");
          break;
        case 5:
          imgurl = require("../img/买赠.svg");
          break;
        default:
          break;
      }
      return imgurl;
    }
  },
  mounted() {
    this.addCart();
  }
};
</script>

<style lang="less">
@import "../style/base.less";
#HJFind {
  overflow: auto;
  height: 100%;

  // 头部
  .HJFind_list {
    width: 100%;
    height: 6rem;
    background-color: white;
    margin: 1rem auto;
    display: flex;
    border: 1px solid rgb(245, 245, 245);
    border-radius: 0.2rem;
    box-shadow: 0.1rem 0.1rem 0.1rem rgb(202, 202, 202);
    .HJFind_list_funtion {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      flex: 4;
      .HJFind_list_funtion_name {
        font-size: 13px;
        color: red;
      }
      .HJFind_list_funtion_time {
        display: flex;
        justify-content: space-between;
        .stime {
          flex: 1;
          font-size: 11px;
          color: red;
        }
        .etime {
          flex: 1;
          font-size: 11px;
          color: red;
        }
      }
    }
    .HJFind_list_img {
      // flex: 1;
      width: 4rem;
      height: 4rem;
      padding: 1rem 0.5rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>