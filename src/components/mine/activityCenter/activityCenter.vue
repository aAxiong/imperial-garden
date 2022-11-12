<template>
  <div class="blankgap actbox">
    <router-link class="close" style="z-index: 0" to='/mine'></router-link>
    <div class="container dibg">
      <div class="table-box">
        <ul>
          <li class="item" v-for='(item,index) in arr' v-on:mousedown="downclick(index)" v-on:mouseup="upclick(index)" :class="{'action-btn':index===4,'btnstate1':btn_state===1&&index===4,'btnstate2':btn_state===2&&index===4,'active':index === nowIndex&&index!=4}">
          </li>
        </ul>
      </div>
    </div>
    <div class="toolbal">
      <div class="jf">{{jf}}</div>
      <router-link class="rule" to='activityCenter/gameRule'></router-link>
    </div>
    <div class="winning" v-show='winningshow'>
      <div class="vv-interface">
        <div class="vv-content">
          <p class="imgbox"> <img :src='imgurl'></p>
          <p class="text">恭喜你！抽中</p>
          <p class="prize">{{prize}}</p>
          <p class="prompt">抽中的奖品在育花园APP>我的>兑换记录中查看</p>
        </div>
        <div class="vv-xx" @click="winningshow=false">
        </div>
      </div>
      <div class="vv-modal"></div>

    </div>
    <div class="d-modal" v-show=dshow></div>
    <transition name='slide'>
      <router-view/>
    </transition>
  </div>
</template>
<script>
import { GetMyTotalScore, GetPrizeList, TakeLuckyDraw } from "api/mine";
import { Message } from "element-ui";
export default {
  name: "activityCenter",
  data() {
    return {
      jf: 0,
      btn_state: 0,
      circle: 3, //圈数
      few: 3, //第几个,
      winningshow: false,
      arr: new Array(9),
      nowIndex: "",
      timer: 0,
      data: "",
      imgurl: require("./j1@2x.png"),
      prize: "谢谢参与",
      order: [0, 1, 2, 5, 8, 7, 6, 3],
      dshow: false
    };
  },

  created: function() {
    this.getintegral();
    let data = "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
    GetPrizeList(data).then(res => {
      if (res.Code === 1) {
        var items = document.getElementsByClassName("item");
        for (var i = 0; i < 8; i++) {
          items[this.order[i]].style.backgroundImage =
            "url(" + res.Data[i].ImagePath + ")";
        }
      } else {
        Message.error({
          message: res.Msg,
          center: true,
          duration: 1000
        });
      }
    });
  },
  methods: {
    downclick(index) {
      if (index === 4) this.btn_state = 1;
    },
    upclick(index) {
      if (index === 4) {
        const data = {
          custID: JSON.parse(localStorage.getItem("userdata")).CustID,
          iPStr: "",
          macStr: "",
          infoSource: "1"
        };
        TakeLuckyDraw(data).then(res => {
          if (res.Code === 1) {
            this.getintegral();
            this.btn_state = 2;
            this.few = res.Data.Position;
            this.imgurl = res.Data.ImagePath;
            this.prize = res.Data.PrizeName;
            this.rotate(0, 0);
          } else {
            this.btn_state = 0;
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1000
            });
          }
        });
      }
    },
    getintegral() {
      //获取积分
      var data =
        "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
      GetMyTotalScore(data).then(res => {
        if (res.Code === 1) {
          this.jf = res.Data;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    },
    rotate(index, zero) {
      this.dshow = true;
      setTimeout(() => {
        this.nowIndex = this.order[index];
        index++;
        this.timer++;
        if (zero == this.circle && this.few == index) {
          this.winningshow = true;
          this.dshow = false;
          this.btn_state = 0;
        } else {
          if (index == 8) {
            zero++;
            this.rotate(0, zero);
          } else {
            this.rotate(index, zero);
          }
        }
      }, 200);
    }
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.actbox {
  @include bg-image("./bg");
  background-size: 100%;
  .dibg {
    width: 90vw;
    height: 90vw;
    background: url(./bgchange.gif);
    // animation: blinks 0.5s linear infinite normal;
    // -webkit-animation: blinks 0.5s linear infinite normal;
    background-size: 100%;
    margin: 0 auto;
    margin-top: 4.9rem;
    position: relative;
    .table-box {
      text-align: center;
      padding-top: 0.6rem;
      ul {
        margin: 0 auto;
        li {
          width: 100%;
          &:nth-child(2) {
            margin: 0 rem(6);
          }
          &.item {
            width: 23vw;
            height: 23vw;
            background: url("j1@2x.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: inline-block;
            opacity: 0.8;
            margin: 0.14rem;
          }
          &.action-btn {
            background: url("./btn_normal@2x.png");
            background-size: 100%;
            opacity: 1;
          }
          &.active {
            // background: url("./j2@2x.png");
            background-size: 100% 100%;
            opacity: 1;
          }
          &.btnstate1 {
            @include bg-image("./btn_pressed");
          }
          &.btnstate2 {
            opacity: 0;
          }
        }
      }
    }
  }
  .toolbal {
    width: 75vw;
    text-align: right;
    margin: 0 auto;
    margin-top: rem(30);
    .jf {
      text-align: center;
      width: rem(200);
      height: rem(74);
      @include bg-image("./game_integral");
      background-repeat: no-repeat;
      background-size: 100%;
      color: #fff;
      font-size: rem(40);
      line-height: rem(64);
      text-indent: rem(60);
      display: inline-block;
      vertical-align: bottom;
    }
    .rule {
      width: rem(180);
      height: rem(74);
      @include bg-image("./game_rule");
      background-size: 100%;
      display: inline-block;
      margin-left: rem(20);
      vertical-align: bottom;
    }
  }
  .winning {
    position: relative;
    .vv-modal {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.5;
    }
    .vv-interface {
      width: rem(720);
      height: rem(850);
      position: fixed;
      top: rem(200);
      left: -46%;
      transform: translate(50%);
      background-size: 100%;
      @include bg-image("./game_result_bg");
      background-repeat: no-repeat;
      z-index: 99;
      .vv-xx {
        position: absolute;
        top: rem(30);
        right: rem(30);
        width: rem(48);
        height: rem(48);
        @include bg-image("./game_result_close");
        background-size: 100%;
      }
      .vv-content {
        .imgbox {
          text-align: center;
          margin-top: rem(400);
          img {
            width: rem(170);
            height: rem(170);
          }
        }
        p.text {
          color: #000;
          font-size: rem(44);
          margin-top: rem(20);
        }
        p.prize {
          color: #f9d500;
          font-size: rem(52);
          margin-top: rem(20);
        }
        p.prompt {
          color: #79272d;
          margin-top: rem(20);
        }
      }
    }
  }
  .d-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0;
  }
  a.close {
    position: absolute;
    top: rem(70);
    left: rem(40);
    width: rem(48);
    height: rem(48);
    @include bg-image("./game_result_close");
    background-size: 100%;
    z-index: 100;
  }
  @keyframes blinks {
    from {
      background: url(./deng1.png);
      background-size: 100%;
    }
    to {
      background: url(./deng2.png);
      background-size: 100%;
    }
  }
}
@media screen and(min-height:737px) {
  .actbox {
    @include bg-image("./bg");
    background-size: 100% 100%;
    .dibg {
      margin-top: 4.7rem;
    }
    a {
      &.close {
        top: rem(100);
      }
    }
  }
}
</style>
