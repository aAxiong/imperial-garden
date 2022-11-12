<template>
  <div class="content blankgap">
      <br><br><br><br><br><br>
      <h2>这是一个h5跳转页面</h2>

      <div class="content">
          http://<input v-model="address"><button @click="skip()">跳转</button>
      </div>
  </div>
</template>
<script>
export default {
    name: 'indexSkip',
    data () {
        return {
            address: localStorage.getItem("testurl")
        }
    },
    methods: {
        skip(){
            console.log(this.address)
            localStorage.setItem("testurl", this.address);
            alert("开始跳转");
            window.location.href= 'http://' + this.address

        }

    }
}
</script>
<style>

</style>
