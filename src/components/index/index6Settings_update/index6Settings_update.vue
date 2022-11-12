<template>
  <div class="hardware blankgap">
     <vheader title="固件升级" :type="1" @back='back'></vheader>
     <!-- 内容 -->
     <div class="content">
       <div class="find" >
          <p @click="none"  ref="find">{{newversin}}</p>
       </div>
       <div class="desc">
          <p>当前设备：{{name}}</p>
          <p>固件版本：V{{curvercion}}</p>
       </div>
       <div class="update" @click="update()" ref="update">
         <p>
           {{title}}
         </p>
       </div>
     </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { sendMqttSub,sendMqttPub,receiveMqttData,Eq_GetEqpRegistInfo,Eq_BindingEquipment,Eq_GetLastestEqpVersion,
  consolelog} from "api/device";
export default {
  name: 'update',
  data () {
    return {
      newversin:"",
      curvercion:"",
      curname:"",
      title:"更新",
      updateurl:"",
      updatever:"",
      updateidx:"",
      beforeupdateidx:""
    }
  },
  mounted(){

    this.none(false)
  },
  created()
  {
    this.mqttSub ();
    // const data = {
    //   CustID : JSON.parse(localStorage.getItem("userdata")).CustID,
    //   eqpID : global.NET_CurDeviceData.EqpID,
    //   numCode : global.DEV_CurDeviceData.device_type
    // };

    // alert(global.NET_CurDeviceData);
    this.name = global.NET_CurDeviceData.EqpName;
    this.curvercion = global.DEV_CurDeviceData.firmwareversion;

    this.get_update_info();
  },
  mqtt: {
    '#' (data, topic) {
      consolelog("# ->"+topic + ': ' + String.fromCharCode.apply(null, data))
      alert("#");
      receiveMqttData(this,data);
    }
  },
  methods: {

    settestupdateversion(){

      global.DEV_CurDeviceData.firmware_indx = 7;
      this.beforeupdateidx = 7;
      global.DEV_CurDeviceData.firmwareversion = '1.0.3';
    },
    //后退
    back () {
      this.$router.go(-1)
    },
    mqttSub () {
      //订阅当前硬件mac
      sendMqttSub(this,localStorage.getItem("curScanCode"),localStorage.getItem("curScanPhone"))
    },
    mqttPub () {
      //当前硬件更新
      sendMqttPub(this,'upgrade_req',{path:this.updateurl,upgrade_version:this.updatever})
    },
    get_update_info()
    {
      const data = {
        CustID:JSON.parse(localStorage.getItem("userdata")).CustID,
        eqpID:global.NET_CurDeviceData.EqpID,
        numCode:global.DEV_CurDeviceData.device_type
      }

      Eq_GetLastestEqpVersion(data).then(res => {
        // alert('Eq_GetLastestEqpVersion');
        // alert(JSON.stringify(res));
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
          var ver = res.Data.VersionIndex;
          var cur = global.DEV_CurDeviceData.firmware_indx;
          if(ver>cur && this.beforeupdateidx != res.Data.VersionIndex)
          {
            this.updateidx = res.Data.VersionIndex
            this.newversin =  "发现新固件版本V"+res.Data.VersonStr
            this.none(true)
            this.updateurl = res.Data.DownLoadUrl
            this.updatever = res.Data.VersonStr
          }
          else
          {
            this.none(false);
            this.curvercion = res.Data.VersonStr;
            global.DEV_CurDeviceData.firmware_indx = this.updateidx;
            global.DEV_CurDeviceData.firmwareversion = this.updatever;
            //alert("更新成功");
            this.title = "更新成功"
          }
        }
        else {

        }/*end if*/
      });
    },
    upgrade_req_success(){
      this.curvercion = this.updatever;
      global.DEV_CurDeviceData.firmware_indx = this.updateidx;
      global.DEV_CurDeviceData.firmwareversion = this.updatever;
      this.beforeupdateidx = this.updateidx;
      this.none(false);
      //alert("更新成功");
      this.title = "更新成功"
    },
    upgrade_req_failed(){
      //alert("更新失败");
      this.none(false)
      this.title = "更新失败"
    },
    mqtt_query_ack(data) {
      consolelog("mqtt_query_ack");
    },
    mqtt_online(data) {

      // alert('设备已经连网');
      consolelog('mqtt_online'+this.$route.path);
      this.get_update_info();
    },
    mqtt_status_mac(data){
      consolelog('mqtt_status_mac'+this.$route.path);
    },
    mqtt_status_phone(data) {
      consolelog('mqtt_status_phone'+this.$route.path);
    },
    //更新
    update () {
        if(this.$refs.find.style.display!="none")
        {

          this.beforeupdateidx = this.updateidx;
          this.title = "更新中..."
          //之前有个弹窗   确定不断电
          alert("请勿将设备断电，保持网络通畅");
          this.mqttPub();
        }
        else
        {
          // alert('没有发现新版本');
        }

    },
    none(val){

      if(val)
      {
        this.$refs.find.style.display = "block";
        this.$refs.update.style.background = "#f0779a";
        this.title = "更新"
      }
      else
      {
        this.newversin =  "当前已是最新版本"
        this.$refs.find.style.display = "none";
        this.$refs.update.style.background = "#ccc";
        this.title = "更新"
      }
    }
  },
  components: {
    vheader
  }

}
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.hardware{
  height: rem(1334);
  margin: 0 auto;
  .content{
    width: 100%;
    .find{
      margin-top: rem(300);
      p{
        font-size: rem(40);
        font-weight: bold;
      }
    }
    .desc{
      margin-top: rem(100);
      p{
        font-size: rem(32);
        margin-top: rem(30);
      }
    }
    .update{
      margin: 0 auto;
      width: rem(500);
      height: rem(100);
      margin-top: rem(100);
      background-image: url('./btn.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      p{
      line-height: rem(100);
      font-size: rem(40);
      text-align: center;
      color: #fff;
      }
    }
  }
}
</style>


