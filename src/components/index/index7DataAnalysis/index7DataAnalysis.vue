<template>
  <div class="dataAnalyze blankgap">
    <!-- 头部 -->

    <vheader title="动态记录" :type="1" @back='back' :hasClass='1'></vheader>
    <div class="sroll-warpper" @scroll="paperScroll()" ref='wrapper'>
      <div class="warpper">
        <!-- 头像 -->
        <div class="head" v-show="bol===true">
          <img src='./poster.png' />
        </div>

        <!-- 动态 -->
        <div class="state" v-show="bol===true" :class='{"active":state==true}'>
          <!-- 加号 -->
          <div class="add" @click="add()" :class='{"active":state==true}' id="add" ref='add'>
            <img src="./aynamic_add_bg.png">
          </div>
          <!-- 左侧时间 -->
          <div class="time" @click="changeTime">
            <img src='./ca.png'>
            <p class="times">{{year}}.{{month}}.{{day}}</p>
          </div>
          <!-- 右侧的图标 -->
          <div class="cry">
            <div class="d1" @click='noteshow(false)' v-show='note==true'>
              <img src='./todaynote.png'> 记录
            </div>
            <div class="d2" @click='noteshow(true)' v-show='note==false'>
              <span>
                <img src="./cry.png">
              </span>
              x{{num}}</div>

          </div>
        </div>
        <!-- 动态 -->
        <div class="dynamicBox" v-show="bol===true">

          <div class="event" @click="appearChangeTime">
            <ul class="time-vertical" v-for="(item,index1) in a" :key="item.index">

              <li class="time-vertical" v-show="item.Data.length<=0?false:true">

                <ul class="li_ul">
                  <li class="dotred" @click="show()" v-show="item.Data.length<=0?false:item.showDate">
                    <img src="./PinkCircle.png">
                    <span class="date_month">{{parseFloat(item.TheDate.split('-')[1])}}月</span>
                  </li>
                  <li class="dot" @click="show()" v-show="item.Data.length<=0?false:true">
                    <img src="./RoundAsh.png">
                    <span class="date_day">{{parseFloat(item.TheDate.split('-')[2])}}日</span>
                  </li>
                </ul>
              </li>

              <li class="time-vertical" v-for="(items,index2) in item.Data" :key="items.index" v-show="items.EventTypeID==10?true:note">

                <span class="delete" v-show="items.ShowBol" @click="cell_delete(items,index1,index2)">
                  <img src="./aynamic_delete.png">
                </span>

                <span v-if="items.DetailData.IsConfirm!=1 && items.DetailData.IsConfirm!=2" class="date2">{{items.EventTime.split(' ')[1].split(':')[0]}}:{{items.EventTime.split(' ')[1].split(':')[1]}}</span>
                <span v-else-if="items.DetailData.CryDurationTime.split('-').length==2" class="date2">{{items.DetailData.CryDurationTime}}</span>
                <span v-else class="date2">{{items.DetailData.CryDurationTime}}-{{items.DetailData.CryDurationTime}}</span>
                <span class="date3">{{items.DetailData.CryDurationStr}}</span>

                <ul>
                  <li class="icon" @click="cell_show(items,index1,index2)">
                    <img v-bind:src="items.Icon">
                  </li>
                </ul>
                <!-- 单行 -->
                <span class="thing" v-show="items.EventTypeID==10?false:true" style="margin-top:-1.2rem;">
                  <p v-if="(items.DetailData.EventTypeID==4 || items.DetailData.EventTypeID==5)" style="color:gray;//font-size: 0.3rem">{{items.DetailData.Remarks}}</p>
                  <p v-else-if="items.DetailData.EventTypeID==2">{{items.DetailData.ChangeReasonStr}}</p>
                  <p v-else-if="items.DetailData.EventTypeID==3">{{items.DetailData.TemperatureStr}}</p>
                  <p v-else-if="items.DetailData.EventTypeID==1">{{items.DetailData.ColorStr}}</p>
                  <p v-else>{{items.DetailData.FoodCodeStr}}{{items.DetailData.FoodQuantityStr}}</p>


                  <p v-if="(items.DetailData.EventTypeID<4)" style="color:gray;//font-size: 0.3rem;margin-top: 0.15rem;">{{items.DetailData.Remarks}}</p>

                </span>
                <!-- 确认 -->
                <span class="thing" v-show="items.DetailData.IsConfirm==1?true:false" style="margin-top:-1.2rem;">
                  <p>
                    {{items.DetailData.FactorName}}
                    <span style="color:#565656;">{{items.DetailData.SubFactorName}}
                      <span style="color:#1081f9;//font-size: 0.25rem;" >已确认</span>
                    </span>
                  </p>
                  <span>{{items.DetailData.SubFactorConfirm}}</span>
                </span>
                <!-- 待确认 -->
                <span class="thing" v-show="items.EventTypeID==10?true:false" style="margin-top: -1.45rem;">
                  <ul v-for="itema in items.DetailData.CryReasons" :key="itema.index">
                    <li>{{itema}}</li>
                  </ul>
                  <div class="queding" @click="cell_surecry(items)" v-show="items.DetailData.IsConfirm<=0?true:false" style="margin-top:-1.2rem;">待确认</div>
                </span>

                <span class="edit" v-show="items.ShowBol" @click="cell_edit(items,index1,index2)">
                  <img src="./aynamic_modif.png">
                </span>
              </li>
            </ul>
            <div class="changeTime" ref="changeTime">
              <div class="timeConfirm" @click="timeConfirm">确定</div>
              <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </div>
          </div>

        </div>
        <div class="activebottom">
          <p>{{loading==true?'正在加载...':lastLoadTime}} </p>
          <p>开启了宝宝的记录之旅 </p>
        </div>
      </div>
    </div>
    <!-- 数据 -->
    <div class="dataBox" v-show="bol===false">
      <div class="top">
        <ul>
          <li>哭声

          </li>
          <li class="cry"></li>
          <li>
            环境声
          </li>
          <li class="huanjing"></li>
        </ul>
      </div>
      <div styel="clear:both"></div>
      <div class="buttom">
        <ul>
          <li class="red">
            <div id="myChart" :style="{width: '9rem', height: '6.4rem'}">
            </div>
          </li>
          <li class="white">
            <p style="margin-top:0.8rem;">在{{cryingtime1}}-{{cryingtime2}}间，当前环境比较嘈杂</p>
            <p>不适合宝宝休息！</p>
            <ul>
              <li class="yiban">{{Estate}}</li>
              <li class="crying">
                哭声X{{frequency}}
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
    <recordanalysis :isshow='isshow' @closeWindow='closeWindow' :arr='elData'></recordanalysis>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import BScroll from "better-scroll";
import recordanalysis from "base/record-analysis/record-analysis";
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
  Vo_GetAllBabyEventCombineData,
  Vo_GetBabyEventDisplayItems,
  Vo_GetBabyCryReasonList,
  Vo_IsShowCryReasonWin,
  Vo_ConfirmReasonForCry,
  Vo_GetCryNotifyAllInfo,
  consolelog,
  fromStringToDate,
  fromDateToString,
  getMonthLen
} from "api/device";

export default {
  data() {
    return {
      isshow: false, //推送分析框 控制消失隐藏显示隐藏
      elData: {
        //推送分析模拟数据  将请求的数据填充到这里就可以了
        CryNotifyID: null,
        CryCycleID: null,
        EqpID: 0,
        CustID: 0,
        NotifyCount: 0,
        BeginTime: null,
        EndTime: null,
        DetailResponse: [
          { CryNotifyDetailID: "10254", NotifyTime: "2018/05/05 08:8:3" },
          { CryNotifyDetailID: "10254", NotifyTime: "2018/05/05 08:8:3" }
        ],
        FrequencyTitle: null
      },
      newLoad:true,
      lastLoadTime:"",
      loading:false,
      startYear: "",
      startMonth: "",
      startDay: "",
      value: "",
      year: 0,
      year1:0,
      month: 0,
      month1: 0,
      day: 0,
      day2: 0,
      date: new Date().toLocaleDateString(),
      bol: true,
      num: 0,
      showBol: false,
      crying: [1, 3, 5, 2, 5, 2], //哭声数组
      environmental: [5, 5, 5, 3, 6, 8, 5, 8, 6, 8, 2, 7], //环境声数组
      cryingtime1: "2:00", //哭的时间
      cryingtime2: "4:00", //哭的时间
      Estate: "一般", //环境状态
      frequency: 3,
      state: false,
      editarr: [0, 0],
      arr: [],
      note: true,
      arrtest: [
        {
          publishTime: "10:00",
          img: require("./feed.png"),
          content: "150ml奶粉",
          remark: "没吃饭，晚上继续喂"
        }
      ],
      arr1: [
        {
          publishTime: "10:00",
          img: require("./cry.png"),
          content: "150ml奶粉",
          remark: "没吃饭，晚上继续喂"
        },
        {
          publishTime: "10:00",
          img: require("./RoundAsh.png"),
          content: "150ml奶粉",
          remark: "没吃饭，晚上继续喂"
        },
        {
          publishTime: "10:00",
          img: require("./PinkCircle.png"),
          content: "150ml奶粉",
          remark: "没吃饭，晚上继续喂"
        }
      ],
      boolean1: true,
      boolean2: false,
      a: [],
      a1: [
        {
          TheDate: "2018-05-04",
          CryCount: 2,
          Data: [
            {
              MainID: "10310",
              EventTypeID: 0,
              DetailData: {
                ID: 170,
                MainID: 10310,
                EventTime: "2018-05-04 16:24:35",
                FoodCode: "breastmilk",
                FoodCodeStr: "母乳",
                FoodQuantity: 150,
                FoodQuantityStr: "150.0ml",
                Remarks: "喝了很多喝了很多喝了很多喝了很多"
              },
              EventTime: "2018-05-04 16:24:35",
              img: require("./cry.png")
            },
            {
              MainID: "dd5b72c9-8a25-4f1f-bd75-e5014bb221d2",
              EventTypeID: 10,
              DetailData: {
                ID: "dd5b72c9-8a25-4f1f-bd75-e5014bb221d2",
                MainID: "dd5b72c9-8a25-4f1f-bd75-e5014bb221d2",
                EventTime: "2018-05-04 02:13:11",
                VoiceStrength: 80,
                FactorName: null,
                IsConfirm: null,
                SubFactorName: null,
                SubFactorID: null,
                SubFactorConfirm: null,
                CryReasons: ["不舒服了", "渴了", "痛了"]
              },
              EventTime: "2018-05-04 02:13:11",
              img: require("./cry.png")
            }
          ]
        },
        {
          TheDate: "2018-05-03",
          CryCount: 3,
          Data: [
            {
              MainID: "10312",
              EventTypeID: 0,
              DetailData: {
                ID: 172,
                MainID: 10312,
                EventTime: "2018-05-03 14:24:35",
                FoodCode: "breastmilk",
                FoodCodeStr: "母乳",
                FoodQuantity: 150,
                FoodQuantityStr: "150.0ml",
                Remarks: "喝了很多喝了很多喝了很多"
              },
              EventTime: "2018-05-03 14:24:35",
              img: require("./cry.png")
            }
          ]
        },
        {
          TheDate: "2018-04-01",
          CryCount: 3,
          Data: [
            {
              MainID: "10312",
              EventTypeID: 0,
              DetailData: {
                ID: 172,
                MainID: 10312,
                EventTime: "2018-05-03 14:24:35",
                FoodCode: "breastmilk",
                FoodCodeStr: "母乳",
                FoodQuantity: 150,
                FoodQuantityStr: "150.0ml",
                Remarks: "喝了很多喝了很多"
              },
              EventTime: "2018-05-03 14:24:35",
              img: require("./cry.png")
            }
          ]
        }
      ],
      dayarr: [
        [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ],
        []
      ],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "right",
          dafaultIndex: new Date().getYear
        },
        {
          divider: true,
          content: "",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "left",

          dafaultIndex: new Date().getMonth + 1
        }
      ]
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    if (global.NET_CurDeviceData.TypeID != 0) {
      document.querySelector("#add").style.display = "none"; //隐藏
    } else {
      document.querySelector("#add").style.display = "block"; //隐藏
    }
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.day = new Date().getDate();

    this.startYear = new Date().getFullYear();
    this.startMonth = new Date().getMonth() + 1;
    this.startDay = new Date().getDate();

    this.month = this.month < 10 ? "0" + this.month : "" + this.month;
    // this.day = this.day < 10 ? "0" + this.day : "" + this.day;

    this.startMonth =
      this.startMonth < 10 ? "0" + this.startMonth : "" + this.startMonth;
    this.startDay =
      this.startDay < 10 ? "0" + this.startDay : "" + this.startDay;

    for (var i = 0; i < 20; i++) {
      this.dayarr[1].push(this.year - i);
    }
    if (localStorage.getItem("userdata") != null) {
      this.getData("");
    }
  },

  methods: {
    closeWindow() {
      //分析窗口
      this.isshow = false;
    },
    noteshow(state) {
      this.note = state;
      if ((state = false)) {
        //笑脸
      } else {
        //记录
      }
    },
    getData(time) {

      this.loading = true;

      const data = {
        EqpID: global.NET_CurDeviceData.EqpID,
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        endCheckDate: time,
        isOnlyCry: 0
      };
      consolelog(
        "global.NET_CurDeviceData.EqpID : " + global.NET_CurDeviceData.EqpID
      );
      consolelog(JSON.stringify(data));
      Vo_GetAllBabyEventCombineData(data).then(res => {
        consolelog(JSON.stringify(res));
        if (res.Code === 1) {
          // res.Data.ItemTitle
          // res.Data.ItemValue
          // console.log(JSON.stringify(res.Data));

          this.loading = false;
          this.updateicon(res.Data);
        } else {
        } /*end if*/
      });
    },
    timeConfirm() {
      this.month = this.month1;
      this.year = this.year1;
      // this.day = document
      //   .querySelectorAll("ul.time-vertical")[0]
      //   .querySelector(".date_day")
      //   .innerHTML.substr(0, 2);

      // this.getData(
      //   new Date().getFullYear() + "-" + this.month + "-" + this.day
      // );
      // this.getData(this.year + "-" + this.month+"-31");
      // this.getData(this.year + "-" + this.month+"-16");

      var da = new Date();
      var y = da.getFullYear();
      var m = da.getMonth() + 1;
      var d = da.getDate();

      if(m>=0 && m<=9)
        m = "0"+m;
      else
        m = ""+m;

      if(d>=0 && d<=9)
        d = "0"+d;

      var day = getMonthLen(this.year,this.month);
      if( this.year==y && this.month==m)
      {
        this.day = d;
        day = d;
      }
      else
        this.day = day;

      var time = this.year + "-" + this.month+"-"+day;
      this.lastLoadTime = time;
      this.newLoad = true;
      this.getData(time);
    },
    appearChangeTime() {
      this.$refs.changeTime.style.display = "none";
    },
    changeTime() {
      this.$refs.changeTime.style.display = "block";
      var year = "";
      // for(var i=0;i<)
      this.slots[0].values = this.dayarr[0];
      this.slots[2].values = this.dayarr[1];
      this.slots[0].defaultIndex = this.dayarr[0].indexOf(this.month);
      this.slots[2].defaultIndex = this.dayarr[1].indexOf(this.day);
    },

    onValuesChange(picker, values) {
      this.month1 = values[0];
      this.year1 = values[1];
    },

    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop > 180) {
        // this.state = true;
      } else {
        // this.state = false;
      }

      if(document.body.scrollHeight-document.body.clientHeight==scrollTop)
      {
        if(!this.loading)
        {
          this.loading = true;
          consolelog("最后的时间:"+this.lastLoadTime);
          var date = fromStringToDate(this.lastLoadTime+" 00:00:00");//获取当前时间
          date.setDate(date.getDate()-1);//设置天数 -1 天
          var time = fromDateToString(date);
          consolelog("时间:"+time);
          this.getData(time.split(' ')[0]);
        }
      }
    },
    back() {
      if (localStorage.getItem("userdata") != null) {
        this.$parent.loadUserInfo();
      }
      this.$router.push("/index");
    },
    changeFalse() {
      this.bol = false;
    },
    changeTrue() {
      this.bol = true;
    },
    show(data) {
      // alert(data);

      if (global.NET_CurDeviceData.TypeID == 0) this.showBol = !this.showBol;
    },
    //点击加号
    add() {
      global.PAG_EditDataAnalysis = null;
      this.$router.push("index7DataAnalysis_record");
    },

    updateicon(data) {
      if(this.newLoad == true)
      {
        this.a = [];
        this.newLoad = false;
      }

      // alert('update'+ JSON.stringify(data));
      var i = 0;
      var cur = parseInt(new Date().getMonth() + 1);

      for (let val1 in data) {

        this.lastLoadTime = data[val1].TheDate;
        var m = parseInt(data[val1].TheDate.split("-")[1]);
        if (m == cur) {
          //隐藏
          data[val1].showDate = false;
          if (val1 == 0) this.num = data[val1].CryCount;
        } else {
          //显示
          data[val1].showDate = true;
          cur = m;
        }
        consolelog("cur = " + cur + " m = " + m + " this.num = " + this.num);
        var j = 0;
        for (let val2 in data[val1].Data) {
          var icon = "";
          var title = "";

          switch (data[val1].Data[val2].EventTypeID) {
            case 0:
              {
                icon = require("./feed.png");
                title =
                  data[val1].Data[val2].DetailData.FoodQuantityStr +
                  " " +
                  data[val1].Data[val2].DetailData.FoodCodeStr;
              }
              break;
            case 1:
              {
                icon = require("./shit.png");
                title = "粑粑 " + data[val1].Data[val2].DetailData.ColorStr;
              }
              break;
            case 2:
              {
                icon = require("./diaper.png");
                title =
                  "换尿布 " + data[val1].Data[val2].DetailData.ChangeReasonStr;
              }
              break;
            case 3:
              {
                icon = require("./heat.png");
                title = data[val1].Data[val2].DetailData.TemperatureStr;
              }
              break;
            case 4: {
              icon = require("./Uncomfortable.png");
              title = data[val1].Data[val2].DetailData.MalaiseDesc;
              break;
            }
            case 5: {
              icon = require("./note.png");
              title = data[val1].Data[val2].DetailData.NoteDesc;
              break;
            }
            case 10:
              icon = require("./cry.png");
              break;
            default:
              icon = require("./reg_icon.png");
              break;
          }
          data[val1].Data[val2].ShowBol = false;
          data[val1].Data[val2].Icon = icon;
          data[val1].Data[val2].DetailData.Title = title;
          data[val1].Data[val2].DetailData.EventTypeID =
            data[val1].Data[val2].EventTypeID;

          // consolelog(this.a[val1].Data[val2].Icon);

        }
        this.a.push(data[val1]);
      }

    },
    cell_surecry(data) {
      // consolelog("surecry : "+data.DetailData.EqpWaveID);
      // consolelog(JSON.stringify(data));
      // return;
      if (global.NET_CurDeviceData.TypeID == 1) {
        Message.info({
          type: "info",
          message: "非管理员不能操作",
          center: true,
          duration: 1000
        });
      } else {
        this.IsShowCry(data.DetailData.EqpWaveID, data.EventTime); //语义分析
      }
    },
    cell_delete(data, index1, index2) {
      const data1 = {
        //食物
        MainID: data.MainID,
        InfoSource: 1,
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpID: global.NET_CurDeviceData.EqpID
      };

      Vo_DeleteEvent(data1, this.getvoiceurl(data.EventTypeID)).then(res => {
        // alert(JSON.stringify(res));
        if (res.Code === 1) {
          // res.Data.ItemTitle
          // res.Data.ItemValue
          consolelog(JSON.stringify(res.Data));

          // alert(data.MainID);
          this.a[index1].Data.splice(index2, 1);
          Message.success({
            message: "删除成功!",
            center: true,
            duration: 1000
          });
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        } /*end if*/
      });
    },
    cell_edit(data, index1, index2) {
      // alert(data.MainID);
      this.a[index1].Data[index2].ShowBol = false;
      global.PAG_EditDataAnalysis = data;
      this.$router.push("index7DataAnalysis_record");
    },
    cell_show(data, index1, index2) {
      consolelog(data);

      if (data.EventTypeID == 10) {
        let data1 =
          "?custID=" +
          JSON.parse(localStorage.getItem("userdata")).CustID +
          "&eqpID=" +
          global.NET_CurDeviceData.EqpID +
          "&cryCycleID=" +
          data.MainID +
          "&pageSize=" +
          15 +
          "&pageIndex=" +
          0;

        Vo_GetCryNotifyAllInfo(data1).then(res => {
          if (res.Code === 1) {
            this.elData = res.Data;
            if (!global.NET_CurDeviceData.TypeID) {
              this.isshow = true;
            }
          } else {
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1000
            });
          }
        });

        return;
      }
      if (this.editarr[0] != index1 || this.editarr[1] != index2) {
        consolelog(this.a[this.editarr[0]].Data[this.editarr[1]]);
        if (this.a[this.editarr[0]].Data[this.editarr[1]] != null)
          this.a[this.editarr[0]].Data[this.editarr[1]].ShowBol = false;
      }

      this.a[index1].Data[index2].ShowBol = !this.a[index1].Data[index2]
        .ShowBol;

      this.editarr[0] = index1;
      this.editarr[1] = index2;
    },
    getvoiceurl(ItemType) {
      switch (ItemType) {
        case 0:
          return "BabyDietEvent"; //喂养
        case 1:
          return "BabyMetabolismEvent"; //便便
        case 2:
          return "BabyDiaperEvent"; //换尿布
        case 3:
          return "BabyTemperatureEvent"; //量体温
        case 4:
          return "BabyMalaiseEvent"; //不舒服
        case 5:
          return "BabyNoteEvent"; //随意记
        default:
          return "";
      }
    },
    IsShowCryReasonWin(wavid, mac, time) {
      // var date = new Date(time);

      //询问是否需要推送哭声原因（true弹，false不弹)
      // const data = {
      //   eqpWaveID: wavid,
      //   eqpMacStr: mac,
      //   voiceTime: time
      // }

      var data =
        "?eqpWaveID=" +
        wavid +
        "&eqpMacStr=" +
        mac +
        "&voiceTime=" +
        time +
        "&custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID;

      Vo_IsShowCryReasonWin(data).then(
        res => {
          // alert(JSON.stringify(res));
          if (res.Code === 1) {
            // Message.success({
            //   message: res.Msg+res.Data,
            //   center: true,
            //   duration: 1000
            // });
            if (res.Data) {
              this.GetBabyCryReasonList(wavid, time);
            }
          } else {
            // Message.error({
            //   message: res.Msg,
            //   center: true,
            //   duration: 1000
            // });
          } /*end if*/
        }
      );
    },
    GetBabyCryReasonList(wavid, time) {
      // alert("wavid : "+wavid);
      //获取哭声原因分析数据
      // const data = {
      //   eqpWaveID: wavid,
      //   custID: JSON.parse(localStorage.getItem("userdata")).CustID,
      //   voiceTime: time
      // }

      var data =
        "?eqpWaveID=" +
        wavid +
        "&custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&voiceTime=" +
        time +
        "&eqpID=" +
        global.NET_CurDeviceData.EqpID;
      Vo_GetBabyCryReasonList(data).then(
        res => {
          // alert(JSON.stringify(res));
          if (res.Code === 1) {
            // Message.success({
            //   message: res.Msg,
            //   center: true,
            //   duration: 1000
            // });
            global.NET_LexemeAnalysis = res.Data;
            global.NET_LexemeAnalysisWaveID = wavid;

            this.$router.push("index7DataAnalysis_cryanalyze");
          } else {
            // Message.error({
            //   message: res.Msg,
            //   center: true,
            //   duration: 1000
            // });
          } /*end if*/
        }
      );
    },
    IsShowCry(mainid, time) {
      this.IsShowCryReasonWin(mainid, global.DEV_CurDeviceMac, time);
    }
  },
  components: {
    vheader,
    recordanalysis
  }
};
</script>


<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.dataAnalyze {
  // .header {
  //   width: 100%;
  //   background: $color-text-a;
  //   height: rem(138);
  //   color: #fff;
  //   text-align: center;
  //   position: fixed;
  //   z-index: 999;
  //   .lefticon {
  //     //font-size: rem(50);
  //     position: absolute;
  //     top: 0.8rem;
  //     left: rem(24);
  //   }
  //   .content {
  //     display: inline-block;
  //     .text {
  //       display: inline-block;
  //       &.textOhter {
  //         // margin-top: 0.45rem;
  //       }

  //       .dynamic {
  //         display: inline-block;
  //         color: #fff;
  //         height: rem(122);
  //         a {
  //           display: block;
  //           width: 100%;
  //           height: 100%;
  //           color: #fff;
  //           //font-size: rem(45);
  //         }
  //         &.active {
  //           color: #fff;
  //           border-bottom: rem(6) solid #fff;
  //         }
  //         p {
  //           line-height: rem(170);
  //         }
  //       }
  //       .data {
  //         display: inline-block;
  //         color: #fff;
  //         height: rem(122);
  //         a {
  //           display: block;
  //           width: 100%;
  //           height: 100%;
  //           color: #fff;
  //           //font-size: rem(45);
  //         }
  //         &.active {
  //           color: #fff;
  //           border-bottom: rem(6) solid #fff;
  //         }
  //         p {
  //           line-height: rem(180);
  //         }
  //       }
  //     }
  //   }
  // }
  .sroll-warpper {
    position: sticky;
    top: rem(0);
    z-index: -1;
    padding-bottom: rem(10);
    &.active {
      overflow: hidden;
    }
  }
  .head {
    width: 100%;
    height: rem(300);
    // margin-top: rem(138);
    position: relative;
    z-index: 2;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .state {
    width: 100%;
    z-index: 33;
    position: sticky;
    top: rem(136);
    background: #fff;
    height: rem(130);
    &::after {
      content: "";
      visibility: hidden;
      display: block;
      clear: both;
    }
    // &.active {
    //   position: fixed;
    //   top: rem(135);
    //   background: #fff;
    // }
    .add {
      position: absolute;
      // top: rem(300);
      left: 0;
      right: 0;
      margin: auto;
      width: rem(110);
      height: rem(110);
      border-radius: 50%;
      transition: all 0.3s;
      margin-top: rem(10);
      img {
        width: 100%;
        height: 100%;
      }
      // &.active {
      //   // transform: scale(0.5);
      //   width: rem(110);
      //   height: rem(110);
      //   transition: all 0.3s;
      // }
    }
    .time {
      float: left;
      width: rem(300);
      height: rem(100);
      margin-top: rem(20);
      img {
        width: rem(51);
        height: rem(48);
      }
      .today {
        //font-size: rem(32);
        color: #aaa;
      }
      .times {
        //font-size: rem(30);
        font-weight:bold;
      }
    }
    .cry {
      width: rem(300);
      height: rem(100);
      line-height: rem(100);
      float: right;
      //font-size: rem(40);
      margin-top: rem(20);
      .d1 {
        color: #fe6873;
        //font-size: rem(28);
        font-weight:bold;
        img {
          width: rem(100);
          height: rem(70);
          vertical-align: middle;
        }
      }
      span {
        display: inline-block;
        vertical-align: middle;
        width: rem(100);
        height: rem(100);
        img {
          width: 80%;
          height: 80%;
        }
      }
    }
  }
  .dynamicBox {
    position: relative;
    margin-top: rem(0);
  }

  .activebottom {
    width: 100%;
    color: #000;
    //font-size: rem(24);
    line-height: 150%;
    margin-bottom: rem(50);
  }
  .event {
    .timeConfirm {
      width: 100%;
      height: rem(80);
      background: #ec8daa;
      line-height: rem(80);
      //font-size: rem(30);
    }
    .changeTime {
      width: 100%;
      position: fixed;
      bottom: 0;
      display: none;
      background: #fff;
      z-index: 999;
    }
    // min-height: rem(834);
    width: 100%;
    position: relative;
    padding-top: 5px;
    background: #fff;
    .time-vertical {
      /*// padding-bottom: rem(0);*/
      /*background: #fff;*/
      position: relative;
      /*padding-top: rem(20);*/
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: rem(4);
        height: 100%;
        background: #eee;
        box-sizing: border-box;
        margin-left: -0.01rem;
        clear: both;
      }
      ul {
        width: 100%;
        /*height: auto;*/
        background: #fff;

        &.li_ul {
          margin-bottom: rem(0);
        }
      }
    }

    ul li {
      position: relative;
      /*min-height: rem(43);*/
       margin-bottom: rem(10);
      &:last-child {
        margin-bottom: 0;
      }
      &:after {
        content: "";
        visibility: hidden;
        display: block;
        clear: both;
      }
      span {
        display: inline-block;
        &.date_month {
          position: absolute;
          left: rem(-70);
          top: rem(0);
          //font-size: rem(30);
          color: #000;
          font-weight: 100;
        }
        &.date_day {
          position: absolute;
          left: rem(-80);
          top: rem(0);
          //font-size: rem(20);
          color: #aeabab;
        }
        &.date2 {
          position: absolute;
          /*left: rem(140);*/
          right: 6.3rem;
          top: rem(5);
          //font-size: rem(30);
          color: #000;
        }
        &.date3 {
          position: absolute;
          right: 6.3rem;
          top: rem(40);
          //font-size: rem(20);
          color: #bbb;
        }
      }
      .delete {
        // float: left;
        position: absolute;
        left: rem(35);
        // top: 0.6rem;
        // margin-left: rem(50);
        bottom: 0.2rem;
        width: rem(40);
        height: rem(40);
        animation: translatedel 1s;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .shijian {
        float: left;
        margin-left: rem(150);
        //font-size: 0.24rem;
        margin-top: 0.6rem;
        color: #000;
      }
      .shijiandotred {
        //font-size: rem(24);
        margin-left: rem(250);
      }
      .icon {
        margin: 0 auto;
        // margin-top: 0.3rem;
        width: rem(70);
        height: rem(70);
        margin-bottom: rem(45);
        z-index: 2;
        img {
          width: 100%;
          height: auto;
        }
        // &::before {
        //   content: "";
        //   position: absolute;
        //   top: rem(80);
        //   left: 50%;
        //   width: 2px;
        //   height: 100%;
        //   background: #eee;
        //   box-sizing: border-box;
        //   margin-left: -0.01rem;
        //   clear: both;
        //   z-index: -999;
        // }
      }
      .dot {
        margin: 0 auto;
        width: rem(16);
        /*height: rem(16);*/
        img {
          width: 107%;
          padding-bottom: 5px;
        }
      }
      .dotred {
        // position: absolute;
        // top: 0%;
        // bottom: 0;
        // left: 0;
        // right: 0;
        margin: 0 auto;
        // display:inline-block;
        width: rem(34);
        height: rem(90);
        // padding-top: rem(50);
        // transform:translateX(-50%);
        img {
          width: 105%;
        }
      }
      .thing {
        float: right;
        width: 4rem;
        text-align: left;
        margin-right: 0.1rem;
        //font-size: 0.4rem;
        margin-top: rem(30);
        // margin-left: rem(10);
        position: relative;
        p {
          // //font-size: rem(35);
          //font-size: rem(32);
          color: #000;
          /*margin-top: rem(0);*/
          margin-top: -0.23rem;
        }
        span {
          color: #565656;
          margin-top: rem(-20);
          //font-size: rem(25);
          min-height: 0.4rem;
          width: rem(250);
          line-height: rem(35);
          display: initial;
        }
        ul {
          li {
            min-height: rem(40);
            //font-size: rem(26);
            /*margin-bottom: rem(6);*/
          }
          &:last-child {
            margin-bottom: 0.5rem;
          }
        }
        li:before {
          // list-style: disc;
          // content: "●";
          // color: #178bf8;
        }
        .queding {
          color: #fff;
          background: #ff7a7b;
          text-align: center;
          width: rem(90);
          height: rem(90);
          line-height: rem(90);
          border-radius: 100px;
          // display: inline-block;
          //font-size: rem(24);
          position: absolute;
          left: 55%;
          top: 0;
          transform: translateY(100%);
        }
      }
      .edit {
        // float: right;
        position: absolute;
        right: rem(35);
        // top: 0.6rem;
        bottom: 0.2rem;
        width: rem(40);
        height: rem(40);
        animation: translateedit 1s;
        z-index: 1;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .dataBox {
    // margin-top: 1.5rem;
    .top {
      width: 90%;
      height: 0.6rem;
      background: linear-gradient(left, #f17899, #f5b0cc);
      margin: auto;
      border-radius: 0.2rem;
      border: rem(6) solid #fff;
      margin-top: 0.7rem;
      box-shadow: 0 0 0.4rem #f5b0cc;
    }
    .top ul {
    }
    .top ul li {
      float: left;
      display: block;
      margin: 0.1rem 0.5rem;
      //font-size: 0.4rem;
      color: #fff;
    }
    .cry {
      float: left;
      display: block;
      height: 0.2rem;
      width: 0.2rem;
      background: #f00;
      border: rem(4) solid #fff;
      border-radius: 50%;
    }
    .huanjing {
      width: 20%;
      height: 0.1rem;
      background: #fff;
      margin-top: 0.2rem !important;
    }
    .buttom {
      width: 90%;
      height: 12rem;
      margin: 0 auto;
      box-shadow: 0 0 0.1rem #ec8daa;
      margin-top: 1rem;
      border-radius: 0.3rem;
    }
    .red {
      display: block;
      width: 100%;
      height: 6.5rem;
      background: #f3759a;
      border-radius: 0.3rem 0.3rem 0 0;
    }
    .white {
      display: block;
      width: 100%;
      height: 4.5rem;
      background: #fff;
      border-radius: 0 0 0.3rem 0.3rem;
      p {
        text-align: left;
        margin-left: 0.5rem;
        line-height: 200%;
        //font-size: 0.4rem;
      }
      ul li {
        float: left;
        width: 50%;
        margin-top: 0.5rem;
      }
      span {
        display: block;
        height: 0.3rem;
        width: 0.3rem;
        border-radius: 50%;
        background: red;
        color: #adf;
      }
      .yiban {
        //font-size: 1.1rem;
      }
      .crying {
        display: block;
        /*//font-size: 0.4rem;*/
        background: url("./RedSpot.png") no-repeat 0 0 / contain;
        background-position-x: 20%;
        margin-top: 1rem;
      }
    }
  }
  @media (min-height: 737px) {
    .dataBox {
      margin-top: rem(100);
    }
    .dataBox .buttom {
      margin-top: rem(100);
    }
  }
}
@keyframes translatedel {
  0% {
    margin-left: 40%;
  }
  100% {
    left: rem(35);
    transform: rotate(720deg);
  }
}
@keyframes translateedit {
  0% {
    margin-right: 40%;
  }
  100% {
    right: rem(35);
    transform: rotate(720deg);
  }
}
</style>
