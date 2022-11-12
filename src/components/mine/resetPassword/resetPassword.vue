<template>
  <div class="blankgap">
    <div class="back" @click='goPre'><img src='../../../common/image/back.svg'>
      <span>返回</span>
    </div>
    <div class="login-box">
      <div class="title">重置密码1</div>
      <div class="input-box">
        <div class="input">
          <input type="text" placeholder="请输入手机号" v-model="phone">
        </div>
        <div class="input">
          <input type="password" placeholder="请输入新密码" v-model="password">
        </div>
        <div class="input">
          <input type="text" placeholder="请输入验证码" v-model="vcode" class="vcode">
          <span @click="_vscode">{{vscodeText}}</span>
        </div>
      </div>
      <div class="btn" @click="_res" v-bind:class="{'op10':phone.length>0&&password.length>0&&vcode.length>0}">
        重置
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { update_pwd, verify_code } from "api/login";
export default {
  data() {
    return {
      phone: "",
      password: "",
      vcode: "",
      vcodeClick: true,
      vscodeText: "获取验证码",
      times: 60
    };
  },
  created() {
    //plus.navigator.setStatusBarBackground("#f0779a");
  },
  methods: {
    _res: function() {
      if (
        this.phone.length > 0 &&
        this.password.length > 0 &&
        this.vcode.length
      ) {
        const data = {
          phoneStr: this.phone,
          newPsd: this.password,
          checkCode: this.vcode
        };
        update_pwd(data).then(res => {
          console.log(res);
          if (res.Code === 1) {
            Message.success({
              message: res.Msg,
              center: true,
              duration: 1300
            });
            setTimeout(() => {
              this.$router.push({ path: "/login" });
              Message.success({
                message: "请重新登录",
                center: true,
                duration: 1300
              });
            }, 1000);
          } else {
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1300
            });
          }
        });
      }
    },
    _vscode: function() {
      if (this.phone.length <= 0) {
        Message.error({
          message: "手机号不能为空",
          center: true,
          duration: 1200
        });
        return;
      }
      //获取验证码
      if (this.vcodeClick) {
        const data = {
          phoneNum: this.phone,
          identifyCode: "",
          iPStr: "1",
          macStr: "1",
          infoSource: 1,
          modelNum: "iphone8"
        };
        verify_code(data).then(res => {
          console.log(res);
          if (res.Code === 1) {
            Message.success({
              message: res.Msg,
              center: true,
              duration: 1000
            });
          } else {
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1000
            });
          }
          this.vcodeClick = false;
          this.vscodeAnmate(this.times);
        });
      }
    },
    vscodeAnmate: function(val) {
      if (val == 0) {
        clearTimeout(this.timer);
        this.vscodeText = "重新获取验证码";
        this.times = 60;
        this.vcodeClick = true;
        return;
      }
      this.vscodeText = val + "秒后重新发送";
      this.timer = setTimeout(() => {
        this.times--;
        this.vscodeAnmate(this.times);
      }, 1000);
    },
    goPre: function() {
      clearTimeout(this.timer);
      //plus.navigator.setStatusBarBackground("#ffffff");
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.back {
  margin-top: rem(60);
  text-align: left;
  color: $color-text-a;
  img {
    width: rem(50);
    margin-left: rem(20);
    vertical-align: inherit;
  }
  span {
    vertical-align: super;
    font-size: rem(36);
  }
}
.title {
  margin-top: rem(240);
  font-size: rem(60);
  color: $color-text-a;
}
.input-box {
  margin-top: rem(100);
  .input {
    width: 70%;
    margin: 0 auto;
    padding: 0 rem(20) rem(10) rem(20);
    border-bottom: rem(2) solid $color-text-b;
    margin-bottom: rem(50);
    text-align: left;
  }
  input {
    width: 100%;
    font-size: rem(32);
    outline: none;
    caret-color: $color-text-a;
    &.vcode {
      width: 50%;
    }
  }
  span {
    color: $color-text-a;
    width: 40%;
    text-align: center;
    float: right;
  }
}
.btn {
  width: 70%;
  margin: 0 auto;
  padding: 0 10px 5px 10px;
  background: linear-gradient(to right, #ff678c, #ff7a7b);
  color: #fff;
  height: rem(84);
  border-radius: 5px;
  line-height: rem(94);
  font-size: $font-size-medium-x;
  opacity: 0.6;
  &.op10 {
    opacity: 1;
  }
}
@media (min-height: 737px) {
  .back {
    margin-top: 60px;
  }
  .other {
    bottom: 80px;
  }
}
</style>
