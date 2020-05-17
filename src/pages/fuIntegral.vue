/*
 * @Author: fujihang
 * @Date: 2018-12-28 18:25:11
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-30 15:03:57
    个人积分
 */
<template>
  <div id="fuIntegral">
    <!-- 头部 -->
    <BalIntTop
      :topList="topList"
      :topListVal='topListVal'
    ></BalIntTop>

    <!-- 底部 -->
    <div class="Integ_bot">
      <van-tabs
        v-model="active"
        swipeable
        type="card"
        sticky
        :offset-top="45.6"
      >
        <van-tab
          v-for="(item,index) in listInt"
          :title="item.name"
          :key="index"
        >

          <div v-show="active==1">
            <BalIntChi
              @redel='redel'
              :key="indexB"
              v-for="(itemB,indexB) in useList"
              :balInt='itemB'
              :BorI="true"
              botName='兑换'
            ></BalIntChi>

          </div>
          <div v-show="active==0">
            <BalIntChi
              @redel='redel'
              :balInt='balInt'
              :BorI="true"
              botName='签到'
                :isSignIn='true'
            ></BalIntChi>

          </div>

        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
import BalIntTop from "../components/BalIntTop";
import BalIntChi from "../components/BalIntChi";

export default {
  components: {
    BalIntTop,
    BalIntChi
  },
  data() {
    return {
      active: 0,
      page: 1, //页数
      balInt: {
        name: "每日签到",
        val: "明天签到领积分",
        canSignIn:false,
      },
      topList: {
        t: "总积分",
        l: "共获得",
        r: "共使用",
        g: "积分"
      },
      topListVal: {},
      listInt: [
        {
          name: "领取积分"
        },
        {
          name: "使用积分"
        }
      ],
      useList: [], //使用积分列表
      canSignIn: true
    };
  },
  methods: {
    // 获取积分
    getData() {
      this.postFN({
        url: "/UserCenter.aspx",
        data: {
          params: { userId: this.userId },
          method: "Usercenter.UserPoints",
          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          let data = r.data.result.Obj;
          this.topListVal = {
            t: data.TotoalPoints,
            l: data.AddPoints,
            r: data.ReducePoints
          };
        } else this.errFN("获取积分信息");
      });
    },
    //获取能兑换积分列表（优惠卷规则）
    getCou() {

      this.postFN({
        url: "/shop.aspx",
        data: {
          method: "Shop.Coupons.CouponRule",
          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          this.useList = r.data.result.List;
          for (let i = 0; i < this.useList.length; i++) {
            this.useList[i] = {
              name: this.useList[i].name,
              val: "需要" + this.useList[i].needpoint + "积分",
              num: this.useList[i].needpoint,
              id: this.useList[i].cuponId
            };
          }
        } else this.errFN("获取使用积分列表");
      });
    },
    //使用积分回调
    redel(data) {
      this.topListVal = {
        t: this.topListVal.t - data,
        l: this.topListVal.l,
        r: this.topListVal.r + data
      };
    },
    getCanSignIn() {
      this.postFN({
        url: "/UserCenter.aspx",
        data: {
          params: { userId: this.userId,isAction:false },
          method: "Common.SignIn",
          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          let data = r.data.result;
          console.log(data);
          if (data.Error.SubMsg=='可签到') {
              this.balInt.canSignIn=true;
              console.log('可以签到');
          }else{
              this.balInt.canSignIn=false;

              console.log('不可以签到');
              console.log(r);
          }
        } else this.errFN("获取签到状态");
      });
    },
  },
  mounted() {
    this.getData();
    this.getCou();
    if (this.$route.query.active) this.active = 1;
    // this.getCanSignIn();
  }
};
</script>

<style lang="less">
@import "../style/base.less";
#fuIntegral {
  height: 100%;
  .nC;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.8rem;
  box-sizing: border-box;
  .Integ_bot {
    margin-top: 0.8rem;
    flex: 1;
    // background: red;
    overflow: hidden;
    .van-tabs {
      height: 100%;
      .van-tabs__content {
        height: 100%;
      }
    }
    .van-tabs__wrap {
      padding: 0.8rem 0;
      background: white;
      border-bottom: 1px solid rgb(240, 240, 240);
      .van-tabs__nav {
        margin: 0 0.8rem;
      }
    }
    .van-tab__pane {
      height: 100%;
      overflow: auto;
      padding: 1.6rem 0.8rem 3.2rem;
      box-sizing: border-box;
    }
  }
}
</style>