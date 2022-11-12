<template>
    <div class="blankgap index_success">
        <vheader title="白灯亮起后熄灭" :type="1" @back='back'></vheader>
        <div class="container">
            <div class="indexSuccess_content">
               <p>该状态说明设备已经连接到工作WIFI</p>
               <p>1、请确保您的路由器网络通畅，并刷新状态</p>
               <p>2、您可以按配对键或设备重新上电后重新连</p>
               <span> 接设备，并对工作WIFI重新设置</span>
            </div>
        </div>
    </div>
</template>

<script>
import vheader from "base/v-header/v-header";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";

export default {
    name: "indexFail_1",
    data() {
        return {
             
        };
    },
    methods: {
       back() {
           this.$router.go(-1);
           return;
       },
       next() {
            this.$router.push("indexFail")
       },
    },
  components: {
    vheader
  }
    
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.index_success{
   .indexSuccess_content{
       text-align: left;
       font-size: 0.4rem;
       margin-left:1rem;

    }  
    .indexSuccess_content p{
        line-height:1.5rem;
    } 
    .indexSuccess_content span{
        margin-top:-1.5rem;
    }
}
</style>

