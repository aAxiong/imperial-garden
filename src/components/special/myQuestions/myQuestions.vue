<template>
  <div class="blankgap myqu_box">
    <vheader title="我的提问" :type="1" @back='back'></vheader>
    <div class="container" ref="wrapper" :style="'height:'+screenHeight+'px;overflow:hidden;'">
      <ul>
        <li v-for='(items,index) in arr'>
          <div class="qu_name">
            <img :src='items.HeadImageUrl'>
            <div class="qu_nameinfo">
              <p>{{items.NickName}}</p>
              <p>{{items.InfoDesc}} </p>
            </div>
          </div>
          <div class="questions_user">
            {{items.QuestionStr}}
          </div>
          <div class="huifu" v-if='items.AnswerStr!=null'>
            <div class="huifu_header">专家回复 {{items.AnswerTime}}</div>
            <div class="huifu_content" @click='showContent($event)'>
              {{items.AnswerStr}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show1" v-show='isshow1'>
      <div class="content">
        <div class="stitle">
          提问
        </div>
        <div class="scontent">
          <p>请留下对宝宝的问题</p>
          <div class="textarea">
            <textarea></textarea>
          </div>
          <div class="quebtn" @click='hide'>开始提问</div>
        </div>
      </div>
      <div class="v-mo" @click='hide'></div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { GetMyQuestionList } from "api/special";
import { Message } from "element-ui";
import BScroll from "better-scroll";
export default {
  name: "myQuestions",
  data() {
    return {
      isshow1: false,
      arr: [],
      name: JSON.parse(localStorage.getItem("userdata")).NickName,
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
      console.log("保存");
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
      let self = this;
      let data =
        "?CustID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&moduleCode=QuestionOfLaugh";
      GetMyQuestionList(data).then(res => {
        if (res.Code === 1) {
          self.arr = res.Data;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
        self.$nextTick(() => {
          if (!self.scroll) {
            self.scroll = new BScroll(self.$refs.wrapper, {
              click: true
            });
          } else {
            self.scroll.refresh();
          }
        });
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
.myqu_box {
  background: #fff;
  ul {
    li {
      background: #fff;
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
        font-size: rem(35);
        padding-bottom: rem(10);
      }
      .huifu {
        border-top: 1px solid #a9a9a9;
        margin-top: rem(15);
        padding-top:rem(15);
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
          margin-top: rem(15);
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
}
</style>