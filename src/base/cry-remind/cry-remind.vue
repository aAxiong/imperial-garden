<template>
  <transition name="fade">
    <div class="cryremind" id="messShareBox" v-show='isshow'>

      <div class="content">
        <div class="contentBox">
          <p class="tit">哭声提醒</p>
          <p class="remind">15:20 宝宝哭了 快去看一下吧</p>
          <div class="crybtn" @click='sure'>
            <img src='./btn.png'>
          </div>
        </div>
        <div class="close" @click='closeWindow'>
          <img src='./close.png'>
        </div>
      </div>
      <div class="v-mo" @click='closeWindow'></div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeWindow() {
      //  this.isshow = false;
      document.querySelector("#messShareBox").style.display = "none"; //消息提示显示
    },
    sure() {
      document.querySelector("#messShareBox").style.display = "none"; //消息提示显示
      if (global.SHOW_Cry) {
        this.$router.push({
          name: "index7DataAnalysis"
        });
      } else {
        this.$router.push({
          name: "index7DataAnalysis_cryanalyze"
        });
      }
    }
  },
  props: {
    isshow: Boolean
  },
  components: {}
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.cryremind {
  position: relative;
  z-index: 12;
  transition: all 0.6s; /*图片放大过程的时间*/
  .content {
    position: fixed;
    z-index: 999;
    left: 50%;
    transform: translate(-50%);
    top: rem(280);
    background-size: 100%;
    .contentBox {
      width: rem(498);
      height: rem(637);
      background-size: 100%;
      background: url("./alert.png");
      border-radius: 10px;
      background-size: 100%;
      position: relative;
      .tit {
        position: relative;
        top: rem(50);
        font-size: rem(32);
        color: #000;
      }
      .remind {
        width: 70%;
        position: relative;
        top: rem(370);
        margin: 0 auto;
        color: #fff;
        line-height: rem(45);
        font-size: rem(32);
      }
      .crybtn {
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: rem(30);
        left: 0;

        img {
          width: rem(229);
          height: rem(53);
        }
      }
    }
    .close {
      img {
        width: rem(63);
        height: rem(137);
      }
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
