<template>
  <div class="blankgap indexDataAnalyze_cryanalyze">

    <vheader title="" :type="1" @back='back'></vheader>

    <Vdialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog" @cancel='cancel'>
    </Vdialog>
    <VReason :isshow='reasonShow' @closeWindow='closeWindow' @sure="sure"></VReason>
    <div class="header">
      <h1>哭声原因分析</h1>
      <p class="p">可选择原因点击确认，更有助于正确判断宝宝情况</p>
    </div>
    <div class="content">
      <swiper :options="swiperOption" ref="mySwiper">

        <swiper-slide v-for="(item,index) in dataarr" :key="item.index">
          <div class="nav">
            <!-- transform: translateX('+3*index+'px); -->
            <mt-navbar v-model="selected[index]" value="">
              <mt-tab-item :id="index+','+index1" :style="'background:-webkit-gradient(linear,left top,right bottom,color-stop(0%,'+items1.SubBgColor[1]+'), color-stop(100%,'+items1.SubBgColor[1]+'));'" v-for="(items1,index1) in item.BabyCryReasonSubList" :key="items1.index" class="title" v-show="(item.BabyCryReasonSubList.length>=2?(item.BabyCryReasonSubList[0].SubFactorName==item.BabyCryReasonSubList[1].SubFactorName?(item.BabyCryReasonSubList.length==2?false:index1==1?false:true):(true)):(false))"> {{index1==0?'主原因':items1.SubFactorName}} </mt-tab-item>
            </mt-navbar>

            <mt-tab-container v-model="selected[index]">
              <mt-tab-container-item :id="index+','+index2" :style="'background:-webkit-gradient(linear,left top,right bottom,color-stop(0%,'+items2.SubBgColor[1]+'), color-stop(100%,'+items2.SubBgColor[0]+'));'" v-for="(items2,index2) in item.BabyCryReasonSubList" :key="items2.index">
                <div class="clickbox" @click.stop='userconfirm()'>
                  <ul class="navheader">
                    <li>
                      <div class="time">
                        {{(items2.VoiceTime.split(" ")[1]).split(":")[0]+":"+(items2.VoiceTime.split(" ")[1]).split(":")[1]}}
                      </div>
                    </li>
                    <li class="wenzi" style="font-size:0.7rem"> <img v-bind:src="items2.SubFactorImage" alt="" class="img1"></li>
                    <li class="last">
                      <!--<span>75%{{selected[index]}}</span>-->
                      </br>
                      <!--<div class="grade">等级:高{{index+','+index2}}</div>-->
                    </li>
                  </ul>
                  <hr style="border:0.5px dashed #fff; margin:0; padding:0; width:100%;">
                  <div class="page1" v-show="index2==0?true:false">
                    <p class="reason" v-html='kongge(items2.FactorDesc)'></p>
                    <span class="bottomreason">{{items2.FactorWarn}}</span>
                  </div>
                  <div class="page2" v-show="index2!=0?true:false">
                    <p class="confirm">确认方法：</p>
                    <ul class="event" v-show="items2.ConfirmListCount==1?true:false">
                      <li style="background:#fff; color:#ada;width:70%;margin-left: 15%;" v-for="items3 in items2.ConfirmList" :key="items3.index">{{items3}}</li>
                    </ul>
                    <ul class="event" v-show="items2.ConfirmListCount!=1?true:false">
                      <li v-for="items3 in items2.ConfirmList" :key="items3.index">{{items3}}</li>
                    </ul>
                    <div class="method">
                      <p class="banfa" :class='{"active":items2.SubFactorSolution!=undefined&&items2.SubFactorSolution.length<4 ,"active1":items2.SubFactorSolution!=undefined&&items2.SubFactorSolution.length>4&&items2.SubFactorSolution.length<=8,
                    "active2":items2.SubFactorSolution!=undefined&&items2.SubFactorSolution.length>8&&items2.SubFactorSolution.length<=12,
                    "active3":items2.SubFactorSolution!=undefined&&items2.SubFactorSolution.length>12,}'>
                        <span class="spanbanfa">办法：</span> {{items2.SubFactorSolution}}</p>
                    </div>
                    <div class="bottomwenzi">
                      <p class="noticemethod">
                        <span class="notice">注意：</span> {{items2.SubFactorTips}}</p>
                    </div>
                  </div>

                  <div class="pic2 pic">
                    <img v-bind:src="items2.SubBottomImage" alt="" class="img">
                  </div>
                </div>
              </mt-tab-container-item>
            </mt-tab-container>
          </div>
        </swiper-slide>

      </swiper>

    </div>
    <div class="bottom">
      <p>以上由育花园计算平台提供</p>
      <p>©www.babygarden.org.cn</p>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import { Swipe, SwipeItem } from "mint-ui";
import { Navbar, TabItem } from "mint-ui";
import Vdialog from "base/v-dialog/v-dialog";
import VReason from "base/v-Reason/v-Reason";
import {
  Vo_AddEvent,
  Vo_EditEvent,
  Vo_DeleteEvent,
  Vo_AddBabyDietEvent,
  Vo_EditBabyDietEvent,
  Vo_DeleteBabyDietEvent,
  Vo_AddBabyMetabolismEvent,
  Vo_EditBabyMetabolismEvent,
  Vo_EditBabyTemperatureEvent,
  Vo_DeleteBabyMetabolismEvent,
  Vo_AddBabyDiaperEvent,
  Vo_EditBabyDiaperEvent,
  Vo_DeleteBabyDiaperEvent,
  Vo_AddBabyTemperatureEvent,
  Vo_DeleteBabyTemperatureEvent,
  Vo_GetAllBabyEventIntegrateData,
  Vo_GetBabyEventDisplayItems,
  Vo_GetBabyCryReasonList,
  Vo_IsShowCryReasonWin,
  Vo_ConfirmReasonForCry,
  Vo_GetTheLastBabyCryReason,
  Vo_CorrectCryFactorItem,
  Vo_CorrectTheLastCryFactorItem,
  Vo_ConfirmReasonForTheLastCry,
  getNowFormatDate,
  consolelog
} from "api/device";

export default {
  name: "light",
  data() {
    return {
      reasonShow: false,
      selected: [],
      index: 0,
      value: "",
      dataarr: global.NET_LexemeAnalysis,
      showDialog: false,
      dialogOption: {
        text: "是否确认当前原因为该次哭声结果",
        cancelButtonText: "未解决",
        confirmButtonText: "确认"
      },
      dataarrtest: [
        {
          ID: 28,
          FactorCode: "thirsty",
          FactorWeight: 0,
          BabyCryReasonSubList: [],
          FactorName: "渴了",
          FactorDesc: "渴了渴了渴了渴了渴了渴了渴了",
          VoiceTime: "2018-05-07 03:03:03",
          FactorWarn: "渴!了!",
          TitleColor: "#10caf9",
          FactorImage:
            "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/kele_title",
          BgColor: "#10caf9-#5de7f8",
          BottomImage:
            "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/kele_bottom"
        },
        {
          ID: 27,
          FactorCode: "uncomfortable",
          FactorWeight: 0,
          BabyCryReasonSubList: [
            {
              SubFactorID: 11,
              SubFactorName: "鼻塞",
              SubFactorConfirm:
                "双侧鼻塞,张嘴呼吸,伴有打鼾,单侧鼻塞,侧卧可缓解",
              SubFactorSolution: "适当喂水",
              SubFactorTips: "少穿少盖",
              SubTitleColor: "#ee651e",
              SubFactorImage:
                "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/bise_title",
              SubBgColor: "#ee651e-#f9b572",
              SubBottomImage:
                "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/bise_bottom",
              VoiceTime: "2018-05-07 03:03:03"
            },
            {
              SubFactorID: 12,
              SubFactorName: "痒痒",
              SubFactorConfirm: "皮肤偏干燥,冷热容易闹,出疹痱子时(含湿疹）",
              SubFactorSolution: "适当喂水",
              SubFactorTips: "少穿少盖",
              SubTitleColor: "#f9b572",
              SubFactorImage:
                "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/yangyang_title",
              SubBgColor: "#f9b572-#f9b572",
              SubBottomImage:
                "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/yangyang_bottom",
              VoiceTime: "2018-05-07 03:03:03"
            },
            {
              SubFactorID: 13,
              SubFactorName: "萌牙",
              SubFactorConfirm: "三月龄后,总想吃手,口水不少,下巴皮疹,伴有咳嗽",
              SubFactorSolution:
                "抱抚宝宝，使用工具（安抚奶嘴，磨牙棒），适当辅食",
              SubFactorTips:
                "磨牙用品要选择软的，保持口腔清洁，出牙是宝宝比较艰难的时刻，要保持爱心和耐心",
              SubTitleColor: "#10caf9",
              SubFactorImage:
                "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/mengya_title",
              SubBgColor: "#10caf9-#5de7f8",
              SubBottomImage:
                "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/mengya_bottom",
              VoiceTime: "2018-05-07 03:03:03"
            }
          ],
          FactorName: "不舒服了",
          FactorDesc: "不舒服了不舒服了不舒服了",
          VoiceTime: "2018-05-07 03:03:03",
          FactorWarn: "不!舒服了!",
          TitleColor: "#f9b572",
          FactorImage:
            "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/bushufu_title",
          BgColor: "#f9b572-#ee651e",
          BottomImage:
            "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/bushufu_bottom"
        },
        {
          ID: 29,
          FactorCode: "hungry",
          FactorWeight: 0,
          BabyCryReasonSubList: [],
          FactorName: "饿了",
          FactorDesc: "饿了饿了饿了饿了饿了",
          VoiceTime: "2018-05-07 03:03:03",
          FactorWarn: "饿!了!",
          TitleColor: "#ff4242",
          FactorImage:
            "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/ele_title",
          BgColor: "#ff4242-#fa6565",
          BottomImage:
            "https://api.babygarden.org.cn/api/System/ApiImage/VoiceAnalysisImage/ele_bottom"
        }
      ],
      swiperOption: {
        initialSlide: 1,
        slidesPerView: 1.3,
        centeredSlides: true,
        spaceBetween: 10
        // loop:true
      },
      isTrue: false
    };
  },
  created() {
    this.onSlideChangeEnd();
    if (this.dataarr == "") {
      this.getTheLastBabyCryReason();
      global.SHOW_LastCry = true;
      console.log("页面1");
    } else {
      this.initData();
      global.SHOW_LastCry = false;
      console.log("页面2");
    }
  },
  mounted() {
    // this.swiperOption.initialSlide = 1;
  },
  updated() {
    console.log("选项卡" + this.selected[this.index]);
    // this.confirm();
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },

  methods: {
    kongge(text) {
      if (text == undefined) {
        return "";
      }
      console.log(text);
      let text1 = "";
      let textsplit = text.split("\n");
      for (let i = 0; i < textsplit.length; i++) {
        text1 += textsplit[i] + "<br/>";
      }
      return text1;
    },
    closeWindow() {
      this.reasonShow = false;
    },
    sure(content, active) {
      this.reasonShow = false;
      // alert(content);
      // alert(index);
      if (global.SHOW_LastCry == true)
        this.correctTheLastCryFactorItem(content, active);
      else this.correctCryFactorItem(content, active);
    },

    correctCryFactorItem(content, active) {
      //哭声语义分析纠错
      console.log("哭声语义分析纠错");

      const data = {
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpWaveID: global.NET_LexemeAnalysisWaveID,
        FactorCode: active,
        EqpID: global.NET_CurDeviceData.EqpID,
        Desc: content,
        VoiceTime: getNowFormatDate()
      };

      console.log(JSON.stringify(data));

      Vo_CorrectCryFactorItem(data).then(res => {
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          Message.success({
            message: "哭声确认成功!",
            center: true,
            duration: 1000
          });
          this.back();
        } else {
          // Message.error({
          //   message: res.Msg,
          //   center: true,
          //   duration: 1000
          // });
        } /*end if*/
      });
    },
    correctTheLastCryFactorItem(content, active) {
      //最后一次哭声语义分析纠错
      console.log("最后一次哭声语义分析纠错");
      const data = {
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpID: global.NET_CurDeviceData.EqpID,
        FactorCode: active,
        Desc: content
      };

      console.log(JSON.stringify(data));

      Vo_CorrectTheLastCryFactorItem(data).then(res => {
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          Message.success({
            message: "哭声确认成功!",
            center: true,
            duration: 1000
          });

          this.back();
        } else {
          // Message.error({
          //   message: res.Msg,
          //   center: true,
          //   duration: 1000
          // });
        } /*end if*/
      });
    },
    cancel() {
      this.showDialog = false;
    },
    initData() {
      var fw = [];
      var ar = this.dataarr;

      consolelog("数据1");
      consolelog(JSON.stringify(this.dataarr));

      for (let val in ar) {
        var js = ar[val];

        fw.push(js.FactorWeight);
        this.selected.push(val + ",0");
        var da = {
          SubFactorID: "",
          ID: js.ID,
          FactorCode: js.FactorCode,
          FactorWeight: js.FactorWeight,
          SubFactorName: js.FactorName,
          FactorDesc: js.FactorDesc,
          VoiceTime: js.VoiceTime,
          FactorWarn: js.FactorWarn,
          SubTitleColor: js.TitleColor,
          SubFactorImage: js.FactorImage,
          SubBgColor: js.BgColor.split("-"),
          SubBottomImage: js.BottomImage,
          SubFactorConfirm: []
        };

        for (let val in js.BabyCryReasonSubList) {
          var list = [];
          if (js.BabyCryReasonSubList[val].SubFactorConfirm.indexOf(",") > -1)
            list = js.BabyCryReasonSubList[val].SubFactorConfirm.split(",");
          js.BabyCryReasonSubList[val]["ConfirmList"] = list;
          js.BabyCryReasonSubList[val]["ConfirmListCount"] = list.length;
          if (js.BabyCryReasonSubList[val]["SubBgColor"].indexOf("-") > -1)
            js.BabyCryReasonSubList[val][
              "SubBgColor"
            ] = js.BabyCryReasonSubList[val]["SubBgColor"].split("-");
          if (js.BabyCryReasonSubList[val]["SubBgColor"].indexOf(",") > -1)
            js.BabyCryReasonSubList[val][
              "SubBgColor"
            ] = js.BabyCryReasonSubList[val]["SubBgColor"].split(",");

          js.BabyCryReasonSubList[val]["FactorCode"] = js.FactorCode;
        }

        js.BabyCryReasonSubList.splice(0, 0, da);

        // var result = [];
        // for(var i=0;i<js.BabyCryReasonSubList.length;i++){
        //   if(result.indexOf(js.BabyCryReasonSubList[i])==-1){
        //     result.push(js.BabyCryReasonSubList[i])
        //   }
        // }
        // ar[val].BabyCryReasonSubList = result;
      }

      var ss = fw[0];
      for (let si in fw) {
        if (ss < fw[si]) {
          ss = fw[si];
          this.swiperOption.initialSlide = si;
        }
      }
      this.dataarr = ar;
      ar = [];

      // this.dataarr[0].BabyCryReasonSubList.splice(0, 1);
      console.log("数据");
      console.log(JSON.stringify(this.dataarr[0]));
    },
    getTheLastBabyCryReason() {
      consolelog("getTheLastBabyCryReason");
      var data =
        "?custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&eqpID=" +
        global.NET_CurDeviceData.EqpID;
      Vo_GetTheLastBabyCryReason(data).then(res => {
        console.log("Vo_GetTheLastBabyCryReason");
        console.log(JSON.stringify(res));
        if (res.Code === 1) {
          global.NET_LexemeAnalysis = res.Data;
          this.dataarr = global.NET_LexemeAnalysis;
          // self.$router.push({
          //   name: "index7DataAnalysis_cryanalyze"
          // });
          this.initData();
        }
      });
    },
    userconfirm() {
      if (this.dataarr.length > 1) {
        this.showDialog = true;
        this.$refs.dialog
          .confirm()
          .then(() => {
            this.showDialog = false;
            console.log("选项卡" + this.selected[this.index]);
            this.confirm();
          })
          .catch(() => {
            this.showDialog = false;
            this.reasonShow = true;
          });
      }
    },
    back() {
      this.$parent.loadUserInfo();
      this.$router.go(-1);
      return;
    },
    onSlideChangeEnd() {
      const self = this;
      this.$nextTick(() => {
        self.swiper.on("slideChange", function() {
          // console.log(this.realIndex);
          self.index = this.realIndex;
          console.log("选项卡" + self.selected[self.index]);
          // self.confirm();
        });
      });
    },
    confirm() {
      var val = this.selected[this.index].split(",");

      // alert('confirm');
      // return ;
      if (global.NET_LexemeAnalysisWaveID == "") {
        const data = {
          CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
          FactorCode: this.dataarr[val[0]].FactorCode,
          SubFactorID: this.dataarr[val[0]].BabyCryReasonSubList[val[1]]
            .SubFactorID,
          EqpID: global.NET_CurDeviceData.EqpID
        };

        consolelog(JSON.stringify(data));

        Vo_ConfirmReasonForTheLastCry(data).then(res => {
          consolelog(JSON.stringify(res));
          if (res.Code === 1) {
            Message.success({
              message: "哭声确认成功!",
              center: true,
              duration: 1000
            });

            this.back();
          } else {
            // Message.error({
            //   message: res.Msg,
            //   center: true,
            //   duration: 1000
            // });
          } /*end if*/
        });
      } else {
        const data = {
          CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
          EqpWaveID: global.NET_LexemeAnalysisWaveID,
          FactorCode: this.dataarr[val[0]].FactorCode,
          SubFactorID: this.dataarr[val[0]].BabyCryReasonSubList[val[1]]
            .SubFactorID,
          EqpID: global.NET_CurDeviceData.EqpID
        };

        consolelog(JSON.stringify(data));

        Vo_ConfirmReasonForCry(data).then(res => {
          consolelog(JSON.stringify(res));
          if (res.Code === 1) {
            Message.success({
              message: "哭声确认成功!",
              center: true,
              duration: 1000
            });

            this.back();
          } else {
            // Message.error({
            //   message: res.Msg,
            //   center: true,
            //   duration: 1000
            // });
          } /*end if*/
        });
      }
    }
  },
  components: {
    vheader,
    Vdialog,
    VReason
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.indexDataAnalyze_cryanalyze {
  // height:rem(1334);
  .header {
    width: 100%;
    // height:rem(150);
    h1 {
      font-size: rem(70);
      color: #fff;
      margin-top: rem(-20);
    }
    .p {
      color: #fff;
      font-size: rem(20);
      margin-top: rem(33);
      margin-bottom: rem(43);
    }
  }
  .content {
    width: 100%;
    height: rem(910);
    overflow: hidden;
    margin: auto;
    border-radius: rem(10);
    .swip-item-1 {
    }
    .item {
      margin-left: 10%;
      // position:absolute;
      // transform:translateX(0);
      // display: block;
    }
    .img1 {
      width: 100%;
      height: 100%;
      margin: auto;
    }
    .img {
      width: 100%;
      border-radius: 0 0 4% 4%;
    }
    .pic {
      width: 100%;
      height: auto;
      background: #fff;
    }
    .page1 {
      margin-top: rem(30);
      height: rem(300);
    }
    .page2 {
      margin-top: rem(15);
    }

    .nav {
      .title {
        border-radius: 0 rem(10) 0 0;
        font-size: rem(24);
        color: #fff;
        padding: rem(15) rem(10);
        box-shadow: 2px 0 0 0 rgba(0, 0, 0, 0.2);
        margin-top: 0 !important;
      }
      .navheader {
        width: 100%;
        max-height: rem(90);
      }
      .time {
        width: rem(80);
        height: rem(80);
        border-radius: 50%;
        background: #fff;
        display: inline-block;
        line-height: rem(90);
        font-size: rem(16);
        color: #1384f9;
      }
      //主原因样式
      .wenzi {
        color: #fff;
        font-size: rem(94);
      }
      .last {
        line-height: 150%;
        margin-top: rem(60);
        color: #fff;
      }
      .last span {
        font-size: rem(24);
      }
      .grade {
        font-size: rem(16);
        border: 1px solid #fff;
        padding: rem(0) rem(10);
        width: auto;
        display: inline-block;
        border-radius: rem(30);
        // margin-right: rem(10);
      }
      li {
        float: left;
        width: 33.3%;
        line-height: rem(212);
      }
      .reason {
        font-size: rem(24);
        color: #fff;
        min-height: rem(180);
        width: 80%;
        margin-left: 10%;
        line-height: 150%;
      }
      .bottomreason {
        font-size: rem(72);
        line-height: 150%;
        color: #fff;
      }
      //
    }

    .confirm {
      text-align: left;
      color: #fff;
      font-size: rem(20);
      margin-left: 10%;
      margin-bottom: rem(10);
    }
    .event {
      width: 80%;
      margin: 0 auto;
      // margin-bottom: rem(68);
      height: 1.2rem;
      overflow: auto;

      li {
        line-height: 150%;
        width: auto;
        font-size: rem(16) !important;
        color: #fff;
        border: 1px solid #fff;
        border-radius: rem(30);
        margin-right: rem(5);
        padding: rem(4) rem(16);
        margin-bottom: rem(5);
        margin-right: rem(13);
      }
    }
    .method {
      width: 90%;
      margin: auto;
      // height:rem(50);
      .spanbanfa {
        font-size: rem(50);
        color: #fff;
      }
      .banfa {
        color: #fff;
        font-size: rem(50);
        margin-bottom: rem(30);
        &.active {
          //<4
          font-size: rem(35);
        }
        &.active1 {
          //4<&&<=8
          font-size: rem(40);
        }
        &.active2 {
          //8<&&<=12
          font-size: rem(26);
        }
        &.active3 {
          //>12
          font-size: rem(20);
        }
      }
    }
    .bottomwenzi {
      width: 100%;
      // overflow: hidden;
      margin: 0 auto;
      box-sizing: border-box;
      height: rem(120);
    }
    .notice {
      font-size: rem(30);
      color: #fff;
      line-height: 150%;
      font-weight: bold;
    }
    .noticemethod {
      font-size: rem(20);
      color: #fff;
      line-height: 110%;
      text-align: left;
      margin-left: 10%;
    }
  }
  .bottom {
    margin-top: rem(50);
    // p{
    //   font-size: rem(22);
    //   color:#939393;
    //   line-height: 200%;
    // }
  }
  ::-webkit-scrollbar {
    //  display:none;
    background-color: rgba(0, 0, 0, 0);
    width: rem(5);
  }
  ::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #fff;
  }
  @media (min-height: 737px) {
    .content {
      height: rem(1110);
    }
  }
}
</style>


