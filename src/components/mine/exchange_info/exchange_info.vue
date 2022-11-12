<template>
  <div class="blankgap exchange_info-box" :style="'height:'+screenHeight+'px;overflow:hidden;'">
    <vheader title="兑换记录" :type="1" @back='back' :hasClass='1'></vheader>
    <div class="imgtype">
      <img :src='imgurl'>
    </div>
    <div class="tabCon">
      <!-- <div v-for='(itemCon,index) in tabContents' v-show=" index == num">{{itemCon}}</div> -->
      <div class="tab-li">
        <div class="imgbox">
          <img :src='arr.ImagePath'>
        </div>
        <div class="exchange_info">
          <p class="name">{{arr.PrizeName}}</p>
          <p class="num">商品编号{{arr.PrizeID}}</p>
          <p class="date">{{arr.ExpiredTime}}到期</p>
        </div>
        <div class="info_enter">X1</div>
      </div>
    </div>
    <div class="infosbox">
      <div class="shopinfo">
        <div class="infostitle_box">
          <div class="infostitle">
            兑换信息
          </div>
        </div>
        <div class="exchang_info_children">
          <span>奖品编号:</span>{{arr.PrizeID}}
        </div>
        <div class="exchang_info_children">
          <span>中奖时间:</span>{{arr.CreateTime}}
        </div>
        <div class="exchang_info_children" v-if='arr.PrizeType==1&&arr.IsTaken==1'>
          <span>配送信息:</span>{{arr.FullAddress}}
        </div>
        <div class="exchang_info_children" v-if='arr.PrizeType==1&&arr.IsTaken==1'>
          <span>发货时间:</span>
        </div>
        <div class="exchang_info_children" v-if='arr.PrizeType==1&&arr.IsTaken==1'>
          <span>物流单号:</span>
        </div>

      </div>
      <div class='locain_info' v-show='$route.query.type==2'>
        <div class="infostitle_box">
          <div class="infostitle">
            收货信息
          </div>
        </div>
        <div class="exchang_info_local">
          <router-link :to='{path:"/mine/userinfo/myaddress",query:{"exchange":1}}'>
            <span>选择地址</span>
            <div>{{info}}</div>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </div>
      </div>
      <div class="exchang_btn" v-show='$route.query.type==2' @click='exchange'>
        确认兑换
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { GetLuckyDrawLogDetail, BindPrizeLogWithAddr } from "api/mine";
export default {
  name: "exchange",
  data() {
    return {
      imgurl: require("./exchanged.png"),
      time: "2018-01-05 11:16:10",
      arr: [],
      lo: false,
      localinfo: {},
      info: "",
      screenHeight: ""
    };
  },
  destroyed() {
    document.body.style = "overflow:auto;height:100%;";
    document.getElementById('exchange-box').style="overflow:auto;";
  },
  created() {
    this.$nextTick(() => {
      document.body.style = "overflow:hidden";
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    this.screenHeight = document.body.clientHeight;
    if (this.$route.query.type == 1) {
      this.imgurl = require("./exchanged.png");
    } else if (this.$route.query.type == 3) {
      this.imgurl = require("./expired.png");
    } else {
      this.imgurl = require("./convertibility.png");
      if (this.$store.state.addrInfo.ConsigneeName) {
        this.info =
          this.$store.state.addrInfo.ConsigneeName +
          "  " +
          this.$store.state.addrInfo.ConsigneePhone +
          "  " +
          this.$store.state.addrInfo.DetailAddress;
      }
    }

    let data =
      "?CustID=" +
      JSON.parse(localStorage.getItem("userdata")).CustID +
      "&prizeLogID=" +
      this.$route.query.id;
    GetLuckyDrawLogDetail(data).then(res => {
      if (res.Code === 1) {
        this.arr = res.Data;
        console.log(this.arr);
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
    back() {
      this.$parent.loadData();
      this.$router.go(-1);
      return;
    },
    tab(index) {
      this.num = index;
    },
    exchange() {
      if (this.info == "") {
        Message.error({
          message: "请选择地址",
          center: true,
          duration: 1000
        });
      } else {
        let data = {
          custID: JSON.parse(localStorage.getItem("userdata")).CustID,
          prizeLogID: this.$route.query.id,
          addrID: this.$store.state.addrInfo.AddrID
        };
        BindPrizeLogWithAddr(data).then(res => {
          if (res.Code === 1) {
            Message.success({
              message: "兑换成功",
              center: true,
              duration: 1300
            });
            this.$parent.loadData();
            this.$router.go(-1);
          } else {
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1000
            });
          }
        });
      }
    }
  },
  components: {
    vheader
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.exchange_info-box {
  background: #fff;
  min-height: 100%;
  height: auto;
  .imgtype {
    width: 100%;
    background: #fff;
    img {
      width: 100%;
    }
  }
  .tabCon {
    .tab-li {
      padding: rem(20) rem(20);
      border-top: rem(20) solid #e5e5e5;
      background: #fff;
      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
      display: flex;
      justify-content: space-around;
      .imgbox {
        width: rem(150);
        height: rem(150);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .exchange_info {
        p {
          text-align: left;
          font-size: rem(40);
          color: #757575;
          margin-bottom: rem(15);
          &.num {
            font-size: rem(28);
            color: #757575;
            margin-top: rem(20);
          }
          &.name {
            font-size: rem(38);
            color: #000;
            margin-top: rem(15);
          }
          &.type {
            color: #757575;
          }
          &.date {
            margin-top: rem(20);
            font-size: rem(28);
          }
        }
      }
      .info_enter {
        padding: rem(50) 0;
        color: #757575;
        font-size: rem(30);
      }
    }
  }
  .infosbox {
    border-top: rem(20) solid #e5e5e5;
    background: #fff;
    padding: 0 rem(60);
    padding-bottom: rem(10);
    .infostitle_box {
      text-align: left;
      font-size: rem(35);
      padding-top: rem(40);
      padding-bottom: rem(10);
      border-bottom: rem(4) solid #e2e2e2;
      .infostitle {
        text-indent: rem(10);
        padding-top: rem(10);
        border-left: rem(6) solid #000;
      }
    }
  }
  .exchang_info_children {
    display: flex;
    text-align: left;
    margin-top: rem(40);
    text-indent: rem(15);
    font-size: rem(35);
    color: #727272;
    span {
      color: #000;
      margin-right: rem(50);
    }
  }
  .exchang_info_local {
    a {
      padding: rem(20) 0;
      display: flex;
      justify-content: space-between;
      text-align: left;
      span {
        color: #000;
        font-size: rem(35);
        margin-top: rem(5);
        text-indent: rem(15);
        width: rem(200);
        white-space: nowrap;
      }
      div {
        word-wrap: break-word;
        word-break: normal;
        width: rem(400);
      }
      i {
        color: #dddddd;
        font-size: rem(50);
        font-weight: bold;
        vertical-align: sub;
      }
      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
    }
  }
  .exchang_btn {
    width: rem(211);
    height: rem(61);
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    background-size: 100%;
    margin: rem(20) auto 0 auto;
    border-radius: 100px;
    line-height: rem(61);
    color: #fff;
  }
}
</style>