<template>
  <div class="blankgap userinfopage">
    <vheader title="个人信息" :type="1" @back='back'></vheader>
    <div class="container">
      <ul class="userinfopage_ul">
        <li class="headers" @click='inputclick'>
          <!-- @click='inputclick' -->
          <div class="cn">
            <span class="name">头像</span>
          </div>
          <div class="go">
            <div class="imgbox">
              <img :src='imgurl' />
            </div>
            <span class="el-icon-arrow-right"></span>
          </div>
          <input type="file" id='file1' accept="image/jpeg,image/png,image/gif" @change="handkeFileChange" ref="inputer">
        </li>
        <li @click='$router.push("./userinfo/username")'>
          <div class="cn">
            <span class="name">宝宝昵称</span>
          </div>
          <div class="go">
            {{name}}
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>
        <li @click="openPickDate('picker2')">
          <div class="cn">
            <span class="name">宝宝生日</span>
          </div>

          <div class="go">
            {{birthday}}
            <span class="el-icon-arrow-right"></span>
          </div>

        </li>
        <li @click='sexshowclick'>
          <div class="cn">
            <span class="name">宝宝性别</span>
          </div>
          <div class="go">
            {{sex}}
            <span class="el-icon-arrow-right"></span>

          </div>
        </li>
        <li @click='parshowclick'>
          <div class="cn">
            <span class="name">您于宝宝的关系</span>
          </div>
          <div class="go">
            {{parnet}}
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>
        <li @click='$router.push("./userinfo/addressSettings")'>
          <div class="cn">
            <span class="name">宝宝出生地</span>
          </div>
          <div class="go">
            {{local}}
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>
        <li @click='$router.push("./userinfo/myaddress")'>
          <div class="cn">
            <span class="name">收货地址</span>
          </div>
          <div class="go">
            <span class="el-icon-arrow-right"></span>
          </div>
        </li>
      </ul>
    </div>
    <transition name='slide'>
      <router-view/>
    </transition>
    <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible"><a>a</a></mt-actionsheet> -->
    <!-- <mt-actionsheet :actions="actions2" v-model="sheetVisible1" id='sext'></mt-actionsheet> -->
    <mt-datetime-picker ref="picker2" type="date" v-model="inputbir" @confirm="handleChange" :endDate="new Date()">
    </mt-datetime-picker>
    <Reselection :parshow='parshow' @paritypiker='paritypiker' @Choicepar='Choicepar'></Reselection>
    <choiceSex :sexhow='sexhow' @sexitypiker='sexitypiker' @choicesex='choicesex'></choiceSex>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import Choicecity from "base/choicecity/choicecity";
import Reselection from "base/reselection/reselection";
import choiceSex from "base/choice-sex/choice-sex";
import { Message } from "element-ui";
import { MessageBox, Indicator } from "mint-ui";
import {
  uploadfile,
  getuploadfileurl,
  getauthorize,
  setauthorize
} from "api/device";
import {
  setupload,
  ModifyBabyRelation,
  ModifyBabySex,
  ModifyBabyBirth
} from "api/mine";
export default {
  name: "userinfo",
  data() {
    return {
      icon: "el-icon-circle-plus-outline",
      imgurl: require("./reg_icon.png"),
      name: "宝宝",
      birthday: "",
      inputbir: "",
      sex: "男",
      parnet: "妈妈",
      local: "广东潮州市",
      city: "潮州市",
      actions: [],
      actions2: [],
      sheetVisible: false,
      sheetVisible1: false,
      cityshow: false,
      parshow: false,
      getauthorizenum: 0,
      sexhow: false,


      num:0,  //上传图片数量
      base64:'' ,  //压缩后的图片
      imgData:[],   //图片
      data:{base64:''},
      imgType:2,     //图片上传的状态  0：图片已经成功上传  1表示图片在上传中 2表示图片还没上传,
      img_loading:false,

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
    loadUserinfo() {
      var userinfo = JSON.parse(localStorage.getItem("userdata"));
      this.birthday = userinfo.BirthDay.substring(0, 10);
      this.name = userinfo.NickName;
      this.imgurl = userinfo.HeadImageUrl;
      this.sex = userinfo.Sex == 0 ? "女" : "男";
      this.local = userinfo.BirthPlace;
      this.inputbir = this.birthday;
      switch (userinfo.Relation) {
        case 0:
          this.parnet = "爸爸";
          break;
        case 1:
          this.parnet = "妈妈";
          break;
        case 2:
          this.parnet = "爷爷";
          break;
        case 3:
          this.parnet = "奶奶";
          break;
        case 4:
          this.parnet = "其他";
          break;
      }
    },
    takePhoto() {
      console.log("taking photo");
    },
    openAlbum() {
      console.log("opening album");
    },
    choicesex: function(index) {
      const data = {
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        sex: index
      };
      let self = this;
      ModifyBabySex(data).then(res => {
        if (res.Code === 1) {
          Message.success({
            message: res.Msg,
            center: true,
            duration: 1000
          });
          self.changge("Sex", res.Data);
          this.sex = res.Data == 0 ? "女" : "男";
        }
      });
    },
    openPickDate(picker) {
      let self = this;
      let userinfo = JSON.parse(localStorage.getItem("userdata"));
      let birthday = userinfo.BirthDay.substring(0, 10).split("-");
      let dDate = new Date();
      dDate.setFullYear(
        parseInt(birthday[0]),
        parseInt(birthday[1]) - 1,
        parseInt(birthday[2])
      );
      this.$refs[picker].open();
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    handleChange(value) {
      const data = {
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        birthDay: this.formatDate(value)
        //  birthDay: value
      };
      let self = this;
      ModifyBabyBirth(data).then(res => {
        if (res.Code === 1) {
          Message.success({
            message: res.Msg,
            center: true,
            duration: 1000
          });
          self.changge("BirthDay", res.Data);
          this.birthday = res.Data;
        }
      });
    },
    parshowclick() {
      this.parshow = true;
    },
    paritypiker() {
      this.parshow = false;
    },
    sexshowclick() {
      this.sexhow = true;
    },
    sexitypiker() {
      this.sexhow = false;
    },
    Choicepar(par) {
      const data = {
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        relation: par
      };
      let self = this;
      ModifyBabyRelation(data).then(res => {
        if (res.Code === 1) {
          Message.success({
            message: res.Msg,
            center: true,
            duration: 1000
          });
          self.changge("Relation", res.Data);
          switch (res.Data) {
          }
          switch (res.Data) {
            case 0:
              this.parnet = "爸爸";
              break;
            case 1:
              this.parnet = "妈妈";
              break;
            case 2:
              this.parnet = "爷爷";
              break;
            case 3:
              this.parnet = "奶奶";
              break;
            case 4:
              this.parnet = "其他";
              break;
          }
        }
      });
    },
    getauthorize_success(data) {
      if (data.data.status == true) {
        this.getauthorizenum++;
        if (this.getauthorizenum == 1) {
          getauthorize(this, 2);
        } else if (this.getauthorizenum == 2) {
          document.getElementById("file1").click();
        }
      } else {
        if (this.getauthorizenum == 0) {
          MessageBox.confirm("是否打开相机授权?").then(action => {
            setauthorize(this, 1);
          });
        } else if (this.getauthorizenum == 1) {
          MessageBox.confirm("是否打开相册授权?").then(action => {
            setauthorize(this, 2);
          });
        }
      }
    },
    inputclick() {
      if (this.getauthorizenum == 2) {
        this.getauthorizenum++;
      } else {
        this.getauthorizenum = 0;
        getauthorize(this, 1);
      }
    },
    // inputclick() {
    //   document.getElementById("file1").click();
    // },
    handkeFileChange(e) {
      console.log(e);
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.file = inputDOM.files[0];
      this.errText = "";
      // 触发这个组件对象的input事件
      this.$emit("input", this.file);
      // 这里就可以获取到文件的名字了
      // this.fileName = this.file.name;
      console.log(this.file);

      this.imgPreview(this.file);

    },
    imgPreview (file) {   //base64 格式
      this.imgType=1;
      this.img_loading=true;
      let self = this;
      let imgContent={};
      imgContent.name=file.name;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        var reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let IMG = new Image();
          IMG.src = this.result;
          IMG.onload = function(){

            let w = this.naturalWidth,
              h = this.naturalHeight,
              resizeW = 0,
              resizeH = 0;
            //压缩设置
            let maxSize = {
              width:1280,      //图片最大宽度
              height:1280,     //图片最大高度
              level:0.6       //图片保存质量
            };
            //计算缩放比例
            if(w > maxSize.width || h > maxSize.height){
              let multiple = Math.max(w / maxSize.width , h / maxSize.height);
              resizeW = w / multiple;
              resizeH = h / multiple;
            }else{
              resizeW = w;
              resizeH = h;
            }
            let canvas = document.createElement("canvas"),
              cxt = canvas.getContext('2d');
            //根据拍摄的角度进行图片旋转调整
            if (self.Orientation == 3) {
              canvas.width = resizeW;
              canvas.height = resizeH;
              cxt.rotate(Math.PI);
              cxt.drawImage(IMG, 0, 0, -resizeW, -resizeH)
            } else if (self.Orientation == 8) {
              canvas.width = resizeH;
              canvas.height = resizeW;
              cxt.rotate(Math.PI * 3 / 2);
              cxt.drawImage(IMG, 0, 0, -resizeW, resizeH)
            } else if (self.Orientation == 6) {
              canvas.width = resizeH;
              canvas.height = resizeW;
              cxt.rotate(Math.PI / 2);
              cxt.drawImage(IMG, 0, 0, resizeW, -resizeH)
            } else {
              canvas.width = resizeW;
              canvas.height = resizeH;
              cxt.drawImage(IMG, 0, 0, resizeW, resizeH)
            }
            //base64,最终输出的压缩文件
            self.base64 = canvas.toDataURL('image/jpeg',maxSize.level);
            self.num+=1;
            self.imgType=0;
            self.img_loading=false;
            self.imgData.push(self.base64)

            const data = {
              custID: JSON.parse(localStorage.getItem("userdata")).CustID,
              headImageUrl: self.imgData[0]
            };
            // var self = this;
            setupload(data).then(res => {
              if (res.Code === 1) {
                Message.success({
                  message: res.Msg,
                  center: true,
                  duration: 1000
                });
                self.changge("HeadImageUrl", res.Data);
                self.imgurl = res.Data;
              } else {
                Message.error({
                  message: res.Msg,
                  center: true,
                  duration: 1000
                });
              }
            });
          }
        };
      }
    },
    imgLoad() {},
    changge(key, value) {
      //变更,重新缓存
      var userinfo = JSON.parse(localStorage.getItem("userdata"));
      userinfo[key] = value;
      localStorage.setItem("userdata", JSON.stringify(userinfo));
    }
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
    ]),
      (this.actions2 = [
        {
          name: "男",
          method: this.choicesex
        },
        {
          name: "女",
          method: this.choicesex
        }
      ]);
  },
  components: {
    vheader,
    Choicecity,
    Reselection,
    choiceSex
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.userinfopage {
  background: #fafafa;
  .el-input--mini {
    width: auto;
    span {
      display: none;
    }
    .el-input__inner {
      border: none;
      font-size: rem(32);
      text-align: right;
      color: #858585;
      height: rem(50);
    }
  }

  .el-input--prefix .el-input__inner {
    padding: 0;
  }
  .mint-actionsheet {
    bottom: rem(16);
    width: 95%;
    background-color: rgba(255, 0, 255, 0);
    &#sext {
      ul {
        li:first-child {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          color: #008afc;
        }
        li:last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          color: red;
        }
      }
      .mint-actionsheet-button {
        border-radius: 10px;
      }
    }
  }
  .mint-actionsheet-listitem {
    padding: 0;
  }
  .mint-actionsheet-button {
    color: #008afc;
  }
  .mint-datetime-action {
    color: #008afc;
  }
  .userinfopage_ul {
    li {
      padding: rem(30) 0;
      border-bottom: rem(2) solid #e0e0e0;
      background: #fff;
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
        font-size: rem(36);
      }
      .go {
        float: right;
        margin-right: rem(25);
        font-size: rem(34);
        color: #858585;

        span {
          font-size: rem(30);
          margin-left: rem(18);
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
          margin-top: rem(26);
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
}
</style>
