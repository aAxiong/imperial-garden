<template>
  <div class="blankgap index6Settings_scope">
    <vheader title="亮度范围" :type="1" @back='back'></vheader>
    <div class="container">
      <div class="bright">
        <p>最亮</p>
        <div class="progress">
          <mt-range v-model="rangeValue1" class="ss" :barHeight="12" :min="80" :max="100" :step="5">
            <div slot="end" style="width:1rem;margin-right:3px;text-align:center">{{rangeValue1}}%</div>
          </mt-range>
        </div>
      </div>
      <div class="dark">
        <p>最暗</p>
        <mt-range v-model="rangeValue2" :barHeight="12" :min="0" :max="30" :step="5">
          <div slot="end" style="width:1rem;margin-right:3px;text-align:center">{{rangeValue2}}%</div>
        </mt-range>
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import {
  sendMqttSub,
  sendMqttPub,
  receiveMqttData,
  Eq_GetEqpRegistInfo,
  Eq_BindingEquipment
} from "api/device";
export default {
  name: "indexScan",
  data() {
    return {
      rangeValue1: global.DEV_CurDeviceData.lightness_max,
      rangeValue2: global.DEV_CurDeviceData.lightness_min
    };
  },
  created() {},
  watch: {
    rangeValue1() {
      console.log(this.rangeValue1);

      global.DEV_CurDeviceData.lightness_max = this.rangeValue1;
      sendMqttPub(this, "setparam", { lightness_max: this.rangeValue1 });
    },
    rangeValue2() {
      console.log(this.rangeValue2);
      global.DEV_CurDeviceData.lightness_min = this.rangeValue2;
      sendMqttPub(this, "setparam", { lightness_min: this.rangeValue2 });
    }
  },
  mqtt: {
    "#"(data, topic) {
      //console.log("# ->"+topic + ': ' + String.fromCharCode.apply(null, data))
      // alert("#");
      receiveMqttData(this, data);
    }
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
.index6Settings_scope {
  .container {
    .bright,
    .dark {
      box-sizing: border-box;
      display: block;
      width: 100%;
      background-color: #fff;
      border-top: 11px solid #dedede;
      text-align: left;
      color: #aaa9a9;
    }
    .bright p,
    .dark p {
      margin: 0rem 0 0.5rem 0rem;
      font-size: 0.48rem;
      padding: 0.3rem 0 0 0.5rem;
    }
    .dark {
      margin-top: 0.5rem;
    }
  }
}
</style>


