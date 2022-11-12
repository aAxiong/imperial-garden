<template>
  <div class="blankgap points-box">
    <div class="myp_bg">
      <div class="header_mypoints">
        <div>
          <div class="lefticon" @click="$router.go(-1)">
            <span class="el-icon-arrow-left"></span>
          </div>
          <div class="text"> 我的积分</div>
        </div>
      </div>
    </div>
    <div class="points">
      <p>积分总数</p>
      <div class="points_total">
        <img src="./integral_coin@2x.png"> {{points}}
      </div>
    </div>
    <div class="points_rule">
      <div class="title_po">积分规则</div>
      <div class="html_box" v-html='htmls1'></div>
      <!-- <div class="title_fu">如何获取积分?</div> -->
      <!-- <p>1、新用户注册获得100积分,累计+1</p>
      <p>2、日常签到获得2积分</p>
      <p>3、用户分享课获得10积分</p>
      <p>4、录制笑声参与与PK课获得10积分</p>
      <p>5、PK日榜、月榜均可根据名词获得积分</p>
      <div class="title_fu">积分的用途?</div>
      <p>1、积分可以进行成长评测</p>
      <p>2、积分可以参与抽奖</p> -->

    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { GetMyTotalScore, GetSystemContent } from "api/mine";
export default {
  name: "myPoints",
  data() {
    return {
      points: 0,
      htmls: "",
      htmls1: ""
    };
  },
  mounted() {},
  created() {
    var data = "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
    GetMyTotalScore(data).then(res => {
      if (res.Code === 1) {
        this.points = res.Data;
      } else {
        Message.error({
          message: res.Msg,
          center: true,
          duration: 1000
        });
      }
    });
    var data = "?code=AboutCustomerScore";
    GetSystemContent(data).then(res => {
      if (res.Code === 1) {
        this.htmls = res.Data;
        this.htmls1 = this.htmls.replace(/&nbsp;/g, "");
      } else {
        Message.error({
          message: res.Msg,
          center: true,
          duration: 1000
        });
      }
    });
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.points-box {
  .myp_bg {
    width: 100%;
    height: rem(500);
    @include bg-image("./integral_head_bg");
    background-repeat: no-repeat;
    background-size: 100%;
    .header_mypoints {
      height: rem(138);
      text-align: center;
      color: #fff;
      position: relative;
      .lefticon {
        font-size: rem(46);
        position: absolute;
        top: rem(48);
        left: rem(24);
      }
      .text {
        font-size: 0.6rem;
        display: inline-block;
        line-height: rem(138);
      }
    }
  }
  .points {
    margin-top: rem(20);
    p {
      color: #000;
      font-size: rem(32);
    }
    .points_total {
      vertical-align: middle;
      font-size: rem(60);
      color: $color-text-a;
      margin-top: rem(30);
      img {
        width: rem(50);
      }
    }
  }
  .points_rule {
    padding: 0 rem(60);
    padding-top: rem(20);
    border-top: rem(10) solid #e8e8e8;
    margin-top: rem(20);
    height: rem(620);
    overflow-y: scroll;
    .title_po {
      font-size: 16px;
      color: #000;
    }
    .html_box {
      text-align: left;
    }
    .title_fu {
      margin: rem(20) 0;
      text-align: left;
      color: #787878;
    }
    p {
      text-align: left;
      color: #8f8f8f;
      line-height: rem(40);
    }
  }
}
@media (min-height: 737px) {
  //iphonex適配
  .points-box {
    .myp_bg {
      padding-top: rem(40);
      .header_mypoints {
        height: 2.2rem;
        .text{
          line-height:2.2rem;
        }
        .lefticon{
         top:.85rem;
        }
      }
    }
    .points_rule {
      height: 11rem;
    }
  }
}
</style>