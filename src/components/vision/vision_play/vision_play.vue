<template>
  <div class="vision_play_box blankgap" :style="{backgroundImage: 'url(' + bgurl + ')' }">
    <div class="header_vision">
      <div class="close" @click='$router.go(-1)'>
        <span class="el-icon-arrow-left"></span>
      </div>
      <div class="text_vision">{{$route.query.names}}</div>
    </div>
    <div class="container">
      <div class="imgbox">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for='(item,index) in arr' :key="index"><img :src='img(index)'></swiper-slide>
        </swiper>
        <div class="playBtn" :class='{"playHidden":$route.query.parm=="anima"}' @click='playanima'>
          <img src='./visual_play@2x.png'>
        </div>
      </div>
      <div class="tootal" :class='{"no-voive":no_viive=="0"}' v-show='toolShow'>
        <div class="ofen" @click='showoftentoo'>
          <img src='./visual_speed@2x.png'>
        </div>
        <div class="play" @click='voiceCon'>
          <img :src='playicon'>
        </div>
        <div class="voice" @click='Mute'>
          <img :src='muteicon'>
        </div>
      </div>
      <div class="often_too" v-show='often_tool'>
        <div class="no" @click='closeoftentoo'>
          <img src='./visual_cancle@2x.png'>
        </div>
        <mt-range v-model="rangeValue" :min="100" :max="10" :bar-height="1">
        </mt-range>
        <div class="yes" @click='choseoftentoo'>
          <img src='./visual_sure@2x.png'>
        </div>
      </div>
      <audio style='display:none' :src='voiceUrl' ref='audio' id='audio'>
        <source :src='voiceUrl' type="audio/mpeg">
      </audio>
      <!-- <audio style='display:none' :src='"./anima/"+animaVoice+".mp3"' ref='audio1' id='audio1'>
        <source :src='"./anima/0.mp3"+animaVoice+".mp3"' type="audio/mpeg">
      </audio> -->
      <audio style='display:none' :src='animaVoice' ref='audio1' id='audio1'>
        <source :src='animaVoice' type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Range } from "mint-ui";
import { mapGetters, mapMutations } from "vuex";
import voiceData from "./voiceData.json";
import { deviceInit, playwav } from "api/device";
export default {
  name: "vision_play",
  data() {
    return {
      toolShow: true,
      no_viive: this.$route.query.voice,
      often_tool: false,
      rangeValue: 10,
      imgurl: "./" + this.$route.query.parm,
      animaVoice: "",//require("./anima/" + this.$route.query.index + ".mp3"),
      arr: "",
      playicon: require("./visual_paly@2x.png"),
      bgurl: require("./card_bg@2x.png"),
      play: 0,
      auto: 3000,
      voiceUrl: "",
      playShow: false,
      swiperOption: {
        initialSlide: this.$route.query.index,
        speed: 400,
        autoplay: {
          delay: this.rangeValue * 100,
          disableOnInteraction: false,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true //修改swiper的父元素时，自动初始化swiper
        },
        loop: true
      }
    };
  },
  mounted() {
    this.swiper.autoplay.stop();
  },
  created() {
    deviceInit();

    if(this.$route.query.index<=17)
      this.animaVoice = require("./anima/" + this.$route.query.index + ".mp3");
    this.loadMusic();
  },
  watch: {
    rangeValue() {
      this.swiper.params.autoplay.delay = this.rangeValue * 100;
    },
    mute(newMute) {
      // console.log(newMute);
    }
    // play(newplay) {
    //   newplay === 0 ? (this.playShow = true) : (this.playShow = false);
    // }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    muteicon() {
      return this.mute
        ? require("././volume_pressed.png")
        : require("././volume_normal.png");
    },
    ...mapGetters(["mute"])
  },
  methods: {
    loadMusic() {
      this.arr = parseInt(this.$route.query.num);
      this.$nextTick(() => {
        if (this.$route.query.voice == "1") {
          const self = this;
          self.swiper.params.autoplay.delay = this.rangeValue * 100;
          self.swiper.on("slideChange", function() {
            if(this.realIndex<=17)
            self.animaVoice = require("./anima/" + this.realIndex + ".mp3");
            self.playVoice(this.realIndex);
          });
          this.voiceUrl =
            "http://tts.baidu.com/text2audio?idx=1&tex=" +
            encodeURIComponent(
              voiceData[this.$route.query.names][this.$route.query.index]
            ) +
            "&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5";
          if (this.mute == false) {
            this.$nextTick(() => {
              // self.$refs.audio.play();
              playwav(this.voiceUrl, 1, this);
              playwav(this.voiceUrl, 3, this);
            });
          }
        }
      });
    },
    playanima() {
      //播放动物声音
      this.$refs.audio1.pause();
      this.$refs.audio1.play();
      // playwav("./anima/0.mp3", 1, this);
      // playwav("./anima/0.mp3", 3, this);
    },
    handleChange(index) {},
    img(index) {
      return require(this.imgurl + "/" + index + ".png");
    },
    showoftentoo() {
      (this.toolShow = false), (this.often_tool = true);
    },
    closeoftentoo() {
      (this.toolShow = true), (this.often_tool = false);
    },
    choseoftentoo() {
      (this.toolShow = true), (this.often_tool = false);
    },
    voiceCon() {
      if (this.play == 0) {
        this.playicon = require("./visual_stop@2x.png");
        this.bgurl = require("./card_back_bg@2x.png");
        //  this.playShow = false;
        this.play = 1;
        this.auto = 3000;
        this.swiper.params.autoplay.delay = this.rangeValue * 100;
        this.swiper.autoplay.start();
      } else {
        this.playicon = require("./visual_paly@2x.png");
        this.bgurl = require("./card_bg@2x.png");
        //this.playShow = true;
        this.play = 0;
        this.auto = 0;
        this.swiper.params.autoplay.delay = 10000000;
        this.swiper.autoplay.stop();
      }
    },
    playMusic() {
      if (this.mute == false) {
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      }
    },
    Mute() {
      // 静音切换
      this.toggleMute();
    },
    toggleMute() {
      this.setMuteState(!this.mute); //取反
    },
    playVoice(index) {
      const name = this.$route.query.names;
      this.voiceUrl =
        "http://tts.baidu.com/text2audio?idx=1&tex=" +
        voiceData[name][index] +
        "&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5";
      if (this.mute == false) {
        this.$nextTick(() => {
          this.$refs.audio.play();
          // playwav(this.voiceUrl, 1, this);
          // playwav(this.voiceUrl, 3, this);
        });
      }
    },
    playwav_success(data) {
      console.log(data);
    },
    playwav_failed(data) {
      console.log(data);
    },
    ...mapMutations({
      setMuteState: "SET_MUTE_STATE"
    })
  },
  components: {
    Range
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
#app .vision_play_box {
  // @include bg-image("./card_bg");
  background-size: 100%;

  .header_vision {
    height: 69px;
    text-align: center;
    color: #fff;
    position: relative;
    .text_vision {
      font-size: rem(45);
      display: inline-block;
      line-height: 96px;
    }
    .close {
      font-size: rem(55);
      position: absolute;
      top: 32px;
      left: 12px;
      color: #fff;
    }
  }
  .container {
    text-align: center;
    .imgbox {
      width: 90%;
      text-align: center;
      margin: 0 auto;
      margin-top: rem(40);
      position: relative;
      .playBtn {
        width: rem(100);
        position: absolute;
        top: rem(30);
        right: rem(30);
        z-index: 99;
        display: none;
        &.playHidden {
          display: block;
        }
      }
      img {
        width: 100%;
      }
      .mint-swipe {
        height: rem(900);
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
      }
      .slide1 {
        background-color: #0089dc;
        color: #fff;
      }
      .slide2 {
        background-color: #ffd705;
        color: #000;
      }
      .slide3 {
        background-color: #ff2d4b;
        color: #fff;
      }
    }

    .tootal {
      width: 100%;
      height: rem(96);
      @include bg-image("./visual_paly_bg_normal");
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      &.no-voive {
        .ofen,
        .play {
          width: 50%;
        }
        .voice {
          display: none;
        }
      }
      .ofen,
      .play,
      .voice {
        width: 33.333333333%;
        height: rem(96);
        img {
          width: rem(75);
          height: rem(75);
          margin-top: rem(13);
        }
        &:active {
          background-color: rgba(170, 170, 170, 0.1);
        }
      }
    }
    .often_too {
      width: 100%;
      height: rem(96);
      @include bg-image("./visual_paly_bg_pressed");
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      .mt-range {
        width: rem(500);
        margin-top: rem(15);
      }
      .no {
        margin-top: rem(10);
        img {
          width: rem(30);
          height: rem(30);
          margin-top: rem(20);
        }
      }
      .yes {
        margin-top: rem(10);
        img {
          width: rem(33);
          height: rem(33);
          margin-top: rem(18);
        }
      }
    }
  }
}
@media (min-height: 737px) {
  #app {
    .vision_play_box {
      .header_vision {
        height: 130px;
        .text_vision {
          line-height: 130px;
        }
        .close {
          top: 50px;
        }
      }
      .container {
        .tootal {
          bottom: rem(70);
        }
      }
    }
  }
}
</style>
