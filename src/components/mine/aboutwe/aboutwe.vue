<template>
  <div class="blankgap aboutwe">
    <vheader title="关于我们" :type="1" @back='back'></vheader>
    <div class="ve" v-html='data'>
      <img src='./108.png'>
      <p>
        版本号1.0.1
      </p>
      <div class="company_info">
        <p>copyright(c)2017-2019</p>
        <p>深圳育联科技有限公司</p>
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { GetSystemContent } from "api/mine";
export default {
  name: "aboutwe",
  data() {
    return {
      data: ""
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    loadData() {
      var data = "?code=AboutUs";
      GetSystemContent(data).then(res => {
        if (res.Code === 1) {
          this.data = res.Data;
        } else {
          Message.error({
            message: res.Msg,
            center: true,
            duration: 1000
          });
        }
      });
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
.aboutwe {
  .header {
    .header-container {
      position: relative;
    }
  }
  img {
    margin-top: rem(200);
  }
  p {
    color: #737373;
    margin-top: rem(30);
  }
  .company_info {
    position: absolute;
    bottom: rem(30);
    left: 50%;
    transform: translate(-50%);
  }
  .ve {
    padding: 0 rem(30);
    line-height: rem(40);
    margin-top: rem(30);
    p {
      line-height: rem(60);
      span {
        line-height: rem(60);
      }
    }
  }
}
</style>