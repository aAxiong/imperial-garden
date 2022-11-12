<template>
  <transition name="fade">
    <div class="dialog">
      <div class="mask"></div>
      <div class="dialog-content">
        <div class="text">
          <p>{{ modal.text }}</p>
        </div>
        <div class="btn-group">
          <div class="dialogbtn" @click="submit">{{ modal.confirmButtonText }}</div>
          <div class="dialogbtn" @click="nochoice">{{ modal.cancelButtonText }}</div>
        </div>
        <div class="imgx" @click="cancel">
          <img src='./close.png'>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "dialog",
  props: {
    dialogOption: Object
  },
  data() {
    return {
      resolve: "",
      reject: "",
      promise: "" // 保存promise对象
    };
  },
  computed: {
    modal: function() {
      let options = this.dialogOption;
      return {
        text: options.text,
        cancelButtonText: options.cancelButtonText
          ? options.cancelButtonText
          : "取消",
        confirmButtonText: options.confirmButtonText
          ? options.confirmButtonText
          : "同意"
      };
    }
  },
  methods: {
    //确定,将promise断定为完成态
    submit() {
      this.resolve("submit");
    },
    // 取消,将promise断定为reject状态
    cancel() {
      this.$emit("cancel");
    },
    nochoice() {
      this.reject("nochoice");
    },
    //显示confirm弹出,并创建promise对象，给父组件调用
    confirm() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise; //返回promise对象,给父级组件调用
    }
  }
};
</script>

<style lang="scss"  type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.dialog {
  position: relative;
  z-index: 99999;
  .dialog-content {
    position: fixed;
    box-sizing: border-box;
    width: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    z-index: 9999;
    .title {
      font-size: rem(32);
      font-weight: 600;
      line-height: rem(60);
    }
    .text {
      font-size: rem(32);
      color: #7b7b7b;
      width: 100%;
      padding: rem(90) 0;
      line-height: rem(45);
      background: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      p {
        width: 85%;
        margin: 0 auto;
      }
    }
    .btn-group {
      display: flex;
      border-top: rem(2) solid #e0e0e0;
      background: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      .dialogbtn {
        font-size: rem(32);
        border-left: rem(2) solid #e0e0e0;
        flex: 1;
        line-height: rem(100);
        color: #7b7b7b;
        &:first-child {
          color: #fe668c;
          border-left: none 0;
          border-right: rem(2) solid #e0e0e0;
        }
        &:active {
          background-color: rgba(170, 170, 170, 0.1);
        }
      }
    }
    .imgx {
      img {
        width: rem(63);
        height: rem(137);
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 500;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>