<template>
  <transition name="fade">
    <div class="changemessBox" v-show='isshow'>

      <div class="content">
        <div class="contentBox">
          <p class="tit">转让管理员</p>
          <p class="ps">请选择要转让的管理员的好友</p>
          <div class="peopleList">
            <ul>
              <li v-for='(item,index) in arr' :class="{'active':index==active}" @click='changeAdmin(index)'>
                <img :src='item.HeadImageUrl'>
                <span>{{item.NickName}}</span>
              </li>
            </ul>
          </div>
          <div class="btn" @click='sure'>确认</div>
          <p class="pss">转让管理员后，你将失去“动态记录”和“回溯录制”的操作权限</p>
        </div>
        <div class="close" @click='closeWindow'>
          <img src='./close.png'>
        </div>
      </div>
      <div class="v-mo" @click='closeWindow' v-show='isshow'></div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    },
    changeAdmin(index) {
      this.active = index;
    },
    sure() {
      // alert("转让给" + this.active);
      this.$parent.changeWindow(this.active);
    }
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
    arr: {
      type: Array,
      default: false
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.changemessBox {
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
      width: rem(476);
      height: rem(643);
      background-size: 100%;
      background: #fff;
      border-radius: 10px;
      .tit {
        padding-top: rem(50);
        font-size: rem(44);
        color: #fe668c;
      }
      .ps {
        margin-top: rem(15);
        font-size: rem(20);
        color: #ababab;
      }
      .peopleList {
        margin-top: rem(20);
        ul {
          width: 90%;
          margin: 0 auto;
          li {
            width: rem(108);
            height: rem(136);
            display: inline-block;
            padding-top: rem(10);
            margin: 0 rem(15);
            span {
              font-size: rem(20);
            }
            img {
              width: rem(85);
              height: rem(85);
              display: block;
              margin: 0 auto;
              border-radius: 100px;
            }
            &.active {
              background: url("./change.png");
              background-size: 100%;
              background-repeat: no-repeat;
            }
          }
        }
      }
      .btn {
        width: rem(250);
        height: rem(50);
        color: #fff;
        line-height: rem(50);
        margin: rem(30) auto;
        background: linear-gradient(to right, #ff678c, #ff7a7b);
        border-radius: 5px;
      }
      .pss {
        width: 90%;
        margin: 0 auto;
        color: #ababab;
        font-size: rem(24);
        line-height: rem(35);
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
