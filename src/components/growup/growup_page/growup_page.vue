<template>

  <div class="blankgap page_box">
    <div class="bg">
      <!-- <div class="header_page_box">
        <div class="lefticon" @click="back()">
          <span class="el-icon-arrow-left"></span>
        </div>
        <div class="text"> 我的评测</div>
    
      </div> -->
      <vheader title="我的测评" :type="1" @back='back'></vheader>
      <div class="conttainer_page_box">
        <p>
          {{questionText}}
        </p>
        <div class="btn_group">
          <div class="btns" @click="questionClick(1)">是</div>
          <div class="btns" @click="questionClick(0)">否</div>
        </div>
      </div>
      <div class="Progressbar">
        <div class="progress" :style="'width:'+SchedulePercent+'%;'"></div>
      </div>
    </div>
    <Vdialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog" @cancel='cancel'>
    </Vdialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { GrowTestStart, GrowTestContinue } from "api/growup";
import { MessageBox } from "mint-ui";
import Vdialog from "base/v-dialog/v-dialog";
import vheader from "base/v-header/v-header";
export default {
  name: "growup_page",
  data() {
    return {
      //开始题数
      star: 0,
      end: 5,
      //存放问题的对象
      questionobj: {},
      index: 0,
      //问题
      questionText: "",
      // 答案
      answer: "",
      showDialog: false,
      SchedulePercent: 0,
      dialogOption: {
        text: "99%的家长都为宝宝做完了测评是否坚持一下",
        cancelButtonText: "同意",
        confirmButtonText: "拒绝"
      }
    };
  },
  created() {
    let data = {
      custID: JSON.parse(localStorage.getItem("userdata")).CustID
    };
    GrowTestStart(data).then(res => {
      if (res.Code === 1) {
        this.questionobj = res.Data;
        this.questionText = this.questionobj.TestItemDetails[
          this.index
        ].TestContent;
        this.star = res.Data.CurrentCount;
        this.end = res.Data.MaxEstimateCount * 2;
        // console.log(this.questionobj);
      } else {
        Message.error({
          message: res.Msg,
          center: true,
          duration: 1000
        });
      }
    });
  },
  methods: {
    cancel() {
      this.showDialog = false;
    },
    back() {
      // MessageBox.confirm("99%的家长都为宝宝做完了测评是否坚持一下").then(
      //   action => {
      //     this.$router.go(-1);
      //   }
      // );
      this.showDialog = true;
      this.$refs.dialog
        .confirm()
        .then(() => {
          this.showDialog = false;
          this.$router.go(-1);
        })
        .catch(() => {
          this.showDialog = false;
        });
    },
    questionClick(index) {
      this.star++;
      this.questionobj.TestItemDetails[this.index].Answer = index;
      // console.log(this.questionobj.TestItemDetails[this.index].Answer)
      if (this.index < this.questionobj.TestItemDetails.length - 1) {
        this.index++;
        this.questionText = this.questionobj.TestItemDetails[
          this.index
        ].TestContent;
      } else {
        this.index = 0;
        this.continusQues();
      }
    },
    continusQues() {
      //传递的参数
      let data = {
        testID: this.questionobj.TestID,
        itemDetails: this.questionobj.TestItemDetails,
        rangeIndex: this.questionobj.RangeIndex,
        custID: JSON.parse(localStorage.getItem("userdata")).CustID
      };
      console.log(data);
      //继续做题
      GrowTestContinue(data).then(res => {
        console.log(res);
        if (res.Code === 1) {
          this.questionobj = res.Data;
          this.questionText = this.questionobj.TestItemDetails[
            this.index
          ].TestContent;
          this.SchedulePercent = res.Data.SchedulePercent;
        } else if (res.Code === 10) {
          this.$router.push({
            path: "./growup_result",
            query: { testID: this.questionobj.TestID }
          });
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    }
  },
  components: {
    Vdialog,
    vheader
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.page_box {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  height: 100%;
  @include bg-image("./ansertest_bg");
  background-size: 100%;
  .Progressbar {
    width: 90%;
    height: rem(40);
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    position: fixed;
    bottom: rem(20);
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%, -50%);
    .progress {
      height: rem(40);
      background: #fff5ae;
    }
  }
  .header_page_box {
    height: 69px;
    text-align: center;
    color: #fff;
    .lefticon {
      font-size: 23px;
      position: absolute;
      top: 24px;
      left: 12px;
    }
    .text {
      font-size: rem(45);
      display: inline-block;
      line-height: 80px;
    }
    .rightpage {
      color: #fff;
      letter-spacing: 2px;
      font-size: rem(35);
      padding-right: rem(20);
      line-height: 80px;
    }
  }
  .conttainer_page_box {
    width: 90%;
    margin: rem(15) auto 0 auto;

    p {
      text-align: left;
      color: #fff;
      font-size: rem(40);
      letter-spacing: 1px;
      line-height: 25px;
      margin-bottom: rem(80);
      min-height: rem(170);
    }
    .btn_group {
      .btns {
        background: #fff;
        width: 100%;
        font-size: rem(40);
        color: #000;
        border-radius: 5px;
        line-height: 60px;
        margin-bottom: rem(60);
        &:active {
          background-color: #fff5ae;
        }
      }
    }
  }
  @media (min-height: 737px) {
    .header_page_box {
      height: 120px;
      .text {
        line-height: 120px;
      }
      .lefticon {
        top: 46px;
      }
    }
    .Progressbar {
      bottom: rem(100);
    }
  }
}
</style>