<template>
  <div class="wifiBox blankgap">
      <button @click="add()">点击进入连接</button>
  </div>
</template>
<script>
export default {
    name: 'wifi',
    methods: {
        add() {
            this.$router.push('connect')
        }
    }

}
</script>
<style>
.wifiBox{
    height: rem(1334);
    /*background-image: url('./page9.jpg');*/
    background-size: 100% 100%;
    /* background-color: #fff; */
}
</style>
