<template>
  <div class="sign_box viewport-flip" v-show='signshow'>
    <div class="sigin_content_no" v-show='sign===false'>
      <p class="continues">连续签到</p>
      <p class="jf">积分+{{AddScore}}</p>
      <div class="jfcontent">
        <span>签到{{day}}天</span>
      </div>
      <div class="jfbtn" @click="signin()">
      </div>
    </div>
    <!-- <transition enter-active-class="animated flipInY"> -->
    <div class="sigin_content_yes flip in" v-show='sign===true'>
      <p class="continues">今日已签到</p>
      <div class="jfcontent">
        <div class="jia5">+{{AddScore}}</div>
        <span>签到{{day}}天</span>
      </div>
      <div class="jf_info" v-if='sign===true'>
        <span>今日积分+{{AddScore}}</span>
        <span>总分{{TotalScore}}</span>
      </div>
    </div>
    <!-- </transition> -->
    <div class="v-modals" @click="signHide()"></div>
  </div>
</template>
<script>
import { MakeCustomerSign, GetCustSignInInfo } from "api/login";
import { mapGetters, mapMutations } from "vuex";
import { Message } from "element-ui";
export default {
  name: "component_name",
  data() {
    return {
      signshow: false,
      sign: false,
      day: "",
      AddScore: "",
      TotalScore: ""
    };
  },
  created() {
    //判断是否登陆
    if (localStorage.getItem("userdata") != null && this.signStatus === false) {
      let data =
        "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
      this.getResult(data);
    }
  },
  methods: {
    //签到
    signin() {
      let data = {
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        InfoSource: 0
      };
      this.loadSign(data);
    },
    //隐藏签到页面
    signHide() {
      this.signshow = false;
    },
    //发起签到
    loadSign(data) {
      MakeCustomerSign(data).then(res => {
        if (res.Code === 1) {
          this.sign = true;
          this.day = res.Data.ContinueDays;
          this.AddScore = res.Data.AddScore;
          this.TotalScore = res.Data.TotalScore;
        }
      });
    },
    //获取本次签到预期结果值
    getResult(data) {
      //判断是否签到
      this.setSignStatus(!this.signStatus);
      GetCustSignInInfo(data).then(res => {
        if (res.Code === 0) {
          //说明已经签到
          this.signshow = false;
        } else if (res.Code === 1) {
          this.day = res.Data.ContinueDays;
          this.AddScore = res.Data.AddScore;
          this.TotalScore = res.Data.TotalScore;
          this.signshow = true;
        }
      });
    },
    ...mapMutations({
      setSignStatus: "SET_SIGN_STATE"
    })
  },
  computed: {
    ...mapGetters(["signStatus"])
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.sign_box {
  .v-modals {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    z-index: 2000;
  }
  .sigin_content_no {
    position: relative;
    width: rem(581);
    height: rem(570);
    @include bg-image("./sign_not");
    padding-top: rem(40);
    margin: auto;
    background-size: 100%;
    z-index: 9999;
    .continues {
      color: #4d4d4d;
      font-size: rem(50);
    }
    .jf {
      color: #787878;
      margin-top: rem(20);
    }
    .jfcontent {
      width: rem(288);
      height: rem(288);
      position: relative;
      @include bg-image("./sign_score");
      background-size: 100%;
      margin: 0 auto;
      position: relative;
      margin-top: rem(30);
      span {
        position: absolute;
        bottom: rem(45);
        left: 50%;
        transform: translate(-50%);
        color: #fff;
        font-size: rem(30);
      }
    }
    .jfbtn {
      width: rem(381);
      height: rem(110);
      @include bg-image("./sign_btn");
      background-repeat: no-repeat;
      background-size: 100%;
      margin: 0 auto;
      margin-top: rem(30);
    }
  }
  .sigin_content_yes {
    position: relative;
    width: rem(581);
    height: rem(570);
    @include bg-image("./sign_succ");
    margin: auto;
    background-size: 100%;
    padding-top: rem(40);
    z-index: 9999;
    .continues {
      color: #4d4d4d;
      font-size: rem(50);
    }
    .jfcontent {
      width: rem(288);
      height: rem(288);
      @include bg-image("./sign_score");
      background-size: 100%;
      margin: 0 auto;
      position: relative;
      margin-top: rem(70);
      span {
        position: absolute;
        bottom: rem(45);
        left: 50%;
        transform: translate(-50%);
        color: #fff;
        font-size: rem(30);
      }
      .jia5 {
        font-size: rem(60);
        color: #fff;
        position: absolute;
        right: rem(60);
        top: rem(50);
      }
    }
    .jf_info {
      color: #787878;
      font-size: rem(30);
      margin-top: rem(102);
      span {
        margin-right: rem(5);
      }
    }
  }
  .viewport-flip {
    -webkit-perspective: rem(2000);
    perspective: rem(2000);
    position: absolute;
  }
  .flip {
    -webkit-backface-visibility: hidden;
    -webkit-transform: translateX(0);
    backface-visibility: hidden;
    transform: translateX(0);
  }
  .flip.out {
    -webkit-transform: rotateY(-90deg) scale(0.9);
    -webkit-animation-name: flipouttoleft;
    -webkit-animation-duration: 175ms;
    transform: rotateY(-90deg) scale(0.9);
    animation-name: flipouttoleft;
    animation-duration: 175ms;
  }
  .flip.in {
    -webkit-animation-name: flipintoright;
    -webkit-animation-duration: 225ms;
    animation-name: flipintoright;
    animation-duration: 225ms;
  }

  @-webkit-keyframes flipouttoleft {
    from {
      -webkit-transform: rotateY(0);
    }
    to {
      -webkit-transform: rotateY(-90deg) scale(0.9);
    }
  }
  @keyframes flipouttoleft {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(-90deg) scale(0.9);
    }
  }
  @-webkit-keyframes flipintoright {
    from {
      -webkit-transform: rotateY(90deg) scale(0.9);
    }
    to {
      -webkit-transform: rotateY(0);
    }
  }
  @keyframes flipintoright {
    from {
      transform: rotateY(90deg) scale(0.9);
    }
    to {
      transform: rotateY(0);
    }
  }
}
</style>
