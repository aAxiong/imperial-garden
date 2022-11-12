<template>
  <div class="blankgap ranking_box">
    <vheader title="排行榜" :type="1" @back='back' :hasClass='1'></vheader>
    <div class="container">
      <div class="nav">
        <ul>
          <li @click.prevent="active = 'tab-container1',tab(1)" :class="{active:active=='tab-container1'}">日排行</li>
          <li @click.prevent="active = 'tab-container2',tab(2)" :class="{active:active=='tab-container2'}">月排行</li>
        </ul>
      </div>
      <div class="page-tab-container">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
          <mt-tab-container-item id="tab-container1">
            <div class="tab-header" v-if="dayArr.length>0">
              <ul>
                <li v-if='dayArr[1]==undefined||dayArr[2]==""'>
                </li>
                <li v-else>
                  <div class="imgbox" @click.stop='playVoice(dayArr[1])' @touchstart="playVoice(dayArr[1])">
                    <img :src='dayArr[1].ImagePath' class="otherss">
                    <img src='./two@2x.png'>
                  </div>
                  <p>{{dayArr[1].NickName}}</p>
                  <div class="dianzai" :class="{'nodianzan':dayArr[1].IsPraised===0||dayArr[1].IsPraised===null}" @click='liked(dayArr[1],1,0)'>
                    {{dayArr[1].TotalPraise}}
                  </div>
                </li>
                <li>
                  <div class="imgbox" @click.stop='playVoice(dayArr[0])' @touchstart="playVoice(dayArr[0])">
                    <img :src='dayArr[0].ImagePath' class="otherss">
                    <img src='./one@2x.png'>
                  </div>
                  <p>{{dayArr[0].NickName}}</p>
                  <div class="dianzai" :class="{'nodianzan':dayArr[0].IsPraised===0||dayArr[0].IsPraised===null}" @click='liked(dayArr[0],0,0)'>
                    {{dayArr[0].TotalPraise}}
                  </div>
                </li>
                <li v-if='dayArr[2]==undefined||dayArr[2]==""'>

                </li>
                <li v-else>
                  <div class="imgbox" @click.stop='playVoice(dayArr[2])' @touchstart="playVoice(dayArr[2])">
                    <img :src='dayArr[2].ImagePath' class="otherss">
                    <img src='./three@2x.png'>
                  </div>
                  <p>{{dayArr[2].NickName}}</p>
                  <div class="dianzai" :class="{'nodianzan':dayArr[2].IsPraised===0||dayArr[2].IsPraised===null}" @click='liked(dayArr[2],2,0)'>
                    {{dayArr[2].TotalPraise}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="tab-content" v-if="dayArr.length>3">
              <ul>
                <li v-for='(item,index) in dayArr' v-if='index>2'>
                  <div class="userinfo">
                    <div class="text">{{index}}</div>
                    <div class="imgbox" @click.stop='playVoice(item)'>
                      <img :src='item.ImagePath' class="otherss">
                      <img src='./play@2x.png'>
                    </div>
                    <div class="name">
                      <p>{{item.NickName}}</p>
                      <span>语音时间:{{item.VoiceSecond}}S</span>
                    </div>
                  </div>
                  <div class="dianzai" :class="{'nodianzan':item.IsPraised===0||item.IsPraised===null}" @click='liked(item,index,0)'>
                    {{item.TotalPraise}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="nodata" v-show='day<=0'>暂无数据</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <div class="tab-header" v-if="monthArr.length>0">
              <ul>
                <li v-if='monthArr[1]==undefined||monthArr[2]==""'>
                </li>
                <li v-else>
                  <div class="imgbox" @click.stop='playVoice(monthArr[1])'>
                    <img :src='monthArr[1].ImagePath' class="otherss">
                    <img src='./two@2x.png'>
                  </div>
                  <p>{{monthArr[1].NickName}}</p>
                  <div class="dianzai" :class="{'nodianzan':monthArr[1].IsPraised===0||monthArr[1].IsPraised===null}" @click='liked(monthArr[1],1,1)'>
                    {{monthArr[1].TotalPraise}}
                  </div>
                </li>
                <li>
                  <div class="imgbox" @click.stop='playVoice(monthArr[0])'>
                    <img :src='monthArr[0].ImagePath' class="otherss">
                    <img src='./one@2x.png'>
                  </div>
                  <p>{{monthArr[0].NickName}}</p>
                  <div class="dianzai" :class="{'nodianzan':monthArr[0].IsPraised===0||monthArr[0].IsPraised===null}" @click='liked(monthArr[0],0,1)'>
                    {{monthArr[0].TotalPraise}}
                  </div>
                </li>
                <li v-if='monthArr[2]==undefined||monthArr[2]==""'>
                </li>
                <li v-else>
                  <div class="imgbox" @click.stop='playVoice(monthArr[2])'>
                    <img :src='monthArr[2].ImagePath' class="otherss">
                    <img src='./three@2x.png'>
                  </div>
                  <p>{{monthArr[2].NickName}}</p>
                  <div class="dianzai" :class="{'nodianzan':monthArr[2].IsPraised===0||monthArr[2].IsPraised===null}" @click='liked(monthArr[2],2,1)'>
                    {{monthArr[2].TotalPraise}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="tab-content" v-if="monthArr.length>3">
              <ul>
                <li v-for='(item,index) in monthArr' v-if='index>2'>
                  <div class="userinfo">
                    <div class="text">{{index}}</div>
                    <div class="imgbox" @click.stop='playVoice(item)'>
                      <img :src='item.ImagePath' class="otherss">
                      <img src='./play@2x.png'>
                    </div>
                    <div class="name">
                      <p>{{item.NickName}}</p>
                      <span>语音时间:{{item.VoiceSecond}}S</span>
                    </div>
                  </div>
                  <div class="dianzai" :class="{'nodianzan':item.IsPraised===0||item.IsPraised===null}" @click='liked(item,index,1)'>
                    {{item.TotalPraise}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="nodata" v-show='month<=0'>暂无数据</div>
          </mt-tab-container-item>

        </mt-tab-container>
        <!-- <div class="playtool" v-show='toolshow'>
          <div class="userinfo">
            <div class="text">4</div>
            <div class="imgbox">
              <img src='./reg_icon.png' class="otherss">
              <img src='./play@2x.png'>
            </div>
            <div class="name">
              <p>昵称</p>
              <span>语音时间:2S</span>
            </div>
          </div>
          <div class="dianzai">
            1
          </div>
          <div class="tiao"></div>
        </div> -->
        <div class="playTool1" v-show='playShow'>
          <div class="playCon">
            <div class="close" @click='stopVoice'></div>
            <div class="playName">
              {{playName}}
            </div>
            <div class="tiao">
              <div class="progress" :style="'width:'+value+'%'"></div>
            </div>
          </div>
          <div class="v-mo"></div>
          <audio style='displsy:none' ref='audio' id='player' :src='musicUrl' @timeupdate="updateTime">
            <source :src='musicUrl' type="audio/mpeg">
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message, TabContainer, TabContainerItem, Loadmore } from "element-ui";
import {
  GetVoiceRankOfDay,
  GetVoiceRankOfMonth,
  MakeSubPraise
} from "api/special";
import { deviceInit, playwav } from "api/device";
export default {
  name: "rankingList",
  data() {
    return {
      active: "tab-container1",
      isActive: 1,
      toolshow: true,
      day: 0,
      month: 0,
      dayArr: [],
      monthArr: [],
      musicUrl: "",
      playName: "",
      playShow: false,
      currentTime: 0,
      value: 0,
      totalTime: "",
      timer: 0,
      sount: 0
    };
  },
  created() {
    //plus.navigator.setStatusBarBackground("#f0779a");
    deviceInit();
    this.loaddayData();
    this.loadmonthData();
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    tab(index) {
      this.isActive = index;
    },
    loaddayData() {
      let self = this;
      let data =
        "?custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&pageSize=20&pageIndex=0";
      GetVoiceRankOfDay(data).then(res => {
        let Data = eval("(" + res.request.response + ")");
        if (Data.Code === 1) {
          self.dayArr = Data.Data;
          self.day = self.dayArr.length;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    },
    loadmonthData() {
      let self = this;
      let data =
        "?custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&pageSize=20&pageIndex=0";
      GetVoiceRankOfMonth(data).then(res => {
        let Data = JSON.parse(res.request.response);
        if (Data.Code === 1) {
          self.monthArr = Data.Data;
          self.month = self.monthArr.length;
          // this.$refs.loadmore.onTopLoaded();
        } else {
        }
      });
    },
    liked(item, index, type) {
      //发起点赞
      let IsPraised,
        self = this;
      if (item.IsPraised === 0 || item.IsPraised === null) {
        IsPraised = 1;
      } else {
        IsPraised = 0;
      }
      const data = {
        recWaveID: item.RecWaveID,
        custID: JSON.parse(localStorage.getItem("userdata")).CustID,
        infoSource: 1,
        status: IsPraised
      };
      MakeSubPraise(data).then(res => {
        if (res.Code === 1) {
          if (type == 0) {
            self.dayArr[index].IsPraised = IsPraised;
            self.dayArr[index].TotalPraise++;
          } else {
            self.monthArr[index].IsPraised = IsPraised;
            self.monthArr[index].TotalPraise++;
          }
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    },
    playVoice(item) {
      //播放声音
      this.playName = item.NickName;
      this.musicUrl = item.WavePath;
      // this.totalTime = item.VoiceSecond;
      this.playShow = true;
      clearTimeout(this.timer);
      playwav(this.musicUrl, 1, this);
      playwav(this.musicUrl, 3, this);
      // document.getElementById("player").play();
      this.timer = setInterval(() => {
        this.value = this.sount / this.totalTime * 100;
        if (this.sount >= this.totalTime) {
          clearInterval(this.timer);
          this.sount = 0;
        }
        this.sount++;
      }, 1000);
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
      this.value = this.currentTime / this.totalTime * 100;
    },
    stopVoice() {
      //关闭声音
      // this.$refs.audio.pause();
      // this.$refs.audio.currentTime = 0;
      playwav(this.musicUrl, 2, this);
      this.playShow = false;
      this.value = 0;
    },
    playwav_success(data) {
      // console.log(data);
      this.totalTime = data.data.duration;
    },
    playwav_failed(data) {
      // console.log(data);
    }
  },
  watch: {
    musicUrl() {
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
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
.ranking_box {
  .nav {
    width: 100%;
    height: rem(100);
    @include bg-image("./rank");
    border-bottom: 1px solid #d9ecf0;
    ul li {
      display: inline-block;
      width: rem(200);
      line-height: rem(100);
      &.active {
        border-bottom: 2px solid #000;
      }
    }
  }
  .page-tab-container {
    // margin-bottom: rem(120);
    .mint-tab-container-item {
      min-height: rem(1050);
    }
    .nodata {
      margin-top: rem(200);
      font-size: rem(40);
    }
    .tab-header {
      width: 100%;
      height: rem(350);
      @include bg-image("./bg");
      background-size: 100%;
      ul {
        display: flex;
        justify-content: space-around;
        li {
          margin-top: rem(30);
          .imgbox {
            width: rem(150);
            height: rem(150);
            background-size: 100%;
            position: relative;
            img {
              width: rem(150);
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              &.otherss {
                width: rem(113);
                height: rem(115);
                left: rem(14.5);
                top: rem(13);
                border: 2px solid #fff;
                border-radius: 100px;
              }
            }
          }
          p {
            width: rem(150);
            margin-top: rem(20);
            color: #000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .dianzai {
            width: rem(142);
            height: rem(46);
            @include bg-image("./coll");
            background-size: 100%;
            background-repeat: no-repeat;
            line-height: rem(46);
            text-indent: rem(20);
            margin-top: rem(30);
            &.nodianzan {
              @include bg-image("./no");
            }
          }
        }
      }
    }
    .tab-content {
      ul li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #fafafa;
        padding: rem(25) rem(30);
        &:last-child {
          border-bottom: none;
        }
        .userinfo {
          display: flex;
          justify-content: space-between;
          .imgbox {
            position: relative;
            width: rem(90);
            height: rem(90);
            margin: 0 rem(40);
            img {
              width: rem(90);
              height: rem(90);
              position: absolute;
              left: 0;
              top: 0;
              border-radius: 100px;
            }
          }
          .text {
            line-height: rem(90);
            font-size: rem(35);
            width: rem(30);
          }
          .name {
            margin-top: rem(12);
            text-align: left;
            line-height: rem(40);
            p {
              text-indent: 10px;
              width: rem(300);
              color: #000;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span {
              color: #9e9e9e;
              font-size: rem(20);
            }
          }
        }
        .dianzai {
          width: rem(142);
          height: rem(46);
          @include bg-image("./coll");
          background-size: 100%;
          background-repeat: no-repeat;
          line-height: rem(46);
          text-indent: rem(20);
          margin-top: rem(30);
          &.nodianzan {
            @include bg-image("./no");
          }
        }
      }
    }
    .playTool1 {
      .v-mo {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        z-index: 200;
        opacity: 0.5;
      }
      .playCon {
        z-index: 999;
        width: rem(540);
        padding: 0 rem(30);
        position: fixed;
        top: rem(550);
        left: 50%;
        background: #fff;
        border-radius: 5px;
        height: 3.3rem;
        transform: translate(-50%);
      }
      .playName {
        margin-top: rem(120);
        color: #000;
        font-size: 22px;
        text-align: left;
        width: rem(500);
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tiao {
        width: 100%;
        height: 4px;
        background: #cfcfcf;
        position: relative;
        margin-top: rem(30);
        overflow: hidden;
        .progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          background: $color-text-a;
        }
      }
      .close {
        width: rem(44);
        height: rem(44);
        background: url("./cancel_phone.png");
        background-size: 100%;
        position: absolute;
        top: rem(40);
        right: rem(30);
      }
    }
    .playtool {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-top: 2px solid #f3f3f3;
      border-bottom: 5px solid #dbdbdb;
      padding: rem(25) 0;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      .userinfo {
        display: flex;
        justify-content: space-between;
        .imgbox {
          position: relative;
          width: rem(90);
          height: rem(90);
          margin: 0 rem(40);
          img {
            width: rem(90);
            height: rem(90);
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .text {
          line-height: rem(90);
          font-size: rem(35);
          margin-left: rem(25);
        }
        .name {
          margin-top: rem(12);
          text-align: left;
          line-height: rem(40);
          p {
            text-indent: 10px;
            color: #000;
          }
          span {
            color: #9e9e9e;
            font-size: rem(20);
          }
        }
      }
      .dianzai {
        width: rem(142);
        height: rem(46);
        @include bg-image("./coll");
        background-size: 100%;
        background-repeat: no-repeat;
        line-height: rem(46);
        text-indent: rem(20);
        margin-top: rem(30);
        margin-right: rem(25);
        &.nodianzan {
          @include bg-image("./no");
        }
      }
      .tiao {
        position: absolute;
        bottom: -5px;
        height: 5px;
        background: #f47599;
        width: 50%;
      }
    }
  }
}
</style>
