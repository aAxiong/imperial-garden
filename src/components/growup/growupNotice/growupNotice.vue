<template>
  <div class="notice blankgap">
    <vheader title="成长评测" :type="1" @back='back'></vheader>
    <div class="container">
      <div class="t">
      </div>
      <div class="notice_content" v-html='htmls' ref="wrapper">
        <p>
          婴儿的成长在人的一生中非常重要，如何使婴儿的成长更科学，就要对婴儿发展的规律和婴儿发展的状况有一个客观的了解。因为婴儿的发展变化是隐性的、快速的、是基础性的，所以及时准确了解婴儿的发展状况，为婴儿创设科学的成长环境，是十分重要的。客观地、及时地了解婴儿智能发育状况，如何正确运用婴儿神经发育测评量表意义重大。
        </p>
        <p class="tit">1、测评的目的和意义？</p>
        <p>测评的意义在于对儿童神经发育发展的状况进行“定期量化，掌握情况；及时干预；整体促进”</p>
        <p>1、为及时准确了解婴儿发展水平提供参考依据；</p>
        <p>2、可尽早发现婴儿的优势，有利于进行有针对性的培养和教育；</p>
        <p>3、可尽早发现婴儿的薄弱地方，尽早地采取补差补缺的训练措施；</p>
        <p>4、可尽早发现非正常婴儿，及早干预和施治。</p>
        <p class="tit">测评的主要内容：</p>
        <p>神经心理发育可以从大运动、精细动作、语言能力、认知能力和社会行为能力等5个能区精细评价。</p>
        <br/>
        <p>大运动</p>
        <br/>
        <p>主要指宝宝的身体姿势或全身幅度较大约动作，比如俯卧、抬头、翻身、 爬行、独坐、独站、行走、跑步和跳跃等。
        </p>
        <br/>
        <p>精细动作</p>
        <br/>
        <p>主要是指宝宝手和手指约动作，以及手眼协调和双手协调能力。比如大把 抓语言能力握玩具、手指捏取物件、引线串珠、握笔涂画、拇食指对捏等。
        </p>
        <br/>
        <p>语言能力</p>
        <br/>
        <p>主要指宝宝接收、理解和表达信息的能力，是宝宝进行社会交住的工具。 包括口语和非口语入文字、图像、符号、手势、表倩和体态语言等。
        </p>
        <br/>
        <p>认知能力</p>
        <br/>
        <p>主要推宝宝对事物感知觉、记忆、注意、思维和想象的能力。</p>
        <p>社会行为</p>
        <p>主要推宝宝对周围人们的应答能力和料理自己生活约能力，反映其生活能 力(如大小便)及与人交往的能力。
        </p>
        <p class="tit">3、测评频率与发展速度</p>
        <p>三岁前的宝宝在身心发育上处于飞速惊人的发展阶段，是人的成长与发展过程中的关键期，在这个时期，宝宝的身心发育发展变化较大，可塑性强。所以评频测评频率是与儿童的生理身心发展变化现象相匹配的，它体现了科学的规律性和观察指导的及时性。为此，列出测评频率参考表以供家长选择。</p>
        <p>测评年龄 1－12个月 12－36个月</p>
        <p>应测次数 12次 4次</p>
        <p>测评间隔 1次/每个月 1次/每3个月</p>
        <p class="tit">4、测评的重要性</p>
        <p>1、由于更多家长和一些私立机构尚未了解宝宝的成长发育特点，在重视了宝宝的生理安全却忽视了宝宝的心理安全</p>
        <p>2“宝宝还小，什么都不懂”几千年的育儿观，让很多家长忽略宝宝的感受，错过了培养宝宝的行为能力、语言表达、逻辑思维等方面的关键期。 </p>
        <p>3、“每个婴儿都是天才”，实际上每一位宝宝在刚出生的时候，都具有爬行、踏步、游 泳等能力，新生宝宝的嗅觉特别灵敏，一周的时候就可以通过气味分辨出谁是妈妈？出生的时候就能区别出白开水和其它液体的味道。但是因为很多家长尚未认识到，所以未能将宝宝所拥有的能力得到有效的培养。</p>
        <p class="tit">5、家长容易进入的误区</p>
        <p>1、 用一个标准去衡量一群宝宝，忽略了宝宝的个体差异。 </p>
        <p>2、带上“帽子”如语言迟缓、落后、平衡能力差，夸大宝宝能力稍差事实，误导家长。 </p>
        <p>3、片面测评，如通过一次游戏或一个问题的是、否回答评估宝宝能力。 </p>
        <p>4、忽视了宝宝的生长发育、健康状况、家庭成长环境等因素。 </p>
        <p>5、认为“早期教育”大于引导，殊不知真正的早期教育是源自于生活，对于宝宝来说生活即是学习。 </p>
        <p class="tit">6、测评须知</p>
        <p>测评，不是为了"诊断"，而是为了寻找宝宝教育的起点。育花园采用家庭测评的方式，帮您全面了解宝宝能力发展现状和医院等机构做测评需要专业人员现场观察、评判不同， 我们的测评只需要家长在日常生活观察孩子的行为，然后在育花园app按照真实情况作答， 就能全面了解宝宝五大能力项的发展情况。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { GetSystemContent } from "api/mine";
// import BScroll from "better-scroll";
export default {
  name: "growupNotice",
  data() {
    return {
      htmls: ""
    };
  },
  created() {
    this.loadData();
    // this.$nextTick(() => {
    //   if (!this.scroll) {
    //     this.scroll = new BScroll(this.$refs.wrapper, {
    //       click: true
    //     });
    //   } else {
    //     this.scroll.refresh();
    //   }
    // });
  },
  methods: {
    back() {
      this.$router.go(-1);
      return;
    },
    loadData() {
      var data = "?code=AboutGrowTest";
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
.notice {
  .container {
    line-height: 20px;
  }
  .t {
    width: 100%;
    height: rem(279);
    @include bg-image("./assessment_about");
    background-size: 100%;
    margin: 0 auto;
  }
  .notice_content {
    width: rem(680);
    margin: 0 auto;
    text-align: left;
    p {
      color: #6b6b6b;
      font-size: rem(35);
      line-height: rem(50);
      text-align: left;
      &:first-child {
        margin-top: rem(30);
      }
      &.tit {
        color: #000;
        font-size: rem(40);
        margin: rem(30) 0;
      }
    }
  }
}
</style>