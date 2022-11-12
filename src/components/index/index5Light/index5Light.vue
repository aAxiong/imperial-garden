<template>
  <div class="intelligentBox blankgap" :style="'height:'+screenHeight+'px;overflow:hidden;'">
    <!-- 中间的 -->
    <div class="contant">
      <!-- 上面的 -->
      <div class="intelligent">
        <div class="photo">
          <div class="close" @click='back'>
            <span class="el-icon-arrow-left"></span>
          </div>
          <!-- 数据分析 -->
          <div class="data" @click="analyze()">
            <!--<span>数据分析</span>-->
          </div>
        </div>
        <!-- 头像 -->
        <div class="head">
          <img src="./device.png">
        </div>
        <div class="content">
          <span>{{deviceName}}</span>
          <span class="change">
            <img src="./change.png">
          </span>
        </div>
      </div>
      <div class="set">
        <div class="adjust">
          亮度调节
        </div>
        <div class="setting" @click="set()">设置</div>
        <div class="btnan">
          <span class="white" @click="white(true)" v-bind:class="{'white':isA,'white1':!isA}"></span>
          <span class="line"></span>
          <span class="yellow" @click="yellow(true)" v-bind:class="{'yellow':isB,'yellow1':!isB}"></span>
          <span class="line"></span>
          <span class="red" @click="red(true)" v-bind:class="{'red':isC,'red1':!isC}"></span>
        </div>
        <div class="coords1" id="white" ref="white" style="padding-top: 15px;">
          <mt-range v-model="rangeValue" style="position: relative;" :min="0" :max="100" :step="50" :bar-height="5" :disabled='lightBol'>
          </mt-range>
          <div class="wenzi">
            <ul>
              <!--<li @click="left(true)">较暗</li>-->
              <!--<li @click="center(true)">适中</li>-->
              <!--<li @click="right(true)">明亮</li>-->
              <li @click="left(true)"> </li>
              <li @click="center(true)"> </li>
              <li @click="right(true)"> </li>
            </ul>
          </div>
        </div>
        <div class="coords2" id="yellow" ref="yellow" style="padding-top: 15px;">
          <mt-range v-model="rangeValue" style="position: relative;" :min="0" :max="100" :step="50" :bar-height="5" :disabled='lightBol'>
          </mt-range>
          <div class="wenzi">
            <ul>
              <!--<li @click="left(true)">较暗</li>-->
              <!--<li @click="center(true)">适中</li>-->
              <!--<li @click="right(true)">明亮</li>-->
              <li @click="left(true)"> </li>
              <li @click="center(true)"> </li>
              <li @click="right(true)"> </li>
            </ul>
          </div>
        </div>
        <div class="coords3" id="red" ref="red" style="padding-top: 15px;">

          <mt-range style="position: relative;" v-model="rangeValue" :min="0" :max="100" :step="50" :bar-height="5" :disabled='lightBol'>
          </mt-range>
          <div class="wenzi">
            <ul>
              <!--<li @click="left(true)">较暗</li>-->
              <!--<li @click="center(true)">适中</li>-->
              <!--<li @click="right(true)">明亮</li>-->
              <li @click="left(true)"> </li>
              <li @click="center(true)"> </li>
              <li @click="right(true)"> </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 下面的 -->
      <div class="light">
        <span class="turnUp" @click="turnUp(true)">
          <div v-show="lightBol===true">
            <img src="./turnoff.png">
            <p>开灯</p>
          </div>
          <div v-show="lightBol === false">
            <img src="./turnup.png">
            <p>开灯</p>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import {
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
  name: "light",
  data() {
    return {
      deviceName: global.NET_CurDeviceData.EqpName,
      lightBol: true,
      rangeValue: 0,
      isA: false,
      isB: true,
      isC: true,
      onoff: 0,
      color: 0,
      lightness: 1,
      screenHeight: ""
    };
  },
  created() {
    this.screenHeight = document.body.clientHeight;
    this.mqttSub();
  },
  destroyed() {
    // alert('destroyed');
    //   plus.navigator.setStatusBarBackground("#f0779a");
  },
  mounted() {
    // plus.navigator.setStatusBarBackground("#ffb0b8");
  },
  mqtt: {
    "#"(data, topic) {
      consolelog("# ->" + topic + ": " + String.fromCharCode.apply(null, data));
      // alert("#");
      receiveMqttData(this, data);
    }
  },
  methods: {
    mqttSub() {
      //订阅当前硬件mac
      sendMqttSub(
        this,
        localStorage.getItem("curScanCode"),
        localStorage.getItem("curScanPhone")
      );
      sendMqttPubMac(this, "query", localStorage.getItem("curScanCode"));
    },
    mqttPub(num) {
      //手机绑定当前硬件
      switch (num) {
        case 0:
          {
            sendMqttPub(this, "control", {
              onoff: this.onoff
            });
          }
          break;

        case 1:
          {
            sendMqttPub(this, "control", {
              color: this.color
            });
          }
          break;

        case 2:
          {
            sendMqttPub(this, "control", {
              lightness: this.lightness
            });
          }
          break;
      }
    },
    MqttLinkStatus(status) {
      if (status != 2) {
        this.back();
      }
    },
    mqtt_status_mac(data) {
      consolelog("mqtt_status_mac");
      this.set_light_status(data);
    },
    mqtt_status_phone(data) {
      consolelog("mqtt_status_phone");
      // this.set_light_status(data)
    },
    mqtt_offline(data) {
      consolelog("控制页面 mqtt_offline" + this.$route.path);
      consolelog(data);

      if(data.sender == global.DEV_CurDeviceMac)
        this.back();
    },
    mqtt_query_ack(data) {
      consolelog("mqtt_query_ack");
      if (data.status == "query_ok") {
        consolelog("query_ok");
        global.DEV_CurDeviceData = data;
        this.set_light_status(data);
      } else {
        alert("query_on");
      }
    },
    set_light_status(data) {
      // alert('set_light_status');
      if (data.color != null) {
        global.DEV_CurDeviceData.color = data.color;
        data.color == 0
          ? this.yellow(false)
          : data.color == 1 ? this.white(false) : this.red(false);
      }

      if (data.lightness != null) {
        global.DEV_CurDeviceData.lightness = data.lightness;
        data.lightness == 0 || data.lightness == 1
          ? this.left(false)
          : data.lightness == 2 ? this.center(false) : this.right(false);
      }

      if ((data.onoff != null && data.onoff == true) || data.onoff == false) {
        global.DEV_CurDeviceData.onoff = data.onoff;
        this.lightBol = data.onoff;
      }

      this.turnUp(false);
    },
    left(isTrue) {
      if (!this.onoff && isTrue) {
        this.aler();
        return;
      }
      this.rangeValue = 0;
      this.lightness = 1;
      if (isTrue) this.mqttPub(2);
    },
    center(isTrue) {
      if (!this.onoff && isTrue) {
        this.aler();
        return;
      }
      this.rangeValue = 50;
      this.lightness = 2;
      if (isTrue) this.mqttPub(2);
    },
    right(isTrue) {
      if (!this.onoff && isTrue) {
        this.aler();
        return;
      }
      this.rangeValue = 100;
      this.lightness = 3;
      if (isTrue) this.mqttPub(2);
    },
    set() {
      this.$router.push("index6Settings");
    },
    analyze() {
      this.$router.push("index7DataAnalysis");
    },
    //开灯的函数
    turnUp(isTrue) {
      this.lightBol = !this.lightBol;
      this.onoff = this.lightBol == true ? 0 : 1;
      if (isTrue) this.mqttPub(0);
    },
    yellow(isTrue) {
      if (!this.onoff && isTrue) {
        this.aler();
        return;
      }
      //黄色按钮
      this.$refs.white.style.display = "none";
      this.$refs.yellow.style.display = "block";
      this.$refs.red.style.display = "none";
      this.isA = true;
      this.isC = true;
      this.isB = false;
      this.color = 0;
      if (isTrue) this.mqttPub(1);
    },
    white(isTrue) {
      if (!this.onoff && isTrue) {
        this.aler();
        return;
      }
      //白色按钮
      this.$refs.white.style.display = "block";
      this.$refs.yellow.style.display = "none";
      this.$refs.red.style.display = "none";
      this.isA = false;
      this.isB = true;
      this.isC = true;
      this.color = 1;
      if (isTrue) this.mqttPub(1);
    },
    red(isTrue) {
      if (!this.onoff && isTrue) {
        this.aler();
        return;
      }
      //红色按钮
      this.$refs.white.style.display = "none";
      this.$refs.yellow.style.display = "none";
      this.$refs.red.style.display = "block";
      this.isA = true;
      this.isB = true;
      this.isC = false;
      this.color = 2;
      if (isTrue) this.mqttPub(1);
    },
    back() {
      this.$parent.loadUserInfo();
      this.$router.push("/index");
    },
    aler() {
      Message.error({
        message: "请先开灯",
        center: true,
        duration: 1300
      });
    },
    setlight(cmd) {
      switch (cmd) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.intelligentBox {
  .contant {
    background: #ebe9e7;
  }
  .close {
    font-size: rem(55);
    position: absolute;
    top: rem(60);
    left: 12px;
    color: #fff;
  }
  // height: rem(1334);
  /*background-color: #ccc;*/
  .intelligent {
    position: relative;
    height: rem(600);
    background-color: #fff;
    .photo {
      width: 100%;
      height: rem(360);
      background-image: url("./bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .data {
        position: absolute;
        top: rem(65);
        right: rem(30);
        font-size: rem(36);
      }
    }
    .head {
      position: absolute;
      top: 2.0rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: rem(300);
      height: rem(300);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      margin-top: rem(100);
      width: 100%;
      font-size: rem(36);
      .change {
        display: inline-block;
        width: rem(50);
        height: rem(50);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .set {
    position: relative;
    margin-top: rem(15);
    border-radius: rem(20) rem(20) 0 0;
    height: rem(300);
    background-color: #fff;
    .setting {
      position: absolute;
      top: rem(30);
      right: rem(20);
      font-size: rem(32);
    }
    .adjust {
      margin: 0 auto;
      width: rem(300);
      line-height: rem(50);
      height: rem(50);
      font-size: rem(32);
      color: #fff;
      background-image: url("./top.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .btnan {
      // margin: 0 auto;
      margin-top: rem(50);
      width: rem(400);
      height: rem(60);
      margin-left: 50%;
      transform: translateX(-35%);
      span {
        display: inline-block;
        width: rem(60);
        height: rem(60);
        float: left;
      }
      .white {
        background-image: url("./白未选中效果.png");
        background-size: 100% 100%;
      }
      .white1 {
        background-image: url("./whitecheck.png");
        background-size: 100% 100%;
      }
      .yellow {
        background-image: url("./黄未选中效果.png");
        background-size: 100% 100%;
      }
      .yellow1 {
        background-image: url("./黄选中效果.png");
        background-size: 100% 100%;
      }
      .red {
        background-image: url("./红未选中效果.png");
        background-size: 100% 100%;
      }
      .red1 {
        background-image: url("./红选中效果.png");
        background-size: 100% 100%;
      }
      .line {
        width: 0.7rem;
        height: 0.1rem;
        background: #cfcfcf;
        position: relative;
        top: 0.3rem;
      }
    }
    .coords1,
    .coords2,
    .coords3 {
      margin: 0 auto;
      width: rem(500);
      height: rem(100);
      // background: url("./调节框.png") 100% 100% no-repeat;
    }
    .wenzi ul {
      width: 131%;
      margin-left: -1rem;
      z-index: 999;
      position: relative;
      margin-top: 0.1rem;
    }
    .wenzi ul li {
      float: left;
      width: 33.3%;
      font-size: 0.2rem;
      height: 50px;
    }
    .coords2,
    .coords3 {
      display: none;
    }
  }
  .light {
    position: relative;
    margin-top: rem(20);
    border-radius: rem(20);
    height: rem(390);
    background-color: #fff;
    .turnUp {
      display: block;
      margin: 0 auto;
      width: rem(200);
      padding-top: rem(80);
      height: rem(200);
      img {
        width: 100%;
        height: 100%;
      }
      p {
        font-size: rem(36);
        margin-top: rem(20);
      }
    }
  }
}
@media (min-height: 737px) {
  #app {
    .photo {
      .close {
        top: 1.5rem;
      }
    }
  }
}
</style>


