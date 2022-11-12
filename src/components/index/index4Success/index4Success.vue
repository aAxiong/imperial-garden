<template>
  <div class="blankgap index_success">
    <vheader title="连接成功" :type="1" @back='back'></vheader>
    <div class="container">
      <div class="indexSuccess_content">
        <div class="icon_center">
          <img src="./icon@2x.png" alt="">
        </div>
        <p>请确保设备离宝宝在X米范围内</p>
        <div class="place">
          <span>设备所在位置</span>
          <el-input v-model="devicePosition" class="input"></el-input>
          <ul>
            <li v-for='(item,index) in arrvalue' @click='copyValue(index)' :key="item.index">
              {{item.position}}
            </li>
          </ul>
        </div>
        <div class="place">
          <span>设备名称</span>
          <el-input v-model="deviceName" placeholder="婴儿哭声检测智能夜灯" class="input"></el-input>
        </div>
        <div class="next" @click="next()">
          确定
        </div>
      </div>
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
  Eq_MyEquipments,
  consolelog,
  mqtt_self
} from "api/device";

export default {
  name: "indexSuccess",
  data() {
    return {
      devicePosition: "",
      deviceName: "",
      arrvalue: [
        { position: "卧室", id: 1 },
        { position: "客厅", id: 2 },
        { position: "书房", id: 3 },
        { position: "婴儿房", id: 4 }
      ],
      //二维码
      scancode: localStorage.getItem("curScanCode"),
      //手机号
      scanphone: localStorage.getItem("curScanPhone"),
      arr: [],
      mac: []
    };
  },
  created() {
    this.mqttSub();
  },
  beforeMount(){
    mqtt_self(this);
  },
  mounted(){

  },
  mqtt: {
    "#"(data, topic) {
      // consolelog(
      //   "# ->" + topic + ": " + String.fromCharCode.apply(null, data)
      // );
      // alert("#"+this.$route.path);
      consolelog("# ->" + topic + " route : " + this.$route.path);
      receiveMqttData(this, data);
    }
  },
  methods: {
    back() {
      // this.$router.go(-1);
      // this.$router.push("index1Scan")

      this.$parent.loadUserInfo();
      this.$router.push("/index");
      return;
    },
    next() {
      // consolelog(this.devicePosition);
      // consolelog(this.deviceName);
      // this.mqttPubOnline();

      if (this.devicePosition == "") {
        Message.error({
          message: "所在位置为空",
          center: true,
          duration: 1300
        });
      } else if (this.deviceName == "") {
        Message.error({
          message: "设备名称为空",
          center: true,
          duration: 1300
        });
      } else {
        // this.mqttPub();
        const data = {
          EqpID: global.NET_CurDeviceData.EqpID,
          CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
          EqpName: this.deviceName,
          Position: this.devicePosition
        };

        var self = this;
        Eq_EquipmentModify(data).then(res => {
          consolelog(JSON.stringify(res));
          if (res.Code === 1) {
            global.NET_CurDeviceData.EqpName = this.deviceName;
            global.NET_CurDeviceData.Position = this.devicePosition;

            Message.success({
              message: res.Msg,
              center: true,
              duration: 1300
            });

            self.$router.push("index5Light");
            // this.getMyEquipments();
          } else {
            Message.error({
              message: "提交数据失败",
              center: true,
              duration: 1300
            });
          } /*end if*/
        });
      }
    },
    copyValue(index) {
      consolelog(index);
      this.devicePosition = this.arrvalue[index].position;
    },
    mqttSub() {
      //订阅当前硬件mac
      sendMqttSub(
        this,
        localStorage.getItem("curScanCode"),
        localStorage.getItem("curScanPhone")
      );
    },
    mqttPub() {
      //手机绑定当前硬件
      this.mqttSub();
      sendMqttPub(this, "binding_req", {
        binders: localStorage.getItem("curScanPhone")
      });
    },
    mqttPubOnline() {
      sendMqttPubMac(this, "online");
    },
    mqtt_online(data) {
      consolelog("mqtt_online" + this.$route.path);
    },
    mqtt_offline(data) {
      consolelog("mqtt_offline" + this.$route.path);
    },
    mqtt_status_mac(data) {
      consolelog("mqtt_status_mac" + this.$route.path);
    },
    mqtt_status_phone(data) {
      consolelog("mqtt_status_phone" + this.$route.path);
    },
    binding_success() {
      //手机绑定当前硬件成功
      consolelog("binding_success" + this.$route.path);
      //this.devicebinding();
    },
    binding_failed() {
      //手机绑定当前硬件失败
      consolelog("binding_failed" + this.$route.path);
    },
    devicebinding() {
      // alert("devicebinding");
      const data = {
        EqpName: this.deviceName,
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        MacStr: "0.0.0.0",
        IPStr: "0.0.0.0",
        ModelNum: 1,
        Position: this.devicePosition,
        NumCode: "32",
        EqpMacStr: localStorage.getItem("curScanCode"),
        EqpIPStr: "0.0.0.0",
        InfoSource: 0
      };
      Eq_BindingEquipment(data).then(res => {
        // alert("Eq_BindingEquipment");
        // alert(JSON.stringify(res));
        if (res.Code === 1) {
          Message.success({
            message: res.Msg + " 绑定成功",
            center: true,
            duration: 1300
          });
          // this.$router.push("index5Light");
          this.getMyEquipments();
        } else if (res.Code === -109) {
          Message.error({
            message: res.Msg + " 重复绑定",
            center: true,
            duration: 1300
          });
          // this.$router.push("index5Light");
          this.getMyEquipments();
        } else {
          Message.error({
            message: res.Msg + " 绑定失败",
            center: true,
            duration: 1300
          });
        } /*end if*/
      });
    },
    getMyEquipments() {
      /*
      * {"Code":1,"Msg":"获取成功","Data":[{"EqpID":134,"EqpName":"sample string 1","TypeID":0,"BindStatus":1,"Position":"sample string 5","EqpMacStr":"3094f664aea468268e8cd8","ShareNiceName":null,"ShareHeaderImage":null}]}
      * */

      let data =
        "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
      Eq_MyEquipments(data).then(res => {
        // alert('Eq_MyEquipments');
        consolelog(res);
        if (res.Code === 1) {
          // Message.success({
          //   message: res.Msg+" 设备列表获取成功",
          //   center: true,
          //   duration: 1300
          // });

          var data_arr = res.Data;
          for (let key in data_arr) {
            data_arr[key].DevStatusStr = "设备离线";
            if (data_arr[key].EqpMacStr == this.scancode) {
              data_arr[key].DevStatusStr = "设备在线";
              localStorage.setItem("curScanCode", this.scancode);
              localStorage.setItem(
                "curScanPhone",
                JSON.parse(localStorage.getItem("userdata")).PhoneNum
              );
              global.DEV_CurDeviceMac = this.scancode;
            }
            this.mac.push(data_arr[key].EqpMacStr);
            this.arr.push(data_arr[key]);
          }
          global.DEV_ListDeviceMac = this.mac;
          global.NET_ListDeviceData = this.arr;
          if (global.DEV_ListDeviceMac.indexOf(global.DEV_CurDeviceMac) != -1)
            global.NET_CurDeviceData = this.arr[
              global.DEV_ListDeviceMac.indexOf(global.DEV_CurDeviceMac)
            ];

          this.$router.push("index5Light");
        } else {
          Message.error({
            message: res.Msg + " 设备列表失败",
            center: true,
            duration: 1300
          });
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
.index_success {
  .indexSuccess_content {
    width: rem(650);
    height: rem(500);
    margin: rem(100) auto;
  }
  .icon_center {
    width: rem(300);
    height: rem(296);
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .indexSuccess_content p {
    color: #f0779a;
    font-size: rem(30);
    padding-top: 0.2rem;
  }
  .place {
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
  }
  .place span {
    font-size: rem(35);
    display: block;
    margin-bottom: rem(30);
  }

  .input {
    width: 90%;
    // border-bottom:1px solid #ccc;
    text-align: center;
  }

  .place li {
    width: 25%;
    float: left;
    color: #f1779b;
    font-size: 0.4rem;
    padding-top: 0.4rem;
  }
  .next {
    width: 75%;
    position: fixed;
    bottom: rem(10);
    left: 50%;
    transform: translate(-50%);
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    height: rem(90);
    border-radius: 5px;
    margin: rem(30) auto;
    background-size: 100%;
    line-height: rem(90);
    font-size: rem(40);
    color: #fff;
  }
}
</style>

