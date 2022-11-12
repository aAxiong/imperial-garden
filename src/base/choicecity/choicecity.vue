<template>
  <div class="pickercity">
  
    <div class="v-modal" v-show='cityshow' @click='canleChoice'></div>
    <transition name="slide-fade">
      <div class="mypikercity mint-popup mint-popup-bottom" v-show='cityshow'>
        <div class="picker-toolbar picker-toolbars"><span class="mint-datetime-action mint-datetime-cancel" @click='canleChoice'>取消</span> <span class="mint-datetime-action mint-datetime-confirm"
            @click='trueChoice'>确定</span></div>
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" :visible-item-count="5"></mt-picker>
      </div>
    </transition>
  
  </div>
</template>
<script>
  import myaddress from './city.json'
  export default {
    name: 'choicecity',
    data() {
      return {
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 1,
            values: Object.keys(myaddress), //省份数组
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: [],
            className: 'slot5',
            textAlign: 'center'
          }
        ],
        addres: '北京',
        addressCity: '北京',
        printfaddress: ''
      }
    },
    props: {
      cityshow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onMyAddressChange(picker, values) {
        if (myaddress[values[0]]) {
          //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1, Object.keys(myaddress[values[0]])) // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2, myaddress[values[0]][values[1]]) // 区/县数据就是一个数组
          this.myAddressProvince = values[0]
          this.myAddressCity = values[1]
          this.myAddresscounty = values[2]
        }
        if (
          values[0] == '澳门特别行政区' ||
          values[0] == '香港特别行政区' ||
          values[0] == '台湾省'
        ) {
          this.addres = values[0]
        } else if (values[1] == '市辖区') {
          this.addres = values[0] + (values[2] == undefined ? '' : values[2])
        } else {
          this.addres = values[0] + (values[1] == undefined ? '' : values[1])
          //  +(values[2] == undefined ? '' : values[2])
        }
      },
      canleChoice() {
        this.$emit('hidecitypiker')
      },
      trueChoice() {
        this.$emit('trueChoice', this.addres)
        this.$emit('hidecitypiker')
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  .pickercity {
    width: 100%;
    .mypikercity {
      width: 100%;
      position: fixed;
      bottom: 0;
      top: auto;
      right: auto;
      bottom: 0;
      background: #fff;
    }
    .picker-toolbar {
      border-bottom: solid 1px #eaeaea;
      .mint-datetime-action {
        color: #008afc;
      }
    }
    .slide-fade-enter-active {
      transform: translate3d(-50%, 100%, 0);
    }
    .slide-fade-leave-active {
      transform: translate3d(-50%, 100%, 0);
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
      // transform: translateX(30px);
      opacity: 0;
    }
    .v-modal {
      // transition: 5s ease-in;
    }
  }
</style>