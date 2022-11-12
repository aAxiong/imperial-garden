<template>
  <transition name="fade">
    <div class="reason" v-show='isshow'>
      <div class="content">
        <div class="contentBox">
          <p class="tit">正确哭闹原因</p>
          <p class="ps">可选择一下正确的哭闹原因</p>
          <div class="peopleList">
            <ul>
              <li v-for="(item,index) in arr" :class="{'active':item.FactorCode==active}" @click='changeReson(item.FactorCode)'>
                <div class="iconBox">
                  <img src='./gou.png'>
                </div>
                <div class="text">{{item.FactorName}}</div>
              </li>
            </ul>
            <input type="text" placeholder="请说明原因" v-model="textContent" v-show='active==arr[arr.length-1].FactorCode'>
          </div>
          <div class="rebtn" @click='sure'>确认</div>
        </div>
        <div class="closere" @click='closeWindow'>
          <img src='./close.png'>
        </div>
      </div>
      <div class="v-mo" @click='closeWindow' v-show='isshow'></div>
    </div>
  </transition>
</template>
<script>
import {
  Vo_AddEvent,
  Vo_EditEvent,
  Vo_DeleteEvent,
  Vo_AddBabyDietEvent,
  Vo_EditBabyDietEvent,
  Vo_DeleteBabyDietEvent,
  Vo_AddBabyMetabolismEvent,
  Vo_EditBabyMetabolismEvent,
  Vo_EditBabyTemperatureEvent,
  Vo_DeleteBabyMetabolismEvent,
  Vo_AddBabyDiaperEvent,
  Vo_EditBabyDiaperEvent,
  Vo_DeleteBabyDiaperEvent,
  Vo_AddBabyTemperatureEvent,
  Vo_DeleteBabyTemperatureEvent,
  Vo_GetAllBabyEventIntegrateData,
  Vo_GetBabyEventDisplayItems,
  Vo_GetBabyCryReasonList,
  Vo_IsShowCryReasonWin,
  Vo_ConfirmReasonForCry,
  Vo_GetTheLastBabyCryReason,
  Vo_GetCryFactorItems,
  Vo_CorrectCryFactorItem,
  Vo_CorrectTheLastCryFactorItem,
  consolelog
} from "api/device";
export default {
  data() {
    return {
      active: "",
      // arr: ["饿了", "困了", "渴了", "便了", "疼痛", "不舒服", "其他"],
      arr: [{FactorCode:"hungry",FactorName:"饿了"}, {FactorCode:"other",FactorName:"其他"}],
      textContent:""
    };
  },
  created() {
    this.getCryFactorItems();
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    },
    changeReson(index) {
      this.active = index;
    },
    sure() {
      this.textContent = this.active==this.arr[this.arr.length-1].FactorCode?this.textContent:"";
      this.$emit("sure", this.textContent, this.active);
    },
    getCryFactorItems() {//获取哭声原因列表

      const data = {
      };
      Vo_GetCryFactorItems(data).then(res => {
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          this.arr = res.Data;
        } else {

        } /*end if*/
      });
    }
  },
  props: {
    isshow: {
      type: Boolean,
      default: false
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.reason {
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
      background-size: 100%;
      background: #fff;
      border-radius: 10px;
      padding-bottom: rem(50);
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
            width: rem(200);
            height: rem(29);
            display: inline-block;
            margin: 0 auto;
            font-size: rem(28);
            display: flex;
            margin-bottom: rem(25);
            .iconBox {
              width: rem(28);
              height: rem(29);
              background: url("./gouk.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              position: relative;
              img {
                width: rem(34);
                height: rem(26);
                position: absolute;
                display: none;
              }
            }
            .text {
              width: rem(150);
              background: linear-gradient(to right, #ff678c, #ff7a7b);
              line-height: rem(29);
              color: #fff;
            }
            &.active {
              .iconBox {
                img {
                  display: block;
                }
              }
            }
          }
        }
        input {
          width: 80%;
          height: rem(50);
          border-bottom: rem(2) solid #fe668c;
          font-size: rem(28);
          text-align: left;
          margin-top:rem(10);
        }
      }
      .rebtn {
        width: rem(250);
        height: rem(50);
        color: #fff;
        line-height: rem(50);
        margin: rem(30) auto 0 auto;
        background: linear-gradient(to right, #ff678c, #ff7a7b);
        border-radius: 5px;
      }
    }
    .closere {
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
