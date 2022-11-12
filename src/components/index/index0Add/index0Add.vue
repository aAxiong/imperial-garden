<template>
    <div class="blankgap index_add">
        <vheader title="添加智能监护灯" :type="1" @back='back'></vheader>
            <div class="indexAdd_content">
                <!-- 头像 -->
                <div class="icon_center">
                    <img src="./icon@2x.png" alt="">
                </div>
                <p>接通电源，确定设备处于待连接状态</p>
                <span @click="other()">指示灯处于其他状态</span>
                <el-checkbox v-model="checked" class="checked">(连接状态描述)</el-checkbox>
                <div class="next" @click="next()">
                    下一步
                    <!-- <div class="popup">√请确认状态</div> -->
                </div>
            </div>
    </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";

export default {
    name: "indexAdd",
    data() {
        return {
             checked: false
        };
    },
    methods: {
       back() {
           this.$router.go(-1);
           return;
       },
       next() {
           if(this.checked==false){
               Message.success({
                   message:"请确认状态!",
                   center:true,
                   duration:1000
               });
           }
           else{
            this.$router.push("index1Scan")
           }
           
       },
       other() {
           this.$router.push("index0Add_reset")
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
.index_add{
   .indexAdd_content{
       width:rem(650);
       height:rem(500);
       margin: rem(100) auto;
    }   
    .icon_center{
        width:rem(300);
        height:rem(296);
        margin:0 auto;
    }
    img{
        width:100%;
        height:100%;
    }
    .indexAdd_content p,span{
        font-size: rem(30);
        line-height: 180%;
    }
    .indexAdd_content span{
        // padding:rem(5) 0;
        width:rem(400);
        height:rem(34);
        border-bottom: solid 1px #000;
    }
    .checked{
        position: fixed;
        bottom: rem(150);
        left: 50%;
        transform: translate(-50%);
    }
    .next{
        width: 75%;
        position: fixed;
        bottom: rem(10);
        left: 50%;
        transform: translate(-50%);
        background: url("./btn.png")no-repeat;
        height: rem(100);
        margin: rem(30) auto;
        background-size: 100%;
        line-height: rem(100);
        font-size: rem(40);
        color: #fff;
    }
}
</style>

