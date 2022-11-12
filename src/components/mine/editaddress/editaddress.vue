<template>
  <div class="blankgap add-box">
    <vheader title="编辑地址" :type="1" @back='back'></vheader>
    </vheader>
    <div class="container">
      <ul>
        <li class="inputbox">
          <input type='text' placeholder="姓名" v-model="name">
        </li>
        <li class="inputbox">
          <input type='text' placeholder="手机" v-model="phone">
        </li>
        <li class="inputbox">
          <input type='text' placeholder="地址" v-model="address">
        </li>
      </ul>
       <div class="btn" @click='sub' v-bind:class="{'op10':name.length>0&&phone.length>0&&address.length>0}">
        确定
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { EditCustomerAddr } from "api/mine";
export default {
  name: "editaddress",
  data() {
    return {
      name: "",
      phone: "",
      address: ""
    };
  },
  created() {
    this.name = this.$store.state.addrInfo.ConsigneeName;
    this.phone = this.$store.state.addrInfo.ConsigneePhone;
    this.address = this.$store.state.addrInfo.DetailAddress;
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    sub() {
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (
        this.name.length > 0 &&
        this.phone.length > 0 &&
        this.address.length > 0
      ) {
        if (!reg.test(this.phone)) {
          Message.error({
            message: "手机格式不正确",
            center: true,
            duration: 1300
          });
          return;
        }
        var data = {
          addrID: this.$store.state.addrInfo.AddrID,
          custID: JSON.parse(localStorage.getItem("userdata")).CustID,
          consigneeName: this.name,
          consigneePhone: this.phone,
          detailAddress: this.address
        };
        EditCustomerAddr(data).then(res => {
          if (res.Code === 1) {
            Message.success({
              message: res.Msg,
              center: true,
              duration: 1300
            });
            this.$router.go(-1);
          } else {
            Message.error({
              message: res.Msg,
              center: true,
              duration: 1300
            });
          }
        });
      } else {
        Message.error({
          message: "信息未填写完整",
          center: true,
          duration: 1300
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
ul {
  margin-top: rem(60);
  li {
    width: 100%;
    height: rem(90);
    margin-bottom: rem(2);
    text-align: center;
    input {
      width: 80%;
      font-size: rem(36);
      outline: none;
      height: 100%;
      border-bottom: 1px solid #737373;
    }
  }
}
.btn {
  width: 80%;
  margin: 0 auto;
  margin-top: rem(80);
  color: #fff;
  background: url(./btn.png) no-repeat;
  background-size: 100%;
  height: rem(90);
  line-height: rem(84);
  font-size: $font-size-medium-x;
  text-align: center;
  opacity: 0.6;
  &.op10 {
    opacity: 1;
  }
}
</style>