<template>
  <transition name="fade">
    <div class="show1" v-show='isshow'>
      <div class="content">
        <div class="stitle">
          <img src='./laoguout_dialog_icon.png' class="babyimg"> {{title}}
          <img src='./laughout_close.png' class="x" @click='closeWindow'>
        </div>
        <div class="scontent">
          {{text}}
        </div>
      </div>
      <div class="v-mo" @click='closeWindow' v-show='isshow'></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "windows",
  data() {
    return {};
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    }
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    isshow: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.show1 {
  transition: all 0.6s; /*图片放大过程的时间*/
  .content {
    z-index: 999;
    width: rem(592);
    position: fixed;
    top: rem(400);
    left: 50%;
    transform: translate(-50%);
    background-size: 100%;
    .stitle {
      width: 100%;
      height: rem(100);
      background: linear-gradient(to right, #ff678c, #ff7a7b);
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      line-height: rem(100);
      font-size: rem(45);
      color: #fff;
      position: relative;
      p {
        font-size: rem(40);
        line-height: rem(50);
      }
      .x {
        position: absolute;
        top: rem(15);
        right: rem(30);
        width: rem(50);
        height: rem(50);
      }
      .babyimg {
        width: rem(49);
        height: rem(55);
        vertical-align: sub;
      }
    }
    .scontent {
      background: #fff;
      height: rem(300);
      padding: rem(20);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      overflow-y: scroll;
      line-height: rem(40);
      text-align: left;
      font-size:rem(32);
    }
  }
  .v-mo {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    z-index: 200;
    opacity: 0.5;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>