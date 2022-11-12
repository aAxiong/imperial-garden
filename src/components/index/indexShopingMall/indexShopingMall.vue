<template>
    <div class="blankgap">
        <vheader title="购买商城" :type="1" @back='back'></vheader>
        <div class="info_box">
            <!--<iframe :src='content' :style="'height:'+screenHeight+'px;'"></iframe>-->
        </div>
    </div>
</template>
<script>
import vheader from "base/v-header/v-header";

import {
  deviceInit,
  setWebView,
  sendMqttSub,
  sendMqttPub,
  sendMqttPubMac,
  receiveMqttData,
  Eq_GetEqpRegistInfo,
  Eq_BindingEquipment,
  mqtt_pub,
  consolelog
} from "api/device";
export default {
  data() {
    return {
      content: this.$route.query.herf,
      screenHeight: ""
    };
  },
  created() {
    this.screenHeight = document.body.clientHeight - 69;
    setWebView(this,1,this.content);
  },
  methods: {
    back() {
      setWebView(this,2);
    },
    setWebView_success(data)
    {
      consolelog("setWebView_success:"+JSON.stringify(data));
      if(data.data.action==2)
      {
        this.$router.go(-1);
      }
    },
    setWebView_failed(data)
    {
      consolelog("setWebView_failed");
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
.info_box {
  text-align: left;
  font-size: rem(35);
  iframe {
    width: 100%;
  }
}
</style>
</style>
