<template>
  <div class="blankgap">
    <div class="back" @click='goPre'><img src='../../../common/image/back.svg'>
      <span>返回</span>
    </div>
    <div class="login-box">
      <div class="title">注册</div>
      <div class="input-box">
        <div class="input">
          <input type="text" placeholder="请输入手机号" v-model="phone" @blur="getphone">
        </div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="input">
          <input type="text" placeholder="请输入验证码" v-model="vcode" class="vcode">
          <span @click="_vscode">{{vscodeText}}</span>
        </div>
      </div>
      <div class="btn" @click="_res" v-bind:class="{'op10':phone.length>0&&password.length>0&&vcode.length>0}">
        注册
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { setRegister, verify_code } from "api/login";
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
  methods: {
    _res: function() {
      if (
        this.phone.length > 0 &&
        this.password.length > 0 &&
        this.vcode.length
      ) {
        const data = {
          phoneNum: this.phone,
          password: this.password,
          authsType: 0,
          checkCode: this.vcode,
          iPStr: "1",
          macStr: "1",
          infoSource: 1,
          modelNum: "iphone8"
        };
        setRegister(data).then(res => {
          if (res.Code === 1) {
            Message.success({
              message: "注册成功，请完善信息",
              center: true,
              duration: 1000
            });
            localStorage.setItem("userdata", JSON.stringify(res.Data));
            setTimeout(this.$router.push({ path: "perfectInfo" }), 2000);
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
    _vscode: function() {
      if (this.phone.length <= 0) {
        Message.error({
          message: "手机号不能为空",
          center: true,
          duration: 1000
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
      this.$router.go(-1);
    },
    getphone() {
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(this.phone)) {
        Message.error({
          message: "请输入正确手机号码",
          center: true,
          duration: 1000
        });
      }
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.back {
  margin-top: 30px;
  text-align: left;
  color: $color-text-a;
  img {
    width: 25px;
    margin-left: 10px;
    vertical-align: inherit;
  }
  span {
    vertical-align: super;
    font-size: 18px;
  }
}
.title {
  margin-top: 120px;
  font-size: 30px;
  color: $color-text-a;
}
.input-box {
  margin-top: 50px;
  .input {
    width: 70%;
    margin: 0 auto;
    padding: 0 10px 5px 10px;
    border-bottom: 1px solid $color-text-b;
    margin-bottom: 25px;
    text-align: left;
  }
  input {
    width: 100%;
    font-size: 18px;
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
  height: 42px;
  border-radius: 5px;
  line-height: 47px;
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