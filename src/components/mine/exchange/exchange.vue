<template>
  <div class="blankgap exchange-box">
    <vheader title="兑换记录" :type="1" @back='back' :hasClass='1'></vheader>
    <!-- <div class="tab-bar">
      <ul>
        <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)">{{item}}</li>
      </ul>
    </div> -->

    <div class="nav">
      <div class="hovernav">
        <mt-button size="small" @click.native.prevent="active = 'tab-container1',tab(0)" :class="{active:active=='tab-container1'}"> 全部</mt-button>
        <mt-button size="small" @click.native.prevent="active = 'tab-container3',tab(2)" :class="{active:active=='tab-container3'}">已兑换</mt-button>
        <mt-button size="small" @click.native.prevent="active = 'tab-container2',tab(1)" :class="{active:active=='tab-container2'}">未兑换</mt-button>
        <mt-button size="small" @click.native.prevent="active = 'tab-container4',tab(3)" :class="{active:active=='tab-container4'}">已过期</mt-button>
      </div>
    </div>
    <div class="src">
      <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
        <div class="page-tab-container">
          <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
            <mt-tab-container-item id="tab-container1">
              <router-link :to='{path:"/mine/exchange/exchange_info",query:{type:item.LuckyTakeStatus,id:item.PrizeLogID}}' v-for='(item,index) in arr' :key='index' :id='item.prizeLogID'>
                <div class="imgbox">
                  <img :src='item.ImagePath'>
                </div>
                <div class="exchange_info">
                  <p class="name">{{item.PrizeName}}</p>
                  <p class="date">{{item.ExpiredTime||item.CreateTime}} 到期</p>
                </div>
                <div class="info_enter" v-if="item.LuckyTakeStatus==1">已兑奖
                  <i class="el-icon-arrow-right"></i>
                </div>
                <div class="info_enter" v-if="item.LuckyTakeStatus==2">未兑奖
                  <i class="el-icon-arrow-right"></i>
                </div>
                <div class="info_enter" v-if="item.LuckyTakeStatus==3">已过期
                  <i class="el-icon-arrow-right"></i>
                </div>
              </router-link>
              <div class="nodata" v-show='arr.length==0'>暂无数据</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container3">
              <router-link :to='{path:"/mine/exchange/exchange_info",query:{type:item.LuckyTakeStatus,id:item.PrizeLogID}}' v-for='(item,index) in arr' :key='index' :id='item.prizeLogID' v-if='item.LuckyTakeStatus==1'>
                <div class="imgbox">
                  <img :src='item.ImagePath'>
                </div>
                <div class="exchange_info">
                  <p class="name">{{item.PrizeName}}</p>
                  <p class="date">{{item.ExpiredTime||item.CreateTime}} 到期</p>
                </div>
                <div class="info_enter">已兑换
                  <i class="el-icon-arrow-right"></i>
                </div>
              </router-link>
              <div class="nodata" v-show='duihuan==0'>暂无数据</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
              <router-link :to='{path:"/mine/exchange/exchange_info",query:{type:item.LuckyTakeStatus,id:item.PrizeLogID}}' v-for='(item,index) in arr' :key='index' :id='item.prizeLogID' v-if='item.LuckyTakeStatus==2'>
                <div class="imgbox">
                  <img :src='item.ImagePath'>
                </div>
                <div class="exchange_info">
                  <p class="name">{{item.PrizeName}}</p>
                  <p class="date">{{item.ExpiredTime||item.CreateTime}} 到期</p>
                </div>
                <div class="info_enter">未兑奖
                  <i class="el-icon-arrow-right"></i>
                </div>
              </router-link>
              <div class="nodata" v-show='weidui==0'>暂无数据</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container4">
              <router-link :to='{path:"/mine/exchange/exchange_info",query:{type:item.LuckyTakeStatus,id:item.PrizeLogID}}' v-for='(item,index) in arr' :key='index' :id='item.prizeLogID' v-if='item.LuckyTakeStatus==3'>
                <div class="imgbox">
                  <img :src='item.ImagePath'>
                </div>
                <div class="exchange_info">
                  <p class="name">{{item.PrizeName}}</p>
                  <p class="date">{{item.ExpiredTime||item.CreateTime}} 到期</p>
                </div>
                <div class="info_enter">已过期
                  <i class="el-icon-arrow-right"></i>
                </div>
              </router-link>
              <div class="nodata" v-show='guoqi==0'>暂无数据</div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </mt-loadmore>
    </div>
    <transition name='slide'>
      <router-view/>
    </transition>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message, TabContainer, TabContainerItem } from "element-ui";
import { GetMyLuckyDrawLog } from "api/mine";
export default {
  name: "exchange",
  data() {
    return {
      num: 0,
      isActive: 0,
      active: "tab-container1",
      pageIndex: 0,
      mess1: false,
      arr: [],
      duihuan: 0,
      weidui: 0,
      guoqi: 0
    };
  },
  mounted() {
    console.log("a");
  },
  created() {
    this.loadData();
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    tab(index) {
      this.isActive = index;
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {
      this.loadData();
    },
    loadData() {
      let data =
        "?CustID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&luckyTakeStatus=0&pageSize=15&pageIndex=" +
        this.pageIndex;
      GetMyLuckyDrawLog(data).then(res => {
        if (res.Code === 1) {
          this.arr = res.Data;
          for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].LuckyTakeStatus == 1) {
              this.duihuan++;
            } else if (this.arr[i].LuckyTakeStatus == 2) {
              this.weidui++;
            } else {
              this.guoqi++;
            }
          }
          this.$refs.loadmore.onTopLoaded();
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
    vheader
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.exchange-box {
  min-height: 100%;
  height: 100%;
  height: auto;
  overflow: hidden;
  .header {
    z-index: 3;
  }
  .src {
    max-height: rem(1180);
    overflow-y: scroll;
  }
  .nav {
    background: #fff;
    position: fixed;
    top: rem(138);
    z-index: 2;
    width: 100%;
    .hovernav {
      padding: 0 rem(30);
      display: flex;
      button {
        flex: 1;
        height: rem(90);
        line-height: rem(90);
        border: rem(2) solid #fff;
        background: #fff;
        border-bottom: rem(4) solid #fff;
        color: #737373;
        font-size: rem(30);
        box-shadow: none;
        &::after {
          background: #fff;
        }
        &.active {
          color: $color-text-a;
          border-bottom: rem(4) solid $color-text-a;
        }
      }
    }
  }
  .mint-loadmore {
    // border-top: 8px solid #efefef;
  }
  .page-tab-container {
    margin-top: rem(90);
    min-height: rem(1030);
    .nodata {
      margin-top: rem(200);
      font-size: rem(40);
    }
    .mint-tab-container-item {
      min-height: rem(1030);
    }
    a {
      display: flex;
      justify-content: space-around;
      padding: rem(20) rem(20);
      background: #fff;
      border-top: rem(16) solid #efefef;
      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
      &:first-child {
        // border-top: none;
        // padding-top: 0;
      }
      .imgbox {
        width: rem(150);
        height: rem(120);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .exchange_info {
        p {
          text-align: left;
          font-size: rem(30);
          color: #757575;
          &:last-child {
            margin: rem(20) 0;
          }
          &.name {
            font-size: rem(35);
            color: #000;
            margin-top: rem(20);
          }
          &.type {
            color: #757575;
          }
          &.date {
          }
        }
      }
      .info_enter {
        padding: rem(30) 0;
        color: #7d7d7d;
        font-size: rem(35);
        i {
          color: #dddddd;
          font-size: rem(50);
          font-weight: bold;
          vertical-align: sub;
        }
      }
    }
  }
  .tabCon {
    .tab-li {
      padding: rem(20) rem(20);
      margin-top: rem(20);
      background: #fff;
      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
    }
  }
  @media (min-height: 737px) {
    .nav {
      top: 2.4rem;
    }
  }
}
</style>