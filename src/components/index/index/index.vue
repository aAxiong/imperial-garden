<template>
  <div class="page index" :style="'height:'+screenHeight+'px;'">
    <router-link to="index/index_mess" class="messge">
      <img :src='imgURl'>
    </router-link>
    <vheader title="智能设备" :type="2" :iconclass='icon' @otherclick='add'></vheader>
    <div class="container">
      <div class="navbar">
        <nav :class="{active:lengBoolen}" id='nav'>
          <p v-for="(item,$index) in arr" @click="toggle($index)" :class="{active:$index==active}" v-show="item.BindStatus==1">{{item.EqpName}}</p>
          <span v-show="(arr.length-bindarr.length-nobindarr.length)==0">{{isNetWork==false?'网络似乎开小差了...':'未绑定设备'}}</span>
          <!--<span v-show="(arr.length-bindarr.length-nobindarr.length)==0">{{global.NETWORK==false?'网络似乎开小差了...':'未绑定设备'}}</span>-->
        </nav>

      </div>
      <div class="contentBox">
        <router-link :to="{path:'index/index_nightCare',query:{'index':active}}" class="nightbox" @click="modelfun(0)">
          <div class="tit">夜晚照料</div>
          <div class="con">
            {{devinfo.ChildCareScore}}
            <span>{{devinfo.ChildCareTitle}}</span>
          </div>
        </router-link>
        <router-link :to="{path:'index/indexbBackRadio',query:{'index':active}}" class="radiobox" @click="modelfun(1)">
          <div class="tit">回溯录制</div>
          <div class="con">
            <span>{{devinfo.VoiceRecordTitle}}</span>
          </div>
        </router-link>
        <router-link :to="{path:'index/index7DataAnalysis',query:{'index':active}}" class="notebox" @click="modelfun(2)">
          <div class="tit">动态记录
            <span>可添加</span>
          </div>
          <div class="con">
            {{devinfo.BabyEventTime}}
            <span>{{devinfo.BabyEventTitle}}</span>
          </div>
        </router-link>
        <div class="crybox" @click="modelfun(3)">
          <div class="tit">哭闹分析</div>
          <div class="con">
            {{devinfo.CryAnalysisTime}}
            <span>{{devinfo.CryAnalysisTitle}}</span>
          </div>
        </div>
        <div class="settingbox" @click="modelfun(4)">
          <div class="tit">操作界面
            <span>{{arr.length>active?(arr[active].BindStatus!=1?"未绑定设备":arr[active].DevStatusStr):""}}</span>
          </div>
        </div>
        <router-link :to="{name:'indexShopingMall',query: {'herf':devinfo.PurchaseUrl}}" class="shopingbox" @click="modelfun(5)">
          <div class="tit">购买</div>
        </router-link>
      </div>
      <div class="parnetlight">
        <router-link :to="{name:'indexParentLamp',query:{'herf':devinfo.MovieUrl}}">
          关于亲子灯
          <img src='./play@2x.png'>
        </router-link>
      </div>
      <!-- <ul>
        <li v-for="(item,index) in arr" :key="item.index" :class="[classA]" @click="clickdevice(item.EqpMacStr)" v-show="item.BindStatus==0?false:true">
          <div class="img">
            <img src='./icon@2x.png'>
          </div>
          <span>{{item.EqpName}}</span>
          <span v-show="item.BindStatus==1?true:false" class="state" :class="{'active':item.DevStatusStr=='设备在线'}">{{item.DevStatusStr}}</span>
          <div class="share" v-show="item.BindStatus==-1?true:false">
            <div class="share1">

              <p class="text"><img :src="item.ShareHeaderImage">{{item.ShareNiceName+content}}</p>
            </div>
          </div>
        </li>
      </ul> -->

    </div>
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
  sendMqttSubTest,
  sendMqttPubMac,
  sendMqttSub,
  sendMqttPub,
  receiveMqttData,
  Eq_GetEqpRegistInfo,
  Eq_BindingEquipment,
  Eq_MyEquipments,
  Vo_GetEquipmentHomeData,
  Vo_GetTheLastBabyCryReason,
  mqtt_init,
  mqtt_self,
  mqtt_enc_dec,
  consolelog,
  setstatusbar,
  initglobaldata,
  setNotice
} from "api/device";
import vConsole from "vconsole";
export default {
  data() {
    return {
      isNetWork: global.NETWORK,
      timer: "",
      testnum: 0,
      icon: "el-icon-circle-plus-outline",
      classA: "class-a",
      bol: true,
      deviceTrue: "设备在线",
      deviceFalse: "设备离线",
      imgUrl: require("./reg_icon.png"),
      shareBol: false,
      content: "向你共享设备",
      arr: [],
      mac: [],
      bindarr: [],
      nobindarr: [],
      status: {},
      active: 0,
      havemess: false,
      imgURl: require("./mess_no@2x.png"),
      arr1: [],
      lengBoolen: false,
      screenHeight: "",
      devinfo: {
        ChildCareTitle: "",
        ChildCareScore: "",
        VoiceRecordTitle: "",
        BabyEventTime: "",
        BabyEventTitle: "",
        CryAnalysisTime: "",
        CryAnalysisTitle: "",
        PurchaseUrl: "https://item.jd.com/20471156395.html?dist=jd",
        MovieUrl:
          "https://v.youku.com/v_show/id_XMzYzNjI0OTMwMA==.html?spm=a2h0k.11417342.soresults.dtitle"
      }
    };
  },
  watch: {
    arr1: {
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          //判断导航条内容总宽度是否超过 body 宽度
          let p = document.getElementById("nav").getElementsByTagName("p");
          let count = 0;
          let bodyWidth = document.body.clientWidth;
          for (let i = 0; i < newValue.length; i++) {
            count += p[i].clientWidth;
          }
          console.log(count < bodyWidth);
          if (count < bodyWidth) {
            this.lengBoolen = true;
          }
          return count;
        });
      },
      deep: true
    },
    havemess: {
      handler(newValue, oldValue) {
        if (newValue == true) {
          this.imgURl = require("./mess_pess@2x.png");
        } else {
          this.imgURl = require("./mess_no@2x.png");
        }
      },
      deep: true
    }
  },
  created() {
    this.screenHeight = document.body.clientHeight;
    if (
      localStorage.getItem("userdata") != null &&
      JSON.parse(localStorage.getItem("userdata")).BirthDay == null
    ) {
      //判断如果注册完信息未完善会跳到完善信息
      // Message.info({
      //   type: "info",
      //   message: "需要继续完善信息",
      //   center: true,
      //   duration: 1000
      // });
      // setTimeout(this.$router.push({ path: "login/perfectInfo" }), 2000);
      // return;
      localStorage.removeItem("userdata");
    }
  },
  beforeMount() {
    if (localStorage.getItem("userdata") != null) {
      console.log("beforeMount");
      mqtt_self(this);

      this.imgurl = JSON.parse(localStorage.getItem("userdata")).HeadImageUrl;
      this.$nextTick(() => {
        //判断导航条内容总宽度是否超过 body 宽度
        let p = document.getElementById("nav").getElementsByTagName("p");
        let count = 0;
        let bodyWidth = document.body.clientWidth;
        for (let i = 0; i < this.arr.length; i++) {
          count += p[i].clientWidth;
        }
        if (count < bodyWidth) {
          this.lengBoolen = true;
        }
      });
      var time = new Date();
      var sec = parseInt(time - global.DEV_ListDeviceMacTime) / 1000;
      consolelog(sec);
      if (
        global.DEV_ListDeviceMac.length > 0 &&
        sec < 30 &&
        this.isNetWork == true
      ) {
        this.mac = global.DEV_ListDeviceMac;
        this.arr = global.NET_ListDeviceData;
        this.updateListData();
      } else this.getMyEquipments();
    }
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  destroyed() {},
  mqtt: {
    "#"(data, topic) {
      consolelog("# ->" + topic + " route : " + this.$route.path);
      receiveMqttData(this, data);
    }
  },
  methods: {
    MqttLinkStatus(status) {
      console.log("MQTT 链接回调:", status);
      if (status == 2) {
        console.log("MQTT 链接回调成功");

        this.getMyEquipments();
      } else if (status == -1) {
        console.log("MQTT 链接 失败123");
        // this.getMyEquipments();
      }
    },
    modelfun(index) {
      console.log(index);
      switch (index) {
        case 0: //夜晚照料
          {
            consolelog("夜晚照料");
          }
          break;
        case 1: //回溯录制
          {
            consolelog("回溯录制");
          }
          break;
        case 2: //动态记录
          {
            consolelog("动态记录");
          }
          break;
        case 3: //哭闹分析
          {
            consolelog("哭闹分析");
            global.NET_LexemeAnalysis = "";
            this.$router.push("index/index7DataAnalysis_cryanalyze");
          }
          break;
        case 4: //操作界面
          {
            if (localStorage.getItem("userdata") == null) {
              Message.info({
                type: "info",
                message: "尚未登录",
                center: true,
                duration: 1000
              });
              this.$router.push("/login");

              return;
            }

            consolelog("操作界面");
            if (
              global.NET_ListDeviceData[this.active] != "" &&
              global.NET_ListDeviceData[this.active] != undefined
            ) {
              if (
                global.NET_ListDeviceData[this.active].DevStatusStr ==
                "设备在线"
              )
                this.clickdevice(global.DEV_ListDeviceMac[this.active], true);
              else
                consolelog(
                  "设备 ：" +
                    global.NET_ListDeviceData[this.active].DevStatusStr
                );
            } else consolelog("没有设备");
          }
          break;
        case 5: //购买
          {
            consolelog("购买");
          }
          break;
        default:
          break;
      }
    },
    toggle(index) {
      //切换
      this.active = index;
      console.log(index);

      global.DEV_CurDeviceMac = global.DEV_ListDeviceMac[this.active];
      this.clickdevice(global.DEV_CurDeviceMac, false);
    },
    mqttSub(mac) {
      //订阅硬件mac
      sendMqttSub(this, mac);
    },
    mqttPubOnline() {
      sendMqttPubMac(this, "online");
    },
    mqtt_online(data) {
      consolelog("mqtt_online" + this.$route.path);

      this.setlightstatus("设备在线", data);
    },
    mqtt_offline(data) {
      consolelog("mqtt_offline" + this.$route.path);

      this.setlightstatus("设备离线", data);
    },
    mqtt_status_mac(data) {
      consolelog("mqtt_status_mac" + this.$route.path);

      this.setlightstatus("设备在线", data);
    },
    mqtt_status_phone(data) {
      consolelog("mqtt_status_phone" + this.$route.path);

      this.setlightstatus("设备在线", data);
    },
    mqtt_query_ack(data) {
      consolelog("index mqtt_query_ack" + this.$route.path);
      if (data.status == "query_ok") {
        global.DEV_CurDeviceData = data;

        consolelog("query_ok :" + JSON.stringify(global.DEV_CurDeviceData));
        this.setlightstatus("设备在线", data);
      } else {
        alert("query_on");
      }
    },
    setlightstatus(status, data) {
      // console.log(
      //   "setlightstatus global.DEV_ListDeviceMac : ",
      //   global.DEV_ListDeviceMac,
      //   " data : " + data.sender
      // );
      var i = global.DEV_ListDeviceMac.indexOf(data.sender);
      if (this.$route.path == "/index" && i > -1) {
        global.NET_ListDeviceData[i].DevStatusStr = status;
        this.arr[i].DevStatusStr = status;
      } else consolelog("mqtt_status_phone error" + this.$route.path);
    },
    binding_success() {
      //手机绑定当前硬件成功
      consolelog("binding_success" + this.$route.path);
    },
    binding_failed() {
      //手机绑定当前硬件失败
      consolelog("binding_failed" + this.$route.path);
    },
    upgrade_req_success() {
      consolelog("更新成功" + this.$route.path);
    },
    upgrade_req_failed() {
      consolelog("更新失败" + this.$route.path);
    },
    binding_share_notice(data) {
      consolelog("binding_share_notice : " + data);
      this.loadUserInfo();
    },
    getarr() {
      //res.data
      this.arr = [
        {
          imgUrl: "./icon@2x.png",
          name: "智能哭声检查灯1",
          state: 0
        },
        {
          imgUrl: "./icon@2x.png",
          name: "智能哭声检查灯2",
          state: 1
        },
        {
          imgUrl: "./icon@2x.png",
          name: "智能哭声检查灯3",
          state: 2
        }
      ];

      this.arr.push({
        imgUrl: "./icon@2x.png",
        name: "智能哭声检查灯2",
        state: 1
      });

      //判断数组的长度 根据数组的长度，显示不同的样式
      if (this.arr.length === 1) {
        this.classA = "class-a";
      } else if (this.arr.length === 2) {
        this.classA = "class-b";
      } else {
        this.classA = "class-c";
      }
    },
    getTheLastBabyCryReason() {
      consolelog("getTheLastBabyCryReason");
      var data =
        "?custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&eqpID=" +
        global.NET_CurDeviceData.EqpID;
      Vo_GetTheLastBabyCryReason(data).then(res => {
        // alert('Vo_GetEquipmentHomeData');
        consolelog(JSON.stringify(res));
        if (res.Code === 1) {
          global.NET_LexemeAnalysis = res.Data;

          // self.$router.push({
          //   name: "index7DataAnalysis_cryanalyze"
          // });
        }
      });
    },
    getEquipmentHomeData() {
      consolelog("getEquipmentHomeData");
      var self = this;
      var data =
        "?custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&eqpID=" +
        global.NET_CurDeviceData.EqpID +
        "&currentTime=" +
        "";

      Vo_GetEquipmentHomeData(data).then(res => {
        // alert('Vo_GetEquipmentHomeData');
        consolelog(JSON.stringify(res));

        /*
      * {"Code":1,"Msg":"请求成功",
      * "Data":{
      * "ChildCareTitle":"",
      * "ChildCareScore":"",
      * "VoiceRecordTitle":"",
      * "BabyEventTime":"19:03",
      * "BabyEventTitle":"啼哭",
      * "CryAnalysisTime":"19:03",
      * "CryAnalysisTitle":"待确认",
      * "PurchaseUrl":"https://item.jd.com/20471156395.html?dist=jd?dist=jd",
      * "MovieUrl":"https://v.youku.com/v_show/id_XMzYzNjI0OTMwMA==.html?spm=a2h0k.11417342.soresults.dtitle"}}
      * */
        if (res.Code === 1) {
          this.devinfo = res.Data;
        } else {
        } /*end if*/
      });
    },
    getMyEquipments() {
      global.DEV_ListDeviceMacTime = new Date();
      consolelog("index getMyEquipments");
      /*
      * {"Code":1,"Msg":"获取成功","Data":[{"EqpID":134,"EqpName":"sample string 1","TypeID":0,"BindStatus":1,"Position":"sample string 5","EqpMacStr":"3094f664aea468268e8cd8","ShareNiceName":null,"ShareHeaderImage":null}]}
      * */

      var self = this;
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
          // this.arr.push({status:1,EqpID:135,EqpName:"sample string 2",TypeID:0,BindStatus:-1,Position:"sample string 5",EqpMacStr:"2094f664aea468268e8cd8",ShareNiceName:null,ShareHeaderImage:null})
          // this.arr.push({status:1,EqpID:136,EqpName:"sample string 3",TypeID:0,BindStatus:0,Position:"sample string 5",EqpMacStr:"4094f664aea468268e8cd8",ShareNiceName:null,ShareHeaderImage:null})

          var testarr = [];
          var testmac = [];

          for (let key in data_arr) {
            data_arr[key].DevStatusStr = "设备离线";
            testmac.push(data_arr[key].EqpMacStr);
            testarr.push(data_arr[key]);
            sendMqttSub(self, data_arr[key].EqpMacStr);
          }

          this.arr = testarr;//.reverse()
          this.mac = testmac;//.reverse()

          global.DEV_ListDeviceMac = this.mac;
          global.NET_ListDeviceData = this.arr;

          sendMqttSub(self);
          this.mqttPubOnline();

          if (testarr.length <= 0) {
            initglobaldata();
            return;
          }
          global.DEV_ListDeviceMac = this.mac;
          global.NET_ListDeviceData = this.arr;

          this.updateListData();

          //
          // consolelog("global.DEV_ListDeviceMac :" + global.DEV_ListDeviceMac);
          // consolelog("global.NET_ListDeviceData :" + global.NET_ListDeviceData);
          // localStorage.setItem("devicedata", JSON.stringify(res.Data));
          // localStorage.setItem("devicemac", JSON.stringify(this.mac));
          //
          // if (this.arr.length === 1) {
          //   this.classA = "class-a";
          // } else if (this.arr.length === 2) {
          //   this.classA = "class-b";
          // } else {
          //   this.classA = "class-c";
          // }
          //
          // consolelog(JSON.stringify(this.arr));
          //
          // if (this.arr.length > 0) {
          //
          //   sendMqttSub(self);
          //   this.mqttPubOnline();
          // }
        } else {
          Message.error({
            message: res.Msg + " 设备列表失败",
            center: true,
            duration: 1300
          });
        } /*end if*/
      });
    },
    updateListData() {
      if (global.DEV_ListDeviceMac.length > 0) {

        var index = 0;
        if(global.DEV_CurDeviceMac && global.DEV_CurDeviceMac!="")
        {
          index = global.DEV_ListDeviceMac.indexOf(global.DEV_CurDeviceMac);
        }
        this.active = index;

        this.clickdevice(global.DEV_ListDeviceMac[index], false);

        this.bindarr = [];
        for (let key in global.NET_ListDeviceData) {
          if (global.NET_ListDeviceData[key].BindStatus == -1) {
            if (this.bindarr.indexOf(global.NET_ListDeviceData[key]) == -1)
              this.bindarr.push(global.NET_ListDeviceData[key]);
          }
          if (global.NET_ListDeviceData[key].BindStatus == 0) {
            if (this.nobindarr.indexOf(global.NET_ListDeviceData[key]) == -1)
              this.nobindarr.push(global.NET_ListDeviceData[key]);
          }
        }
        global.NET_ListBindData = this.bindarr;

        this.havemess = global.NET_ListBindData.length == 0 ? false : true; //更改这个值就可以显示是否有消息了 true 有
      }
    },
    clickdevice(mac, istrue) {
      global.DEV_CurDeviceMac = mac;
      var index = global.DEV_ListDeviceMac.indexOf(mac);
      consolelog("mac : " + mac + " index:" + index + " istrue:" + istrue);

      //if ((index > -1 && this.arr[index].DevStatusStr == "设备在线") || this.arr[index].BindStatus == 1)
      if (index > -1) {
        localStorage.setItem(
          "curScanCode",
          global.NET_ListDeviceData[index].EqpMacStr
        );
        localStorage.setItem(
          "curScanPhone",
          JSON.parse(localStorage.getItem("userdata")).PhoneNum
        );

        global.DEV_CurDeviceMac = global.NET_ListDeviceData[index].EqpMacStr;
        consolelog("global.DEV_CurDeviceMac : " + global.DEV_CurDeviceMac);
        global.NET_CurDeviceData = global.NET_ListDeviceData[index];
        consolelog(
          "global.NET_CurDeviceData : " +
            JSON.stringify(global.NET_CurDeviceData)
        );

        if (istrue == true) {
          if (global.NET_ListDeviceData[index].BindStatus == -1) {
            this.$router.push("index/index6Settings_invite");
          } else {
            this.$router.push("index/index5Light");
          }
        } else {
          sendMqttPubMac(this, "query", global.DEV_CurDeviceMac);
          this.getEquipmentHomeData();
        }
      } else if (istrue == true) {
        // alert("请检查设备连接状态");
      }
    },
    MqttReceiveData(status, data) {
      consolelog("MqttReceiveData status : " + status + " data : " + data);
      // switch (status) {
      //   case 1:
      //     consolelog("MQTT 连接成功");
      //     break;
      //   case 2:
      //     consolelog("MQTT 连接断开");
      //     break;
      //   case 3:
      //     receiveMqttData(this, data);
      //     break;
      // }
    },
    add() {
      this.$router.push("index/index0Add_reset");
    },
    device() {
      this.$router.push("index/index6Settings_invite");
    },
    loadUserInfo() {
      consolelog("loadUserInfo : " + this.$route.path);
      // alert('loadUserInfo');
      this.getMyEquipments();
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
.index {
  position: relative;
  .messge {
    display: block;
    position: absolute;
    top: rem(64);
    left: rem(20);
    z-index: 2;
    width: rem(56);
    height: rem(44);
    img {
      width: 100%;
      height: 100%;
    }
  }
  > .container {
    text-align: left;
    background: #ededed;
    background-color: #e0e0e0;
    height: 15.5rem;
    width: 100%;
    // overflow: hidden;
    .parnetlight {
      width: rem(309);
      line-height: rem(48);
      @include bg-image("./kuang");
      background-size: 100%;
      background-repeat: no-repeat;
      vertical-align: middle;
      text-align: center;
      font-size: 16px;
      color: #686868;
      img {
        width: rem(48);
        height: rem(48);
        vertical-align: middle;
        float: right;
      }
    }
    .contentBox {
      text-align: center;
      margin-top: rem(20);
      > a,
      > div {
        display: inline-block;
        width: rem(295);
        height: rem(285);
        margin: 0 rem(10);
        margin-bottom: rem(10);
        background-size: 100%;
        background-repeat: no-repeat;
        position: relative;
        .tit {
          position: absolute;
          top: rem(30);
          left: rem(20);
          color: #fff;
          font-size: rem(36);
          span {
            text-align: left;
            color: #fff;
            display: block;
            font-size: 12px;
            margin-top: rem(20);
          }
        }
        .con {
          position: absolute;
          bottom: rem(20);
          left: rem(20);
          color: #fff;
          font-size: 12px;
          text-align: left;
          span {
            text-align: left;
            color: #fff;
            display: block;
            font-size: 16px;
            margin-top: rem(10);
          }
        }
        &.nightbox {
          @include bg-image("./night");
        }
        &.radiobox {
          @include bg-image("./radio");
        }
        &.notebox {
          @include bg-image("./note");
        }
        &.crybox {
          @include bg-image("./cry");
        }
        &.settingbox {
          @include bg-image("./setting");
        }
        &.shopingbox {
          @include bg-image("./shopping");
        }
      }
    }
    .navbar {
      height: rem(84);
      overflow: hidden;
      background: #fff;
      nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: middle;
        -ms-flex-align: middle;
        align-items: middle;
        overflow: auto;
        text-align: center;
        &.active {
          justify-content: center;
        }
        p {
          display: inline-block;
          text-align: center;
          font-size: 16px;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          padding: 0 rem(50);
          line-height: rem(80);
          border-bottom: 5px solid #fff;
          color: #9d9d9d;
          &.active {
            color: #ff7680;
            // border-left: 1px solid #ededed;
            // border-right: 1px solid #ededed;
            border-bottom: 5px solid #ff7680;
          }
        }
        span {
          line-height: rem(84);
          line-height: 1.12rem;
          display: block;
          text-align: center;
          width: 100%;
        }
      }
    }
    ul li {
      display: inline-block;
      // width: 42%;
      // margin: 0 3.5%;
      // margin-top: rem(30);
      .img {
        img {
          width: 100%;
        }
      }
      span {
        font-size: rem(30);
        text-align: center;
        display: block;
      }
      .state {
        margin-top: rem(20);
        color: gray;
        &.active {
          color: #52c35b;
        }
      }
      .share {
        margin: auto;
        display: inline-block;
        width: 100%;
        height: rem(50);
        // line-height: rem(60);
      }
      .share1 {
        margin: 0 auto;
        img {
          vertical-align: middle;
          // display: inline-block;
          width: rem(50);
          height: rem(50);
          margin-right: rem(10);
        }
        .text {
          // margin-left: rem(10);
          text-align: center;
          font-size: rem(28);
          color: $color-text-a;
          line-height: rem(50);
        }
      }
    }
    .class-a {
      width: 60%;
      margin: 0 20%;
      margin-top: rem(200);
    }
    .class-b {
      width: 50%;
      margin: 0 25%;
      margin-top: rem(60);
    }
    .class-c {
      width: 42%;
      margin: 0 3.5%;
      margin-top: rem(30);
    }
  }
  @media (min-height: 737px) {
    //iphonex
    .container {
      height: 18.5rem;
    }
    .messge {
      top: rem(100);
    }
  }
}
</style>
