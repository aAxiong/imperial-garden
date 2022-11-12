<template>
  <div class="blankgap index_set">
    <vheader title="设置" :type="1" @back='back'></vheader>
    <div class="container">
      <div class="set">基础设置</div>
      <ul class="userinfopage_ul">

        <li class="mingcheng" @click.stop='deviceNote'>
          <div class="cn">
            <span class="name">设备名称</span>
          </div>
          <div class="go">
            <span>{{value}}</span>
            <!-- <el-button type="text" @click='deviceNote' placeholder="设备备注">{{value}}</el-button>

            <el-dialog title="输入设备备注" :visible.sync="namedialogVisible" width="80%" :modal="false">
              <input type="text" value="" v-model="valueupdate">
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="queding()" class="queding">确 定</el-button>
                <el-button @click="quxiao()">取 消</el-button>
              </span>
            </el-dialog> -->
            <span class="el-icon-arrow-right"></span>

          </div>
        </li>

        <li @click='$router.push("index6Settings/index6Settings_scope")' class="liagndu">
          <div class="cn">
            <span class="name">亮度范围</span>
          </div>
          <div class="go">
            <span>{{rangeValue2}}%~{{rangeValue1}}%</span>
            <span class="el-icon-arrow-right"></span>
          </div>

        </li>
        <li>
          <div class="cn">
            <span class="name">夜灯模式</span>
          </div>

          <div class="go">
            <el-switch v-model="value2" active-color="#f1789b" inactive-color="#ccc" v-bind='{disabled:a==true}'> </el-switch>
            <!-- <span class="el-icon-arrow-right"></span> -->
          </div>

        </li>

        <li v-show="cryState">
          <div class="cn">
            <span class="name">哭闹分析</span>
          </div>

          <div class="go">
            <el-switch v-model="value3" active-color="#f1789b" inactive-color="#ccc" v-bind='{disabled:b==true}'> </el-switch>
            <!-- <span class="el-icon-arrow-right"></span> -->
          </div>

        </li>
        <!-- @click.stop="dialogClick" -->
        <li class="guandeng" @click='$router.push("index6Settings/indexDelayLight")'>
          <div class="cn">
            <span class="name">延时关灯</span>
          </div>

          <div class="go">
            <!-- @click.stop="dialogClick" -->
            <!--<el-button type="text" class="guandeng">{{value5}}</el-button>-->

            <span>{{value5}}</span>
            <div class="v-modal" v-show='dialogVisible'></div>
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>
        <!-- @click.stop="dialogClick1" -->
        <li class="guandeng" @click='$router.push("index6Settings/indexCryOften")'>
          <div class="cn">
            <span class="name">哭声监测频率</span>
          </div>

          <div class="go">
            <!-- @click.stop="dialogClick1"  -->
            <!--<el-button type="text" class="guandeng">{{value6}}</el-button>-->
            <!--<div class="v-modal" v-show='dialogVisible1'></div>-->

            <span>{{value6}}</span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>

        <li @click='$router.push("./index6Settings_update")' ref="update">
          <div class="cn">
            <span class="name">固件升级</span>
          </div>
          <div class="go">
            <span>V{{curvercion}}</span>
            <span class="el-icon-arrow-right">

            </span>
          </div>
        </li>
        <li @click='$router.push("./index6Settings_share")' ref="share">
          <div class="cn">
            <span class="name">设备共享</span>
          </div>

          <div class="go">
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>

        <div class="jiechu" @click="jiechu" ref="jiechu">
          解除绑定
        </div>

      </ul>

    </div>
    <el-dialog title="延时关灯" :visible.sync="dialogVisible" width="80%" border-bottom="1px solid #ccc" :modal="false">
      <mt-radio v-model="value5" :options="['5分钟','10分钟','15分钟','关闭']">
      </mt-radio>
    </el-dialog>
    <el-dialog title="哭声监测频率" :visible.sync="dialogVisible1" width="80%" border-bottom="1px solid #ccc" :modal="false">
      <mt-radio v-model="value6" :options="options1">
      </mt-radio>
    </el-dialog>
    <transition name='slide'>
      <router-view/>
    </transition>
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
  name: "indexSet",
  data() {
    return {
      // params:"",
      cryState: false,
      a: false,
      b: false,
      curvercion: "1.1.1",
      value: "1234",
      valueupdate: "",
      value2: true,
      value3: true,
      rangeValue1: global.DEV_CurDeviceData.lightness_max,
      rangeValue2: global.DEV_CurDeviceData.lightness_min,
      value5: "",
      value6: "",
      open3: "",
      num: this.value,
      dialogVisible: false,
      dialogVisible1: false,
      liangdudialogVisible: false,
      namedialogVisible: false,
      radio2: 3,
      dialogshow: false,
      options: [],
      notifyTitle: "",
      notifyDesc: "",
      options1: []
    };
  },
  created() {
    // var num = JSON.parse(localStorage.getItem("devicemac")).indexOf(localStorage.getItem("curScanCode"));
    // this.value = JSON.parse(localStorage.getItem("devicedata"))[num].EqpName;

    // alert(global.DEV_CurDeviceMac)
    // alert(JSON.stringify(global.DEV_ListDeviceMac))

    this.updateinfo();
    this.mqttSub();
  },
  mounted() {
    if (!global.NET_CurDeviceData.TypeID) {
      this.$refs.jiechu.style.display = "none"; //隐藏
    } else {
      this.$refs.update.style.display = "none"; //隐藏
      this.$refs.share.style.display = "none"; //隐藏
    }
    this.getValue();
    if (global.DEV_CurDeviceData.lightness_min == 0) {
      this.a = true;
      this.value2 = false;
    }
    this.getCryNotifyInfo();
  },
  updated() {
    // if (this.value2 == true) {
    //     Message.success({
    //       message: "夜灯模式已开启!",
    //       center: true,
    //       duration: 1000
    //     });
    //   } else {
    //     Message.success({
    //       message: "夜灯模式已关闭!",
    //       center: true,
    //       duration: 1000
    //     });
    //   }
    if (global.DEV_CurDeviceData.lightness_min == 0) {
      this.a = true;
      this.value2 = false;
    }
  },
  mqtt: {
    "#"(data, topic) {
      //consolelog("# ->"+topic + ': ' + String.fromCharCode.apply(null, data))
      // alert("#");
      receiveMqttData(this, data);
    }
  },
  watch: {
    rangeValue1() {
      if (global.DEV_CurDeviceData.lightness_max != this.rangeValue1) {
        global.DEV_CurDeviceData.lightness_max = this.rangeValue1;
      }
    },
    rangeValue2() {
      if (global.DEV_CurDeviceData.lightness_min != this.rangeValue2) {
        global.DEV_CurDeviceData.lightness_min = this.rangeValue2;
      }
    },
    value() {
      if (global.NET_CurDeviceData.EqpName != this.value) {
        global.NET_CurDeviceData.EqpName = this.value;
      }
    },
    value5() {
      var status =
        global.DEV_CurDeviceData.dlytime > 0
          ? global.DEV_CurDeviceData.dlytime + "分钟"
          : "关闭";
      if (status != this.value5) {
        consolelog(this.value5);
        if (this.value5 == "5分钟") global.DEV_CurDeviceData.dlytime = 5;
        else if (this.value5 == "10分钟") global.DEV_CurDeviceData.dlytime = 10;
        else if (this.value5 == "15分钟") global.DEV_CurDeviceData.dlytime = 15;
        else global.DEV_CurDeviceData.dlytime = 0;

        sendMqttPub(this, "setparam", {
          dlytime: global.DEV_CurDeviceData.dlytime
        });
      }
    },
    value6() {
      let not = "";
      if (this.value6 == "高(15秒/次)") not = 15;
      else if (this.value5 == "中(150秒/次)") not = 150;
      else if (this.value5 == "低(300秒/次)")
        global.DEV_CurDeviceData.dlytime = not = 300;
      else not = 0;
      this.setCustomerCryNotifyInfo(not);
    },
    value2() {
      if (this.value2 != global.DEV_CurDeviceData.nightlight_enable) {
        sendMqttPub(this, "setparam", {
          nightlight_enable: this.value2 ? 1 : 0
        });
      }
    },
    value3() {
      if (this.value3 != global.DEV_CurDeviceData.isCryTrue) {
        this.setStartCry(this.value3 == true ? 1 : 0);
      }
    }
  },
  methods: {
    updateinfo() {
      this.curvercion = global.DEV_CurDeviceData.firmwareversion;

      this.value = global.NET_CurDeviceData.EqpName;

      this.valueupdate = this.value;

      this.value2 =
        global.DEV_CurDeviceData.nightlight_enable == 1 ? true : false;

      this.cryIsTrue();
      this.getCryNotifyInfo(); //获取哭声事件设置列表
      this.value5 =
        global.DEV_CurDeviceData.dlytime > 0
          ? global.DEV_CurDeviceData.dlytime + "分钟"
          : "关闭";
    },
    getValue() {
      // this.$router.push( {name:'index6Settings_scope',index6Settings_scope:this.rangeValue2})
      // console.log(this.params)
    },
    mqttSub() {
      //订阅当前硬件mac
      sendMqttSub(
        this,
        localStorage.getItem("curScanCode"),
        localStorage.getItem("curScanPhone")
      );
      sendMqttPub(this, "query");
    },
    mqtt_query_ack(data) {
      consolelog("mqtt_query_ack");
      if (data.status == "query_ok") {
        consolelog("query_ok");
        global.DEV_CurDeviceData = data;
        this.updateinfo();
      } else {
        //alert("query_on");
      }
    },
    mqtt_status_mac(data) {
      consolelog("mqtt_status_mac");
      // this.set_light_status(data)
    },
    mqtt_status_phone(data) {
      consolelog("mqtt_status_phone");
      // this.set_light_status(data)
    },
    mqtt_offline(data) {
      consolelog("mqtt_offline" + this.$route.path);
      this.$parent.loadUserInfo();
      this.$router.push("/index");
    },
    deviceNote() {
      var self = this;
      plus.nativeUI.prompt(
        //plus的prompt
        " ",
        function(e) {
          // console.log((e.index == 0 ? "OK: " : "Cancel") + e.value);
          if (e.index == 0) {
            if (e.value == "" || e.value == null) {
              Message.error({
                message: "输入值不能为空!",
                center: true,
                duration: 1000
              });
            } else {
              // this.namedialogVisible = false;
              // console.log(this.value);
              // this.value = e.value;

              const data = {
                EqpID: global.NET_CurDeviceData.EqpID,
                CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
                EqpName: e.value,
                Position: global.NET_CurDeviceData.Position
              };

              Eq_EquipmentModify(data).then(res => {
                if (res.Code === 1) {
                  self.value = e.value;

                  global.NET_CurDeviceData.EqpName = self.value;
                } else {
                } /*end if*/
              });
            }
          }
        },
        "设备名称",
        "请输入设备名称",
        ["确认", "取消"]
      );

      //设备备注
      // MessageBox.prompt("请输入备注").then(({ value, action }) => {
      //   consolelog(value);

      // });
    },
    cryIsTrue() {
      const data = {
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID
      };

      Vo_IsTurnOnCryAnalysis(data).then(res => {
        consolelog(JSON.stringify(res));
        if (res.Code === 1) {
          global.DEV_CurDeviceData.isCryTrue = res.Data;
          this.value3 = global.DEV_CurDeviceData.isCryTrue;
        } else {
        } /*end if*/
      });
    },
    setStartCry(isTrue) {
      const data = {
        EqpID: global.NET_CurDeviceData.EqpID,
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        isTurnOn: isTrue
      };

      Vo_SetCryAnalysisTurnOn(data).then(res => {
        consolelog(JSON.stringify(res));
        if (res.Code === 1) {
        } else {
        } /*end if*/
      });
    },
    queding() {
      if (this.valueupdate == "") {
        Message.error({
          message: "输入值不能为空!",
          center: true,
          duration: 1000
        });
      } else {
        this.namedialogVisible = false;

        const data = {
          EqpID: global.NET_CurDeviceData.EqpID,
          CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
          EqpName: this.valueupdate,
          Position: global.NET_CurDeviceData.Position
        };

        Eq_EquipmentModify(data).then(res => {
          //alert(JSON.stringify(res));
          /*
            {"Code":1,"Msg":"获取成功",
            "Data":{
              "VersonStr":"2.0",
              "VersionIndex":2,
              "PublicTime":"2018-08-08T00:00:00",
              "DownLoadUrl":"https://api.babygarden.org.cn/api/Equipment/DowloadEqpVersionFile?id=1",
              "UpdateText":"更新了界面11",
              "NumCode":"avsn_lwt"}
             }
            */

          if (res.Code === 1) {
            this.value = this.valueupdate;
            global.NET_CurDeviceData.EqpName = this.value;
          } else {
          } /*end if*/
        });
      }
    },
    quxiao() {
      this.value = this.value;
      this.namedialogVisible = false;
    },

    visibleShow() {
      plus.nativeUI.prompt(
        "请输入内容",
        function(e) {
          var i = e.index;
          consolelog((e.index == 0 ? "OK: " : "Cancel") + e.value);
          if (e.index == 0) {
            //确认
          }
        },
        "nativeUI",
        "内容",
        ["确认", "取消"] // 0|| 1
      );
    },
    // nameclick(){
    //   this.namedialogVisible = true;
    //   this.dialogshow = true;
    // },
    dialogClick() {
      this.dialogVisible = true;
      this.dialogshow = true;
    },
    dialogClick1() {
      this.dialogVisible1 = true;
      this.dialogshow1 = true;
    },

    unbinding_success(d) {
      //手机解除绑定当前硬件成功

      Message.success({
        message: "绑定已解除!",
        center: true,
        duration: 1000
      });

      sendMqttPubMac(this, "binding_share", "B_" + global.DEV_CurDeviceMac, {
        binders: global.DEV_CurDeviceMac
      });
      consolelog("unbinding_success" + this.$route.path);

      this.$parent.loadUserInfo();
      this.$router.push("/index");
    },
    unbinding_failed(d) {
      //手机解除绑定当前硬件失败
      consolelog("unbinding_success" + this.$route.path);
    },
    binding_share_notice(data) {
      consolelog("binding_share_notice : " + data);
      // this.loadUserInfo();
      consolelog("this.$route.path : " + this.$route.path);
      this.$parent.loadUserInfo();
    },
    jiechu() {
      const data = {
        removeCustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        eqpID: global.NET_CurDeviceData.EqpID
      };

      Eq_RemoveFromShareMembers(data).then(res => {
        //alert(JSON.stringify(res));
        if (res.Code === 1) {
          /*

            */
          sendMqttPub(this, "unbinding_req", {
            binders: localStorage.getItem("curScanPhone")
          });
        } else {
          // Message.error({
          //   message: "Meg:" + res.Msg,
          //   center: true,
          //   duration: 1000
          // });
          sendMqttPub(this, "unbinding_req", {
            binders: localStorage.getItem("curScanPhone")
          });
        } /*end if*/
      });
    },
    formatTooltip(val) {
      return val / 100;
    },
    back() {
      this.$router.go(-1);
      return;
    },
    inputclick() {
      // this.namedialogVisible = true;
    },
    liangdu() {},
    loadUserInfo() {
      consolelog("loadUserInfo : " + this.$route.path);

      if (!global.NET_CurDeviceData.TypeID) {
        this.$refs.jiechu.style.display = "none"; //隐藏
      } else {
        this.$refs.update.style.display = "none"; //隐藏
        this.$refs.share.style.display = "none"; //隐藏
      }
    },
    getCryNotifyInfo() {
      //获取哭声事件推送频率设置信息

      const data = {
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        eqpID: global.NET_CurDeviceData.EqpID
      };

      Eq_GetCryNotifyInfo(data).then(res => {
        console.log("Eq_GetCryNotifyInfo");
        console.log(res.Code);
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          console.log(res);
          global.DEV_CurDeviceData.CryNotify = res.Data.NotifyFrequency;
          this.value6 = res.Data.Title + res.Data.Desc;
          //this.value = res.Data;

          this.getCryNotifySettingList();
        } else {
        } /*end if*/
      });
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
          console.log(res);
          this.options1 = [];
          for (var i = 0; i < res.Data.length; i++) {
            this.options1.push(res.Data[i].Title + res.Data[i].Desc);
          }
          console.log(this.options1);
        } else {
        } /*end if*/
      });
    },
    setCustomerCryNotifyInfo(not) {
      //设置客户哭声提醒信息
      const data = {
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        notifyFrequency: not,
        eqpID: global.NET_CurDeviceData.EqpID
      };
      Eq_SetCustomerCryNotifyInfo(data).then(res => {
        console.log("Eq_GetCustomerCryNotifyInfo : ");
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
        } else {
        } /*end if*/
      });
    },
    loadUserInfo() {
      consolelog("loadUserInfo : " + this.$route.path);
      // alert('loadUserInfo');
      this.updateinfo();
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

.index_set {
  background: #eeeaeb;
  .el-icon-arrow-right1 {
    &::after {
      content: "\E604";
    }
  }
  .set {
    background: #eeeaeb;
    font-size: rem(30);
    text-align: left;
    padding: 0.3rem 0 0.3rem 0.2rem;
  }
  .liangdu {
  }
  .el-radio {
    width: 100%;
    text-align: left;
    padding: 0.2rem 0;
  }
  .el-radio + .el-radio {
    margin-left: 0 !important;
  }
  .el-slider__runway {
    width: 80% !important;
  }
  .mint-cell-wrapper {
    background-image: none;
  }
  input {
    border: 1px solid #ccc;
    padding: 0.2rem 0;
    border-radius: 0.1rem;
    width: 80%;
  }

  .mt-range-content .mt-range-progress {
    background-color: #ff0 !important;
  }
  .queding {
    margin-left: -0.8rem;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ccc !important;
  }
  .dialog-footer {
    button {
      padding: 0.4rem 1.4rem;
    }
  }
  .userinfopage_ul {
    li {
      border-bottom: 1px solid #e0e0e0;
      background: #fff;
      background-color: rgba(255, 255, 255, 255);
      color: #000;
      .imgbox {
        float: left;
        img {
          width: rem(90);
          height: rem(90);
          border-radius: 100px;
        }
      }
      #file1 {
        display: none;
      }
      .cn {
        color: #000;
        float: left;
        margin-left: rem(35);
        font-size: rem(34);
        font-weight: bold;
        padding: rem(30) 0;
      }
      .go {
        float: right;
        margin-right: rem(25);
        font-size: rem(32);
        color: #858585;
        padding: rem(30) 0;

        span {
          font-size: rem(30);
          margin-left: rem(18);
          color: #000;
        }
      }

      &:after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
      }
      &.headers {
        padding: rem(18) 0;
        .cn {
          color: #313131;
          float: left;
          margin-left: rem(35);
          font-size: rem(40);
          margin-top: 13px;
        }
        span {
          margin-top: rem(35);
        }
      }
      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
    }
  }
  .jiechu {
    width: 80%;
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    position: relative;
    // bottom: rem(10);
    left: 50%;
    transform: translate(-62%);
    height: rem(100);
    margin: rem(30) auto;
    background-size: 100%;
    line-height: rem(100);
    font-size: rem(35);
    color: #fff;
    border-radius: 0.2rem;
  }
}
</style>


