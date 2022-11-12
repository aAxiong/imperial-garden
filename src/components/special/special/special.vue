<template>
  <div class="page special">
    <vheader title="专题" :type="0"></vheader>
    <div class="container">
      <router-link to='special/rankingList' class="ranking">
        <span>
          今日榜单
        </span>
        <div class="pt">
          <img v-for='(item,index) in imgbox' :src='item.ImagePath' :onError='defaultimg'>
        </div>
      </router-link>
      <div class="border10"></div>
      <div class="knowledge">
        <span>笑的学问</span>
        <div class="k_box">
          <ul>
            <li>
              <router-link to='special/benefit'>
                <img src='./special_good@2x.png'>
                <p>笑的好处</p>
              </router-link>
            </li>
            <li>
              <router-link to='special/coup'>
                <img src='./special_function@2x.png'>
                <p>逗笑妙招</p>
              </router-link>
            </li>
            <li>
              <router-link to='special/questions'>
                <img src='./special_article@2x.png'>
                <p>问题答疑</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="smail">
        <span>最会笑的宝宝</span>
        <div class="s_box" id='s_box'>
          <div id="canvasBox" style="width:100%;height:4rem;">

          </div>
          <!-- v-on:mousedown="downclick()" v-on:mouseup="upclick()" -->
          <img :src='imgurl' @click='record' :class='{"opt":opt===true}'>
          <p>{{end}}/{{minute}}:{{second}}</p>
        </div>
      </div>
      <div id="status"></div>
    </div>
    </router-link>
    <transition name='slide'>
      <router-view/>
    </transition>
    <Vign></Vign>
  </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox, Indicator } from "mint-ui";
import { UploadRecordWave, GetVoiceRankOfDayTop } from "api/special";
import { SiriWave } from "./index";
import { serverUrl, serverApi } from "api/config";
import Vign from "base/sign/sign";
import {
  uploadfile,
  getuploadfileurl,
  getauthorize,
  setauthorize
} from "api/device";
export default {
  name: "special",
  data() {
    return {
      timer: "",
      star: "00:00",
      end: "03:00",
      defaultimg: require("./reg_icon.png"),
      imgbox: "",
      minutes: 0, //录音计时 分
      seconds: 0, //录音计时 秒
      imgurl: require("././special_up@2x.png"), //录音图标
      timer: null,
      rStatus: 0,
      SW: "", //波浪线
      open: false,
      beginTime: "", //录音开始世界
      endTime: "", //录音结束时间
      opt: false,
      r: plus.audio.getRecorder(), //录音对象
      file: "",
      time: "" //总共时间
    };
  },
  created() {
    //plus.navigator.setStatusBarBackground("#f0779a");
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
    this.loadDayTop();
  },
  mounted() {
    if (!!document.createElement("canvas").getContext) {
      this.SW = new SiriWave({
        width: 640,
        height: 200
      });
      this.SW.setSpeed(0.2);
      this.SW.stop();
    }
  },
  methods: {
    uploadfile_success(data) {
      // alert('uploadfile_success');
      this.timer = setInterval(() => {
        getuploadfileurl(this);
      }, 100);
    },
    uploadfile_failed(data) {
      // alert('uploadfile_failed');
    },
    getuploadfileurl_success(data) {
      console.log("getuploadfileurl_success : " + JSON.stringify(data));

      if (data.data.progress == 1 && data.data.dic != "") {
        clearInterval(this.timer);
        var dic = data.data.dic;
        if (dic.Code == 1) {
          console.log("FilePath : " + dic.Data.FilePath);
          Message.success({
            message: dic.Msg,
            center: true,
            duration: 1000
          });
          this.$router.push({
            path: "special/shareinfo",
            query: {
              id: dic.Data.RecWaveID,
              grade: dic.Data.VoiceGrade
            }
          });
        } else {
          Message.error({
            message: dic.Msg,
            center: true,
            duration: 1300
          });
        }
      }
    },
    getuploadfileurl_failed(data) {
      // alert('getuploadfileurl_failed');
    },
    loadDayTop() {
      if (localStorage.getItem("userdata") == null) return;
      let data =
        "?custID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
      GetVoiceRankOfDayTop(data).then(res => {
        if (res.Code === 1) {
          this.imgbox = res.Data;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    },
    loadDate() {
      var a = new Date();
      a =
        a.getFullYear() +
        "-" +
        (a.getMonth() + 1) +
        "-" +
        a.getDate() +
        " " +
        a.getHours() +
        ":" +
        a.getMinutes() +
        ":" +
        a.getSeconds();
      return a;
    },
    loadTime() {
      var a = new Date();
      a = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
      return a;
    },
    getauthorize_success(data) {
      // alert("getauthorize_success");
      if (this.rStatus == 0) {
        if (data.data.status == true) {
          // alert('播放');
          this.seconds = 0;
          this.minutes = 0;
          this.startRecord();
          this.rStatus = 1;
          this.addNum();

          this.SW.start();
          if (this.SW != "") {
            this.open = setInterval(() => {
              this.SW.setNoise(0.3);
            }, 0);
          }
        } else {
          MessageBox.confirm("是否打开录音授权?").then(action => {
            setauthorize(this, 0);
          });
        }
      } else {
        // alert('停止');
        this.stopRecord();
      }
    },
    record() {
      // alert('record');
      if (localStorage.getItem("userdata") != null) {
        getauthorize(this, 0);
      } else {
        Message.info({
          type: "info",
          message: "尚未登录",
          center: true,
          duration: 1000
        });
        setTimeout(
          this.$router.push({
            path: "/login"
          }),
          1000
        );
      }
    },
    openPromt(recordFile) {
      let self = this;
      plus.nativeUI.prompt(
        //plus的prompt
        "请输入录音名称 ",
        function(e) {
          console.log((e.index == 0 ? "OK: " : "Cancel") + e.value);
          // self.UploadRecordWave1(value, recordFile);
          if (e.index == 0) {
            if (e.value == null || e.value == "") {
              // Message.error({
              //   message: "输入值不能为空!",
              //   center: true,
              //   duration: 1000
              // });
              plus.nativeUI.alert(
                "输入值不能为空",
                function() {
                  self.openPromt(recordFile);
                },
                "录音",
                "OK"
              );
            } else {
              const data = {
                custID: JSON.parse(localStorage.getItem("userdata")).CustID,
                waveName: e.value,
                voiceSecond: self.time,
                beginTime: self.beginTime,
                endTime: self.endTime,
                macStr: "",
                ipStr: "",
                voiceType: "4",
                voiceReason: "",
                modelNum: plus.device.model,
                voiceFile: {}
              };

              uploadfile(
                self,
                "BasicAuth " +
                  JSON.parse(localStorage.getItem("userdata")).AccessToken,
                "https://api.babygarden.org.cn/api/RecordWave/UploadRecordWave",
                plus.io.convertLocalFileSystemURL(recordFile),
                data
              );
            }
          }
        },
        "录音",
        "请给你的录音命名",
        ["确认", "取消"]
      );
    },
    startRecord() {
      //plus 开始录音
      if (localStorage.getItem("userdata") == null) {
        Message.info({
          type: "info",
          message: "尚未登录",
          center: true,
          duration: 1000
        });
        setTimeout(
          router.push({
            path: "/login"
          }),
          1000
        );
        return;
      }
      let self = this;
      if (this.r == null) {
        MessageBox.alert('"Device not ready!').then(action => {});
        return;
      }
      this.beginTime = this.loadDate();
      this.opt = true;
      this.starOperation();
      this.r.record(
        { filename: "_doc/audio/" },
        function(recordFile) {
          //结束录音后 返回回调
          console.log("Audio record success!" + recordFile);
          console.log(plus.io.convertLocalFileSystemURL(recordFile));
          self.endOperation();
          self.endTime = self.loadDate();
          self.time =
            self.minutes == 0 ? self.seconds : self.minutes * 60 + self.seconds;
          // MessageBox.prompt("请输入录音名称").then(({ value, action }) => {

          // });
          self.openPromt(recordFile);
        },
        function(e) {
          alert("Audio record failed: " + e.message);
          this.endOperation();
        }
      );
    }, //名字，文字路径
    dataURLtoFile(dataurl, filename) {
      //dataURL转换为File对象
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    UploadRecordWave1(name, recordFile) {
      //上传
      Indicator.open({
        text: "Loading...",
        spinnerType: "fading-circle"
      });

      const data = {
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        waveName: name,
        voiceSecond: this.time,
        beginTime: this.beginTime,
        endTime: this.endTime,
        macStr: "1",
        ipStr: "1",
        voiceType: 3,
        voiceReason: 0,
        modelNum: plus.device.model,
        voiceFile: recordFile
      };
      var url = `${serverUrl}/RecordWave/UploadRecordWave`;
      if (!global.URL_Rroxy) url = serverApi + url;
      var task = plus.uploader.createUpload(
        url,
        { method: "POST", blocksize: 204800, priority: 100 },
        function(t, status) {
          console.log("t" + JSON.stringify(t));
          // 上传完成
          if (status == 200) {
            console.log("Upload success: " + t.url);
          } else {
            console.logert("Upload failed: " + status);
          }
        }
      );
      console.log("data" + JSON.stringify(data));
      task.addFile(data.voiceFile, { key: "file" });
      task.addData("custID", data.custID);
      task.addData("waveName", data.waveName);
      task.addData("voiceSecond", data.voiceSecond);
      task.addData("beginTime", data.beginTime);
      task.addData("endTime", data.endTime);
      task.addData("macStr", data.macStr);
      task.addData("ipStr", data.ipStr);
      task.addData("voiceType", data.voiceType);
      task.addData("voiceReason", data.voiceReason);
      task.addData("modelNum", data.modelNum);
      task.setRequestHeader(
        "Authorization",
        "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken
      );
      console.log("task" + task);
      task.start();
    },
    stopRecord() {
      //plus 停止录音
      this.r.stop();
      this.endOperation();
      window.clearInterval(this.timer);
      this.minutes = 0;
      this.opt = false;
      if (this.SW != "") {
        this.SW.stop();
      }
      window.clearInterval(this.open);
      this.rStatus = 0;
    },
    starOperation() {
      this.imgurl = require("././special_down@2x.png");
    },
    endOperation() {
      this.imgurl = require("././special_up@2x.png");
    },
    num(n) {
      //补零
      return n < 10 ? "0" + n : "" + n;
    },
    addNum() {
      let self = this;
      self.timer = window.setInterval(function() {
        if (self.minutes === 3 && self.seconds === 0) {
          self.stopRecord();
        } else if (self.seconds === 59) {
          self.seconds = 0;
          self.minutes += 1;
        } else {
          self.seconds += 1;
        }
      }, 1000);
    }
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal);
      },
      minute: {
        handler(newVal) {
          this.num(newVal);
        }
      }
    }
  },
  computed: {
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
  },
  components: {
    vheader,
    Vign
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.special {
  background: #fff;
  .sign_box {
    margin-top: -10rem;
  }
  .ranking {
    width: 95%;
    height: rem(130);
    margin: 0 auto;
    margin-top: rem(15);
    @include bg-image("./special_today_List");
    background-size: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: rem(20);
    span {
      font-size: rem(40);
      margin-left: rem(50);
      margin-top: rem(20);
    }
    .pt {
      margin-top: rem(20);
      margin-right: rem(50);
      img {
        border: 2px solid #fff;
        border-radius: 100px;
        width: rem(65);
        height: rem(65);
        margin-left: -8px;
      }
    }
  }
  .border10 {
    border-bottom: 8px solid #e5e5e5;
  }
  .knowledge {
    margin-top: rem(30);
    border-top: 1px solid #ebebeb;
    position: relative;
    span {
      display: inline-block;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: -6px;
      width: rem(180);
      background: #fff;
      color: #878787;
      font-size: rem(30);
    }
    .k_box {
      margin-top: rem(30);
      ul {
        display: flex;
        justify-content: space-around;
        li {
          img {
            width: rem(91);
            height: rem(91);
          }
          p {
            margin-top: rem(20);
            color: #000;
            font-size: rem(32);
          }
        }
      }
    }
  }
  .smail {
    margin-top: rem(50);
    border-top: 1px solid #ebebeb;
    position: relative;
    span {
      display: inline-block;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: -6px;
      width: rem(220);
      background: #fff;
      color: #878787;
      font-size: rem(30);
    }
    img {
      width: rem(260);
      height: rem(260);
      margin-top: rem(-120);
      &.opt {
        margin-top: 0;
      }
    }
    p {
      color: #000;
      font-size: rem(32);
    }
  }
}
</style>
