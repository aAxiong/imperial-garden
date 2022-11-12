<template>
  <transition name="fade">
    <div class="messShareBox" v-show='isshow'>

      <div class="content">
        <div class="share" @click='showBigBg'>
          <img src='./shareicon@2x.png'>
        </div>
        <div class="contentBox" :style='"background-image:url("+bg+");"'>
          <img :src='imgURL'></div>
        <div class="close" @click='closeWindow'>
          <img src='./close.png'>
        </div>
      </div>
      <div class="v-mo" @click='closeWindow' v-show='isshow'></div>
      <transition name="fade">
        <div class="bg_big" @click='closeBigBg' v-show='bgshow' :style='"background-image:url("+bg+");"'>
          <img :src='imgURL'>
        </div>
      </transition>
      <mt-actionsheet :actions="actions2" v-model="sheetVisible1" id='sext1'></mt-actionsheet>
    </div>
  </transition>
</template>
<script>
import { Message } from "element-ui";
import {
  deviceInit,
  shotscreen,
  getshotscreenurl,
  wxshare,
  getwxshare
} from "api/device";
export default {
  data() {
    return {
      sheetVisible1: false,
      actions2: [],
      timer: ""
    };
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    },
    closeBigBg() {
      this.$emit("closeBigBg");
    },
    showBigBg() {
      this.$parent.showBigBg();
      this.sheetVisible1 = true;
    },
    getwxshare_success(data) {
      // Indicator.close();
      if (data.data.application == 1 || data.data.application == 4) {
        if (data.data.wxshare < 1) {
          clearInterval(this.timer);

          if (data.data.wxshare == 0) {
            // Message.success({
            //   message: "分享成功4",
            //   center: true,
            //   duration: 1000
            // });
          } else if (data.data.wxshare == -2) {
            console.log("分享取消");
          } else {
            // Message.error({
            //   message: "分享失败",
            //   center: true,
            //   duration: 1000
            // });
          }
        } else {
          //alert("分享返回");
          clearInterval(this.timer);
        }
      }
    },
    getwxshare_failed(data) {
      // Indicator.close();
    },
    choicesex: function(index) {
      this.timer = setInterval(() => {
        wxshare(this, index.name == "微信朋友" ? 1 : 0);
        getwxshare(this);
      }, 1000);
    }
  },
  mounted() {
    this.actions2 = [
      {
        name: "微信朋友",
        method: this.choicesex
      },
      {
        name: "微信朋友圈",
        method: this.choicesex
      }
    ];
  },
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    isshow: {
      type: Boolean,
      default: false
    },
    bgshow: {
      type: Boolean,
      default: false
    },
    bg: {
      type: String,
      default: ""
    },
    imgURL: {
      type: String,
      default: ""
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.messShareBox {
  position: relative;
  z-index: 12;
  transition: all 0.6s; /*图片放大过程的时间*/
  .content {
    position: fixed;
    z-index: 201;
    left: 50%;
    transform: translate(-50%);
    top: rem(150);
    background-size: 100%;
    .contentBox {
      width: rem(612);
      height: rem(861);
      background-size: 100%;
      img {
        width: rem(450);
        height: rem(649);
        margin-top: rem(100);
      }
    }
    .share {
      img {
        width: rem(64);
        height: rem(46);
        margin-bottom: rem(20);
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
  .bg_big {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 202;
    background-size: 101% 100%;
    img {
      width: 90%;
      height: 80vh;
      margin-top: rem(100);
    }
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
