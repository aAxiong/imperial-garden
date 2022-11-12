<template>
  <div class="header" :class="{'active':hasClass==2}">
    <!--<div class="headerTop"></div>-->
    <div class="header-container" :class="{'active':hasClass==1}">
      <div v-if="type === 0">
        <div class="text"> {{title === 'default' ? '' : title}}</div>{{version}}
      </div>
      <div v-else-if='type===1'>
        <div class="lefticon">
          <span class="el-icon-arrow-left" @click="back"></span>
        </div>
        <div class="text"> {{title === 'default' ? '' : title}}</div>{{version}}
      </div>
      <div v-else-if='type===2'>
        <div class="text"> {{title === 'default' ? '' : title}}</div>{{version}}
        <div class="righticon">
          <span :class='iconclass' @click="otherclick"></span>
        </div>
      </div>
      <div v-else-if='type===3'>
        <div class="lefticon">
          <span class="el-icon-arrow-left" @click="back"></span>
        </div>
        <div class="text"> {{title === 'default' ? '' : title}}</div>{{version}}
        <div class="righticon">
          <span :class='iconclass' @click="otherclick"></span>
        </div>
      </div>
      <div v-else-if='type===4'>
        <div class="lefticon">
          <span class="el-icon-arrow-left" @click="back"></span>
        </div>
        <div class="text"> {{title === 'default' ? '' : title}}</div>{{version}}
        <div class="righticon" @click="otherclick">
          <div class="text1">
            {{backtext}}
          </div>
        </div>
      </div>
    </div>
    <div class="header-dian"></div>
  </div>
</template>
<script>
import { consolelog } from "api/device";

export default {
  name: "component_name",
  data() {
    return {};
  },
  props: {
    version: {
      type: String,
      default: global.VERSION
    },
    title: {
      type: String,
      default: ""
    },
    type: {
      type: Number,
      default: 0
    },
    iconclass: {
      type: String,
      default: "el-icon-circle-plus-outline"
    },
    backtext: {
      type: String,
      defalut: ""
    },
    hasClass: {
      type: Number,
      defalut: 0
    }
  },
  methods: {
    back() {
      this.$emit("back");
    },
    otherclick() {
      this.$emit("otherclick");
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.header {
  height: rem(135);
  position: relative;
  .header-container {
    background: linear-gradient(to right, #ff678c, #ff7a7b);
    /*height: rem(100);*/
    height: rem(88);
    text-align: center;
    color: #fff;
    position: fixed;
    width: 100%;
    /* ... */
    /* Status bar height on iOS 10 */
    padding-top: rem(40);
    padding-bottom: rem(10);
    // /* Status bar height on iOS 11.0 */
    // padding-top: constant(safe-area-inset-top);
    // // /* Status bar height on iOS 11+ */
    // padding-top: env(safe-area-inset-top);
    &.active {
      z-index: 99;
    }
  }
  .headerTop {
    width: 100%;
    height: rem(30);
    background: linear-gradient(to right, #ff678c, #ff7a7b);
  }
  .header-dian {
    width: 100%;
    height: rem(100);
  }
  .text {
    font-size: rem(45);
    display: inline-block;
    line-height: rem(100);
  }
  .lefticon {
    font-size: rem(50);
    position: absolute;
    top: rem(65);
    left: rem(24);
  }
  .righticon {
    position: absolute;
    top: rem(65);
    right: rem(24);
    font-size: rem(50);
    div.text1 {
      font-size: rem(40);
      height: 100%;
      margin-top: rem(5);
    }
  }
}
@media (min-height: 737px) {
  //iphonex適配
  .header {
    height: rem(175);
    .header-container {
      height: rem(125);
      .text {
        font-size: rem(45);
        display: inline-block;
        line-height: rem(180);
      }
      .righticon {
        top: rem(95);
      }
      .lefticon{
        top:rem(95);
      }
    }
  }
}
//覃璐璐修改=>
.indexDataAnalyze_cryanalyze {
  .header-container {
    background: url(./bg_header.png) no-repeat center center / cover;
    height: rem(250);
  }
}
//5.7

//覃璐璐修改=>
.index_record {
  .el-icon-arrow-left {
    /*display: none;*/
  }
  .text1 {
    font-size: rem(80) !important;
    margin-top: rem(-10) !important;
  }
}

//6.4
</style>
