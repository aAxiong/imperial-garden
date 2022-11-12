<template>
  <full-page-slide :data="items" @finish="finish"></full-page-slide>
</template>

<script type="text/ecmascript-6">
import FullPageSlide from "base/full-page-slide/full-page-slide.vue";
export default {
  data() {
    return {
      items: [
        require("./guide1.png"),
        require("./guide2.png"),
        require("./guide3.png")
      ]
    };
  },
  components: {
    FullPageSlide
  },
  created() {
    //plus.navigator.setStatusBarBackground("#ffffff");
  },
  methods: {
    finish() {
      localStorage.setItem("openApp", "1");
      this.$router.push("vision");
    }
  }
};
</script>

<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
</style>
