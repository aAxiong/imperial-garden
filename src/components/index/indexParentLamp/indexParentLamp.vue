<template>
    <div class="blankgap">
        <vheader title="关于亲子灯" :type="1" @back='back'></vheader>
        <div class="info_box">
            <iframe :src='content' :style="'height:'+screenHeight+'px;'"></iframe>
        </div>
    </div>
</template>
<script>
import vheader from "base/v-header/v-header";
export default {
  data() {
    return {
      content: this.$route.query.herf,
      screenHeight: ""
    };
  },
  created() {
    this.screenHeight = document.body.clientHeight - 69;
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
  font-size: rem(35);
  iframe {
    width: 100%;
  }
}
</style>
</style>
