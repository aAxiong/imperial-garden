<template>
  <div class="blankgap index_sharing">
    <vheader title="共享设备" :type="1" @back='back'></vheader>

    <div class="container">
      <div class="top" id="top" ref="top">
        <h2>设备圈</h2>
        <ul>
          <li v-for='(item,index) in arr' @click="quxiao(index)" :key="item.index">
            <div class="imgbox">
              <img :src='item.HeadImageUrl' />
              <p class="name">{{item.NickName}}</p>
            </div>
          </li>
          <li>
            <div class="imgbox" @click='showChageAdmin'>
              <img src='./adminiIcon.png' />
              <p class="name">转让管理员</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="center">
        <div class="go">
          <div class="imgbox">
            <img :src='HeadImageUrl' />
            <p class="name">{{NickName}}</p>
          </div>
          <!-- <span class="el-icon-arrow-right"></span> -->
          <input type="file" id='file1' accept="image/jpeg,image/png,image/gif" ref="inputer">

        </div>
        <el-input placeholder="邀请的育花园账号(手机号)" v-model="input10" clearable class="input" onfocus="if (value =='邀请的育花园账号(手机号)'){value =''}" onblur="if (value ==''){value='邀请的育花园账号(手机号)'}"></el-input>
        <p>共享婴儿监护灯，您可以和亲朋好友一起使用啦！</p>
        <div class="button" @click="button">确认</div>
        <div style="clear:both;"></div>
        <div class="app">授权需要对方下载注册育花园APP</div>
      </div>
    </div>
    <VchangeAdmin :isshow='isshow' @closeWindow='closeWindow' :arr="arr"></VchangeAdmin>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import VchangeAdmin from "base/change-admin/change-admin";
import {
  mqtt_self,
  sendMqttSub,
  sendMqttPub,
  sendMqttPubMac,
  receiveMqttData,
  Eq_GetEqpRegistInfo,
  Eq_BindingEquipment,
  Eq_ShareEquipmentTo,
  Eq_ShareMembers,
  Eq_RemoveShareMembers,
  Eq_ChangeEquipmentManager
} from "api/device";
export default {
  name: "userinfo",
  data() {
    return {
      arr: [],
      input10: "",
      dialogVisible: false,
      HeadImageUrl: "",
      NickName: "",
      isshow: false
    };
  },
  mounted() {
    alert(123);
  },
  created() {
    this.loadUserinfo();
    this.getshareinfo();
    mqtt_self(this);
  },
  methods: {
    showChageAdmin() {
      this.isshow = true;
    },
    closeWindow(){
      this.isshow = false;
    },
    changeWindow(index) {

      this.changeManager(index);
      this.isshow = false;
    },
    appear() {
      this.$refs.top.style.display = "block";
    },
    binding_share_notice(data) {
      //alert('binding_share_notice : '+data)
      this.getshareinfo();
    },
    back() {
      this.$router.go(-1);
      return;
    },
    quxiao(index) {
      MessageBox.confirm("确定取消授权?").then(action => {

        const data = {
          eqpID: global.NET_CurDeviceData.EqpID,
          custID: JSON.parse(localStorage.getItem("userdata")).CustID,
          removeCustID: this.arr[index].CustID
        };
        Eq_RemoveShareMembers(data).then(res => {
          // alert(JSON.stringify(res));
          if (res.Code === 1) {
            /*

            */

            this.jiechu(this.arr[index].PhoneNum);

            sendMqttPubMac(
              this,
              "binding_share",
              "B_" + global.DEV_CurDeviceMac,
              {
                binders: global.DEV_CurDeviceMac
              }
            );

            this.arr.splice(index, 1);
            if (this.arr.length == 0) this.$refs.top.style.display = "none";
          } else {
            Message.error({
              message: "Meg:" + res.Msg + " Code:" + res.Code,
              center: true,
              duration: 1000
            });
          } /*end if*/
        });
      });
    },
    loadUserinfo() {
      var userinfo = JSON.parse(localStorage.getItem("userdata"));
      this.HeadImageUrl = userinfo.HeadImageUrl;
      this.NickName = userinfo.NickName;
    },
    changeManager(index){

      const data = {
        eqpID: global.NET_CurDeviceData.EqpID,
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        targetCustID:this.arr[index].CustID
      };
      Eq_ChangeEquipmentManager(data).then(res => {
        console.log(JSON.stringify(res));
        if (res.Code === 1) {

          global.NET_CurDeviceData.TypeID = 1;
          this.back();
        } else {
          Message.error({
            message: "Meg:" + res.Msg + " Code:" + res.Code,
            center: true,
            duration: 1000
          });
        } /*end if*/
      });
    },
    getshareinfo() {
      const data = {
        eqpID: global.NET_CurDeviceData.EqpID,
        custID: JSON.parse(localStorage.getItem("userdata")).CustID
      };
      Eq_ShareMembers(data).then(res => {
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          /*
          {
          "CustID":1234638,
          "PhoneNum":"18877571385",
          "RealName":null,
          "NickName":"小雨",
          "Email":null,
          "HeadImageUrl":"https://api.babygarden.org.cn/api/System/DownloadImage/CustBaby/20180423/1234638_20180423102359339",
          "BirthPlace":null,
          "BirthDay":null,
          "Sex":null,
          "Relation":null,
          "AccessToken":null
          }
          */
          this.arr = res.Data;
          if (this.arr.length > 0) this.$refs.top.style.display = "block";
        } else {
          Message.error({
            message: "Meg:" + res.Msg + " Code:" + res.Code,
            center: true,
            duration: 1000
          });
        } /*end if*/
      });
    },
    button() {
      // console.log(this.input10);
      if (this.input10 != "") {
        const data = {
          EqpMacStr: global.DEV_CurDeviceMac,
          CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
          TargetPhone: this.input10
        };

        Eq_ShareEquipmentTo(data).then(res => {
          if (res.Code === 1) {
            Message.success({
              message: "确认成功!",
              center: true,
              duration: 1000
            });

            this.getshareinfo();

            sendMqttPubMac(this, "binding_share", this.input10, {
              binders: global.DEV_CurDeviceMac
            });
            this.input10 = "";
          } else {
            Message.error({
              message: "Meg:" + res.Msg + " Code:" + res.Code,
              center: true,
              duration: 1000
            });
          } /*end if*/
        });
        // input10
      } else {
        Message.error({
          message: "请输入手机号!",
          center: true,
          duration: 1000
        });
      }
    },
    unbinding_success(d) {
      //手机解除绑定当前硬件成功
      consolelog("unbinding_success" + this.$route.path);
    },
    unbinding_failed(d) {
      //手机解除绑定当前硬件失败
      consolelog("unbinding_success" + this.$route.path);
    },
    jiechu(phone) {
      sendMqttPub(this, "unbinding_req", {
        binders: phone
      });
    }
  },
  watch: {
    $route(to, from) {
      this.loadUserinfo();
    }
  },
  mounted() {
    this.actions = [
      {
        name: "拍照",
        method: this.takePhoto
      },
      {
        name: "从相册中选择",
        method: this.openAlbum
      }
    ];
  },
  components: {
    vheader,
    VchangeAdmin
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.index_sharing {
  background: #e5e5e5;
  .top {
    width: 90%;
    background: #fff;
    height: 5rem;
    border: 1px solid #e5e5e5;
    margin: auto;
    margin-top: 0.5rem;
    display: none;
    border-radius: rem(20);
    h2 {
      color: #f0769a;
      font-size: rem(50);
      text-align: left;
      margin: 0.5rem 0 0 1rem;
    }
    .imgbox {
      img {
        margin-top: 0.8rem;
        width: rem(90);
        height: rem(90);
        border-radius: 100px;
      }
    }
    ul li {
      float: left;
      width: 33.3%;
    }
    .name {
      color: #000;
      font-size: rem(20);
    }
  }
  .center {
    width: 90%;
    height: 9.98rem;
    background: url("./共享设备页.png") no-repeat center center/cover;
    margin: 0 auto;
    margin-top: 0.5rem;
    background-size: 100%;
    overflow: hidden;
  }
  .imgbox {
    img {
      margin-top: 0.8rem;
      width: rem(90);
      height: rem(90);
      border-radius: 100px;
    }
  }
  .center p {
    color: #fff;
    font-size: 0.4rem;
    width: 80%;
    text-align: center;
    line-height: 140%;
    margin: 0 auto;
    // padding:0.4rem 0;
  }
  .center .app {
    color: #fff;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    margin-top: 2rem;
  }
  .input {
    width: 80%;
    margin-top: 1.3rem;
    margin-bottom: 0.3rem;
  }
  // .go {
  //     float: right;
  //     margin-right: rem(25);
  //     font-size: rem(35);
  //     color: #858585;

  //     span {
  //       font-size: rem(30);
  //       margin-left: rem(18);
  //     }
  //   }
  .button {
    width: 30%;
    height: 1rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: url("./确认框.png") no-repeat;
    background-size: 100%;
    line-height: 1rem;
    font-size: rem(40);
    color: #f0769a;
    margin-top: 0.4rem;
  }
  #file1 {
    display: none;
  }
  .next {
    width: 75%;
    position: fixed;
    bottom: rem(10);
    left: 50%;
    transform: translate(-50%);
    // background: url("./btn.png")no-repeat;
    height: rem(100);
    margin: rem(30) auto;
    background-size: 100%;
    line-height: rem(100);
    font-size: rem(40);
    color: #fff;
  }
  .el-input__inner {
    height: 37px;
  }
  .name {
    color: #fff;
    font-size: rem(40);
    margin-top: rem(25);
  }
  .input {
    p {
      padding: 0.4rem 0;
    }
  }
}
</style>
