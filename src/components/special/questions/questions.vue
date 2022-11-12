<template>
  <div class="blankgap qu_box">
    <vheader title="问题答疑" :type="4" @back='back' backtext='我的' @otherclick='otherclick' :hasClass='1'></vheader>
    <div class="container" ref="wrapper" :style="'height:'+screenHeight+'px;overflow:hidden;'">
      <div class="containerBox">
              <div class="bg_header">
      </div>
      <div class="prod">
        育儿专家将对您的咨询给出解答<br/>
        <div class="prod_btn" @click='show'>开始提问</div>
      </div>
      <ul>
        <li v-for='(items,index) in arr'>
          <div class="qu_name">
            <img :src='items.HeadImageUrl'>
            <div class="qu_nameinfo">
              <p>{{items.NickName}}</p>
              <p>宝宝0月4天 {{items.AnswerTime}} </p>
            </div>
          </div>
          <div class="questions_user">
            {{items.QuestionStr}}
          </div>
          <div class="huifu">
            <div class="huifu_header">专家回复  {{items.AnswerTime}}</div>
            <div class="huifu_content" @click='showContent($event)'>
              {{items.AnswerStr}}
            </div>
          </div>
        </li>
      </ul>
      </div>
    </div>
    <div class="show1" v-show='isshow1'>
      <div class="content">
        <div class="stitle">
          提问
        </div>
        <div class="scontent">
          <p style="padding-left: 10px;font-size: 15px;">请留下对宝宝的问题</p>
          <div class="textarea">
            <textarea v-model="text"></textarea>
          </div>
          <div class="quebtn" @click='subQuestion'>提交问题</div>
        </div>

      </div>
      <div class="v-mo" @click='hide'></div>
    </div>
    <transition name='slide'>
      <router-view/>
    </transition>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { GetQuestionList, AskQuestion } from "api/special";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import BScroll from "better-scroll";
export default {
  name: "questions",
  data() {
    return {
      isshow1: false,
      arr: [],
      text: "",
      screenHeight: ""
    };
  },
  created() {
    this.screenHeight = document.body.clientHeight - 69;
    this.loaddata();
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    otherclick() {
      this.$router.push("questions/myQuestions");
    },
    show() {
      this.isshow1 = true;
    },
    hide() {
      this.isshow1 = false;
    },
    showContent(e) {
      if (e.path[0].className == "huifu_content") {
        e.path[0].className = "huifu_content active";
      } else {
        e.path[0].className = "huifu_content";
      }
    },
    loaddata() {
      let data =
        "?CustID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&moduleCode=QuestionOfLaugh";
      GetQuestionList(data).then(res => {
        console.log(res);
        if (res.Code === 1) {
          this.arr = res.Data;
          console.log(this.arr);
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      });
    },
    subQuestion() {
      //提问
      if (this.text != "") {
        MessageBox.confirm("是否提出问题?").then(action => {
          let data = {
            moduleCode: "QuestionOfLaugh",
            custID: JSON.parse(localStorage.getItem("userdata")).CustID,
            questionStr: this.text
          };
          AskQuestion(data).then(res => {
            if (res.Code === 1) {
              Message.success({
                message: res.Msg,
                center: true,
                duration: 1300
              });
              this.loaddata();
              this.hide();
            } else {
              Message.error({
                message: res.Msg,
                center: true,
                duration: 1000
              });
            }
          });
        });
      } else {
        Message.error({
          message: "内容不能为空",
          center: true,
          duration: 1000
        });
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
.qu_box {
  .header {
    z-index: 0;
  }
  & > .container {
    height: rem(1180);
    overflow: hidden;
    @media (min-height: 737px) {
      height: rem(1480);
    }
  }
  .bg_header {
    width: 100%;
    height: rem(419);
    @include bg-image("./qanda_bg");
    background-size: 100%;
  }
  .prod {
    color: #646464;
    padding: rem(20) 0;
    line-height: rem(45);
    .prod_btn {
      width: rem(251);
      height: rem(55);
      background: linear-gradient(to right, #ff678c, #ff7a7b);
      line-height: rem(58);
      color: #fff;
      margin: 0 auto;
      border-radius: 100px;
      margin-top: rem(15);
    }
  }
  ul {
    li {
      border-top: 8px solid #d7d7d7;
      padding: rem(10) rem(50);
      .qu_name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: rem(50);
          height: rem(58);
        }
        p {
          text-align: left;
          margin-left: rem(30);
          color: #747474;
          line-height: rem(43);
          &:last-child {
            font-size: rem(25);
          }
        }
      }
      .questions_user {
        margin-top: rem(15);
        color: #666666;
        text-align: left;
        border-bottom: 1px solid #a9a9a9;
        font-size: rem(35);
        padding-bottom: rem(10);
      }
      .huifu {
        margin-top: rem(15);
        .huifu_header {
          text-align: left;
          color: #676767;
          border-left: 2px solid #b2b2b2;
          font-size: rem(30);
          text-indent: 3px;
        }
        .huifu_content {
          color: #686868;
          font-size: rem(32);
          text-align: left;
          margin-top: rem(20);
          line-height: rem(43);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.active {
            white-space: normal;
          }
        }
      }
    }
  }
  .show1 {
    .content {
      z-index: 999;
      width: 90%;
      position: fixed;
      top: rem(320);
      left: 50%;
      transform: translate(-50%);
      background-size: 100%;
      .stitle {
        width: 100%;
        height: rem(100);
        background: linear-gradient(to right, #ff678c, #ff7a7b);
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        line-height: rem(100);
        font-size: rem(45);
        color: #fff;
        position: relative;
      }
      .scontent {
        background: #fff;
        padding: rem(20);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        line-height: 20px;
        text-align: left;
        p {
          color: #676767;
        }
        .textarea {
          text-align: center;
          margin-top: rem(20);
          textarea {
            background: #e3e3e3;
            border-radius: 15px;
            resize: none;
            outline: none;
            width: 90%;
            height: rem(400);
            border: none;
            text-indent: 5px;
            color: #000;
            padding: rem(10);
            font-size:rem(35);
          }
        }
      }
      .quebtn {
        width: rem(251);
        height: rem(55);
        background: linear-gradient(to right, #ff678c, #ff7a7b);
        line-height: rem(58);
        color: #fff;
        margin: 0 auto;
        border-radius: 100px;
        margin-top: rem(15);
        text-align: center;
      }
    }
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
  }
}
</style>
