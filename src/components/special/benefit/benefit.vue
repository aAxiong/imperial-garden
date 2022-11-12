<template>
  <div class="benefitbox blankgap">
    <vheader title="笑的好处" :type="1" @back='back'></vheader>
    <img src='./goodlaugh_title.png' class="imgtitle">
    <div class="benfit_list">
      <ul>
        <router-link :to='{path:"benefit/benefitInfo",query:{"id":items.ID}}' v-for='(items,index) in arr' :key="index">
          <div class="text-box">
            <p class="tit">{{items.Title}}</p>
            <p class="box">{{items.BriefDesc}}</p>
          </div>
          <img :src='items.ImageUrl' :onError='defaultimg'>
        </router-link>
      </ul>
    </div>
    <transition name='slide'>
      <router-view/>
    </transition>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { GetVoiceModuleDetails } from "api/special";
import { Message } from "element-ui";
export default {
  name: "benefit",
  data() {
    return {
      arr: [],
      defaultimg: 'this.src="' + require("./goodlaugh_title.png") + '"'
    };
  },
  created() {
    let data =
      "?CustID=" +
      JSON.parse(localStorage.getItem("userdata")).CustID +
      "&moduleCode=BenefitOfLaugh";
    GetVoiceModuleDetails(data).then(res => {
      if (res.Code === 1) {
        this.arr = res.Data;
        console.log(this.arr);
      } else {
        Message.error({
          message: res.Msg,
          center: true,
          duration: 1000
        });
      }
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
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
.benefitbox {
  .imgtitle {
    width: 100%;
    background-size: 100%;
    height: rem(406);
  }
  .benfit_list {
    ul {
      a {
        padding: rem(20);
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ebebeb;
        .text-box {
          text-align: left;
          width: 6rem;
          p {
            &.tit {
              color: #000;
              font-size: rem(40);
              margin-bottom: rem(15);
            }
            &.box {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              font-size: rem(35);
              line-height: rem(45);
            }
          }
        }
        img {
          width: rem(300);
          height: rem(180);
        }
      }
    }
  }
}
</style>