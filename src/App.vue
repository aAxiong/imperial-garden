<template>
  <div id="app">
    <router-view/>
    <cryremind :isshow="cryshow"></cryremind>
    <vfooter></vfooter>
  </div>
</template>

<script>
import vConsole from "vconsole";
import { deviceInit, setstatusbar, mqtt_send } from "api/device";
import vfooter from "base/v-footer/v-footer";
import cryremind from "base/cry-remind/cry-remind";
export default {
  name: "app",
  data() {
    return {
      cryshow: false
    };
  },
  methods: {},
  created() {
    if (deviceInit()) setstatusbar(2, this);
    mqtt_send(this);
    if (global.URL_Rroxy) var objVConsole = new vConsole();
  },
  components: {
    vfooter,
    cryremind
  }
};
</script>

<style lang="scss" type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
