<template>
    <div class="blankgap indexDelayLight">
        <vheader title="延时关灯" :type="1" @back='back'></vheader>
        <div class="set"></div>
        <div class="list">
            <ul>
                <li @click="changvue(5)">5分钟 <img :class="{active:index==5}" src='./cay_frequency_check.png'></li>
                <li @click="changvue(10)">10分钟 <img :class="{active:index==10}" src='./cay_frequency_check.png'></li>
                <li @click="changvue(15)">15分钟 <img :class="{active:index==15}" src='./cay_frequency_check.png'></li>
                <li @click="changvue(0)">关闭 <img :class="{active:index==0}" src='./cay_frequency_check.png'></li>
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
      index: global.DEV_CurDeviceData.dlytime
    };
  },
  methods: {
    back() {
      this.$parent.loadUserInfo();
      this.$router.go(-1);
      return;
    },
    changvue(value) {
      this.index = value;
      global.DEV_CurDeviceData.dlytime = this.index;
      sendMqttPub(this, "setparam", {
        dlytime: global.DEV_CurDeviceData.dlytime
      });
      this.back();
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

      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
    }
  }
}
</style>
