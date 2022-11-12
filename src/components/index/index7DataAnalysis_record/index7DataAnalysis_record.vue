<template>
  <div class="blankgap index_record">
    <!--<vheader title="记录" :type="4" backtext='×' @otherclick='otherclick' @back='back'></vheader>-->
    <vheader title="记录" :type="1" @back='back'></vheader>
    <div class="contain">
      <div class="header">
        <div class="pic"><img v-bind:src="img" alt=" "> </div>
        <ul ref="itemvalue" v-if='double==true'>
          <li class="name">{{name}}</li>
          <li>{{TIME+":"+FEN}}</li>
          <li>{{ItemTitleVal}}</li>
          <li>{{ItemValueVal}}</li>
        </ul>
        <ul ref="itemvalue" v-else>
          <li class="name">{{name}}</li>
          <li>{{TIME+":"+FEN}}</li>
          <li>{{ItemTitleVal}}</li>
        </ul>
      </div>
      <div class="center">
        <ul>
          <li v-show="show[0]">
            <div class="imgbox" @click="click(0)">
              <img v-bind:src="this.arr[0].imgurl" />
              <p class="name">{{this.arr[0].name}}</p>
            </div>
          </li>
          <li v-show="show[1]">
            <div class="imgbox" @click="click(3)">
              <img v-bind:src="this.arr[3].imgurl" />
              <p class="name">{{this.arr[3].name}}</p>
            </div>
          </li>
          <li v-show="show[2]">
            <div class="imgbox" @click="click(1)">
              <img v-bind:src="this.arr[1].imgurl" />
              <p class="name">{{this.arr[1].name}}</p>
            </div>
          </li>
          <li v-show="show[3]">
            <div class="imgbox" @click="click(2)">
              <img v-bind:src="this.arr[2].imgurl" />
              <p class="name">{{this.arr[2].name}}</p>
            </div>
          </li>
          <li v-show="show[4]">
            <div class="imgbox" @click="click(4)">
              <img v-bind:src="this.arr[4].imgurl" />
              <p class="name">{{this.arr[4].name}}</p>
            </div>
          </li>
          <li v-show="show[5]">
            <div class="imgbox" @click="click(5)">
              <img v-bind:src="this.arr[5].imgurl" />
              <p class="name">{{this.arr[5].name}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <div class="bottom_header">
          <div class="day" @click="click(6)">{{Month}}月{{DAY}}日</div>
          <div class="time" @click="click(7)">{{TIME}}:{{FEN}}</div>
          <ul>
            <li @click="click(8)" style="display:none;"> <img src="./member.png" alt=""> </li>
            <li>
              <img src="./remarks.png" alt="" @click='namedialogVisible=true'>
            </li>
            <li class="queding" @click="queding" ref="abc">确定</li>
          </ul>
        </div>
        <div class="bottom_contain">
          <div class="" ref="prick" style="display:block;">
            <mt-picker :slots="slots" @change="onPickerChange" v-show='double==true'></mt-picker>
            <mt-picker :slots="slots1" @change="onPickerChange" v-show='double==false'></mt-picker>
          </div>

        </div>
      </div>
    </div>
              <el-dialog title="输入备注.." :visible.sync="namedialogVisible" width="80%" :modal="false">
                <input type="text" value="" v-model="ItemRemarks">
                <span slot="footer" class="dialog-footer">
                  <el-button @click="quxiao()">取 消</el-button>
                  <el-button type="primary" @click="ok()" class="ok">确 定</el-button>
                </span>
              </el-dialog>
  </div>
</template>

<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
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
  getMonthLen
} from "api/device";

export default {
  name: "indexSuccess",
  data() {
    return {
      namedialogVisible: false,
      img: "",
      name: "",
      member: "",
      YEAR: 0,
      Month: 0,
      DAY: 0,
      TIME: 0,
      FEN: 0,
      SEC: 0,
      data: new Date(),
      show: [false, false, false, false, false, false],
      ItemTitleKey: [],
      ItemTitleJson: {},
      ItemValueKey: [],
      ItemValueJson: {},
      ItemTitle: "",
      ItemValue: "",
      ItemTitleVal: "",
      ItemValueVal: "",
      ItemType: -1,
      ItemPickerType: -1,
      ItemRemarks: "",
      double: true,
      arr: [
        { imgurl: require("./feed.png"), name: "喂养", id: 1 },
        { imgurl: require("./shit.png"), name: "粑粑", id: 3 },
        { imgurl: require("./diaper.png"), name: "尿布", id: 4 },
        { imgurl: require("./temperature.png"), name: "体温", id: 2 },
        { imgurl: require("./Uncomfortable.png"), name: "不舒服", id: 5 },
        { imgurl: require("./note.png"), name: "随意记", id: 6 }
      ],
      timearr: [
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
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24"
        ],
        [
          "00",
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
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59"
        ]
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
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ]
      ],
      memberarr: [["成员"], ["爸爸", "妈妈", "爷爷", "奶奶", "保姆"]],
      test: ["爸爸", "妈妈", "爷爷", "奶奶", "保姆"],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "right"
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
          textAlign: "left"
        }
      ],
      slots1: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },

  mounted() {
  },
  created(){
    this.setedit();
  },
  methods: {
    setedit() {
      this.settime(new Date());
      if (global.PAG_EditDataAnalysis != null) {
        switch (global.PAG_EditDataAnalysis.EventTypeID) {
          case 0:
            this.show[0] = true;
            break;
          case 1:
            this.show[3] = true;
            break;
          case 2:
            this.show[1] = true;
            break;
          case 3:
            this.show[2] = true;
            break;
          case 4:
            this.show[4] = true;
            break;
          case 5:
            this.show[5] = true;
            break;
        }

        this.click(global.PAG_EditDataAnalysis.EventTypeID);
        this.ItemRemarks = global.PAG_EditDataAnalysis.DetailData.Remarks;
        // EventTime

        switch (this.ItemType) {
          case 0: //喂养
            {
              this.ItemTitle = global.PAG_EditDataAnalysis.DetailData.FoodCode;
              this.ItemValue =
                global.PAG_EditDataAnalysis.DetailData.FoodQuantity;
            }
            break;
          case 1: //便便
            this.ItemValue = global.PAG_EditDataAnalysis.DetailData.Color;
            break;
          case 2: //换尿布
            this.ItemValue =
              global.PAG_EditDataAnalysis.DetailData.ChangeReason;
            break;
          case 3: //量体温
            this.ItemValue = global.PAG_EditDataAnalysis.DetailData.Temperature;
            break;
          case 4: //不舒服
            this.ItemValue = global.PAG_EditDataAnalysis.DetailData.Temperature;
            break;
          case 5: //随意记
            this.ItemValue = global.PAG_EditDataAnalysis.DetailData.Temperature;
            break;
          default:
            break;
        }

        this.settime(
          this.fromData(global.PAG_EditDataAnalysis.DetailData.EventTime)
        );
      } else {
        this.show = [true, true, true, true, true, true, true];
        this.click(0);
      }
    },
    fromData(datestr) {
      var fullDate = datestr.split(" ");
      var fullDate1 = fullDate[0].split("-");
      var fullDate2 = fullDate[1].split(":");
      return new Date(
        fullDate1[0],
        fullDate1[1] - 1,
        fullDate1[2],
        fullDate2[0],
        fullDate2[1],
        fullDate2[2]
      );
    },
    settime(date) {
      this.YEAR = date.getFullYear();
      this.Month = date.getMonth() + 1;
      this.DAY = date.getDate();
      this.TIME = date.getHours();
      this.FEN = date.getMinutes();
      this.SEC = date.getSeconds();

      this.Month = this.Month < 10 ? "0" + this.Month : "" + this.Month;
      this.DAY = this.DAY < 10 ? "0" + this.DAY : "" + this.DAY;
      this.TIME = this.TIME < 10 ? "0" + this.TIME : "" + this.TIME;
      this.FEN = this.FEN < 10 ? "0" + this.FEN : "" + this.FEN;
      this.SEC = this.SEC < 10 ? "0" + this.SEC : "" + this.SEC;
    },
    otherclick() {
      this.$router.go(-1);
      return;
    },
    back() {
      this.$router.go(-1);
    },
    click(typeid) {
      this.ItemPickerType = typeid;
      console.log(typeid);

      this.double = true;
      if (typeid == 4 || typeid == 5) {
        this.double = false;
      }
      if (this.ItemPickerType < 6) {
        this.img = this.arr[this.ItemPickerType].imgurl;
        this.name = this.arr[this.ItemPickerType].name;
        this.ItemType = typeid;

        const data = {
          EqpID: global.NET_CurDeviceData.EqpID,
          eventTypeID: typeid
        };

        Vo_GetBabyEventDisplayItems(data).then(res => {
          // alert(JSON.stringify(res));
          if (res.Code === 1) {
            console.log(JSON.stringify(res.Data));

            var title = res.Data.ItemTitle;
            this.ItemTitleKey = [];
            this.ItemTitleJson = {};
            for (let i in title) {
              this.ItemTitleKey.push(title[i]["Key"]);
              this.ItemTitleJson[title[i]["Key"]] = title[i]["Value"];
            }
            if (this.double == true) {
              this.slots[0].values = this.ItemTitleKey;
            } else {
              this.slots1[0].values = this.ItemTitleKey;
            }

            var value = res.Data.ItemValue;
            this.ItemValueKey = [];
            this.ItemValueJson = {};
            for (let i in value) {
              this.ItemValueKey.push(value[i]["Key"]);
              this.ItemValueJson[value[i]["Key"]] = value[i]["Value"];
            }
            if (this.double == true) {
              this.slots[2].values = this.ItemValueKey;
            }

            console.log(
              "PAG_EditDataAnalysis = " +
                JSON.stringify(global.PAG_EditDataAnalysis)
            );
            if (global.PAG_EditDataAnalysis == null) {
              this.slots[0].defaultIndex = 0;
              this.slots[2].defaultIndex = 0;
            } else {
              // this.slots[0].defaultIndex = this.ItemValueKey[1].indexOf(this.Month);
              // this.slots[2].defaultIndex = this.ItemValueKey[1].indexOf(this.DAY);
              switch (global.PAG_EditDataAnalysis.EventTypeID) {
                case 0: //食物
                  {
                    this.img = this.arr[0].imgurl;
                    this.name = this.arr[0].name;
                    this.slots[0].defaultIndex = this.ItemTitleKey.indexOf(
                      global.PAG_EditDataAnalysis.DetailData.FoodCodeStr
                    );
                    this.slots[2].defaultIndex = this.ItemValueKey.indexOf(
                      global.PAG_EditDataAnalysis.DetailData.FoodQuantityStr
                    );
                  }
                  break;
                case 1: //便便
                  {
                    this.img = this.arr[2].imgurl;
                    this.name = this.arr[2].name;
                    this.slots[2].defaultIndex = this.ItemValueKey.indexOf(
                      global.PAG_EditDataAnalysis.DetailData.ColorStr
                    );
                  }
                  break;
                case 2: //换尿布
                  {
                    this.img = this.arr[3].imgurl;
                    this.name = this.arr[3].name;
                    this.slots[2].defaultIndex = this.ItemValueKey.indexOf(
                      global.PAG_EditDataAnalysis.DetailData.ChangeReasonStr
                    );
                  }
                  break;
                case 3: //量体温
                  {
                    this.img = this.arr[1].imgurl;
                    this.name = this.arr[1].name;

                    this.slots[2].defaultIndex = this.ItemValueKey.indexOf(
                      global.PAG_EditDataAnalysis.DetailData.TemperatureStr
                    );
                  }
                  break;
                case 4: //不舒服
                  {
                    this.img = this.arr[4].imgurl;
                    this.name = this.arr[4].name;
                    this.slots1[0].defaultIndex = this.ItemValueKey.indexOf(
                      global.PAG_EditDataAnalysis.DetailData.TemperatureStr
                    );
                  }
                  break;
                case 5: //随意记
                  {
                    this.img = this.arr[5].imgurl;
                    this.name = this.arr[5].name;
                    this.slots1[0].defaultIndex = this.ItemValueKey.indexOf(
                      global.PAG_EditDataAnalysis.DetailData.TemperatureStr
                    );
                  }
                  break;
                default:
                  break;
              }
            }
          } else {
          } /*end if*/
        });
      } else if (this.ItemPickerType == 6) {
        //日期

        var da = new Date();
        var y = da.getFullYear();
        var m = da.getMonth() + 1;
        var d = da.getDate();
        // console.log("日期1",m,d);
        //日期
        var tr1 = [];
        for(var i=0;i<m;i++)
        {
          tr1.push(this.dayarr[0][i]);
        }
        this.slots[0].values = tr1;
        // this.slots[0].values = this.dayarr[0];
        var tr2 = [];
        for(var i=0;i<d;i++)
        {
          tr2.push(this.dayarr[1][i]);
        }
        this.slots[2].values = tr2;

        // this.slots[0].values = this.dayarr[0];
        // this.slots[2].values = this.dayarr[1];
        this.slots[0].defaultIndex = m-1;
        this.slots[2].defaultIndex = d-1;

      } else if (this.ItemPickerType == 7) {
        //时间
        this.slots[0].values = this.timearr[0];
        this.slots[2].values = this.timearr[1];

        this.slots[0].defaultIndex = this.timearr[0].indexOf(this.TIME);
        this.slots[2].defaultIndex = this.timearr[1].indexOf(this.FEN);
      } else if (this.ItemPickerType == 8) {
        //成员
        this.slots[0].values = this.memberarr[0];
        this.slots[2].values = this.memberarr[1];

        // this.slots[2].defaultIndex = this.memberarr[1].indexOf('爷爷');
      }
    },
    onPickerChange(picker, values) {
      if (this.ItemPickerType < 6) {
        //
        this.ItemTitleVal = values[0];
        this.ItemValueVal = values[1];

        this.ItemTitle = this.ItemTitleJson[values[0]];
        this.ItemValue = this.ItemValueJson[values[1]];
      } else if (this.ItemPickerType == 6) {
        //日期

        var da = new Date();
        var y = da.getFullYear();
        var m = da.getMonth() + 1;
        var d = da.getDate();

        if(this.DAY != values[1])
        {
          this.DAY = values[1];
        }
        else if(this.Month != values[0])
        {
          this.Month = values[0];

          var day = getMonthLen(y,parseInt(this.Month));

          if(parseInt(this.Month) == m)
          {
            day = d;
          }

          var tr2 = [];
          for(var i=0;i<day;i++)
          {
            tr2.push(this.dayarr[1][i]);
          }
          this.slots[2].values = tr2;
          if(this.slots[2].defaultIndex>day || this.Month=="02")
            this.slots[2].defaultIndex = day-1;
          else if(parseInt(this.Month) == m)
          {
            this.slots[2].defaultIndex = d-1;
          }
        }
      } else if (this.ItemPickerType == 7) {
        //时间
        this.TIME = values[0];
        this.FEN = values[1];
      } else if (this.ItemPickerType == 8) {
        //成员
        this.member = values[1];
      }
    },
    // Remarks(){
    //   const self = this;
    //   plus.nativeUI.prompt(
    //     //plus的prompt
    //     " ",
    //     function(e) {
    //       console.log((e.index == 0 ? "OK: " : "Cancel") + e.value);
    //       if (e.index == 0) {
    //         if (e.value == null || e.value == "") {
    //           Message.error({
    //             message: "输入值不能为空!",
    //             center: true,
    //             duration: 1000
    //           });
    //         } else {
    //           seft.ItemRemarks = e.value;
    //         }
    //       }
    //     },
    //     "备注",
    //     "请输入备注",
    //     ["确认", "取消"]
    //   );
    // },
    queding() {
      const data = {
        //食物
        EventTime:
          this.YEAR +
          "-" +
          this.Month +
          "-" +
          this.DAY +
          " " +
          this.TIME +
          ":" +
          this.FEN +
          ":" +
          this.SEC,
        InfoSource: 1,
        CustID: JSON.parse(localStorage.getItem("userdata")).CustID,
        EqpID: global.NET_CurDeviceData.EqpID,
        Remarks: this.ItemRemarks
      };
      switch (this.ItemType) {
        case 0: //喂养
          {
            data.FoodCode = this.ItemTitle;
            data.FoodQuantity = this.ItemValue;
          }
          break;
        case 1: //便便
          data.Color = this.ItemValue;
          break;
        case 2: //换尿布
          data.ChangeReason = this.ItemValue;
          break;
        case 3: //量体温
          data.Temperature = this.ItemValue;
          break;
        case 4: //不舒服
          data.malaiseDesc = this.ItemTitleVal;
          break;
        case 5: //随意记
          data.noteDesc = this.ItemTitleVal;
          break;
        default:
          break;
      }

      if (global.PAG_EditDataAnalysis == null) {
        console.log(JSON.stringify(data));
        Vo_AddEvent(data, this.getvoiceurl()).then(res => {
          //console.log(JSON.stringify(res));
          if (res.Code === 1) {
            console.log(JSON.stringify(res.Data));

            this.$router.push("index7DataAnalysis");
            Message.success({
              message: "保存成功!",
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
      } else {
        data.MainID = global.PAG_EditDataAnalysis.DetailData.MainID;
        Vo_EditEvent(data, this.getvoiceurl()).then(res => {
          //console.log(JSON.stringify(res));
          if (res.Code === 1) {
            console.log(JSON.stringify(res.Data));

            this.$router.push("index7DataAnalysis");
            Message.success({
              message: "保存成功!",
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
      }
    },
    quxiao() {
      this.value = this.value;
      this.namedialogVisible = false;
    },
    ok() {
      this.namedialogVisible = false;
    },
    getvoiceurl() {
      switch (this.ItemType) {
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
.index_record {
  background: rgb(237, 237, 237);
  .picker-center-highlight{
    background-color: rgb(237, 237, 237);
  }
  .contain {
    .header {
      width: 100%;
      height: rem(100);
      background: #fff;
      color: #000;
      img {
        height: 90%;
        width: 8%;
        float: left;
        margin-left: 3%;
        margin-top: 3%;
      }
    }
    .header ul {
      float: left;
      width: 75%;
      li {
        float: left;
        width: 25%;
        margin-top: 0.5rem;
        color: #939393;
      }
      .name {
        color: #000;
        font-size: 0.33rem;
      }
    }
    .center {
      width: 100%;
      height: 90%;
      background: #fff;
      li {
        float: left;
        width: 20%;
        display: block;
        margin-left: 0.4rem;
      }
      .imgbox {
        img {
          margin-top: 0.8rem;
          width: rem(90);
          height: rem(90);
          border-radius: 100px;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 40%;
      position: absolute;
      bottom: 0;
      background: #fff;
      position: absolute;
      z-index: -2;
    }
    .bottom_header {
      width: 100%;
      height: rem(50);
      background: #fff;
      border-bottom: 1px solid #e7e7e7;
      padding: 0.13rem 0;

      .day,
      .time {
        float: left;
        margin-top: rem(5);
        margin-left: rem(30);
        height: 80%;
        width: rem(150);
        border: 1px solid #e7e7e7;
        border-radius: rem(35);
        text-align: center;
        line-height: 200%;
        color: #426ae4;
        font-size: rem(20);
      }
      ul {
        // margin-right:-1rem;
      }
      ul li {
        text-align: right;
        display: inline;
        margin-right: 0.3rem;
        img {
          width: 5%;
          height: 80%;
          margin-top: 0.05rem;
        }
      }
      .queding {
        color: #fff;
        background: linear-gradient(to right, #1081f9, #2aaffe);
        text-align: center;
        width: rem(80);
        height: rem(40);
        line-height: rem(45);
        border-radius: 0.3rem;
        display: inline-block;
        font-size: rem(20);
        margin-right: rem(-80);
        vertical-align: bottom;
        padding: rem(0) rem(10);
      }
      .ok {
        // margin-left: -0.8rem;
      }
    }
  }
}
</style>

