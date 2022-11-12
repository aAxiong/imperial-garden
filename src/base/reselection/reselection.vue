<template>
  <div class="pickercity">

    <div class="v-modal" v-show='parshow' @click='canleChoice'></div>
    <transition name="slide-fade">
      <div class="mint-actionsheet" v-show='parshow' id='parchioce'>
        <ul class="mint-actionsheet-list" style="margin-bottom: .2rem;">
          <li class="mint-actionsheet-listitem">
            <dl>
              <dd @click='pickpar(1)'>
                <img src="./mother_normal@2x.png">
              </dd>
              <dd @click='pickpar(0)'>
                <img src="./father_normal@2x.png">
              </dd>
              <dd @click='pickpar(2)'>
                <img src="./grandpa_normal@2x.png">
              </dd>
              <dd @click='pickpar(3)'>
                <img src="./grandma_normal@2x.png">
              </dd>
              <dd @click='pickpar(4)'>
                <img src="./other_normal@2x.png">
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
      parnet: ""
    };
  },
  props: {
    parshow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    pickpar(index) {
      // switch (index) {
      //   case 0:
      //     this.parnet = "妈妈";
      //     break;
      //   case 1:
      //     this.parnet = "爸爸";
      //     break;
      //   case 2:
      //     this.parnet = "爷爷";
      //     break;
      //   case 3:
      //     this.parnet = "奶奶";
      //     break;
      //   case 4:
      //     this.parnet = "其他";
      //     break;
      // }
      this.parnet = index;
      this.$emit("Choicepar", this.parnet);
      this.$emit("paritypiker");
    },
    canleChoice() {
      this.$emit("paritypiker");
    }
  }
};
</script>
<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
#parchioce {
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
    padding: rem(30) 0;
    line-height: rem(20);
    border-radius: 10px;
    dl {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      dd {
        img {
          width: rem(100);
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
  .mypikercity {
    width: 100%;
    position: fixed;
    bottom: 0;
    top: auto;
    right: auto;
    bottom: 0;
    background: #fff;
  }
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
  #parchioce.mint-actionsheet {
    bottom: 1rem;
  }
}
</style>