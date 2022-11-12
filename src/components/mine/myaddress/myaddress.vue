<template>
  <div class="blankgap myaddress-box">
    <vheader title="收货地址" :type="4" @back='back' backtext='新建' @otherclick='otherclick'>
    </vheader>
    <div class="container">
      <div class="cellswipe"  v-for="(items,index) in addressData" :key="index" @click='pushEx(items.AddrID,items.ConsigneeName,items.ConsigneePhone,items.DetailAddress)'>
      <mt-cell-swipe   
  :title='String(items.ConsigneeName)' :value='index'
  :right="[
      {
          content: '编辑',
          style: { background: '#008afc', color: '#fff' },
           handler(){editadd(items.AddrID,items.ConsigneeName,items.ConsigneePhone,items.DetailAddress)}
        }, {
          content: '删除',
          style: { background: 'red', color: '#fff' },
          handler(){deleteadd(items.AddrID,index)}
        }
    ]" :label='items.DetailAddress' :bat='index' :id='items.AddrID'>{{items.ConsigneePhone}}</mt-cell-swipe>
      </div>

    </div>
        <transition name='slide'>
       <router-view/>
    </transition>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { CellSwipe } from "mint-ui";
import { GetMyCustomerAddr, DeleteCustomerAddr } from "api/mine";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "myaddress",
  data() {
    return {
      backtext: "新建",
      length: 0,
      arr: 0,
      addressData: [],
      url: "1",
      post: null,
      error: null
    };
  },
  created() {
    this.loadData();
    this.rightButtons = [
      {
        content: "编辑",
        style: { background: "#008afc", color: "#fff" }
      },
      {
        content: "删除",
        style: { background: "red", color: "#fff" }
      }
    ];
  },
  watch: {
    $route(to, from) {
      console.log(this.getStatus(this.$route.path));
      this.loadData();
    }
  },
  methods: {
    back() {
      this.addrInfo({});
      this.$router.go(-1);
      return;
    },
    loadData() {
      let data =
        "?CustID=" +
        JSON.parse(localStorage.getItem("userdata")).CustID +
        "&pageSize=15&pageIndex=0";
      GetMyCustomerAddr(data).then(res => {
        if (res.Code === 1) {
          this.addressData = res.Data;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
    },
    getStatus(urlStr) {
      var urlStrArr = urlStr.split("/");
      return urlStrArr[urlStrArr.length - 1];
    },
    pushEx(id, name, phone, addr) {
      if (this.$route.query.exchange) {
        this.addrInfo({
          AddrID: id,
          ConsigneeName: name,
          ConsigneePhone: phone,
          DetailAddress: addr
        });
        this.$router.back(-1);
      }
    },
    otherclick() {
      this.$router.push("./myaddress/addaddress");
    },
    deleteadd(id, index) {
      //删除
      var data = {
        addrID: id,
        custID: JSON.parse(localStorage.getItem("userdata")).CustID
      };
      DeleteCustomerAddr(data).then(res => {
        if (res.Code === 1) {
          var ele = document.getElementsByClassName("mint-cell")[index];
          ele.parentNode.removeChild(ele);
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
      });
    },
    editadd(id, name, phone, addr) {
      this.addrInfo({
        AddrID: id,
        ConsigneeName: name,
        ConsigneePhone: phone,
        DetailAddress: addr
      });
      this.$router.push("./myaddress/editaddress");
    },
    ...mapMutations({
      addrInfo: "SET_ADDRINFO"
    })
  },
  components: {
    vheader
  }
};
</script>
<style lang="scss" scoped type="text/css">
.myaddress-box {
  background: #fafafa;
  text-align: left;
  border: none;
  .mint-cell {
    color: #000;
    border-top: none;
    .mint-cell-wrapper {
      .mint-cell-title {
        font-size: rem(36);
      }
      .mint-cell-swipe-button {
        line-height: rem(114);
      }
    }
  }

  li {
    padding: rem(30) rem(40) rem(20) rem(40);
    border-bottom: 1px solid #e8e8e8;
    .infobox {
      .leftinfo {
        float: left;
        p {
          font-size: rem(40);
          color: #000;
        }
        span {
          text-align: left;
          display: block;
          font-size: 15px;
        }
      }
      .rightphone {
        float: right;
        font-size: 15px;
        color: #8b8b8b;
      }
      &:after {
        clear: both;
        content: "";
        visibility: hidden;
        display: block;
      }
    }
    .addinfo {
      text-align: left;
      margin-top: 10px;
      font-size: 14px;
      color: #8b8b8b;
    }
    &:active {
      background-color: #e0e0e0;
      .mint-cell-wrapper {
        border-top: 1px solid #e0e0e0;
      }
    }
  }
}
</style>