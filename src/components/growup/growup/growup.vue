<template>
  <div class="page growup_box" :style="'height:'+screenHeight+'px;overflow:hidden;'">
    <vheader title="成长评测" :type="2" :iconclass='icon' @otherclick='otherclick'></vheader>
    <div class="container">
      <div class="login" v-if='loginBol === false'>
        <div class="growup_header" @click="login()">
          <img src="./reg_icon.png">
          <p class="text">未登录</p>
        </div>
        <div class="growup_container">

          <div class="content">
            <p>你还没有登陆账号，</p>
            <p>登陆后就可以给宝宝做测评了</p>
          </div>

        </div>
      </div>
      <div class="babyInfo" v-if='loginBol === true'>
        <div class="growup_header">
          <img :src='imgurl' :onError='defaultimg'>
          <p class="name">{{name}}({{sex}})</p>
          <p class="date">{{birthday}}</p>
        </div>
        <div class="growup_container" ref="wrapper">
          <div class="growup_container_box">
            <ul class="evaluating">
              <li @click='testAction' :class='{"disdeb":infoArr.RealAge>=36}'>
                <div class="img">
                  <img src='./assessment_nowtest@2x.png'>
                </div>
                <div class="date" v-if='infoArr.RealAge<36'>
                  {{infoArr.RangeTitle}}
                </div>
                <div class="dateGary" v-else-if='infoArr.RealAge>=36'>
                  暂未有三岁以上成长发育评测
                </div>
                <div class="action" v-show='infoArr.RealAge<36'>
                  开始<img src='./assessment_go@2x.png'>
                </div>
              </li>
            </ul>
            <ul class="list">
              <li v-for='(item,index) in arr'>
                <router-link :to='"growup/growup_result?testID="+item.TestID'>
                  <div class="img">
                    <img src='./assessment_oldtest@2x.png'>
                  </div>
                  <div class="date">
                    <p>{{item.StageTitle}}</p>
                    <p class="time">{{item.FinishTime}}</p>
                  </div>
                  <div class="action">
                    <img src='./assessment_go@2x.png'>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="action_test" v-show='isshow'>
          <div class="test">
            <div class="test-btn" @click='test_jump'></div>
          </div>
          <div class="v-mo" @click='test_close'></div>
        </div>
      </div>
      <transition name='slide'>
        <router-view/>
      </transition>
    </div>
    <Vign></Vign>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import axios from "axios";
import Vign from "base/sign/sign";
import { GetMyBabyTestInfo, GetCustTestRecord } from "api/growup";
import BScroll from "better-scroll";
export default {
  name: "growup",
  data() {
    return {
      icon: "el-icon-question",
      imgURl: require("./assessment_help.png"),
      isshow: false,
      name: "宝宝",
      birthday: "",
      RangeTitle: "0-1月",
      defaultimg: 'this.src="' + require("./reg_icon.png") + '"',
      infoArr: {},
      arr: [],
      loginBol: false,
      screenHeight: ""
    };
  },
  created() {
    if (
      localStorage.getItem("userdata") != null &&
      JSON.parse(localStorage.getItem("userdata")).BirthDay == null
    ) {
      localStorage.removeItem("userdata");
      // //判断如果注册完信息未完善会跳到完善信息
      // Message.info({
      //   type: "info",
      //   message: "需要继续完善信息",
      //   center: true,
      //   duration: 1000
      // });
      // setTimeout(this.$router.push({ path: "login/perfectInfo" }), 2000);
      // return;
    }
    this.loadDatas();
    if (this.loginBol === true) {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  },
  methods: {
    loadDatas() {
      this.screenHeight = document.body.clientHeight;
      if (localStorage.getItem("userdata") != null) {
        var data =
          "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
        this.loaduserdata(data);
        // this.loadTestList(data);
        this.loginBol = true;
      }
    },
    //没登录，跳转到登陆页面
    login() {
      this.$router.push("login");
    },
    otherclick() {
      this.$router.push("growup/growupNotice");
    },
    test_jump() {
      this.$router.push("growup/growup_page");
      this.isshow = false;
    },
    test_close() {
      this.isshow = false;
    },
    testAction() {
      if (this.infoArr.RealAge >= 36) return;
      this.isshow = true;
    },
    loaduserdata(data) {
      let userinfo = JSON.parse(localStorage.getItem("userdata"));
      this.birthday = userinfo.BirthDay.substring(0, 10);
      this.name = userinfo.NickName;
      this.imgurl = userinfo.HeadImageUrl;
      this.sex = userinfo.Sex == 0 ? "女" : "男";
      let self = this;
      //this.loadTestList(data);
      axios.all([GetMyBabyTestInfo(data), GetCustTestRecord(data)]).then(
        //合并请求
        axios.spread(function(userResp, reposResp) {
          let userRespData = eval("(" + userResp.request.response + ")");
          if (userRespData.Code == 1) {
            //  self.RangeTitle = userRespData.Data.RangeTitle;
            self.infoArr = userRespData.Data;
          } else {
            Message.error({
              message: userRespData.Msg,
              center: true,
              duration: 1000
            });
          }
          let Data = eval("(" + reposResp.request.response + ")");
          if (Data.Code === 1) {
            self.arr = Data.Data;
          }
        })
      );
    },
    loadTestList(data) {
      GetMyBabyTestInfo(data).then(res => {
        if (res.Code === 1) {
          res.Data = this.arr;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    }
  },
  components: {
    vheader,
    Vign
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.growup_box {
  .sign_box {
    margin-top: -13rem;
  }
  .container {
    background-color: #e0e0e0;
    padding-bottom: rem(120);
    min-height: 13rem;
    .action_test {
      position: relative;
      .test {
        z-index: 999;
        @include bg-image("./assessment_tip_bg");
        width: rem(592);
        height: rem(811);
        position: fixed;
        top: rem(220);
        left: 50%;
        transform: translate(-50%);
        background-size: 100%;
        .test-btn {
          width: rem(300);
          height: rem(70);
          position: absolute;
          bottom: rem(30);
          left: 50%;
          transform: translate(-50%);
          @include bg-image("./assessment_start_test");
          background-size: 100%;
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
    }
    .growup_header {
      width: 100%;
      padding: rem(20) 0;
      background: linear-gradient(to right, #ff678c, #ff7a7b);
      .text {
        color: #fff;
        font-size: rem(30);
        margin-top: rem(25);
        margin-bottom: rem(30);
      }
      img {
        width: rem(160);
        height: rem(160);
        border-radius: 100px;
      }
      .name {
        color: #fff;
        font-size: rem(40);
        margin-top: rem(25);
      }
      .date {
        color: #fff;
        font-size: 18px;
        margin-top: rem(25);
      }
    }
    .growup_container {
      height: 10rem;
      overflow: hidden;
      @media (min-height: 737px) {
        height: 12.53333rem;
      }
      .growup_container_box {
        overflow: hidden;
      }
      .content {
        position: absolute;
        left: 0;
        right: 0;
        top: rem(600);
        p {
          color: #656565;
          font-size: 18px;
          text-align: center;
          margin-top: rem(10);
        }
      }
      .evaluating li {
        width: 100%;
        height: rem(140);
        background-color: #fff;
        margin-top: rem(15);
        display: flex;
        justify-content: space-between;
        &.disdeb {
          justify-content: baseline;
        }
        .img {
          width: rem(147);
          height: rem(140);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .date {
          width: rem(420);
          color: #333333;
          font-size: 18px;
          line-height: rem(140);
          text-align: left;
        }
        .dateGary {
          margin-left: rem(20);
          width: rem(420);
          color: #ccc;
          font-size: rem(35);
          line-height: rem(140);
          text-align: left;
        }
        .action {
          color: $color-text-a;
          font-size: rem(35);
          line-height: rem(140);
          img {
            width: rem(27);
            height: rem(43);
            vertical-align: sub;
            margin-left: rem(20);
            margin-right: rem(30);
          }
        }
      }
      .list li a {
        width: 100%;
        height: rem(140);
        background-color: #fff;
        margin-top: rem(15);
        display: flex;
        justify-content: space-between;
        .img {
          width: rem(147);
          height: rem(140);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .date {
          width: rem(480);
          color: #333333;
          font-size: 18px;
          text-align: left;
          p {
            margin-top: rem(25);
          }
          p.time {
            color: #7e7e7e;
            font-size: 14px;
          }
        }
        .action {
          line-height: rem(140);
          img {
            width: rem(27);
            height: rem(43);
            vertical-align: sub;
            margin-left: rem(20);
            margin-right: rem(30);
          }
        }
      }
    }
  }
  @media (min-height: 737px) {
    .container {
      height: 16.5rem;
    }
  }
}
</style>
