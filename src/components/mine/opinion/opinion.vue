<template>
  <div class="blankgap opinion">
    <vheader title="意见反馈" :type="1" @back='back'></vheader>
    <div class="container">
      <div class="textarea_box">
        <textarea placeholder="请填写您的宝贵意见" v-model='text'></textarea>
      </div>
      <div class="op_sub" @click='sub'>提交</div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MakeFeedBack } from "api/mine";
export default {
  name: "opinion",
  data() {
    return {
      text: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    sub() {
      if (this.text == "") {
        Message.error({
          message: "请填写意见",
          center: true,
          duration: 1200
        });
      } else {
        let id = JSON.parse(localStorage.getItem("userdata")).CustID;
        let self = this;
        const data = {
          custID: id,
          contentStr: this.text,
          infoType: 0,
          infoSource: 1,
          feedBackType: 0
        };
        MakeFeedBack(data).then(res => {
          if (res.Code === 1) {
            Message.success({
              message: "反馈成功",
              center: true,
              duration: 1000
            });
            this.text = "";
            this.$router.go(-1);
          } else {
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1200
            });
          }
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
.opinion {
  font-family: "Microsoft YaHei";
  .textarea_box {
    padding: rem(30);
    textarea {
      resize: none;
      outline: none;
      background: #efefef;
      border: rem(2) solid #efefef;
      width: 90%;
      height: rem(250);
      border-radius: 5px;
      font-size: rem(32);
      padding: rem(20);
    }
  }
  .op_sub {
    width: 90%;
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    border-radius: 5px;
    height: rem(105);
    margin: rem(30) auto;
    background-size: 100%;
    line-height: rem(100);
    font-size: rem(40);
    color: #fff;
  }
}
</style>