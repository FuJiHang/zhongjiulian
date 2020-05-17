/*
 * @Author: fujihang 
 * @Date: 2019-01-22 18:22:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-27 14:08:24
    商品搜索框
 */
<template>
  <div class="seachT">
    <!-- <img src="../img/搜索.svg"> -->
    <input autofocus ref="gain" placeholder="请输入要搜索的商品" v-model="seach" @keyup.enter="seachFN">
  </div>
</template>

<script>
export default {
  data() {
    return {
      seach: ""
    };
  },
  methods: {
    // 搜索
    seachFN() {
      if (this.seach.trim()) {
        this.$router.push({ path: "/fuSeach?seach=" + this.seach.trim() });
      } else {
        this.notFN("请输入搜索内容");
      }
    },
    onFous() {
      setTimeout(() => {
        this.$refs.gain.focus();
      }, 100);
    },
    blur() {
      this.$refs.gain.blur();
    }
  }
};
</script>

<style lang="less">
@import "../style/base.less";
.seachT {
  /* // 搜索 */
  padding: 0.8rem 1rem;
  background: white;
  box-shadow: 0.1rem 0.1rem 0.1rem rgb(202, 202, 202);
  input {
    box-sizing: border-box;
    font-size: 1.2rem;
    padding-left: 2.5rem;
    .nC;
    border-radius: 10rem;
    width: 100%;
    border: 1px solid rgb(245, 245, 245);
    height: 3rem;
    background-image: url("../img/搜索.svg");
   

    background-size: 1.5rem 1.5rem; /*小图标的大小*/

    background-position: .6rem .7rem; /*小图标在input的位置*/

    background-repeat: no-repeat; /*背景小图标不重复*/
  }
}
</style>