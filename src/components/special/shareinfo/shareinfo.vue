<template>
  <div class="page shareinfobox blankgap" :style="{backgroundImage: 'url(' + img + ')' }">
    <!-- 关闭按钮 -->
    <span class="close" @click="close()">
      <img src="./mark_close.png">
    </span>
    <div class="userInfo">
      <!-- 头像 -->
      <div class="imgBox">
        <img :src="imgUrl">
      </div>
      <div class="userName">
        <span class="name">{{name}}</span>
      </div>
    </div>
    <!-- 得分 -->
    <div class="score">{{score}}</div>
    <!-- 导航 -->
    <div class="tabBar">
      <div class="wechat" @click.prevent.stop="shareSort('weixin','WXSceneSession')">
        <span>
          <img src="./mark_wechat.png">
        </span>
        <p>分享给朋友</p>
      </div>
      <div class="friends" @click.prevent.stop="shareSort('weixin','WXSceneTimeline')">
        <span>
          <img src="./mark_friends.png">
        </span>
        <p>分享到朋友圈</p>
      </div>
      <div class="ranking">
        <router-link to='/special/rankingList'>
          <span>
            <img src="./mark_share.png">
          </span>
          <p> 排行榜</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import vheader from "base/v-header/v-header";
import { share } from "common/js/share";
import { GetScoreByShareRecordWave } from "api/special";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import {
  deviceInit,
  shotscreen,
  getshotscreenurl,
  wxshare,
  getwxshare
} from "api/device";
import { Indicator } from "mint-ui";
export default {
  name: "shareinfo",
  data() {
    return {
      icon: "el-icon-circle-plus-outline",
      imgUrl: require("./reg_icon.png"),
      id: this.$route.query.id,
      name: "登陆/注册",
      score: this.$route.query.grade,
      img: "",
      bitmap: "",
      ws: plus.webview.currentWebview(),
      ptShowStatus: false,
      ptName: "",
      pictures: ""
    };
  },
  props: {
    title: {
      type: String,
      default: "健康育儿，从育花园开始" + global.VERSION
    },
    content: {
      type: String,
      default: "我正在使用育花园app，快来加入我吧..."
    },
    thumbs: {
      type: String,
      default: require("./28.png")
    },
    // pictures: {
    //   type: String,
    //   default: ""
    // },
    href: {
      type: String,
      default: ""
    }
  },
  created() {
    //plus.navigator.setStatusBarBackground("#90cfe9");
    if (localStorage.getItem("userdata") != null) {
      this.name = JSON.parse(localStorage.getItem("userdata")).NickName;
      this.imgUrl = JSON.parse(localStorage.getItem("userdata")).HeadImageUrl;
    }
  },
  mounted() {
    if (0 <= this.score && this.score <= 10) {
      this.img = require("./mark_bg1.png");
    } else if (11 < this.score && this.score <= 30) {
      this.img = require("./mark_bg2.png");
    } else if (31 <= this.score && this.score <= 65) {
      this.img = require("./mark_bg3.png");
    } else if (66 <= this.score && this.score <= 100) {
      this.img = require("./mark_bg4.png");
    }
  },
  methods: {
    //关闭
    close() {
      this.$parent.loadDayTop();
      this.$router.go(-1);
      return;
    },
    getwxshare_success(data) {
      Indicator.close();
      if (data.data.application == 1 || data.data.application == 4) {
        if (data.data.wxshare < 1) {
          clearInterval(this.timer);

          if (data.data.wxshare == 0) {
            // Message.success({
            //   message: "分享成功1",
            //   center: true,
            //   duration: 1000
            // });
          } else if (data.data.wxshare == -2) {
            console.log("分享取消");
          } else {
            // Message.error({
            //   message: "分享失败",
            //   center: true,
            //   duration: 1000
            // });
          }
        } else {
          //alert("分享返回");
          clearInterval(this.timer);
        }
      }
    },
    getwxshare_failed(data) {
      Indicator.close();
    },
    shotscreen_success(data, ...arg) {
      console.log("success action : " + data.data.action);
      this.timer = setInterval(() => {
        getshotscreenurl(this, ...arg);
      }, 100);
    },
    shotscreenurl_success(data, ...arg) {
      console.log(JSON.stringify(data));
      if (data.data.status == true) {
        clearInterval(this.timer);
        console.log("shotscreenurl_success : " + data.data.status);
        if (data.data.status) {
          console.log("截屏成功 : " + data.data.url);
          this.shareSortBlock(data.data.url, ...arg);
        } else {
          console.log("截屏失败");
          Indicator.close();
        }
      }
    },
    shareSortBlock(imgurl, ...arg) {
      Indicator.close();
      let self = this;
      share(
        ...arg,
        this.title,
        this.content,
        imgurl,
        "https://bateersoft.cc/adhoc/index.php",
        function(sh) {
          if (sh == true) {
            const data2 =
              "CustID=" +
              JSON.parse(localStorage.getItem("userdata")).CustID +
              "&recWaveID=" +
              self.id;
            GetScoreByShareRecordWave(data2).then(res => {
              if (res.Code === 1) {
                // Message.success({
                //   message: "分享成功3",
                //   center: true,
                //   duration: 1000
                // });
              } else {
                // Message.error({
                //   message: "分享失败",
                //   center: true,
                //   duration: 1000
                // });
              }
              // self.delFile(filepath);
            });
          }
        }
      );
    },
    shareSort(...arg) {
      Indicator.open({
        text: "Loading...",
        spinnerType: "fading-circle"
      });

      //shotscreen(this, 2, "https://bateersoft.cc/adhoc/updateimg.php", ...arg);

      wxshare(this, arg[1] == "WXSceneSession" ? 1 : 0);
      this.timer = setInterval(() => {
        getwxshare(this);
      }, 1000);

      return;
      // let self = this;
      // if (this.ptShowStatus === false) {
      //   let bitmap = new plus.nativeObj.Bitmap(self.title);
      //   let getTime = new Date();
      //   self.ptName =
      //     "_www/" +
      //     getTime.getFullYear() +
      //     (getTime.getMonth() + 1) +
      //     getTime.getDate() +
      //     getTime.getHours() +
      //     getTime.getMinutes() +
      //     getTime.getSeconds() +
      //     ".jpg";
      //   self.ws.draw(
      //     //绘制截屏
      //     bitmap,
      //     function() {
      //       self.pictures = bitmap.toBase64Data();
      //       bitmap.loadBase64Data(
      //         self.pictures,
      //         function() {
      //           console.log("创建成功");
      //         },
      //         function() {
      //           console.log("创建失败");
      //         }
      //       );
      //       bitmap.save(self.ptName, { overwrite: true }, function() {
      //         plus.gallery.save(
      //           self.ptName,
      //           function() {
      //             self.ptShowStatus = true;
      //             const data2 =
      //               "CustID=" +
      //               JSON.parse(localStorage.getItem("userdata")).CustID +
      //               "&recWaveID=" +
      //               self.id;
      //             share(
      //               ...arg,
      //               self.title,
      //               self.content,
      //               self.thumbs,
      //               "file://" + plus.io.convertLocalFileSystemURL(self.ptName),
      //               function(sh) {
      //                 if (sh == true) {
      //                   GetScoreByShareRecordWave(data2).then(res => {
      //                     self.delFile(self.ptName);
      //                     if (res.Code === 1) {
      //                       Message.success({
      //                         message: "分享成功",
      //                         center: true,
      //                         duration: 1000
      //                       });
      //                     } else {
      //                       Message.error({
      //                         message: "分享失败",
      //                         center: true,
      //                         duration: 1000
      //                       });
      //                     }
      //                   });
      //                 }
      //               }
      //             );
      //           },
      //           function() {
      //             console.log("保存图片到相册失败");
      //           }
      //         );
      //       });
      //     },
      //     function(e) {
      //       console.log("截屏绘制图片失败：" + JSON.stringify(e));
      //     },
      //     {
      //       check: true, // 设置为检测白屏
      //       clip: { top: "50%", left: "0px", height: "50%", width: "100%" } // 设置截屏区域
      //     }
      //   );
      // } else {
      //   share(
      //     ...arg,
      //     self.title,
      //     self.content,
      //     self.thumbs,
      //     "file://" + plus.io.convertLocalFileSystemURL(self.ptName)
      //   ); //分享函数
      // }
    },
    delFile(relativePath) {
      plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
        entry.remove(
          function(entry) {
            console.log("文件删除成功");
          },
          function(e) {
            console.log("文件删除失败" + relativePath);
          }
        );
      });
    },
    //排行榜
    rank() {
      //plus.navigator.setStatusBarBackground("#f0779a");
      this.$router.push("/special/shareinfo");
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
.shareinfobox {
  background-size: 100%;
  background-repeat: no-repeat;
  .close {
    display: block;
    float: right;
    margin-top: rem(40);
    margin-right: rem(30);
    width: rem(60);
    height: rem(60);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .userInfo {
    padding-top: rem(60);
    display: flex;
    align-items: center;
    .imgBox {
      margin-left: rem(250);
      img {
        width: rem(110);
        height: rem(110);
        border-radius: 100px;
      }
    }
    .userName {
      margin-left: rem(25);
      font-size: rem(36);
    }
  }
  .score {
    position: absolute;
    left: 0;
    right: 0;
    top: rem(700);
    font-size: 2rem;
    text-align: center;
  }
  .tabBar {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: rem(180);
    p {
      margin-top: rem(20);
    }
    .wechat {
      width: 33%;
      height: 100%;
      span {
        margin: 0 auto;
        display: block;
        width: rem(100);
        height: rem(100);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .friends {
      width: 33%;
      height: 100%;
      span {
        margin: 0 auto;
        display: block;
        width: rem(100);
        height: rem(100);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .ranking {
      width: 33%;
      height: 100%;
      span {
        margin: 0 auto;
        display: block;
        width: rem(100);
        height: rem(100);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
@media (min-height: 737px) {
  .shareinfobox {
    .close {
      margin-top: 1.2rem;
    }
    .userInfo {
      padding-top: 1.3rem;
    }
    .tabBar {
      bottom: rem(40);
    }
  }
}
</style>
