<template>
  <div class="blankgap rule-box">
    <vheader title="游戏规则" :type="1" @back='back'></vheader>
  <div class="container" v-html='htmls'>
    <p>1.参与方式:每50积分可参加抽奖1次，每个用户每天可参加抽奖3次;</p>
    <p>2.兑换时间:奖品兑换截止时间请仔细查看所需兑换奖品的详情</p>
    <p>3.奖品领取:所有实物奖品在"兑换记录"中均可查看,同时,请务必在“收货地址”中填写真实姓名和联系方式;我们将在您兑换后的15个工作日内，与您取得联系并安排奖品发放，如中奖用户15个工作日内没有填写联系方式视为自动放弃</p>
    <p>4.关于领取奖品,如您仍有疑问，请及时联系我们;</p>
    <p>5.任何使用作弊行为得利的用户，都将被取消获奖资格，追回非法所得;平台保留追究法律责任的权利;</p>
    <p>6.本活动一切解释育花园运营团队所有。</p>
  </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { GetSystemContent } from "api/mine";
export default {
  name: "gameRule",
  data() {
    return {
      htmls: ""
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
      var data = "?code=AboutLuckyDraw";
      GetSystemContent(data).then(res => {
        if (res.Code === 1) {
          this.htmls = res.Data;
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
.rule-box {
  .container {
    padding: 0 rem(20);
    line-height: rem(40);
  }

  p {
    padding: 0 15px;
    font-size: 18px;
    text-align: left;
    line-height: 25px;
    color: #000;
    margin-top: 15px;
  }
}
</style>