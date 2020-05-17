/*
 * @Author: fujihang 
 * @Date: 2018-12-29 15:40:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-30 18:36:08
    积分和金钱卡片
 */
<template>
  <div class="BalIntChi">
    <div class="left_b">
      <div class="top">{{balInt.name}}</div>
      <div
        class="bot"
        :style="[BorI?{color:'#ff976a'}:'']"
      >{{balInt.val}}</div>
    </div>
    <div
      class="right_b"
      v-show="!BorI"
    >
      {{balInt.nub}}
    </div>
    <van-button
      type="danger"
      @click="getCou"
      v-show="BorI&&!isSignIn"
      size="small"
    >{{botName}}</van-button>
    <van-button
      type="danger"
      @click="signIn"
      v-show="isSignIn"
      size="small"
      :disabled="!tcanSignIn"
    >{{tbotName}}</van-button>
  </div>
</template>

<script>
export default {
  props: ["balInt", "BorI", "botName", "isSignIn"],
  data() {
    return {
      tbotName: this.tcanSignIn? this.botName : "已签到",
      tcanSignIn: false,
    };
  },
  methods: {
    //兑换优惠卷
    getCou() {
      this.postFN({
        url: "/shop.aspx",
        data: {
          params: { userId: this.userId, ruleId: this.balInt.id },
          method: "Shop.Coupon.ExchangeCupon",
          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          this.$emit("redel", this.balInt.num);
          this.okFN("兑换积分");
        } else this.errFN("兑换积分");
      });
    },
    signIn() {
      this.postFN({
        url: "/UserCenter.aspx",
        data: {
          params: { userId: this.userId, isAction: true },
          method: "Common.SignIn",
          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          let data = r.data.result;
          console.log(data);
          this.notFN(data.Error.SubMsg);
        } else this.errFN("签到");
        this.tcanSignIn = false;
        this.tbotName = "已签到";
      });
    },
    getCanSignIn() {
      this.postFN({
        url: "/UserCenter.aspx",
        data: {
          params: { userId: this.userId, isAction: false },
          method: "Common.SignIn",
          id: this.userId
        }
      }).then(r => {
        if (r.data.result.Error.SubCode == 1) {
          let data = r.data.result;
          console.log(data);
          if (data.Error.SubMsg == "可签到") {
            console.log("可以签到");
            this.tcanSignIn=true;
            this.tbotName="立即签到";
          } else {
            this.tcanSignIn=false;
            this.tbotName="已签到";
            console.log("不可以签到");
            console.log(r);
          }
        } else this.errFN("获取签到状态");
      });
    }
  },
  mounted() {
    console.log("asd");
    console.log(this.tcanSignIn);
    this.getCanSignIn();
  }
};
</script>

<style lang="less">
@import "../style/base.less";
.BalIntChi {
  height: 7rem;
  background: white;
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0.8rem;
  border-radius: 0.6rem;
  .left_b {
    flex: 1;
    display: flex;
    flex-direction: column;
    > div {
      line-height: 200%;
      height: 50%;
    }
    .top {
      min-height: 2rem;
      .Tline;
      font-size: 1.25rem;
    }
    .bot {
      color: #999;
      font-size: 1.2rem;
    }
  }
  .right_b {
    font-size: 2rem;
    .jG;
  }
}
.van-button--dangerDis {
  background-color: #999;
  border: #999;
}
</style>