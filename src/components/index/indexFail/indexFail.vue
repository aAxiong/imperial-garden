<template>
    <div class="blankgap index_fail">
        <vheader title="未能与设备连接成功" :type="1" @back='back'></vheader>
        <div class="container">
            <div class="indexFail_content">
                <img src="./ununited.png" alt="">
                <div class="conter">
                    <p>请检查设备指示灯状态</p>
                    <span>选择一种情况</span>
                    <ul>
                        <li @click="li1">
                            <div class="name">白灯亮起后熄灭</div>
                            <div class="go">
                                <span class="el-icon-arrow-right"></span>
                            </div>
                        </li>
                        <li @click="li2">
                            <div class="name">红灯慢闪</div>
                            <div class="go">
                                <span class="el-icon-arrow-right"></span>
                            </div>
                        </li>
                        <li @click="li3">
                            <div class="name">红灯慢闪3下熄灭</div>
                            <div class="go">
                                <span class="el-icon-arrow-right"></span>
                            </div>
                        </li>
                        <li @click="li4">
                            <div class="name">其他</div>
                            <div class="go">
                                <span class="el-icon-arrow-right"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";

export default {
  name: "indexSuccess",
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    li1() {
      this.$router.push("indexFail_white");
    },
    li2() {
      this.$router.push("indexFail_white");
    },
    li3() {
      this.$router.push("indexFail_white");
    },
    li4() {
      this.$router.push("indexFail_white");
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
.index_fail {
  .indexFail_content img {
    width: 50%;
    height: 50%;
    padding-top: 0.2rem;
  }
  .conter {
    width: 100%;
    height: auto;
    border-top: 4px solid #ccc;
    margin-top:rem(50);
    text-align: left;
    position: relative;
    .name {
      display: inline-block;
    }
    .go {
      position: absolute;
      right: rem(50);
      display: inline-block;
      //   margin-left: auto;
      //   margin-right: rem(20);
      font-size: rem(50);
      color: #8a8a8a;
      font-weight: bold;
    }
  }
  .conter p {
    margin-left: 1rem;
    font-size: 0.5rem;
    padding-top: 0.5rem;
  }
  .conter span {
    margin-left: 1rem;
    font-size: 0.4rem;
    line-height: 1rem;
  }
  .conter ul li {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #ccc;
    margin: 0.2rem 0;
    padding-left: 1rem;
    font-size: 0.4rem;
  }
}
</style>

