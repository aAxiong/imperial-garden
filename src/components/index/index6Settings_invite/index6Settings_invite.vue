<template>
  <div class="blankgap index_invite">
    <vheader title="确认邀请" :type="1" @back='back'></vheader>
      <div class="imgbox">
        <img :src='imgurl' />
        <p class="name">{{name}}</p>
      </div>
      <div class="button" @click="button">确认</div>
   </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { sendMqttSub,sendMqttPub,sendMqttPubMac,receiveMqttData,Eq_GetEqpRegistInfo,Eq_BindingEquipment,Eq_ShareEquipmentTo,Eq_ShareEquipmentAgree,consolelog} from "api/device";

export default {
  name: "userinfo",
  data() {
    return {
     imgurl: require("./reg_icon.png"),
     name:'宝宝',
    };
  },
  created() {
    this.loadUserinfo();
  },
  methods: {
    back() {

           this.$parent.loadUserInfo();
           this.$router.go(-1);
           return;
    },
    binding_success() {
      //手机绑定当前硬件成功
      consolelog('binding_success'+this.$route.path);

      Message.success({
        message:"绑定成功",
        center:true,
        duration:1000
      });

      sendMqttPubMac(this, "binding_share","B_"+global.DEV_CurDeviceMac, {
        binders:global.DEV_CurDeviceMac
      });

      this.back();
    },
    binding_failed() {
      //手机绑定当前硬件失败
      consolelog('binding_failed'+this.$route.path);

      Message.success({
        message:"绑定失败",
        center:true,
        duration:1000
      });
      // this.back();
    },
    unbinding_success(){

      //手机解除绑定当前硬件成功
      consolelog('unbinding_success'+this.$route.path);
    },
    unbinding_failed(){

      //手机解除绑定当前硬件失败
      consolelog('unbinding_success'+this.$route.path);
    },
    mqtt_offline(data) {
      consolelog("mqtt_offline" + this.$route.path);
      this.$parent.loadUserInfo();
      this.$router.push("/index");
    },
    button(){

      var self = this;
      const data = {
        CustID:JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpMacStr:global.NET_CurDeviceData.EqpMacStr
      }
      Eq_ShareEquipmentAgree(data).then(res => {

        // alert(JSON.stringify(res));
        if (res.Code === 1) {
          /*

          */

          sendMqttPub(this, "binding_req", {
            binders: localStorage.getItem("curScanPhone")
          });

        }
        else {

          Message.error({
            message:"Meg:"+res.Msg,
            center:true,
            duration:2000
          });

          // sendMqttPub(self, "unbinding_req", {
          //   binders: global.DEV_CurDeviceMac
          // });

        }/*end if*/
      });
    },
    loadUserinfo() {

      this.imgurl = global.NET_CurDeviceData.ShareHeaderImage;
      this.name = global.NET_CurDeviceData.ShareNiceName;
    },
    inputclick() {
      document.getElementById("file1").click();
    },
    imgLoad() {},
    changge(key, value) {
      //变更,重新缓存
      var userinfo = JSON.parse(localStorage.getItem("userdata"));
      userinfo[key] = value;
      localStorage.setItem("userdata", JSON.stringify(userinfo));
    },



  },
  watch: {
    $route(to, from) {
      this.loadUserinfo();
    }
  },
  mounted() {
    (this.actions = [
      {
        name: "拍照",
        method: this.takePhoto
      },
      {
        name: "从相册中选择",
        method: this.openAlbum
      }
    ]);

  },
  components: {
    vheader,

  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.index_invite{
   .imgbox {
     margin-top: 1rem;
        img {
          margin-top:0.8rem;
          width: rem(90);
          height: rem(90);
          border-radius: 100px;

        }
    }
    .button{
        width: 75%;
        background: url("./btn.png")no-repeat;
        height: rem(100);
        margin: rem(30) auto;
        background-size: 100%;
        line-height: rem(100);
        font-size: rem(40);
        color: #fff;
    }
}
</style>
