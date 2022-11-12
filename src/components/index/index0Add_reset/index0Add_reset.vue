<template>
    <div class="blankgap index_reset">
        <vheader title="添加智能监护灯" :type="1" @back='back'></vheader>
        <div class="indexReset_content">
            <img src='./icon.png' class="logoIcon">
            <div class="sure">
                <p>配置设备上网前请确认已完成一下准备</p>
            </div>
            <div class="ph">
                <div class="p1 p2">
                    <span>①</span>设备通电，指示灯在1秒间隔慢闪
                </div>
                <div class="p1 p2">
                    <span>②</span>不在慢闪，请长按按钮8秒 </div>
                <div class="p1 p2">
                    <span>③</span>手机已经成功连接WiFi网络 </div>
                <div class="p1">
                    <span>④</span>设备和手机在同一WiFi路由覆盖范围 </div>

            </div>
            <el-checkbox v-model="checked" class="checked">(已确认上述状态)</el-checkbox>
            <div class="next" @click="next">
                配置设备上网
            </div>
        </div>
    </div>
</template>

<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { sendMqttSubTest } from "api/device";
export default {
  name: "indexReset",
  data() {
    return {
      checked: false
    };
  },
  created() {
    sendMqttSubTest(this);
  },
  updated()
  {
  },
  beforeUpdate()
  {
  },
  beforeDestroy(){
  },
  destroy(){
  },
  beforeMount(){
  },
  mounted(){
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    next() {
      if (this.checked == false) {
        Message.success({
          message: "请确认状态!",
          center: true,
          duration: 1000
        });
      } else {
        // this.$router.push("index1Scan")
        this.$router.push("index2Wifi");
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
.index_reset {
  .indexReset_content {
    width: 100%;
    img.logoIcon {
      width: rem(349);
      height: rem(344);
    }
    .sure {
      margin-top: rem(50);
      margin-left: rem(30);
      p {
        font-size: rem(30);
        text-align: left;
      }
    }
    .ph {
      margin-top: rem(50);
    }
  }
  .p1 {
    text-align: left;
    margin-left: rem(60);
    height: rem(130);
    font-size: rem(30);
    // font-weight: bold;
  }
  .p2 {
    background: url("./redbg1.png") no-repeat rem(16) rem(40);
  }
  .p1 span {
    color: #f1779b;
    padding-right: 0.4rem;
  }
  .checked {
    position: fixed;
    bottom: rem(200);
    left: 50%;
    transform: translate(-50%);
  }
  .next {
    width: 75%;
    position: fixed;
    bottom: rem(50);
    left: 50%;
    transform: translate(-50%);
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    border-radius: 5px;
    height: rem(90);
    margin: rem(30) auto;
    background-size: 100%;
    line-height: rem(90);
    font-size: rem(40);
    color: #fff;
  }
}
</style>
