<template>
  <div class="blankgap index_scan">
    <!--<vheader title="二维码扫描" :type="1" @back='back'></vheader>-->
    <vheader title="二维码扫描" :type="1" @back='back' :iconclass='icon' @otherclick='simulateScan'></vheader>
    <div class="container">
      <div id="bcid" :style="'height:'+screenHeight+'px;overflow:auto;'"></div>
    </div>
  </div>
</template>

<script>
import vheader from "base/v-header/v-header";

export default {
  name: "indexScan",
  data() {
    return {
      scan: "",
      screenHeight: "",
      icon: "el-icon-circle-plus-outline",
    };
  },
  created() {
    this.screenHeight =
      document.body.clientHeight -
      document.querySelector(".header").clientHeight;
  },
  mounted() {
    this.startScan();
    // if(this.scan=="")
    // this.simulateScan();
  },
  methods: {
    back() {
      if(this.scan!="")
      {
        this.scan.cancel();
        this.scan.close();
      }
      this.$router.go(-1);
      return;
    },
    simulateScan() {
      this.scanok("3094f664aea468268e8cd8");
    },
    scanok(val) {

      var self = this;
      if(val.length != 22)
      {
        if(plus!=undefined)
          plus.nativeUI.alert( "" +
            "二维码错误", function(){
            console.log( "二维码错误" );

            self.scan.start();
          }, "提示", "好的" );
        else
          alert("二维码错误")
        return false;
      }

      localStorage.setItem("curScanCode", val);
      localStorage.setItem("curScanPhone",JSON.parse(localStorage.getItem("userdata")).PhoneNum);

      // alert("本地二维码 : " + localStorage.getItem("curScanCode"));
      // alert("本地手机号 : " + localStorage.getItem("curScanPhone"));

      this.$router.push("index2Wifi");
      // this.$router.push({path:'index2Wifi',query:{"border":val}})
      return true;
    },
    startScan() {
      this.scan = new plus.barcode.Barcode(
        "bcid",
        [plus.barcode.QR, plus.barcode.EAN8, plus.barcode.EAN13],
        { frameColor: "#f0779a", scanbarColor: "#f0779a" }
      );
      if(this.scan == "") return;
      this.scan.onmarked = onmarked;
      var self = this;
      function onmarked(type, result) {
        var text = "未知: ";
        switch (type) {
          case plus.barcode.QR:
            text = "QR: ";
            break;
          case plus.barcode.EAN13:
            text = "EAN13: ";
            break;
          case plus.barcode.EAN8:
            text = "EAN8: ";
            break;
        }
        if(self.scanok(result))
        {
          self.scan.cancel();
          self.scan.close();
        }

      }
      this.scan.start();
    },
    close() {
      this.scan.cancel();
      this.scan.close();
    }
  },

  components: {
    vheader
  }
};
</script>

<style lang="scss" scoped type="text/css">
* {
  -webkit-user-select: none;
}
html,
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
#bcid {
  background: rgba(0, 0, 0, 0);
  width: 100%;
}
</style>


