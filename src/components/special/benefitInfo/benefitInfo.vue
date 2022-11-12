<template>
  <div class="benefitbox blankgap">
    <vheader :title="tit" :type="1" @back='back'></vheader>
    <div class="info_box" ref="wrapper">
      <div class="info_box_content" v-html='content'>

      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { GetSubVoiceModuleDetail } from "api/special";
import { Message } from "element-ui";
import BScroll from "better-scroll";
export default {
  name: "benefitInfo",
  data() {
    return {
      content: "",
      tit: ""
    };
  },
  created() {
    let data = "/id?id=" + this.$route.query.id;
    GetSubVoiceModuleDetail(data).then(res => {
      if (res.Code === 1) {
        this.tit = res.Data.Title;
        this.content = res.Data.Content;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
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
.info_box {
  text-align: left;
  padding: rem(10) rem(20);
  line-height: rem(45);
  font-size: rem(35);
  height: rem(1150);
  overflow: hidden;
  p {
    text-align: left;
  }
}
</style>