<template>
  <div class="mine-page">
    <vheader title="我的" :type="0"></vheader>
    <div class="container">
      <router-link to="mine/userinfo">
        <div class="user">
          <div class="imgbox">
            <img :src='imgurl' />
          </div>
          <div class="username">
            <span class="name">{{name}}</span>
            <span class="brithday" v-show='birthdayshow'>{{brithday}}</span>
          </div>
          <div class="go">
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>
      </router-link>
      <div class="choicebox">
        <ul>
          <router-link to="mine/activityCenter">
            <li>
              <div class="imgbox">
                <img src='./activity_center_icon.png' />
              </div>
              <div class="cn">
                <span class="name">活动中心</span>
              </div>
              <div class="go">
                <span class="el-icon-arrow-right"></span>
              </div>

            </li>
          </router-link>
          <router-link to="mine/voiceMan">
            <li>
              <div class="imgbox">
                <img src='./recording_management_icon.png' />
              </div>
              <div class="cn">
                <span class="name">录音管理</span>
              </div>
              <div class="go">
                <span class="el-icon-arrow-right"></span>
              </div>
            </li>
          </router-link>
          <router-link to="mine/myPoints">
            <li>
              <div class="imgbox">
                <img src='./my_integral_icon.png' />
              </div>
              <div class="cn">
                <span class="name">我的积分</span>
              </div>
              <div class="go">
                <!-- <span class="jf">
                  {{jf}}积分
                </span> -->
                <span class="el-icon-arrow-right"></span>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
      <div class="choicebox">
        <ul>
          <router-link to="mine/exchange">
            <li>
              <div class="imgbox">
                <img src='./exchange_record_icon.png' />
              </div>
              <div class="cn">
                <span class="name">兑换记录</span>
              </div>
              <div class="go">
                <span class="el-icon-arrow-right"></span>
              </div>
            </li>
          </router-link>
          <router-link to="mine/moreSettings">
            <li>
              <div class="imgbox">
                <img src='./more_set_icon.png' />
              </div>
              <div class="cn">
                <span class="name">更多设置</span>
              </div>
              <div class="go">
                <span class="el-icon-arrow-right"></span>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <transition name='slide'>
      <router-view/>
    </transition>
    <Vign></Vign>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import Vign from "base/sign/sign";
import { Message } from "element-ui";
export default {
  name: "mine",
  data() {
    return {
      icon: "el-icon-circle-plus-outline",
      imgurl: require("./reg_icon.png"),
      name: "登录/注册",
      brithday: "",
      birthdayshow: false,
      jf: "2"
    };
  },
  created() {
    if (
      localStorage.getItem("userdata") != null &&
      JSON.parse(localStorage.getItem("userdata")).BirthDay == null
    ) {
      //判断如果注册完信息未完善会跳到完善信息
      // Message.info({
      //   type: "info",
      //   message: "需要继续完善信息",
      //   center: true,
      //   duration: 1000
      // });
      // setTimeout(this.$router.push({ path: "login/perfectInfo" }), 2000);
      // return;
      localStorage.removeItem("userdata");
    }
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo() {
      if (localStorage.getItem("userdata") != null) {
        this.name =
          JSON.parse(localStorage.getItem("userdata")).NickName || "宝宝";
        this.birthdayshow = true;
        if (JSON.parse(localStorage.getItem("userdata")).BirthDay != null) {
          this.brithday =
            "宝宝生日:" +
            JSON.parse(localStorage.getItem("userdata")).BirthDay.substring(
              0,
              10
            );
        }
        this.imgurl = JSON.parse(localStorage.getItem("userdata")).HeadImageUrl;
      } else {
        this.name = "登录/注册";
      }
    }
  },
  components: {
    vheader,
    Vign
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.mine-page {
  .sign_box {
    .sigin_content_no,
    .sigin_content_yes {
      top: -8rem;
    }
  }
  a {
    display: block;
    &.mint-cell-swipe-button {
      display: inline-block;
      &:after {
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
        content: "";
      }
    }
  }
  background: #e5e5e5;
  .user {
    background: #fff;
    margin-top: rem(23);
    padding: rem(15) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .imgbox {
      float: left;
      margin-left: rem(35);
      img {
        width: rem(110);
        height: rem(110);
        border-radius: 100px;
      }
    }
    .username {
      float: left;
      margin-left: rem(50);
      // padding-top: rem(10);
      span {
        display: block;
        text-align: left;
        &.name {
          font-size: rem(40);
        }
        &.brithday {
          font-size: rem(28);
          color: #8a8a8a;
          margin-top: rem(25);
        }
      }
    }
    &:after {
      content: "";
      display: block;
      clear: both;
      visibility: hidden;
    }
    .go {
      margin-left: auto;
      margin-right: rem(20);
      font-size: rem(50);
      color: #8a8a8a;
      font-weight: bold;
    }
    &:active {
      background-color: rgba(170, 170, 170, 0.1);
    }
  }
  .choicebox {
    margin-top: rem(22);
    background: #fff;
    a {
      border-bottom: rem(2) solid #e0e0e0;
      li {
        padding: rem(18) 0;
        border-bottom: rem(2) solid #e0e0e0;
        .imgbox {
          float: left;
          margin-left: rem(35);
          img {
            width: rem(56);
          }
        }
        .cn {
          color: #313131;
          float: left;
          margin-left: rem(20);
          margin-top: rem(12);
          font-size: rem(36);
        }
        .go {
          float: right;
          margin-top: rem(20);
          margin-right: rem(35);
          font-size: rem(28);
          span {
            &.jf {
              font-size: rem(35);
            }
          }
        }
        &:after {
          content: "";
          display: block;
          clear: both;
          visibility: hidden;
        }
        &:last-child {
          border-bottom: none;
        }
        &:active {
          background-color: rgba(170, 170, 170, 0.1);
        }
      }
    }
  }
}
</style>
