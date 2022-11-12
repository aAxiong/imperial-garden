<template>
    <div class="blankgap index_connect">
      <vheader title="尝试与设备进行连接" :type="1" @back='back'></vheader>
      <div class="container">
          <div class="indexConnect_content">
             <img src="./设备连接.png" alt="width:80%; height:80%;">
             <div class="num">{{num}}</div>
             <div class="wenzi">设备连接中...</div>
                <div class="next" @click="next">
                    下一步
                </div>
          </div>
      </div>
    </div>
</template>
<script>
import vheader from "base/v-header/v-header";
// import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
export default {
  name: "indexWifi",
  data() {
    return {
      num: "90%",
      ssid: '',
      password: ''
    };
  },
  created() {
    //接受传递过来的ssid,password
    this.ssid = this.$route.query.ssid
    this.password = this.$route.query.password
    console.log(this.ssid);
     console.log(this.password);
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    next() {
      this.$router.push("index4Success");
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
.index_connect {
  .indexConnect_content{
    position:relative;
  }
  .indexConnect_content img {
    width: 60%;
    height: 60%;
    margin-top: 2rem;
  }
  .num {
    width: 1.3rem;
    height: 1.3rem;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
  }
  .wenzi {
    margin-top: 0.2rem;
  }
  // .next{
  //     width: 75%;
  //     position: fixed;
  //     bottom: rem(10);
  //     left: 50%;
  //     transform: translate(-50%);
  //     background: #fdd;
  //     height: rem(100);
  //     margin: rem(30) auto;
  //     background-size: 100%;
  //     line-height: rem(100);
  //     font-size: rem(40);
  //     color: #fff;
  // }
}
</style>



