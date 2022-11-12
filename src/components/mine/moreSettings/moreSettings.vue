<template>
  <div class="blankgap setting_box">
    <vheader title="设置" :type="1" @back='back'></vheader>
    <div class="container">
      <ul>
        <li>
          <router-link to='moreSettings/resetPassword'>
            <span>修改密码</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
        <li>
          <router-link to='moreSettings/version'>
            <span>版本信息</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
        <li>
          <router-link to='moreSettings/opinion'>
            <span>意见反馈</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
        <li>
          <router-link to='moreSettings/aboutwe'>
            <span>关于我们</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
      </ul>
      <div class="exitLogon" @click='exitLogin' v-show='cuiId!=null'>
        退出登录
      </div>
      <Vdialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog" @cancel='cancel'>
      </Vdialog>
      <transition name='slide'>
        <router-view/>
      </transition>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { mapGetters, mapMutations } from "vuex";
import { MessageBox } from "mint-ui";
import { initglobaldata } from "api/device";
import Vdialog from "base/v-dialog/v-dialog";
export default {
  name: "moreSettings",
  data() {
    return {
      cuiId: localStorage.getItem("userdata"),
      showDialog: false,
      dialogOption: {
        text: "是否退出此账号?",
        cancelButtonText: "否",
        confirmButtonText: "是"
      }
    };
  },
  methods: {
    cancel() {
      this.showDialog = false;
    },
    back() {
      this.$router.go(-1);
      return;
    },
    exitLogin() {
      this.showDialog = true;
      this.$refs.dialog
        .confirm()
        .then(() => {
          this.showDialog = false;
          Message.success({
            type: "success",
            message: "退出成功!",
            center: true,
            duration: 1000
          });

          initglobaldata();
          this.setSignStatus(false);
          localStorage.removeItem("userdata");
          this.$router.push({
            path: "/login"
          });
        })
        .catch(() => {
          this.showDialog = false;
        });
    },
    ...mapMutations({
      setSignStatus: "SET_SIGN_STATE"
    })
  },
  computed: {
    ...mapGetters(["signStatus"])
  },
  components: {
    vheader,
    Vdialog
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.setting_box {
  ul li {
    padding: rem(30) rem(30);
    border-bottom: 1px solid #e5e5e5;
    a {
      display: flex;
      justify-content: space-between;
      span {
        color: #000;
        font-size: rem(36);
      }
    }
    &:active {
      background-color: rgba(170, 170, 170, 0.1);
    }
  }
  .exitLogon {
    width: 90%;
    position: fixed;
    bottom: rem(10);
    left: 50%;
    transform: translate(-50%);
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    border-radius: 5px;
    height: rem(100);
    margin: rem(30) auto;
    background-size: 100%;
    line-height: rem(100);
    font-size: rem(40);
    color: #fff;
  }
  @media (min-height: 737px) {
    .exitLogon {
       bottom: rem(50);
    }
  }
}
</style>
