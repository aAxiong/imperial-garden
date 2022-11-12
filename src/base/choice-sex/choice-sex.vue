<template>
  <div class="pickercity">
    <div class="v-modal" v-show='sexhow' @click='canleChoice'></div>
    <transition name="slide-fade">
      <div class="mint-actionsheet" v-show='sexhow' id='sexchioce'>
        <ul class="mint-actionsheet-list" style="margin-bottom: .2rem;">
          <li class="mint-actionsheet-listitem" @click='picksex(1)'>
            <dl>
              <dd>
                <img src="./male_normal@2x.png"> 男
              </dd>
            </dl>
          </li>
          <li class="mint-actionsheet-listitem" @click='picksex(0)'>
            <dl>
              <dd>
                <img src="./female_normal@2x.png"> 女
              </dd>
            </dl>
          </li>
        </ul>
        <a class="mint-actionsheet-button" @click='canleChoice'>取消</a>
      </div>
    </transition>

  </div>
</template>
<script>
export default {
  name: "reselection",
  data() {
    return {
      sex: ""
    };
  },
  props: {
    sexhow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    picksex(index) {
      this.sex = index;
      this.$emit("choicesex", this.sex);
      this.$emit("sexitypiker");
    },
    canleChoice() {
      this.$emit("sexitypiker");
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
#sexchioce {
  .mint-actionsheet-listitem:active {
    background-color: #fff;
  }
  &.mint-actionsheet {
    bottom: rem(16);
    width: 95%;
    background-color: rgba(255, 0, 255, 0);
  }
  .mint-actionsheet-listitem {
    height: auto;
    padding: rem(15) 0;
    line-height: rem(20);
    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    dl {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      dd {
        img {
          width: rem(80);
          height: rem(80);
          vertical-align: middle;
          margin-right: rem(10);
        }
      }
    }
  }
  .mint-actionsheet-button {
    border-radius: 10px;
  }
}
.pickercity {
  width: 100%;
  .picker-toolbar {
    border-bottom: solid 1px #eaeaea;
    .mint-datetime-action {
      color: #008afc;
    }
  }
  .slide-fade-enter-active {
    transform: translate3d(-50%, 100%, 0);
  }
  .slide-fade-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    // transform: translateX(30px);
    opacity: 0;
  }
  .v-modal {
    // transition: 5s ease-in;
  }
}
@media (min-height: 737px) {
  #sexchioce.mint-actionsheet {
    bottom: 1rem;
  }
}
</style>
