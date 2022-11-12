<template>
  <div class="blankgap index_wifi">
    <vheader title="选择设备工作的WiFi" :type="1" @back='back'></vheader>
    <div class="container">
      <div class="indexWifi_content">
        <div class="wifi">
          <span>
            <img src="./wifi.png" alt="wifi">
          </span>

          <!--<div class="button" @click="simulateNet()">-->
          <!--模拟配网-->
          <!--</div>-->
          <!--<br>-->
          <!--<div class="button" @click="play0()">-->
          <!--停止-->
          <!--</div>-->
          <!--<br>-->
          <!--<div class="button" @click="play1()">-->
          <!--加载-->
          <!--</div>-->
          <!--<br>-->
          <!--<div class="button" @click="play2()">-->
          <!--暂停-->
          <!--</div>-->
          <!--<br>-->
          <!--<div class="button" @click="play3()">-->
          <!--播放-->
          <!--</div>-->
          <!--<br>-->
          <!--<div class="button" @click="play4()">-->
          <!--拖动-->
          <!--</div>-->
          <!--<br>-->
          <!--<div class="button" @click="play6()">-->
          <!--音量-->
          <!--</div>-->
        </div>
        <div class="choice">
          <div class="">
            <el-input :placeholder="titlessid" v-model="editssid" clearable class="input" readonly="readonly"></el-input>
          </div>
          <div class="">
            <el-input placeholder="WIFI密码" v-model="password" clearable class="input"></el-input>
          </div>
        </div>
        <br>
        <!--<br> {{log1}}-->
        <!--<br> {{log2}}-->
        <div class="next" @click="next()">
          下一步
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
// import { Message } from "element-ui";
// import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import {
  deviceInit,
  getssid,
  airkiss,
  sendMqttSub,
  sendMqttPub,
  receiveMqttData,
  Eq_CheckEquipmentIsExist,
  Eq_BindingEquipment,
  playwav,
  Eq_MyEquipments,
  consolelog,
  encryptionPwd,
  getmac,
  mqtt_send,
  mqtt_self
} from "api/device";

export default {
  name: "indexWifi",
  data() {
    return {
      paringtime: 0,
      buildsuccess: false,
      active: false,
      log1: "",
      log2: "",
      num: true,
      device: "",
      timer: "",
      timerbuild: "",
      timerairkiss: "",
      dlay: "",
      input: "",
      cities: [
        {
          label: "AVSNest"
        },
        {
          label: "AVSNest"
        },
        {
          label: "AVSNest"
        },
        {
          label: "AVSNest"
        },
        {
          label: "AVSNest"
        },
        {
          label: "AVSNest"
        }
      ],
      arr: [],
      mac: [],
      //标题无线广播
      titlessid: "WIFI名称",
      //编辑无线广播
      editssid: "",
      //无线广播
      ssid: "",
      //密码
      password: "",
      // password: "BATEERSOFT888",
      //加密密码
      encpassword: "",
      //二维码
      scancode: localStorage.getItem("curScanCode"),
      //手机号
      scanphone: localStorage.getItem("curScanPhone"),
      //二维码mac地址
      // bor:this.$route.query.border,
      // playurl:"https://api.babygarden.org.cn/api/RecordWave/DownloadRecWave/20180416/20180416152425950"
      // playurl:"http://tts.baidu.com/text2audio?idx=1&tex=%E5%9B%BE%E5%BD%A2%E5%8D%A1&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5",
      playurl:
        "http://dl.stream.qqmusic.qq.com/C4000031fZRT40krSd.m4a?vkey=8AAA266C0B56108858CBE2E1A98DC390E7E50282F89CC64F9514B8209A7E52BF8429B73FC4E5EC8A6A4A397D39F2FA3FF689F36D3DBFA39A&guid=891289948&uin=879628926&fromtag=66"
    };
  },
  created() {
    // alert(this.bor);
    this.initInfo();
  },
  beforeMount() {
    mqtt_self(this);
  },
  mounted() {},
  mqtt: {
    "#"(data, topic) {
      // alert("#");
      // consolelog(
      //   "# ->" + topic + ": " + String.fromCharCode.apply(null, data)
      // );
      consolelog("# ->" + topic + " route : " + this.$route.path);
      receiveMqttData(this, data);
    }
  },
  methods: {
    initInfo() {
      if (deviceInit()) {
        getssid(this);
        this.timer = setInterval(() => {
          getssid(this);
        }, 4000);
      }
      //this.mqttPub();
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
      if (global.DEV_ListDeviceMac.indexOf(this.scancode) > -1) {
        sendMqttPub(this, "query");
      } else {
        Message.error({
          message: "设备已绑定,权限受限!",
          center: true,
          duration: 3000
        });
        this.$parent.loadUserInfo();
        this.$router.push("/index");
      }
    },
    mqtt_query_ack(data) {
      consolelog("mqtt_query_ack : " + JSON.stringify(data));
      this.num = 0;
      if (data != {}) {
        global.DEV_CurDeviceMac = this.scancode;
        global.NET_CurDeviceData =
          global.NET_ListDeviceData[
            global.DEV_ListDeviceMac.indexOf(global.DEV_CurDeviceMac)
          ];
        this.$router.push("index5Light");
      }
      // this.isactive();
    },
    back() {
      if (deviceInit()) airkiss(this.editssid, this.encpassword, this, 1);
      clearInterval(this.timer);
      clearTimeout(this.timerairkiss);
      clearTimeout(this.dlay);
      if (this.device != "") {
        this.device.close();
        this.device = "";
      }
      this.$router.go(-1);
      return;
    },
    next() {
      if (this.ssid == "") {
        // if(plus!=undefined)
        //   plus.nativeUI.alert( "" +
        //     "请连接无线WIFI网络", function(){
        //     console.log( "WIFI" );
        //   }, "提示", "好的" );
        Message.error({
          message: "请连接无线WIFI网络",
          center: true,
          duration: 2300
        });
        return;
      }

      if (this.device == "") {
        clearInterval(this.timer);
        clearTimeout(this.timerairkiss);
        this.device = Toast({
          message: "设备正在配置WiFi中...",
          position: "middle",
          duration: 60000,
          className: "device"
        });
        this.dlay = setTimeout(() => {
          if (this.device != "") {
            this.device.close();
            this.device = "";
          }
          airkiss(this.editssid, this.encpassword, this, 1);
          clearInterval(this.timer);
          clearTimeout(this.timerairkiss);
          this.$router.push("indexFail");
        }, 60000);
        // this.mqttSub();
        if (this.editssid == "") {
          this.editssid = this.ssid;
        }

        this.encpassword = encryptionPwd(this.password);
        airkiss(this.editssid, this.encpassword, this, 0);
        this.timerairkiss = setInterval(() => {
          this.paringtime += 1000;

          if (this.paringtime == 30000)
            airkiss(this.editssid, this.encpassword, this, 0);
          else airkiss(this.editssid, this.encpassword, this, 2);
        }, 1000);
      }
    },
    getssid_success(data) {
      if (data != null && data != "") {
        this.ssid = data;
        if (this.editssid == "") this.titlessid = this.ssid;
        else this.titlessid = "可修改WIFI名称";
      } else {
        this.titlessid = "请连接无线WIFI网络";
        this.ssid = "";
        if (this.num) {
          this.num = false;
          this.next();
        }
      }
    },
    getssid_failed(data) {
      consolelog("getssid_failed :" + data + " route : " + this.$route.path);
    },
    airkiss_success(data) {
      var cmd = data.data.action;

      switch (cmd) {
        case 0:
          {
            consolelog(
              "airkiss_start :" +
                JSON.stringify(data) +
                " route : " +
                this.$route.path
            );
          }
          break;

        case 1:
          {
            consolelog(
              "airkiss_close :" +
                JSON.stringify(data) +
                " route : " +
                this.$route.path
            );
          }
          break;

        case 2:
          {
            if (data.data.airkiss == 2 && data.data.mac != "") {
              clearTimeout(this.timerairkiss);
              airkiss(this.editssid, this.encpassword, this, 1);
              this.scancode = getmac(data.data.mac);
              localStorage.setItem("curScanCode", this.scancode);
              localStorage.setItem(
                "curScanPhone",
                JSON.parse(localStorage.getItem("userdata")).PhoneNum
              );
              consolelog(
                "airkiss_success :" + data + " route : " + this.$route.path
              );

              this.mqttSub();
              this.mqtt_online({ sender: this.scancode });
            } else if (data.data.airkiss == 1) {
              consolelog(
                "airkiss_paring :" +
                  JSON.stringify(data) +
                  " route : " +
                  this.$route.path
              );
            } else if (data.data.airkiss == 0) {
              consolelog(
                "airkiss_paring_faile :" +
                  JSON.stringify(data) +
                  " route : " +
                  this.$route.path
              );
              if (this.device != "") {
                this.device.close();
                this.device = "";
              }
              clearInterval(this.dlay);
              clearInterval(this.timer);
              clearTimeout(this.timerairkiss);
              this.$router.push("indexFail");
            }
          }
          break;

        default:
          break;
      }
    },
    airkiss_failed(data) {
      consolelog("airkiss_failed :" + data + " route : " + this.$route.path);
      this.$router.push("indexFail");
    },
    mqtt_online(data) {
      Message.success({
        message: "设备配网成功",
        center: true,
        duration: 5000
      });

      clearInterval(this.timer);
      clearTimeout(this.timerairkiss);

      consolelog("mqtt_online :" + data + " route : " + this.$route.path);
      consolelog(
        "this.scancode :" + this.scancode + " route : " + this.$route.path
      );

      if (data.sender == this.scancode) {
        if (global.DEV_ListDeviceMac.indexOf(this.scancode) != -1) {
          this.isactive();
        } else {
          // mqtt_send(this, localStorage.getItem("curScanPhone"));
          // mqtt_send(this, "B_"+this.scancode);
          sendMqttPub(this, "binding_req", {
            binders: localStorage.getItem("curScanPhone")
          });
          this.timerbuild = setInterval(() => {
            // mqtt_send(this, localStorage.getItem("curScanPhone"));
            // mqtt_send(this, "B_"+this.scancode);
            sendMqttPub(this, "binding_req", {
              binders: localStorage.getItem("curScanPhone")
            });
          }, 4000);
        }
      }
      // else alert("二维码有误");
    },
    mqtt_offline(data) {
      consolelog("mqtt_offline :" + data + " route : " + this.$route.path);
    },
    mqtt_status_mac(data) {
      consolelog("mqtt_status_mac :" + data + " route : " + this.$route.path);
    },
    mqtt_status_phone(data) {
      consolelog("mqtt_status_phone :" + data + " route : " + this.$route.path);
    },
    binding_success() {
      //手机绑定当前硬件成功

      if (this.buildsuccess == false) {
        this.buildsuccess = true;

        clearInterval(this.timerbuild);

        this.log1 = "设备已激活,绑定设备成功";
        consolelog("binding_success" + this.$route.path);

        this.isactive();
      }
    },
    binding_failed() {
      //手机绑定当前硬件失败

      clearInterval(this.timerbuild);
      clearTimeout(this.dlay);
      if (this.device != "") {
        this.device.close();
        this.device = "";
      }

      Message.error({
        message: "设备配网成功,绑定设备失败",
        center: true,
        duration: 5000
      });
      this.log1 = "设备已激活,绑定设备失败";
      consolelog("binding_failed" + this.$route.path);
    },
    devicebinding() {
      if (this.device != "") {
        this.device.close();
        this.device = "";
      }

      // alert("devicebinding");
      const data = {
        EqpName: "",
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        MacStr: "0.0.0.0",
        IPStr: "0.0.0.0",
        ModelNum: 1,
        Position: "",
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

          this.getMyEquipments();
        } else if (res.Code === -109) {
          // Message.error({
          //   message: res.Msg + " 重复绑定",
          //   center: true,
          //   duration: 1300
          // });
          // this.$router.push("index5Light");
          this.getMyEquipments();
        } else {
          Message.error({
            message: res.Msg + " 绑定失败",
            center: true,
            duration: 1300
          });
        } /*end if*/

        clearTimeout(this.dlay);
        if (this.device != "") {
          this.device.close();
          this.device = "";
        }
      });
    },
    isactive() {
      // alert('isactive');

      mqtt_send(this, localStorage.getItem("curScanPhone"));
      mqtt_send(this, "B_" + this.scancode);
      this.log2 = "订阅Mac地址:B_" + this.scancode;

      const data = {
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpMacStr: localStorage.getItem("curScanCode")
      };
      Eq_CheckEquipmentIsExist(data).then(res => {
        // alert("Eq_CheckEquipmentIsExist");
        // alert(JSON.stringify(res));
        if (res.Code === 1) {
          if (res.Data == true) {
            //激活
            this.active = true;
            this.log1 = "设备已激活,开始绑定设备,binding_req";
          } else {
            this.active = false;
          }

          if (global.DEV_ListDeviceMac.indexOf(this.scancode) != -1)
            this.getMyEquipments();
          else this.devicebinding();
        } else {
          Message.error({
            message: res.Msg + " 绑定失败",
            center: true,
            duration: 1300
          });

          clearInterval(this.timerbuild);
          clearTimeout(this.dlay);
          if (this.device != "") {
            this.device.close();
            this.device = "";
          }
        } /*end if*/
      });
    },
    getMyEquipments() {
      /*
      * {"Code":1,"Msg":"获取成功","Data":[{"EqpID":134,"EqpName":"sample string 1","TypeID":0,"BindStatus":1,"Position":"sample string 5","EqpMacStr":"3094f664aea468268e8cd8","ShareNiceName":null,"ShareHeaderImage":null}]}
      * */
      var self = this;
      let data =
        "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
      Eq_MyEquipments(data).then(res => {
        consolelog("Eq_MyEquipments : " + JSON.stringify(res));
        consolelog("this.scancode : " + this.scancode);
        consolelog("self.scancode : " + self.scancode);
        if (res.Code === 1) {
          // Message.success({
          //   message: res.Msg+" 设备列表获取成功",
          //   center: true,
          //   duration: 1300
          // });

          var data_arr = res.Data;
          // this.arr.push({status:1,EqpID:135,EqpName:"sample string 2",TypeID:0,BindStatus:-1,Position:"sample string 5",EqpMacStr:"2094f664aea468268e8cd8",ShareNiceName:null,ShareHeaderImage:null})
          // this.arr.push({status:1,EqpID:136,EqpName:"sample string 3",TypeID:0,BindStatus:0,Position:"sample string 5",EqpMacStr:"4094f664aea468268e8cd8",ShareNiceName:null,ShareHeaderImage:null})
          var isTrue = false;
          for (let key in data_arr) {
            data_arr[key].DevStatusStr = "设备离线";
            if (data_arr[key].EqpMacStr == this.scancode) {
              consolelog("设备在线 : " + this.scancode);
              isTrue = true;
              data_arr[key].DevStatusStr = "设备在线";
              localStorage.setItem("curScanCode", this.scancode);
              localStorage.setItem(
                "curScanPhone",
                JSON.parse(localStorage.getItem("userdata")).PhoneNum
              );

              global.DEV_CurDeviceMac = this.scancode;

              // if(this.arr[index].BindStatus==-1)
              // {
              //   alert('授权绑定');
              //   this.$router.push('index/index6Settings_invite')
              // }
              // else
              // {
              //   this.$router.push("index/index5Light")
              // }
            }
            this.mac.push(data_arr[key].EqpMacStr);
            this.arr.push(data_arr[key]);
          }
          global.DEV_ListDeviceMac = this.mac;
          global.NET_ListDeviceData = this.arr;
          if (global.DEV_ListDeviceMac.indexOf(global.DEV_CurDeviceMac) != -1)
            global.NET_CurDeviceData =
              global.NET_ListDeviceData[
                global.DEV_ListDeviceMac.indexOf(global.DEV_CurDeviceMac)
              ];
          if (this.device != "") {
            this.device.close();
            this.device = "";
          }
          clearInterval(this.timer);
          clearTimeout(this.timerairkiss);
          clearTimeout(this.dlay);

          if (this.active == false) this.$router.push("index4Success");
          else {
            if (isTrue) {
              this.$router.push("index5Light");
            } else {
              this.$parent.loadUserInfo();
              this.$router.push("/index");
            }
          }
        } else {
          Message.error({
            message: res.Msg + " 设备列表失败",
            center: true,
            duration: 1300
          });
        } /*end if*/
      });
    },
    simulateNet() {
      this.$router.push("index4Success");
    },
    play0() {
      alert("停止");
      clearInterval(this.timer);
      clearTimeout(this.timerairkiss);
      clearInterval(this.timer);
      clearTimeout(this.timerairkiss);
      playwav(this.playurl, 0, this);
    },
    play1() {
      alert("加载");
      clearInterval(this.timer);
      clearTimeout(this.timerairkiss);
      playwav(this.playurl, 1, this);
    },
    play2() {
      alert("暂停");
      clearInterval(this.timer);
      clearTimeout(this.timerairkiss);
      playwav(this.playurl, 2, this);
    },
    play3() {
      alert("继续");

      this.timer = setInterval(() => {
        this.play5();
      }, 500);

      playwav(this.playurl, 3, this);
    },
    play4() {
      alert("拖动");
      playwav(this.playurl, 4, this, 143);
    },
    play5() {
      // alert('进度');
      playwav(this.playurl, 5, this);
    },
    play6() {
      // alert('音量');
      playwav(this.playurl, 6, this, 0.5);
    },
    playwav_success(data) {
      consolelog(
        "duration = " +
          data.data.duration +
          " ,playing = " +
          data.data.playing +
          " ,curtime = " +
          data.data.curtime +
          " ,volume = " +
          data.data.volume
      );
      if (!data.data.playing) {
        clearInterval(this.timer);
        clearTimeout(this.timerairkiss);
      }
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
.index_wifi {
  .wifi {
    width: 100%;
    span {
      display: block;
      margin: 0 auto;
      margin-top: rem(200);
      width: rem(150);
      height: rem(150);
      img {
        width: rem(150);
        height: rem(150);
      }
    }
  }
  .choice {
    margin-top: rem(50);
  }
  .el-select {
    width: rem(600);
  }
  .abc {
    width: 50% !important;
    height: 50% !important;
  }
  .input {
    // border:1px solid #ccc;
    width: 80%;
    border-top: none;
  }
  input::-webkit-input-placeholder {
    color: #ccc !important;
  }
  .el-select-dropdown .el-popper {
    position: absolute;
    top: 2.97rem !important;
    left: 3.9rem !important;
  }
  .next {
    width: 80%;
    margin: 0 auto;
    margin-top: rem(150);
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    border-radius: 5px;
    height: rem(90);
    background-size: 100% 100%;
    line-height: rem(90);
    font-size: rem(40);
    color: #fff;
  }
  .device {
    width: 60%;
    height: 30%;
    background-color: #fff;
  }
}
</style>
