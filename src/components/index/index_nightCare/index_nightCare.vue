<template>
  <div class="blankgap index_nightCare">
    <div class="myp_bg" id='myp_bg'>
      <div class="header_mypoints">
        <vheader title="夜晚照料" :type="1" @back='back'></vheader>
      </div>
      <div class="staTit">
        <div class="careTime">照料时间<img src='./caretime@2x.png'></div>
        <div class="dateChoise" @click="openPickDate('picker2')">{{birthday}}</div>
        <div class="messbox" @click='showMessShare'> <img src='./havemess@2x.png'></div>
      </div>
      <!-- 图表 -->
      <!-- <div id="myChart">

      </div> -->
      <div id="myCharts">
        <div class="chartsBox">
          <div class="charts">
            <ul ref='chartsUl' id="chartsUl">
              <li v-for='(itme,index) in this.DetailList' :style='"left:"+returnLeft(itme.BeginTime)+"%;width:"+returnWidth(itme.BeginTime,itme.EndTime)+"px"'></li>
            </ul>
          </div>
          <div class="cavalue">
            <ul>
              <li>20</li>
              <li>21</li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="contatiner" :style="'height:'+screenHeight+'px;overflow:hidden;'">
      <div class="hr">
        <!--{{devinfo.RegionBeginTime.split(' ')[1]}}-->
        20:00
        <span>---------</span><img src='./night@2x.png'>
        <span>---------</span>
        </span>
        <!--{{devinfo.RegionEndTime.split(' ')[1]}}-->
        08:00
      </div>
      <div class="list">
        <div class="firstbox">
          <div class="carebox">
            <p>照料打分</p>
            <img src='./care@2x.png' class="care">
            <p>{{devinfo.TotalScore}}</p>
          </div>
          <div class="carebox">
            <p>起夜总时长</p>
            <img src='./totaltime@2x.png' class="totaltime">
            <p>{{devinfo.TotalDurationStr==null?'0时0分':devinfo.TotalDurationStr}}</p>
          </div>
        </div>
        <div class="firstbox">
          <div class="carebox">
            <p>起夜次数</p>
            <img src='./often@2x.png' class="often">
            <p>{{devinfo.TotalCareCount}}次</p>
          </div>
          <div class="carebox">
            <p>环境噪音</p>
            <img src='./noise@2x.png' class="noise">
            <p>{{devinfo.HighestDecibel}}分贝</p>
          </div>
        </div>
      </div>
    </div>
    <mt-datetime-picker ref="picker2" type="date" v-model="inputbir" @confirm="handleChange" :endDate="new Date()">
    </mt-datetime-picker>
    <VmesSshare :isshow='isshow' @closeWindow='closeWindow' :bg='bg' :imgURL='imgURL' @closeBigBg='closeBigBg' :bgshow='bgshow'></VmesSshare>
  </div>
</template>
<script>
import VmesSshare from "base/mess-share/mess-share";
import { GetCareShareData } from "api/index";
import { Message } from "element-ui";
import vheader from "base/v-header/v-header";
import {
  sendMqttSubTest,
  sendMqttPubMac,
  sendMqttSub,
  sendMqttPub,
  Vo_GetChildCareRecordAnalysis,
  consolelog
} from "api/device";
export default {
  data() {
    return {
      birthday: "2018-1-1",
      inputbir: new Date(),
      screenHeight: 0,
      isshow: false,
      bg: "bg1@2x.png",
      imgURL: "",
      bgshow: false,
      BeginTime: "2018/6/26 21:23",
      EndTime: "2018/6/26 22:23",
      devinfo: {
        CareID: 10111,
        TotalCareCount: 0,
        RegionBeginTime: "2018/6/26 20:00",
        RegionEndTime: "2018/6/27 8:00devinfo",
        TotalScore: 0,
        TotalRatio: 0,
        TotalDuration: 0,
        TotalDurationStr: null,
        HighestDecibel: 74,
        CreateTime: "2018/6/27 11:56",
        MacStr: "30140786aea461a3fe8af8",
        ChildCareRecordDetailList: []
      },
      DetailList: [],
      timearr: [
        "20",
        "21",
        "22",
        "23",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8"
      ]
    };
  },
  created() {
    this.birthday = this.formatDate(new Date());
    this.$nextTick(() => {
      this.screenHeight =
        document.body.clientHeight -
        document.getElementById("myp_bg").clientHeight;
      //this.drawLine();
    });
    this.getChildCareRecordAnalysis();
  },
  methods: {
    back() {
      // this.$parent.loadUserInfo();
      this.$router.go(-1);
      return;
    },
    returnLeft(time) {
      //统计图里y轴的距离
      let times = time.split(" ")[1];
      let hours = parseInt(times.split(":")[0]);
      let minute = parseInt(times.split(":")[1]);
      for (var i = 0; i < this.timearr.length; i++) {
        if (hours == this.timearr[i]) {
          return parseFloat((i * 65 + minute) / 780).toFixed(4) * 100;
          break;
        }
      }
    },
    returnWidth(starttime, endtime) {
      //统计图宽度
      let stimes = starttime.split(" ")[1];
      let shours = parseInt(stimes.split(":")[0]);
      let sminute = parseInt(stimes.split(":")[1]);
      let etimes = endtime.split(" ")[1];
      let ehours = parseInt(etimes.split(":")[0]);
      let eminute = parseInt(etimes.split(":")[1]);
      var totalTime = "";
      for (var i = 0; i < this.timearr.length; i++) {
        if (shours == this.timearr[i]) {
          totalTime = i * 60 + sminute;
          break;
        }
      }
      for (var j = 0; j < this.timearr.length; j++) {
        if (ehours == this.timearr[j]) {
          totalTime = j * 60 + eminute - totalTime;
          break;
        }
      }
      return totalTime / 780 * document.querySelector("#chartsUl").clientWidth;
    },
    showBigBg() {
      this.bgshow = true;
    },
    closeBigBg() {
      this.bgshow = false;
    },
    showMessShare() {
      if (this.devinfo == "") return;
      let self = this;
      var data =
        "?totalScore=" +
        this.devinfo.TotalCareCount +
        "&careID=" +
        this.devinfo.CareID +
        "&CustID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&eqpID=" +
        this.devinfo.CareID; // 有问题                 这个要改成qepID            《------------------
      GetCareShareData(data).then(res => {
        if (res.Code === 1) {
          self.bg = res.Data.BackGroundImagePath;
          self.imgURL = res.Data.ShareImagePath;
          self.isshow = true;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
      // let num = Math.floor(Math.random() * 5 + 1);
      // this.bg = "bg" + num + "@2x.png";
    },
    closeWindow() {
      this.isshow = false;
    },
    drawLine() {
      // console.log(this.$echarts);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        grid: {
          // 定位使他放大缩小
          bottom: 55,
          left: 20,
          right: 20
        },
        xAxis: {
          type: "category",
          data: ["20", "21", "22", "23", "24", "1", "2", "3", "4", 5, 6, 7, 8],
          axisLabel: {
            //字体颜色
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              //轴线样式
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            interval: 0
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              //轴线样式
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            type: "bar",
            data: [
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100
            ],
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                barBorderRadius: [100, 100, 0, 0],
                color: "rgba(255,255,255, 0.5)",
                label: {
                  show: false, //ÊÇ·ñÕ¹Ê¾
                  textStyle: {
                    fontWeight: "bolder",
                    fontSize: "12"
                  }
                }
              }
            }
          }
        ]
      });
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
      this.getChildCareRecordAnalysis();
    },
    openPickDate(picker) {
      let self = this;
      let userinfo = JSON.parse(localStorage.getItem("userdata"));
      this.$refs[picker].open();
    },
    getChildCareRecordAnalysis() {
      // consolelog("getChildCareRecordAnalysis");
      var data =
        "?eqpID=" +
        global.NET_CurDeviceData.EqpID +
        "&currentTime=" +
        this.birthday +
        " 08:08:08";
      Vo_GetChildCareRecordAnalysis(data).then(res => {
        // alert('Vo_GetChildCareRecordAnalysis');
        consolelog(JSON.stringify(res));
        if (res.Code === 1) {
          this.devinfo = res.Data;
          // this.DetailList = [
          //   {
          //     CareDetailID: 100169,
          //     BeginTime: "2018/6/26 20:00",
          //     EndTime: "2018/6/26 20:30",
          //     Duration: 3600,
          //     CareScore: 60
          //   },
          //   {
          //     CareDetailID: 100169,
          //     BeginTime: "2018/6/26 21:00",
          //     EndTime: "2018/6/26 22:00",
          //     Duration: 3600,
          //     CareScore: 60
          //   },
          //   {
          //     CareDetailID: 100169,
          //     BeginTime: "2018/6/27 00:00",
          //     EndTime: "2018/6/27 01:00",
          //     Duration: 3600,
          //     CareScore: 60
          //   }
          // ];
          this.DetailList = res.Data.ChildCareRecordDetailList;
        }
      });
    }
  },
  components: {
    VmesSshare,
    vheader
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.index_nightCare {
  > .contatiner {
    width: 100%;
    @include bg-image("./bg");
    height: rem(99);
    background-size: 100%;
    .list {
      width: 92%;
      margin: 0 auto;
      .firstbox {
        display: flex;
        justify-content: space-between;
        margin-top: rem(30);
        .carebox {
          width: rem(330);
          height: rem(280);
          @include bg-image("./datak");
          background-size: 100%;
          color: #fff;
          p {
            margin-top: rem(30);
            margin-bottom: rem(30);
            &:last-child {
              margin-top: rem(20);
            }
          }
          .care {
            width: rem(97);
            height: rem(101);
          }
          .totaltime {
            width: rem(144);
            height: rem(101);
          }
          .often {
            width: rem(111);
            height: rem(101);
          }
          .noise {
            width: rem(147);
            height: rem(101);
          }
        }
      }
    }
    .hr {
      width: 80%;
      margin: rem(40) auto 0 auto;
      color: #fff;
      font-size: 12px;
      letter-spacing: 3px;
      img {
        vertical-align: middle;
        width: rem(42);
        height: rem(42);
        margin: 0 rem(10);
      }
      span {
        font-size: 14px;
        font-weight: bold;
        margin: 0 rem(5);
      }
    }
  }
  .myp_bg {
    width: 100%;
    height: rem(574);
    @include bg-image("./integral_head_bg");
    background-repeat: no-repeat;
    background-size: 100%;
    #myChart {
      height: rem(520);
      width: 100%;
      margin: rem(-150) auto 0 auto;
      overflow: hidden;
    }
    #myCharts {
      height: rem(320);
      width: 100%;
      margin: rem(-60) auto 0 auto;
      .chartsBox {
        width: 90%;
        margin: 0 auto;
        .charts {
          width: 100%;
          border-left: 1px solid #fff;
          border-bottom: 1px solid #fff;
          height: rem(280);
          position: relative;
          ul {
            position: relative;
            height: rem(280);
            li {
              position: absolute;
              bottom: 0;
              left: 30px;
              width: 50px;
              height: rem(280);
              border-top-left-radius: 100px;
              border-top-right-radius: 100px;
              background: #fff;
              opacity: 0.5;
            }
          }
        }
        .cavalue {
          margin-top: rem(10);
          ul {
            display: flex;
            li {
              flex: 1;
              color: #ffffff;
              font-size: 12px;
            }
          }
        }
      }
    }
    .staTit {
      display: flex;
      justify-content: space-between;
      // margin-top: rem(-70);
      position: relative;
      z-index: 11;
      .careTime {
        color: #fdc0c0;
        font-size: 12px;
        position: relative;
        left: rem(30);
        top: rem(10);
        img {
          margin-left: rem(10);
          width: rem(61);
          height: rem(14);
          vertical-align: middle;
        }
      }
      .dateChoise {
        width: rem(177);
        height: rem(44);
        border-radius: 100px;
        border: 1px solid #fff;
        font-size: #fff;
        text-align: center;
        font-size: 12px;
        line-height: rem(44);
        color: #fff;
        margin-right: rem(20);
      }
      .messbox {
        position: relative;
        top: rem(-70);
        img {
          width: rem(144);
          height: rem(119);
        }
      }
    }
    .header_mypoints {
      height: 80px;
      text-align: center;
      color: #fff;
      position: relative;
      z-index: 10;
      .lefticon {
        font-size: 23px;
        position: absolute;
        top: 24px;
        left: 12px;
      }
      .text {
        font-size: 0.55rem;
        display: inline-block;
        line-height: 69px;
      }
    }
  }
}
@media (min-height: 737px) {
  .index_nightCare {
    .myp_bg {
      .header_mypoints {
        height: 110px;
        .text {
          line-height: 110px;
        }
        .lefticon {
          top: 40px;
        }
      }
    }
  }
}
</style>
