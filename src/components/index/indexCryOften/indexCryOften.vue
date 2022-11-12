<template>
  <div class="blankgap indexDelayLight">
    <vheader title="哭声频率" :type="1" @back='back'></vheader>

    <div class="set"></div>
    <div class="list">
      <ul>
        <li @click="changvue(item.NotifyFrequency)" v-for="item in options1">{{item.Title+item.Desc}} <img :class="{active:index==item.NotifyFrequency}" src='./cay_frequency_check.png' ></li>
      </ul>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";

import {
  sendMqttPubMac,
  sendMqttSub,
  sendMqttPub,
  receiveMqttData,
  Eq_GetEqpRegistInfo,
  Eq_BindingEquipment,
  Eq_EquipmentModify,
  Eq_RemoveFromShareMembers,
  Vo_SetCryAnalysisTurnOn,
  Vo_IsTurnOnCryAnalysis,
  Eq_GetCryNotifyInfo,
  Eq_GetCryNotifySettingList,
  Eq_SetCustomerCryNotifyInfo,
  consolelog
} from "api/device";
export default {
  data() {
    return {
      index: global.DEV_CurDeviceData.CryNotify,
      options1: []
    };
  },
  created(){
    this.getCryNotifySettingList();
  },
  methods: {
    back() {
      this.$parent.loadUserInfo();
      this.$router.go(-1);
      return;
    },
    changvue(value) {
      this.index = value;
      this.setCustomerCryNotifyInfo();
      this.back();
    },
    getCryNotifySettingList() {
      //获取哭声事件设置列表

      const data = {
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        eqpID: global.NET_CurDeviceData.EqpID
      };
      Eq_GetCryNotifySettingList(data).then(res => {
        console.log("Eq_GetCryNotifySettingList : ");
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          console.log(res)
          this.options1 = res.Data;
        } else {

          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        } /*end if*/
      });
    },
    setCustomerCryNotifyInfo() {
      //设置客户哭声提醒信息
      const data = {
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        notifyFrequency: this.index,
        eqpID: global.NET_CurDeviceData.EqpID
      };
      Eq_SetCustomerCryNotifyInfo(data).then(res => {
        console.log("Eq_GetCustomerCryNotifyInfo : ");
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          // Message.success({
          //   message: res.Msg,
          //   center: true,
          //   duration: 1000
          // });
        } else {
          // Message.error({
          //   message: res.Msg,
          //   center: true,
          //   duration: 1000
          // });
        } /*end if*/
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
.indexDelayLight {
  background: #eeeaeb;
  .set {
  background: #eeeaeb;
  text-align: left;
  padding: 0.2rem;
  }
  .list {
    ul li {
      width: 100%;
      font-size: rem(32);
      text-align: left;
      text-indent: rem(50);
      padding: rem(30) 0;
      border-bottom: 1px solid #bbb;
      background-color: rgba(255, 255, 255, 255);
      img {
        width: rem(40);
        height: rem(28);
        float: right;
        margin-right: rem(50);
        display: none;
        &.active {
          display: block;
        }
      }

      .cn {
        color: #000;
        float: left;
        margin-left: rem(35);
        font-size: rem(34);
        font-weight: bold;
        padding: rem(30) 0;
      }

      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
    }
  }
}
</style>
