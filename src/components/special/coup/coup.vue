<template>
  <div class="blankgap coup_box">
    <vheader title="逗笑妙招" :type="1" @back='back'></vheader>
    <div class="container">
      <div class="tit">
        <img src='./laughout_title.png'>
      </div>
      <div class="baby">
        <img src='./laughout_baby.png'>
      </div>
      <img src='./laughout_scratching.png' class='yumao' @click='showSwindows(0) ' :class="{scale: 0===selectIndex}">
      <img src='./laughout_feifeiplay.png' class='feiji' @click='showSwindows(5)' :class="{scale: 5===selectIndex}">
      <img src='./laughout_lifthigh.png' class='xinfeng' @click='showSwindows(6)' :class="{scale: 6===selectIndex}">
      <img src='./laughout_pat.png' class='shou' @click='showSwindows(2)' :class="{scale: 2===selectIndex}">
      <img src='./laughout_thetoy.png' class='huatong'@click='showSwindows(7)' :class="{scale: 7===selectIndex}">
      <img src='./laughout_pepibath.png' class='yazi' @click='showSwindows(3)' :class="{scale: 3===selectIndex}">
      <img src='./laoguout_call.png' class='miao' @click='showSwindows(4)' :class="{scale: 4===selectIndex}">
      <img src='./laughout_other.png' class='diandian' @click='showSwindows(9)' :class="{scale: 9===selectIndex}">
      <img src='./laughout_coverears.png' class='tuzi' @click='showSwindows(8)' :class="{scale: 8===selectIndex}">
      <img src='./laughout_hideandseek.png' class='mao' @click='showSwindows(1)' :class="{scale: 1===selectIndex}">
    </div>
    <vwindows :text='istext' :title='istitle' :isshow='isshow' @closeWindow='closeWindow'></vwindows>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import vwindows from "base/windows/windows";
import { Message } from "element-ui";
import { GetMethodOfLaughAll } from "api/special";
export default {
  name: "coup",
  data() {
    return {
      data: {},
      istitle: "1",
      istext: "1",
      selectIndex: undefined,
      isshow: false,
      timer:""
    };
  },
  created() {
    let data = "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;

    GetMethodOfLaughAll(data).then(res => {
      if (res.Code === 1) {
        this.data = res.Data;
      } else {
        Message.error({
          message: res.Msg,
          center: true,
          duration: 1000
        });
      }
    });

    this.selectIndex = 0;

    var self = this;
    this.timer = setInterval(() => {
      if(self.selectIndex<10)
      {
        self.selectIndex++;
      }
      else
      {
        self.selectIndex = undefined;
        clearInterval(self.timer);
      }

    }, 500);
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    showSwindows(index) {
      var self = this;
      this.selectIndex = index;
      this.istitle = this.data[index].Title;
      this.istext = this.data[index].Content;
      // this.isshow = true;

      setTimeout(function() {
        {
          self.selectIndex = undefined;
        }
      }, 300);
      setTimeout(function() {
        {
          self.isshow = true;
        }
      }, 350);
    },
    closeWindow() {
      this.isshow = false;
    }
  },
  components: {
    vheader,
    vwindows
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.coup_box {
  @include bg-image("./laughout_bg");
  background-size: 100%;
  .container {
    .tit {
      margin-top: rem(100);
      img {
        width: rem(429);
        height: rem(128);
      }
    }
    .baby {
      img {
        margin-top: rem(30);
        width: rem(447);
        height: rem(678);
      }
    }
    & > img {
      position: absolute;
      transform: scale(1);
      transition: all 0.3s; /*图片放大过程的时间*/
      &.scale {
        transform: scale(1.2);
      }
      &.yumao {
        width: rem(141);
        height: rem(188);
        top: rem(330);
        left: rem(20);
      }
      &.feiji {
        width: rem(200);
        height: rem(181);
        top: rem(280);
        right: rem(10);
      }
      &.xinfeng {
        width: rem(106);
        height: rem(93);
        top: rem(570);
        right: rem(10);
      }
      &.shou {
        width: rem(176);
        height: rem(135);
        top: rem(720);
        left: rem(10);
      }
      &.huatong {
        width: rem(75);
        height: rem(139);
        top: rem(770);
        right: rem(10);
      }
      &.yazi {
        width: rem(144);
        height: rem(135);
        top: rem(960);
        left: rem(10);
      }
      &.miao {
        width: rem(148);
        height: rem(76);
        top: rem(1000);
        right: rem(10);
      }
      &.diandian {
        width: rem(77);
        height: rem(20);
        top: rem(1220);
        left: rem(80);
      }
      &.tuzi {
        width: rem(205);
        height: rem(100);
        top: rem(1170);
        left: rem(280);
      }
      &.mao {
        width: rem(153);
        height: rem(177);
        bottom: rem(0);
        right: rem(0);
      }
    }
  }
}
</style>
