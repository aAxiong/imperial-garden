export function share(...arg) {
  /*shareName:  weixin,qq ...
    shareType: weixin 分为 WXSceneSession(微信好友) WXSceneTimeline(微信朋友圈)
    title: 分享名称
    content：分享内容
    thumbs：分享缩略图
    href： 分享链接
  */
  console.log(arg);
  var shares = null,
    shareCategory = null
  let success = false;
  plus.share.getServices(function (s) {
    shares = s
    /*share:[
      {"id":"sinaweibo","description":"新浪微博","authenticated":false,"accessToken":"","nativeClient":true},
      {"id":"tencentweibo","description":"腾讯微博","authenticated":false,"accessToken":"","nativeClient":false},
      {"id":"qq","description":"QQ","authenticated":false,"accessToken":"","nativeClient":true},
      {"id":"weixin","description":"微信","authenticated":true,"accessToken":"","nativeClient":true}
    ]*/
    for (var i in s) {
      if (arg[0] == s[i].id) {
        shareCategory = s[i]
      }
    }
    shareCategory.send({ //推荐页面分享

      href: arg[5],
      title: arg[2],
      content: arg[3],
      thumbs: [arg[4]],
      pictures: [arg[4]],

      extra: {
        scene: arg[1]
      }
    }, function () {
      console.log('分享成功');
      success = true;
      return arg[6](success)
    }, function (e) {
      console.log('分享失败' + e.message);
    })
  }, function (e) {
    console.log('获取分享服务列表失败：' + e.message)
  })

}
