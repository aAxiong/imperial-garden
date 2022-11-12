<template>
  <div class="blankgap">
    <vheader title="昵称设置" :type="4" @back='back' backtext='保存' @otherclick='otherclick'>
    </vheader>
    <div class="container">
      <div class="inputbox">
        <input type='text' placeholder="请输入新昵称" v-model="text">
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { ModifyCustomerName } from "api/mine";
export default {
  name: "component_name",
  data() {
    return {
      backtext: "保存",
      text: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    otherclick() {
      if (this.text == "") {
        Message.error({
          message: "请填写昵称",
          center: true,
          duration: 1000
        });
      } else {
        let id = JSON.parse(localStorage.getItem("userdata")).CustID;
        let self = this;
        const data = {
          custID: id,
          nickName: this.text
        };
        ModifyCustomerName(data).then(res => {
          console.log(res);
          if (res.Code === 1) {
            Message.success({
              message: res.Msg,
              center: true,
              duration: 1000
            });
            self.changge("NickName", res.Data);
            this.text = res.Data;
            this.$router.go(-1);
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
    changge(key, value) {
      //变更,重新缓存
      var userinfo = JSON.parse(localStorage.getItem("userdata"));
      userinfo[key] = value;
      localStorage.setItem("userdata", JSON.stringify(userinfo));
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
.inputbox {
  width: 100%;
  height: rem(90);
  border-bottom: 1px solid #e8e8e8;
  input {
    width: 90%;
    height: 100%;
    font-size: 18px;
    outline: none;
  }
}
</style>