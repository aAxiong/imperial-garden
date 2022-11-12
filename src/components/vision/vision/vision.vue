<template>
  <div class="vision-box" :style="'height:'+screenHeight+'px;overflow:hidden;'">
    <vheader title="视觉激发" :type="0"></vheader>
    <div class="container">
      <div class="scroll_vision">
        <div class="snail">
          <span>{{starTime}}到{{endTime}}个月</span>
        </div>
      </div>
      <div class="imgbox_vision" ref="wrapper">
        <div class="imgbox_visionBox">
          <div class='ul'>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '点数卡' ,parm: 'number',voice:'0','num':20}}">
                <img src='./visual_point_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '图形卡' ,parm: 'graphical_card',voice:'1',num:9}}">
                <img src='./visual_graphical_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '黑白卡' ,parm: 'blackandwhite_card',voice:'0','num':20}}">
                <img src='./visual_blackandwhite_card@2x.png'>
              </router-link>
            </li>
          </div>
          <div class='ul'>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '彩色卡' ,parm: 'colour_card',voice:'1','num':10}}">
                <img src='./visual_colour_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '水果卡' ,parm: 'fruits_card',voice:'1','num':20}}">
                <img src='./visual_fruits_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '蔬菜卡' ,parm: 'vegetables_card',voice:'1','num':20}}">
                <img src='./visual_vegetables_card@2x.png'>
              </router-link>
            </li>
          </div>
          <div class='ul'>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '植物卡' ,parm: 'botany_card',voice:'1','num':12}}">
                <img src='./visual_botany_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '花卉卡' ,parm: 'flowers_card',voice:'1','num':18}}">
                <img src='./visual_flowers_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '动物卡' ,parm: 'anima',voice:'1','num':18}}">
                <img src='./visual_animal_card@2x.png'>
              </router-link>
            </li>
          </div>
          <div class='ul'>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '昆虫卡' ,parm: 'insect_card',voice:'1','num':10}}">
                <img src='./visual_insect_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '海洋卡' ,parm: 'ocean_card',voice:'1','num':14}}">
                <img src='./visual_ocean_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '人物卡' ,parm: 'human_card',voice:'1','num':13}}">
                <img src='./visual_human_card@2x.png'>
              </router-link>
            </li>
          </div>

          <div class='ul'>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '名词卡' ,parm: 'noun_card',voice:'1','num':16}}">
                <img src='./visual_noun_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '数字卡' ,parm: 'number_card',voice:'1','num':10}}">
                <img src='./visual_number_card@2x.png'>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '计算卡' ,parm: 'calculation_card',voice:'1','num':21}}">
                <img src='./visual_calculation_card@2x.png'>
              </router-link>
            </li>
          </div>
          <div class='ul'>
            <li>
              <router-link :to="{ name:'vision_info',query: { names: '英文卡' ,parm: 'english_card',voice:'1','num':26}}">
                <img src='./visual_english_card@2x.png'>
              </router-link>
            </li>
          </div>
        </div>
      </div>

    </div>
    <transition name='slide'>
      <router-view/>
    </transition>
    <Vign></Vign>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import BScroll from "better-scroll";
import { MessageBox } from "mint-ui";
import { mqtt_send } from "api/device";
import Vign from "base/sign/sign";
export default {
  name: "vision",
  data() {
    return {
      starTime: 0,
      endTime: 6,
      status: 110,
      status2: 120,
      status3: 119,
      scroll: "",
      screenHeight: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    }
  },
  created() {
    //plus.navigator.setStatusBarBackground("#f0779a");
    // alert('vision');
    this.screenHeight = document.body.clientHeight;
    if (
      localStorage.getItem("userdata") != null &&
      JSON.parse(localStorage.getItem("userdata")).BirthDay == null
    ) {
      //判断如果注册完信息未完善会跳到完善信息
      // Message.info({
      //   type: "info",
      //   message: "需要继续完善信息",
      //   center: true,
      //   duration: 1000
      // });
      // setTimeout(this.$router.push({ path: "login/perfectInfo" }), 2000);
      // return;
      localStorage.removeItem("userdata");
    }
    mqtt_send(this);

    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: 3
        });
      } else {
        this.scroll.refresh();
      }
      this.scroll.on("scroll", pos => {
        document.querySelector(".snail").style.bottom = -pos.y * 0.7 + "px";
        if (pos.y <= 0 && pos.y > -210) {
          this.starTime = 0;
          this.endTime = 6;
        } else if (pos.y <= -210 && pos.y > -330) {
          this.starTime = 3;
          this.endTime = 9;
        } else if (pos.y < -330) {
          this.starTime = 6;
          this.endTime = 12;
        }
        //scrollY接收变量
        //this.scrollY = Math.abs(Math.round(pos.y));
      });
    });
  },
  mounted() {},
  components: {
    vheader,
    Vign
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.vision-box {
  .sign_box {
    margin-top: -12rem;
  }
  .container {
    width: 100%;
    // top: 14px;
    height: rem(1088);
    // @include bg-image("./visual_excitation_bg");
    background: url("./visual_excitation_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .scroll_vision {
      position: fixed;
      left: 0;
      top: rem(250);
      width: rem(54);
      height: rem(800);
      background-size: 90% 96%;
      background-repeat: no-repeat;
      @include bg-image("./visual_canevine");
      z-index: 2;
      .snail {
        width: rem(96);
        height: rem(168);
        background-size: 100%;
        background-repeat: no-repeat;
        @include bg-image("./visual_snail");
        position: absolute;
        left: rem(25);
        bottom: 0;
        text-align: center;
        z-index: 99;
        span {
          position: absolute;
          right: rem(10);
          top: 0;
          width: rem(30);
          font-size: rem(20);
        }
      }
    }
    .imgbox_vision {
      display: inline-block;
      height: rem(936);
      overflow-y: scroll;
      .imgbox_visionBox {
        width: 100%;
        overflow: hidden;
        .ul {
          display: flex;
          margin-top: rem(40);
          width: 100%;
          li {
            margin: 0 rem(10);
            a {
              width: rem(210);
              height: rem(260);
              display: block;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      &::-webkit-scrollbar {
        width: 0px;
      }
    }
  }
  @media (min-height: 737px) {
    .container {
      height: 17.37rem;
      background-size: 100% 97.5%;
    }
    .imgbox_vision {
      height: rem(1092.05) !important;
    }
    .scroll_vision {
      height: rem(1000) !important;
    }
  }
}
</style>
