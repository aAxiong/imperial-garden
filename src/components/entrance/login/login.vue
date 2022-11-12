<template>
  <div class="blankgap">
    <div class="back" @click='$router.goBack();'><img src='../../../common/image/back.svg'>
      <span>返回</span>
    </div>
    <div class="login-box">
      <div class="title">登录</div>
      <div class="input-box">
        <div class="input">
          <input type="text" placeholder="请输入手机号" v-model="login"  pattern="[0-9]*" oninput="if(value.length > 11)value = value.slice(0, 11)">
        </div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
      </div>
      <div class="login_btn" @click="_login" v-bind:class="{'op10':login.length>0&&password.length>0}">
        登录
      </div>
      <div class="message">
        <span>
          <router-link to="login/verificationCode">短信验证码登录</router-link>
        </span>
      </div>
      <div class="other">
        <span>
          <router-link to="login/register">注册</router-link>
        </span>|
        <span>
          <router-link to="login/forgetPassword">忘记密码</router-link>
        </span>
      </div>
      <br><br>
      <div class="version" @click="test">{{version}}</div>

    </div>
    <transition name='slide'>
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { login } from "api/login";
import { mapMutations } from "vuex";
import { initglobaldata } from "api/device";
import vConsole from "vconsole";
export default {
  data() {
    return {
      login: "15602979947",
      password: "123456",

      // login: "18565004448",
      // password: "574839",
      testnum: 0,
      version: global.VERSION,
      login: "",
      password: "",
      transitionName: "slide-left"
    };
  },
  created() {
    //plus.navigator.setStatusBarBackground("#ffffff");
  },
  methods: {
    test() {
      if (++global.DEVNUM == 5) {
        alert("调试模式开启");
        var objVConsole = new vConsole();
        console.log(global.VERSION);
      }
      // if(global.DEVNUM>5)
      // {
      //   Message.success({
      //     message: "调试模式已开启",
      //     center: true,
      //     duration: 1300
      //   });
      // }
      // else
      // {
      //   Message.success({
      //     message: global.DEVNUM,
      //     center: true,
      //     duration: 200
      //   });
      // }
    },
    _login: function() {
      if (this.login == "test") {
        this.$router.push("/index/indexSkip");
      }

      if (this.login.length > 0 && this.password.length > 0) {
        const data = {
          phoneNum: this.login,
          password: this.password,
          authsType: 0,
          checkCode: 709394,
          iPStr: "",
          macStr: "",
          infoSource: 1,
          modelNum: "iphone8"
        };
        login(data).then(res => {
          if (res.Code === 1) {
            initglobaldata();
            if (res.Data.BirthDay == null || res.Data.BirthDay == "") {
              Message.success({
                message: "登录成功,信息未完善",
                center: true,
                duration: 1000
              });
              this.loginState(1);
              localStorage.setItem("userdata", JSON.stringify(res.Data));
              setTimeout(this.$router.push({ name: "perfectInfo" }), 2500);
            } else {
              Message.success({
                message: res.Msg,
                center: true,
                duration: 1300
              });
              this.loginState(1);
              localStorage.setItem("userdata", JSON.stringify(res.Data));
              setTimeout(this.$router.push({ name: "vision" }), 1000);
            }
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
    ...mapMutations({
      loginState: "SET_LOGINSTATE",
      userInfo: "SET_USERINFO"
    })
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

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
  }
  input {
    width: 100%;
    font-size: 18px;
    outline: none;
    caret-color: $color-text-a;
  }
}
.login_btn {
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
.message {
  width: 70%;
  margin: 0 auto;
  padding: 0 10px 0px 10px;
  text-align: right;
  margin-top: 10px;
  a {
    font-size: 16px;
    color: $color-text-a;
  }
}

.other {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 50%);
  color: $color-text-a;
  span {
    color: $color-text-a;
    margin: 0 5px;
    vertical-align: middle;
    a {
      color: $color-text-a;
    }
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
