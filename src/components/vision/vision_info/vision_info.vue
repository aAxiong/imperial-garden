<template>
  <div class="blankgap vision_info" :style="'height:'+screenHeight+'px;overflow:hidden;'">
    <vheader :title="router" :type="1" @back='back'></vheader>
    <div class="container" ref="wrapper">
      <ul>
        <li v-for='(item,index) in arr' :key="item.index">
          <router-link :to="{name:'vision_play',query:{'names':$route.query.names,'parm': $route.query.parm,'num':$route.query.num,'voice':$route.query.voice,'index':index}}">
            <img :src='img(index)'>
          </router-link>
        </li>    
      </ul>
    </div>
     <transition name='slide'>
       <router-view/>
    </transition>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import BScroll from "better-scroll";
export default {
  name: "vision_info",
  data() {
    return {
      router: this.$route.query.names,
      imgurl: "./" + this.$route.query.parm,
      arr: "",
      screenHeight: ""
    };
  },
  created() {
    this.arr = parseInt(this.$route.query.num);
    this.screenHeight = document.body.clientHeight;
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     click: true
    //   });
    // });
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    img(index) {
      return require(this.imgurl + "/" + index + ".png");
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
.vision_info {
  > .container {
    height: rem(1210);
    overflow: hidden;
    @media (min-height: 737px) {
      height: rem(1480);
    }
    ul {
      padding: rem(10);
      text-align: left;
      overflow: hidden;
      li {
        display: inline-block;
        width: rem(270);
        height: rem(380);
        margin: 0 rem(40);
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        margin-bottom: rem(30);
        box-shadow: 0px 3px 5px #dcdcdc;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>