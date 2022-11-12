<template>
  <div class="blankgap pi-box">
    <div class="re-title">完善信息</div>
    <div class="photo-box">
      <div class="photo" @click='inputclick'>
        <!-- @click='sheetVisible = true' -->
        <img :src='imgurl' id='photo'>
        <input type="file" id='file1' accept="image/jpeg,image/png,image/gif" @change="handkeFileChange" ref="inputer">
      </div>
    </div>
    <div class="pi-input-box">
      <ul>
        <li>
          <span class="tit">昵称</span><input type='text' placeholder="请输入昵称" v-model="name">
        </li>
        <li>
          <span class="tit">宝宝生日</span><input type='text' placeholder="输入宝宝出生日期" v-model="birthday" readonly @click="openPickDate('picker2')">
        </li>
        <li>
          <span class="tit">宝宝出生地</span><input type='text' placeholder="请输入宝宝出生地" v-model="local">
        </li>
        <li>
          <span class="tit titsex">宝宝性别</span>
          <span class="choicebox">
            <div class="sex girls" :class="{active:0==num}" @click="sexchoie(0)"></div>
            <div class="sex boys" :class="{active:1==num}" @click="sexchoie(1)"></div>
          </span>
        </li>
        <li class="parli">
          <span class="tit titpar">您与宝宝的关系</span>
          <span class="choicebox1">

            <div class="parent mama" :class="{active:1==num1}" @click="parchoie(1)"></div>
            <div class="parent baba" :class="{active:0==num1}" @click="parchoie(0)"></div>
            <div class="parent nainai" :class="{active:2==num1}" @click="parchoie(2)"></div>
            <div class="parent yeye" :class="{active:3==num1}" @click="parchoie(3)"></div>
            <div class="parent others" :class="{active:4==num1}" @click="parchoie(4)"></div>
          </span>
        </li>
      </ul>
      <div class="exitLogon" @click="UploadImage" v-bind:class="{'op10':name.length>0&&birthday.length>0&&local.length>0}">
        完成
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <mt-datetime-picker ref="picker2" type="date" v-model="inputbir" @confirm="handleChange" :endDate="new Date()">
    </mt-datetime-picker>
    <Choicecity :cityshow='cityshow' @hidecitypiker='hidecitypiker' @trueChoice='trueChoice'></Choicecity>
  </div>
</template>
<script>
import Choicecity from "base/choicecity/choicecity";
import { Message } from "element-ui";
import { setupload } from "api/login";
import {
  uploadfile,
  getuploadfileurl,
  getauthorize,
  setauthorize
} from "api/device";
export default {
  name: "perfectInfo",
  data() {
    return {
      name: "",
      birthday: "",
      inputbir: new Date(),
      imgurl: require("./reg_icon@2x.png"),
      local: "",
      sex: "",
      par: "",
      cityshow: false,
      actions: [],
      sheetVisible: false,
      num: 0,
      num1: 1,
      photonum: 0,
      getauthorizenum: 0
    };
  },
  methods: {
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
    cityshowclick() {
      this.cityshow = true;
    },
    hidecitypiker() {
      this.cityshow = false;
    },
    trueChoice(add) {
      this.local = add;
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
      this.birthday = this.formatDate(value);
    },
    openPickDate(picker) {
      let self = this;
      let userinfo = JSON.parse(localStorage.getItem("userdata"));
      this.$refs[picker].open();
    },
    // openPickDate(picker) {
    //   let self = this;
    //   plus.nativeUI.pickDate(
    //     function(e) {
    //       var d = e.date;
    //       console.log(
    //         "选择的日期：" +
    //           d.getFullYear() +
    //           "-" +
    //           (d.getMonth() + 1) +
    //           "-" +
    //           d.getDate()
    //       );
    //       self.birthday =
    //         d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    //     },
    //     function(e) {
    //       console.log("未选择日期：" + e.message);
    //     }
    //   );
    //   // this.$refs[picker].open();
    // },
    sexchoie(index) {
      this.num = index;
    },
    parchoie(index) {
      this.num1 = index;
    },
    takePhoto() {
      var cmr = plus.camera.getCamera();
      cmr.captureImage(
        function(p) {
          // this.imgurl = require(p);
          document.getElementById(
            "photo"
          ).src = plus.io.convertLocalFileSystemURL(p);
          Message.success({
            message: p,
            center: true,
            duration: 1300
          });
        },
        function(e) {
          Message.error({
            message: e.message,
            center: true,
            duration: 1300
          });
        }
      );
    },
    // 拍照
    captureImage() {
      var cmr = plus.camera.getCamera();
      var res = cmr.supportedImageResolutions[0];
      var fmt = cmr.supportedImageFormats[0];
      cmr.captureImage(
        function(path) {
          document.getElementById(
            "photo"
          ).src = plus.io.convertLocalFileSystemURL(path);
        },
        function(error) {
          Message.error({
            message: "照片选择失败: " + error.message,
            center: true,
            duration: 1000
          });
        },
        { resolution: res, format: fmt }
      );
    },
    openAlbum() {
      //相册
      plus.gallery.pick(
        function(path) {
          document.getElementById(
            "photo"
          ).src = plus.io.convertLocalFileSystemURL(path);
        },
        function(e) {
          Message.error({
            message: "取消选择图片",
            center: true,
            duration: 1000
          });
        },
        { filter: "image" }
      );
    },
    inputclick() {
      document.getElementById("file1").click();
    },
    handkeFileChange(e) {
      let inputDOM = this.$refs.inputer;

      // 通过DOM取文件数据
      this.file = inputDOM.files[0];
      this.errText = "";
      // 触发这个组件对象的input事件
      this.$emit("input", this.file);
      // 这里就可以获取到文件的名字了
      this.fileName = this.file.name;
      this.imgPreview(this.file);
      // 这里加个回调也是可以的
      this.onChange && this.onChange(this.file, inputDOM.value);
      // document.getElementById("photo").src = e.target.baseURI;
    },
    imgPreview(file) {
      let self = this;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        var reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          self.imgurl = this.result;
        };
      }
    },
    UploadImage: function() {
      if (
        this.name.length > 0 &&
        this.birthday.length > 0 &&
        this.local.length > 0
      ) {
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.file = inputDOM.files[0];
        const data = {
          custID: JSON.parse(localStorage.getItem("userdata")).CustID,
          phoneNum: JSON.parse(localStorage.getItem("userdata")).PhoneNum,
          realName: "1",
          nickName: this.name,
          email: "1",
          headImageUrl: this.file,
          birthPlace: this.local,
          birthDay: this.birthday,
          sex: this.num,
          relation: this.num1
        };
        setupload(data).then(res => {
          if (res.Code === 1) {
            Message.success({
              message: res.Msg,
              center: true,
              duration: 1300
            });
            localStorage.setItem("userdata", JSON.stringify(res.Data));
            setTimeout(this.$router.push({ name: "vision" }), 1000);
          } else {
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1300
            });
          }
        });
      }
    }
  },
  mounted() {
    this.actions = [
      {
        name: "拍照",
        method: this.captureImage
      },
      {
        name: "从相册中选择",
        method: this.openAlbum
      }
    ];
  },
  components: {
    Choicecity
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.pi-box {
  background: #fff;
  .re-title {
    padding-top: 30px;
    text-align: center;
    font-size: 22px;
    color: #000;
  }
  .photo-box {
    width: rem(170);
    height: rem(170);
    border: 1px solid #ccc;
    border-radius: 100px;
    margin: 0 auto;
    margin-top: rem(100);
    padding: 2px;
    .photo {
      width: rem(170);
      height: rem(170);
      background-size: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100px;
      }
      #file1 {
        display: none;
      }
    }
  }
  .pi-input-box {
    width: 100%;
    margin-top: rem(100);
    .exitLogon {
      width: 90%;
      position: fixed;
      bottom: rem(10);
      left: 50%;
      transform: translate(-50%);
      background: linear-gradient(to right, #ff678c, #ff7a7b);
      border-radius: 5px;
      height: rem(90);
      margin: rem(30) auto;
      background-size: 100%;
      line-height: rem(90);
      font-size: rem(40);
      color: #fff;
      opacity: 0.6;
      &.op10 {
        opacity: 1;
      }
    }
    ul {
      padding: 0 rem(70);
      li {
        &.parli {
          display: block;
        }
        padding-bottom: 5px;
        width: 100%;
        font-size: 16px;
        text-align: left;
        margin-bottom: 15px;
        border-bottom: 1px solid #f8f8f8;
        display: flex;
        flex-direction: row;
        span.tit {
          color: $color-text-a;
          margin-right: 5px;
          margin-top: 1px;
          &.titsex {
            line-height: 45px;
          }
          &.titpar {
            display: block;
            width: 100%;
          }
        }
        span.choicebox {
          display: flex;
          flex-direction: row;
          .sex {
            display: inline-block;
            width: rem(105);
            height: rem(105);
            background-size: 100%;
            margin-left: rem(25);
            margin-right: rem(35);
            &.boys {
              @include bg-image("./male_normal");
              &.active {
                height: rem(104.5);
                @include bg-image("./male_pressed");
              }
            }
            &.girls {
              @include bg-image("./female_normal");
              &.active {
                height: rem(104.5);
                @include bg-image("./female_pressed");
              }
            }
          }
        }
        span.choicebox1 {
          display: block;
          margin-top: rem(35);
          height: rem(105);
          .parent {
            display: inline-block;
            width: rem(105);
            height: rem(104);
            background-size: 100%;
            margin-right: 3px;
            &:after {
              content: "";
              visibility: hidden;
              clear: both;
              display: block;
            }
            &.mama {
              @include bg-image("./mother_normal");
              &.active {
                height: rem(104);
                @include bg-image("./mother_pressed");
              }
            }
            &.baba {
              @include bg-image("./father_normal");
              &.active {
                height: rem(104);
                @include bg-image("./father_pressed");
              }
            }
            &.nainai {
              @include bg-image("./grandma_normal");
              &.active {
                height: rem(104);
                @include bg-image("./grandma_pressed");
              }
            }
            &.yeye {
              @include bg-image("./grandpa_normal");
              &.active {
                height: rem(104);
                @include bg-image("./grandpa_pressed");
              }
            }
            &.others {
              @include bg-image("./other_normal");
              &.active {
                height: rem(104);
                @include bg-image("./other_pressed");
              }
            }
          }
        }
        input {
          width: 60%;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>