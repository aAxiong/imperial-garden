<template>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/vision">
        <i class="vision-icon"></i>
        <span>视觉激发</span>
      </router-link>
    </div>
    <div class="tab-item">
      <router-link to="/special">
        <i class="special-icon"></i>
        <span>专题</span>
      </router-link>
    </div>
    <div class="tab-item">

      <router-link to="/index">
        <i class="index-icon"></i>
        <span>智能设备</span>
      </router-link>
    </div>
    <div class="tab-item">

      <router-link to="/growup">
        <i class="growup-icon"></i>
        <span>成长评测</span>
      </router-link>
    </div>
    <div class="tab-item">

      <router-link to="/mine">
        <i class="mine-icon"></i>
        <span>我的</span>
      </router-link>
    </div>

  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {};
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.tab {
  width: 100%;
  height: rem(110);
  background: #fff;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  .tab-item {
    flex: 1;
    text-align: center;
    img {
      width: rem(70);
    }
    & > a {
      display: block;
      text-decoration: none;
      font-size: rem(24);
      color: #686868;
      i {
        width: rem(60);
        height: rem(60);
        display: block;
        background-size: 100%;
        margin: 0 auto;
        margin-top: rem(4);
        display: block;
        margin-bottom: rem(12);
        &.vision-icon {
          @include bg-image("../v-footer/early_childhood_normal");
        }
        &.special-icon {
          @include bg-image("../v-footer/record_normal");
        }
        &.index-icon {
          width: rem(70);
          height: rem(70);
          margin-bottom: rem(1.5);
          @include bg-image("../v-footer/index_normal");
          background-repeat: no-repeat;
        }
        &.growup-icon {
          @include bg-image("../v-footer/recommend_normal");
        }
        &.mine-icon {
          width: rem(70);
          height: rem(70);
          margin-bottom: rem(1.5);
          @include bg-image("../v-footer/me_normal");
          background-repeat: no-repeat;
        }
      }
      span {
        display: block;
      }
      &.active {
        color: $color-text-a;
        i {
          &.vision-icon {
            @include bg-image("../v-footer/early_childhood_pressed");
          }
          &.special-icon {
            @include bg-image("../v-footer/record_pressed");
          }
          &.growup-icon {
            @include bg-image("../v-footer/recommend_pressed");
          }
          &.mine-icon {
            @include bg-image("../v-footer/me_pressed");
          }
          &.index-icon {
            @include bg-image("../v-footer/index_pressed");
          }
        }
      }
    }
  }
}
@media (min-height: 737px) {
  //iphonex適配
  .tab {
    height: rem(170);
  }
}
</style>
