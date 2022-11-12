<template>
  <div class="blankgap vesion">
    <vheader title="版本信息" :type="1" @back='back'></vheader>
    <div class="ve">
      <img src='./108.png'>
      <p>
        版本号1.0.1
      </p>
      <div class="vesion-btn" @click='updataClick'>
        检查更新
      </div>
    </div>
  
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import { GetLastestPhoneVersion } from "api/mine";
export default {
  name: "version",
  data() {
    return {
      index: 3
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    updataClick() {
      let self = this;
      let data =
        "?custID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&phoneType=1";
      GetLastestPhoneVersion(data).then(res => {
        if (res.Code === 1) {
          if (res.Data.VersionIndex != self.index) {
            MessageBox.confirm(
              "当前不是最新版本，是否跳转到appstore下载最新版本?"
            ).then(action => {
              window.location.href =
                "https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8&v0=WWW-GCCN-ITSTOP100-FREEAPPS&l=&ign-mpt=uo%3D4";
            });
          } else {
            Message.success({
              message: "已经是最新版本了",
              center: true,
              duration: 1000
            });
          }
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
    vheader
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.vesion {
  img {
    margin-top: rem(200);
  }
  p {
    color: #737373;
    margin-top: rem(30);
  }
  .vesion-btn {
    border: rem(2) solid #ff5b46;
    margin-top: rem(200);
    display: inline-block;
    padding: rem(20);
    color: #686868;
    border-radius: 7px;
    font-size: rem(40);
    &:active {
      background-color: rgba(170, 170, 170, 0.1);
    }
  }
}
</style>