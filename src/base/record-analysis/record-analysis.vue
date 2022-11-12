<template>
  <transition name="fade">
    <div class="messShareBox" v-show='isshow' @touchmove.prevent>

      <div class="content">
        <div class="contentBox">
          <p class="tit">记录</p>
          <div class="content1">
            <p class="mess">已推送提醒信息:{{arr.NotifyCount}}次</p>
            <div class="tis">
              <div class="starTime" v-if='arr.BeginTime!=null'>
                {{arr.BeginTime.split(' ')[1]||""}}
              </div>
              <div class="starTime" v-else>

              </div>
              <img src='./cry.png'>
              <div class="ennTime" v-if='arr.EndTime!=null'> {{arr.EndTime.split(' ')[1]||""}}</div>
              <div class="starTime" v-else>

              </div>
            </div>
            <div class="listBox" ref="wrapper">
              <ul>
                <li v-for='item in arr.DetailResponse'>
                  <div class="time">{{item.NotifyTime.split(' ')[1]}}</div>
                  <div class="imgbox"><img src='./crything.png'></div>
                  <div class="thing">宝宝哭声提醒</div>
                </li>
              </ul>
              <div class="no" v-show='arr.DetailResponse.length==0'>当前没有更多数据了...</div>
              <!--<div class="ellipsis" v-show='arr.DetailResponse.length>0'>-->
                <!--<img src='./dian.png'>-->
              <!--</div>-->
            </div>
          </div>
          <div class="often">提醒频率：{{arr.FrequencyTitle}}</div>
        </div>

      </div>
      <div class="v-mo" @click='closeWindow' v-show='isshow' @touchmove.prevent></div>
    </div>
    </div>
  </transition>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    },
    changeAdmin(index) {
      this.active = index;
    },
    sure() {}
  },
  props: {
    isshow: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 16
    },
    often: {
      type: String,
      default: "高频"
    },
    arr: {
      type: Object,
      default: false
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.messShareBox {
/*overflow:hidden;*/
  /*height:100%;*/
  position: relative;
  z-index: 1000;
  transition: all 0.6s; /*图片放大过程的时间*/
  touch-action: none;
  .content {
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: 100%;
    .contentBox {
      width: rem(624);
      min-height: rem(400);
      max-height: rem(850);
      background: #fff;
      border-radius: 10px;
      background-size: 100%;
      position: relative;
      padding-bottom: rem(30);
      .content1 {
        width: 70%;
        margin: 0 auto;
        .no {
          line-height: rem(100);
          font-size: rem(32);
          color: #bbb;
        }
      }
      .tit {
        width: 100%;
        height: rem(100);
        line-height: rem(100);
        font-size: rem(32);
        color: #ffffff;
        background: linear-gradient(to right, #ff678c, #ff7a7b);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .mess {
        line-height: rem(90);
        font-size: rem(32);
      }
      .tis {
        display: flex;
        justify-content: space-between;
        font-size: rem(32);
        line-height: rem(82);
        div {
          width: rem(150);
        }
        img {
          width: rem(82);
          height: rem(82);
          vertical-align: middle;
          margin: 0 rem(40);
        }
      }
      .listBox {
        overflow: hidden;
        max-height: rem(400);
        ul {
          margin: 0 auto;
          margin-top: rem(15);
          display: inline-block;
          li {
            height: rem(76);
            display: flex;
            div {
              float: left;
              font-size: rem(24);
              &.imgbox {
                img {
                  vertical-align: middle;
                  margin: 0 rem(40);
                  width: rem(54);
                  height: rem(76);
                }
              }
              &.time {
                width: rem(150);
                margin-top: rem(35);
              }
              &.thing {
                width: rem(150);
                margin-top: rem(35);
              }
            }
            &:after {
              clear: both;
              content: "";
              overflow: hidden;
              display: block;
            }
          }
        }
        .ellipsis {
          img {
            width: rem(35);
            height: rem(7);
          }
        }
      }
    }
    .often {
      width: 80%;
      margin: 0 auto;
      margin-top: rem(40);
      font-size: rem(30);
      text-align: right;
      color: #ff678c;
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
    // touch-action: none;
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
