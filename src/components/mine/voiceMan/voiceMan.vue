<template>
  <div class="blankgap voice-box">
    <vheader title="录音管理" :type="1" @back='back' :hasClass="1"></vheader>
    <div class="container voice-boxContaniner" :class="{'opt':playShow==true}">
      <mt-loadmore :top-method="loadData" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">
        <!-- <ul>
        <li>
          <div class="infobox">
            <span class="name">20471018.wav</span>
            <span class="fraction">20分</span>
          </div>
          <div class="timebox">
            <span class="time">3s</span>
            <span class="date">2017-10-18 17:23:23</span>
          </div>
        </li>
         </ul> -->
        <div class="page-tab-container">
          <div class="cellswipe" v-for="(items,index) in voiceData" :key="index" @click='createdPlayer(items)'>
            <mt-cell-swipe :title='String(items.WaveName)' :value='index' :right="[ {
          content: '删除',
          style: { background: 'red', color: '#fff' },
          handler(){deleteVoice(items.RecWaveID,index)}
        }
    ]" :label='String(items.VoiceSecond)+"s"' :bat='index' :id='items.RecWaveID'>
              <div>{{items.VoiceGrade}}分</div>
              <span>{{items.CreateTime}}</span>
            </mt-cell-swipe>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <div class="musicPlayer" v-show='playShow'>
      <div class="topBox">
        <span>{{playName}}</span>
        <div><img :src='playicon' @click='togglePlaying'></div>
        <!-- @click='continuesPlay' -->
      </div>
      <div class="rangBox">
        -
        <!-- <mt-range v-model="rangeValue" :min="0" :max="100" :bar-height="2"> -->
        <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
        </mt-range>
      </div>
      <div class="voiceVal">
        <span>{{format(currentTime)}}</span>
        <span>{{endTime}}</span>
      </div>
      <!-- <audio style='displsy:none' ref='audio' id='player' :src='musicUrl' @timeupdate="updateTime"></audio> -->
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { CellSwipe, Range } from "mint-ui";
import { GetMyRecordWave, DeleteRecordWave } from "api/mine";
import { mapGetters, mapMutations } from "vuex";
import ProgressBar from "base/progress-bar/progress-bar";
import { deviceInit, playwav } from "api/device";
export default {
  name: "voiceMan",
  data() {
    return {
      voiceData: {},
      playShow: false,
      rangeValue: 0,
      playStatus: 0, //0为播放,1为暂停
      playName: "",
      endTime: "03:00",
      timer: null,
      p: "", //音频对象,
      totalTime: "",
      currentTime: 0,
      musicUrl: "",
      sount: 0
    };
  },
  created() {
    deviceInit();
    this.loadData();
    this.rightButtons = [
      {
        content: "删除",
        style: { background: "red", color: "#fff" }
      }
    ];
  },
  methods: {
    back() {
      this.setPlayingState(false);
      clearInterval(this.timer);
      this.$router.go(-1);
      return;
    },
    loadData() {
      let data =
        "?CustID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&pageSize=15&pageIndex=0";
      GetMyRecordWave(data).then(res => {
        if (res.Code === 1) {
          this.voiceData = res.Data;
          this.$refs.loadmore.onTopLoaded();
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    },
    format(interval) {
      //秒转时间
      interval = interval | 0; //向下取整
      const minute = this._pad((interval / 60) | 0);
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    createdPlayer(item) {
      //创建播放器
      this.playName = item.WaveName;
      this.musicUrl = item.FilePath;
      this.endTime = this.format(item.VoiceSecond);
      // this.totalTime = item.VoiceSecond;
      this.playShow = true;
      this.setPlayingState((this.playing = true));
    },
    togglePlaying() {
      this.setPlayingState(!this.playing); //取反
    },
    updateTime(e) {
      //更新时间
      this.currentTime = e.target.currentTime;
      if (this.$refs.audio.ended == true) {
        console.log(this.$refs.audio.ended);
        this.togglePlaying();
      }
    },
    onProgressBarChange(percent) {
      const currentTime = this.totalTime * percent;
      playwav(this.musicUrl, 4, this, currentTime);
      if (!this.playing) {
        this.togglePlaying();
      }
    },
    deleteVoice(id, index) {
      const data = {
        recWaveID: id,
        custID: JSON.parse(localStorage.getItem("userdata")).CustID
      };
      DeleteRecordWave(data).then(res => {
        if (res.Code === 1) {
          var ele = document.getElementsByClassName("mint-cell")[index];
          ele.parentNode.removeChild(ele);
          Message.success({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
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
        playwav(this.musicUrl, 1, this);
        playwav(this.musicUrl, 3, this);
        //  this.$refs.audio.play();
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
    playicon() {
      return this.playing
        ? require("././record_stop@2x.png")
        : require("././record_start@2x.png");
    },
    percent() {
      return this.currentTime / this.totalTime;
      // return this.sount / this.totalTime;
    },
    ...mapGetters(["playing"])
  },
  components: {
    vheader,
    ProgressBar
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.voice-box {
  overflow: hidden;
  background: #fafafa;
  text-align: left;
  .voice-boxContaniner {
    overflow: hidden;
    &.opt {
      padding-bottom: rem(310);
    }
    .page-tab-container {
      &.opt {
        min-height: rem(910);
      }
      min-height: rem(1200);
      .mint-cell-value {
        span {
          display: block;
          color: #888;
          margin-top: rem(20);
          font-size: rem(28);
          text-align: right;
        }
      }
    }
  }
  ul {
    min-height: rem(1220);
    li {
      padding: rem(30) rem(30);
      border-bottom: rem(2) solid #e0e0e0;
      .infobox {
        display: flex;
        justify-content: space-between;
        margin-bottom: rem(10);
        .name {
          font-size: rem(36);
          color: #000;
        }
        .fraction {
          font-size: rem(32);
          color: $color-text-a;
        }
      }
      .timebox {
        display: flex;
        justify-content: space-between;
        .time,
        .date {
          color: #818181;
          font-size: 14px;
        }
      }
      &:active {
        background-color: rgba(170, 170, 170, 0.1);
      }
    }
  }
  .musicPlayer {
    width: 100%;
    height: rem(310);
    background: url(./record_bg@2x.png);
    background-size: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .topBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      margin-top: rem(20);
      width: 90%;
      span {
        font-size: rem(50);
        color: #888;
        margin-left: rem(30);
      }
      img {
        width: rem(120);
        height: rem(120);
      }
    }
    .rangBox {
      margin: 0 auto;
      width: 85%;
    }
    .voiceVal {
      width: 85%;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
    }
    .voiceVal {
      margin-top: rem(20);
    }
  }
}
</style>
