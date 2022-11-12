<template>
  <div class="blankgap indexMess">
    <vheader title="消息" :type="1" @back='back' :hasClass='1'></vheader>
    <div class="container">
      <ul>
        <li v-for='(item,index) in arr' @click='showMess(index)'>
          <img :src='item.ShareHeaderImage'>
          <div class="list_box">
            <div class="name">共享设备
            </div>
            <div class="mess">{{item.ShareNiceName}} 邀请您共同使用设备 {{item.EqpName}} {{item.Position}}</div>
          </div>
        </li>
      </ul>
    </div>
    <Vdialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog" @cancel='cancel'>
    </Vdialog>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import {
  sendMqttSub,
  sendMqttPub,
  sendMqttPubMac,
  receiveMqttData,
  Eq_GetEqpRegistInfo,
  Eq_BindingEquipment,
  Eq_ShareEquipmentTo,
  Eq_ShareEquipmentAgree,
  consolelog
} from "api/device";
import Vdialog from "base/v-dialog/v-dialog";
export default {
  data() {
    return {
      // arr: new Array(2)
      arr: global.NET_ListBindData,
      idx: 0,
      showDialog: false,
      dialogOption: {
        text: "用户邀请你共同使用设备育花园亲子灯",
        cancelButtonText: "拒绝",
        confirmButtonText: "同意"
      }
    };
  },
  created() {},
  methods: {
    cancel() {
      this.showDialog = false;
    },
    back() {
      this.$parent.loadUserInfo();
      this.$router.go(-1);
      return;
    },
    showMess(index) {
      // MessageBox.confirm("是否接受邀请").then(action => {
      //   // alert(index + "接受了邀请");
      //   this.button(index);
      // });
      this.showDialog = true;
      this.$refs.dialog
        .confirm()
        .then(() => {
          this.showDialog = false;
          this.button(index);
        })
        .catch(() => {
          this.showDialog = false;
        });
    },
    binding_success() {
      //手机绑定当前硬件成功
      consolelog("binding_success" + this.$route.path);

      Message.success({
        message: "绑定成功",
        center: true,
        duration: 1000
      });

      sendMqttPubMac(this, "binding_share", "B_" + global.DEV_CurDeviceMac, {
        binders: global.DEV_CurDeviceMac
      });
      global.NET_ListBindData.splice(this.idx, 1);
      this.back();
    },
    binding_failed() {
      //手机绑定当前硬件失败
      consolelog("binding_failed" + this.$route.path);

      Message.success({
        message: "绑定失败",
        center: true,
        duration: 1000
      });
      // this.back();
    },
    unbinding_success() {
      //手机解除绑定当前硬件成功
      consolelog("unbinding_success" + this.$route.path);
    },
    unbinding_failed() {
      //手机解除绑定当前硬件失败
      consolelog("unbinding_success" + this.$route.path);
    },
    button(index) {
      this.idx = index;
      // global.NET_ListBindData.splice(this.idx,1);
      // return ;
      var self = this;
      const data = {
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpMacStr: global.NET_ListBindData[index].EqpMacStr
      };
      Eq_ShareEquipmentAgree(data).then(res => {
        // alert(JSON.stringify(res));
        if (res.Code === 1) {
          /*

          */

          sendMqttPub(this, "binding_req", {
            binders: localStorage.getItem("curScanPhone")
          });
        } else {
          Message.error({
            message: "Meg:" + res.Msg,
            center: true,
            duration: 2000
          });

          // sendMqttPub(self, "unbinding_req", {
          //   binders: global.DEV_CurDeviceMac
          // });
        } /*end if*/
      });
    }
  },
  components: {
    vheader,
    Vdialog
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.indexMess {
  > .container {
    ul {
      li {
        display: flex;
        justify-content: flex-start;
        padding-top: rem(20);
        text-align: left;
        display: -webkit-flex;
        -webkit-flex-direction: row;
        display: flex;
        flex-direction: row;
        img {
          width: rem(90);
          height: rem(90);
          margin-left: rem(20);
          margin-right: rem(30);
          border-radius: 100px;
        }
        .list_box {
          border-bottom: 2px solid #ededed;
          flex: 1;
          line-height: rem(38);
          padding-bottom: rem(20);
          .name {
            color: #000;
            font-size: 16px;
            span {
              float: right;
              font-size: 12px;
              color: #9b9b9b;
              margin-right: rem(20);
            }
          }
          .mess {
            color: #9b9b9b;
            font-size: 14px;
          }
        }
        &:active {
          background-color: rgba(170, 170, 170, 0.1);
        }
      }
    }
  }
}
</style>
