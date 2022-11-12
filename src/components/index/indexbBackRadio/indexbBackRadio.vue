<template>
  <div class="blankgap indexbBackRadio">
    <vheader title="回溯录制" :type="1" @back='back' :hasClass='1'></vheader>
    <div class="container" @click.stop='moclose'>
      <div class="bgInfo">
        <img :src='imgurl' :onError='defaultimg'>
        <p>{{name}}</p>
      </div>
      <div class="containers" ref="wrapper">
        <ul :class="{opt:playShow==true}">
          <li v-for='(items,index) in arr' :class='{"active":index==activePlay}' @click.stop='createdPlayer(items,index)'>
            <div class="leftBox">
              <img src='./playState@2x.png'>
              <span> {{index+1}}</span>
            </div>
            <div class="list_box">
              <div class="infobox">
                <div class="name">{{items.WaveTitle}}</div>
                <div class="mess">{{format(items.VoiceLength)}}</div>
              </div>
              <div class="option">
                <div class="imgbox" @click.stop='moshow(index)'>
                  <img src='./setting@2x.png'>
                </div>
                <div class="option_box" v-show="index==optionIndex">
                  <dl>
                    <dd @click.stop="opert(0,index)"><img src='./download@2x.png'>下载</dd>
                    <dd @click.stop="opert(1,index)" v-show="isTrue"><img src='./delete@2x.png'>删除</dd>
                    <dd @click.stop="opert(2,index)" v-show="isTrue"><img src='./re@2x.png'>重命名</dd>
                  </dl>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="v-mo" v-show="moshows"></div> -->
      <div class="player" v-show='playShow'>
        <img src='./icon@2x.png'>
        <div class="info">
          <div class="name">{{playName}}</div>
          <div class="time">{{format(currentTime)}}</div>
        </div>
        <div class="icon">
          <progressCircle :radius="radius" :percent="percent">
            <!-- <i @click.stop="togglePlaying" class="icon-mini" :class="iconMiniPlay"></i> -->
            <img :src='playicon' @click='togglePlaying'>
          </progressCircle>
        </div>
      </div>
    </div>
    <!-- <audio style='displsy:none' ref='audio' id='player' :src='musicUrl' @timeupdate="updateTime"></audio> -->
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import progressCircle from "base/progress-circle/progress-circle";
import BScroll from "better-scroll";
import { mapGetters, mapMutations } from "vuex";
import { deviceInit, playwav } from "api/device";
import {
  sendMqttSubTest,
  sendMqttPubMac,
  sendMqttSub,
  sendMqttPub,
  Vo_GetEquipmentRecordList,
  Vo_UpdateWaveTitle,
  Vo_DeleteEquipmentWave,
  consolelog
} from "api/device";
export default {
  data() {
    return {
      isTrue: global.NET_CurDeviceData.TypeID > 0 ? false : true,
      arr: [],
      arr1: [
        {
          EqpWaveID: "f197a3da-43d7-4034-b9f9-cabdca91df69",
          VoiceType: 2,
          RelativePath:
            "20180626\\306477e6aea43466ef5dbc\\306477e6aea43466ef5dbc-20180626-154421-30-女-20170622-0202-广东省深圳市-1.0.3-44893.wav",
          VoiceStrength: null,
          CreateTime: "2018/6/26 15:44",
          BeginTime: "2018/6/26 15:44",
          CustID: 1234637,
          VoiceLength: 30,
          VoiceSize: 960044,
          DownloadUrl:
            "https://resource.babygarden.org.cn:444/api/Equipment/DownloadEqpWaveByID?eqpWaveID=f197a3da-43d7-4034-b9f9-cabdca91df69",
          WaveTitle: "220180626_2"
        }
      ],
      optionIndex: 99999,
      playShow: false,
      radius: "0.8rem",
      iconMiniPlay: "active",
      activePlay: 99999,
      name: "",
      imgurl: "",
      defaultimg: 'this.src="' + require("./reg_icon.png") + '"',
      playStatus: 0, //0为播放,1为暂停
      playName: "",
      endTime: "03:00",
      timer: null,
      p: "", //音频对象,
      totalTime: "",
      currentTime: 0,
      musicUrl: "",
      sount: 0,
      moshows: false
    };
  },
  created() {
    deviceInit();
    this.getEquipmentRecordList();
    this.loadDatas();
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
  methods: {
    opert(index, idx) {
      this.moclose();
      switch (index) {
        case 0: //下载
          {
          }
          break;
        case 1: //删除
          {
            this.deleteEquipmentWave(idx);
          }
          break;
        case 2: //重命名
          {
            this.updateWaveTitle(idx);
          }
          break;
      }
    },
    loadDatas() {
      if (localStorage.getItem("userdata") != null) {
        let userinfo = JSON.parse(localStorage.getItem("userdata"));
        this.name = userinfo.NickName;
        this.imgurl = userinfo.HeadImageUrl;
      }
    },
    back() {
      playwav(this.musicUrl, 0, this);
      this.setPlayingState(false);
      clearInterval(this.timer);
      this.$router.go(-1);
      return;
    },
    moclose() {
      this.optionIndex = 99999;
      this.moshows = false;
    },
    moshow(index) {
      //操作框出现
      this.optionIndex = index;
      this.moshows = true;
    },
    getEquipmentRecordList() {
      if (global.NET_CurDeviceData.EqpID == undefined) return;
      consolelog("getEquipmentRecordList");
      var data =
        "?eqpID=" +
        global.NET_CurDeviceData.EqpID +
        "&custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        // "&custID=" +
        // 1234567 +
        "&pageSize=" +
        15 +
        "&pageIndex=" +
        0;
      Vo_GetEquipmentRecordList(data).then(res => {
        // alert('Vo_GetEquipmentRecordList');
        consolelog(JSON.stringify(res));
        this.arr = res.Data;
        console.log(this.arr);
        if (res.Code === 1) {
        }
      });
    },
    updateWaveTitle(idx) {
      consolelog("Vo_UpdateWaveTitle");
      var self = this;
      plus.nativeUI.prompt(
        //plus的prompt
        "请输入名称 ",
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
                  self.updateWaveTitle(idx);
                },
                "名称",
                "OK"
              );
            } else {
              var data = {
                eqpID: global.NET_CurDeviceData.EqpID,
                custID: JSON.parse(localStorage.getItem("userdata")).CustID,
                WaveTitle: e.value,
                EqpWaveID: self.arr[idx].EqpWaveID
              };

              Vo_UpdateWaveTitle(data).then(res => {
                // alert('Vo_GetEquipmentRecordList');
                consolelog(JSON.stringify(res));
                // this.arr = res.Data;
                // console.log(this.arr);
                if (res.Code === 1) {
                  self.arr[idx].WaveTitle = e.value;
                  Message.success({
                    message: "修改成功",
                    center: true,
                    duration: 1000
                  });
                }
                else {
                  Message.error({
                    message: "修改失败",
                    center: true,
                    duration: 1000
                  });
                }
              });
            }
          }
        },
        "提示",
        "请输入新的名称",
        ["确认", "取消"]
      );
    },
    deleteEquipmentWave(idx) {
      consolelog("Vo_DeleteEquipmentWave");

      var data = {
        eqpID: global.NET_CurDeviceData.EqpID,
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpWaveID: this.arr[idx].EqpWaveID
      };

      Vo_DeleteEquipmentWave(data).then(res => {
        // alert('Vo_GetEquipmentRecordList');
        consolelog(JSON.stringify(res));

        if (res.Code === 1) {

          this.arr.splice(idx, 1);
          Message.success({
            message: "删除成功",
            center: true,
            duration: 1000
          });
        }
        else
        {
          Message.error({
            message: "删除失败",
            center: true,
            duration: 1000
          });
        }
      });
    },
    createdPlayer(item, index) {
      // //创建播放器
      this.playName = item.WaveTitle;
      this.musicUrl = item.DownloadUrl;
      this.endTime = this.format(item.VoiceLength);
      this.totalTime = item.VoiceLength;
      this.activePlay = index;
      this.playShow = true;
      this.setPlayingState((this.playing = true));
    },
    togglePlaying() {
      this.setPlayingState(!this.playing); //取反
    },
    format(interval) {
      //秒转时间
      interval = interval | 0; //向下取整
      const minute = this._pad((interval / 60) | 0);
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    updateTime(e) {
      //更新时间
      this.currentTime = e.target.currentTime;
      if (this.$refs.audio.ended == true) {
        console.log(this.$refs.audio.ended);
        this.togglePlaying();
      }
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    playwav_success(data) {
      console.log(
        "duration = " +
          data.data.duration +
          " ,playing = " +
          data.data.playing +
          " ,curtime = " +
          data.data.curtime +
          " ,volume = " +
          data.data.volume
      );
      console.log(data.data);
      this.currentTime = data.data.curtime;
      this.totalTime = data.data.duration;
      // this.rangeValue = data.data.duration / data.data.curtime * 100;
      if (data.data.playing === false && data.data.action == 5) {
        this.setPlayingState(false);
        clearInterval(this.timer);
      }
    },
    playwav_failed(data) {
      // console.log(data);
    },
    ...mapMutations({
      setPlayingState: "SET_PLAYING_STATE"
    })
  },
  watch: {
    musicUrl() {
      this.$nextTick(() => {
        playwav(this.musicUrl, 0, this);
        playwav(this.musicUrl, 1, this);
        playwav(this.musicUrl, 3, this);
        //this.$refs.audio.play();
      });
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        // const audio = this.$refs.audio;
        // newPlaying ? audio.play() : audio.pause();
        if (newPlaying == true) {
          playwav(this.musicUrl, 3, this);
          this.timer = setInterval(() => {
            playwav(this.musicUrl, 5, this);
          }, 500);
        } else {
          clearInterval(this.timer);
          playwav(this.musicUrl, 2, this);
        }
      });
    }
  },
  computed: {
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    },
    percent() {
      //实时监听返回进度条百分比
      console.log(this.totalTime);
      return this.currentTime / this.totalTime;
    },
    playicon() {
      //通过vuex状态监听他是否是暂停还是播放 然后换图标
      return this.playing
        ? require("./pause@2x.png")
        : require("./play@2x.png");
    },
    ...mapGetters(["playing"])
  },
  components: {
    vheader,
    progressCircle
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.indexbBackRadio {
  background: #ededed;
  > .container {
    .v-mo {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 98;
    }
    .player {
      width: 100%;
      height: rem(60);
      padding: rem(20) 0;
      background: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      img {
        width: rem(60);
        height: rem(60);
        margin-left: rem(30);
      }
      .info {
        margin-right: rem(200);
        text-align: left;
        .name {
          color: #000;
          font-size: 16px;
        }
        .time {
          font-size: 14px;
          margin-top: rem(5);
        }
      }
      .icon {
        margin-right: rem(100);
        position: relative;
        img {
          width: rem(20);
          height: rem(30);
          position: absolute;
          left: rem(20);
          top: rem(15);
          margin-left: 0;
        }
      }
    }
    .bgInfo {
      width: 100%;
      height: rem(240);
      @include bg-image("./bg");
      background-size: 100%;
      background-repeat: no-repeat;
      padding-top: rem(70);
      img {
        width: rem(150);
        height: rem(150);
        border-radius: 100px;
        border: 2px solid #fff;
      }
      p {
        font-size: 16px;
        color: #fff;
        margin-top: rem(15);
      }
    }
    .containers {
      height: rem(900);
      overflow: hidden;
    }
    ul {
      &.opt {
        padding-bottom: rem(100);
        overflow: hidden;
        min-height: rem(700);
      }
      li {
        display: flex;
        justify-content: flex-start;
        text-align: left;
        display: -webkit-flex;
        -webkit-flex-direction: row;
        display: flex;
        flex-direction: row;
        height: rem(125);
        position: relative;
        .leftBox {
          text-align: center;
          width: rem(125);
          line-height: rem(125);
          img {
            width: rem(45);
            height: rem(45);
            margin-top: rem(40);
            display: none;
          }
          span {
            font-size: 18px;
          }
        }
        .list_box {
          border-bottom: 2px solid #d9d9d9;
          flex: 1;
          line-height: rem(38);
          padding: rem(20) 0;
          display: flex;
          justify-content: space-between;
          .infobox {
            line-height: rem(45);
            .name {
              color: #000;
              font-size: 18px;
            }
            .mess {
              color: #9b9b9b;
              font-size: 14px;
            }
          }
          .option {
            width: rem(70);
            line-height: rem(100);
            margin-right: rem(30);
            text-align: center;
            position: relative;
            img {
              width: rem(7);
              height: rem(39);
            }
            .option_box {
              position: absolute;
              top: rem(70);
              right: rem(30);
              background: #fff;
              padding: rem(10) rem(18);
              border-radius: 5px;
              box-shadow: -1px 1px 15px #ccc;
              z-index: 99;
              dl dd {
                line-height: rem(45);
                font-size: 10px;
                text-align: left;
                width: rem(130);
                border-bottom: 1px solid #aaaaaa;
                color: #9c9c9c;
                img {
                  width: rem(20);
                  height: rem(18);
                  margin-right: rem(15);
                }
                &:active {
                  background-color: rgba(170, 170, 170, 0.1);
                }
              }
            }
          }
        }
        &.active {
          .leftBox {
            img {
              display: inline-block;
            }
            span {
              display: none;
            }
          }
          .list_box {
            .mess {
              color: #c0914d;
            }
          }
        }
        &:active {
          background-color: rgba(170, 170, 170, 0.1);
        }
      }
    }
  }
}
</style>
