<template>
  <div v-if="items.length" class="full-page-slide-wrapper">
    <slide ref="slide" :autoPlay="false" :loop="false">
      <div v-for="(item, index) in items">
        <div class="full-page-img-wrapper" :style="getStyle(index)">
          <transition enter-active-class="animated bounceIn">
            <div v-if="index === items.length -1&&btnState==true" class="button-wrapper" @click="handleClick()">
              <span class="button"></span>
            </div>
          </transition>
          <!-- <slide class="sub-slide" v-if="index===0" :loop="true">
            <div v-for="slideItem in slideData">
              <a :href="slideItem.linkUrl">
                <img :src="slideItem.picUrl">
              </a>
            </div>
          </slide> -->
        </div>
      </div>
    </slide>
  </div>
</template>

<script type="text/ecmascript-6">
import Slide from "base/slide/slide.vue";
const items = [
  {
    linkUrl: "http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz",
    picUrl:
      "http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg",
    id: 11378
  },
  {
    linkUrl: "https://y.qq.com/msa/218/0_4085.html",
    picUrl:
      "http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg",
    id: 11375
  },
  {
    linkUrl:
      "https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2195876&g_f=shoujijiaodian",
    picUrl:
      "http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg",
    id: 11287
  }
];
const COMPONENT_NAME = "pull-page-slide";
export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      items: this.data,
      slideData: items,
      btnState: false
    };
  },
  components: {
    Slide
  },
  methods: {
    handleClick() {
      this.$emit("finish");
    },
    getStyle(index) {
      return `background-image:url(${this.items[index]})`;
    },
    btnshow(state) {
      this.btnState = state;
    }
  }
};
</script>

<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";

.full-page-slide-wrapper {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;
  overflow: hidden;

  .slide {
    height: 100%;

    .slide-group {
      height: 100%;

      .slide-item {
        height: 100%;

        .full-page-img-wrapper {
          position: relative;
          height: 100%;
          background-size: cover;
          transform: translateZ(0);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          .button-wrapper {
            position: fixed;
            bottom: rem(170);
            display: block;
            width: 100%;
            overflow: hidden;
            .button {
              display: inline-block;
              width: rem(290);
              padding: rem(40) 0;
              background: url("./guide_start.png");
              background-size: 100%;
            }
          }
        }
      }
    }

    .sub-slide {
      height: rem(600);
      min-height: rem(2);
      position: relative;

      .slide-group {
        position: relative;
        overflow: hidden;
        white-space: nowrap;

        .slide-item {
          float: left;
          box-sizing: border-box;
          overflow: hidden;
          text-align: center;

          a {
            display: block;
            width: 100%;
            overflow: hidden;
            text-decoration: none;
          }

          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>