/*
 * test
 */
//代码拦截
import axios from 'axios'
import {
  commonParams,
  serverUrl
} from './config'
import {
  Message
} from 'element-ui'
import {
  Indicator
} from 'mint-ui';
import {
  comfunction,
  getpostheader,
  get,
  getheader
} from './axios.js'
import './devdata.js'
import './exif.js'

import md5 from 'js-md5';
let Base64 = require('js-base64').Base64;

var client;
var mqtttimer;
/*
1.获取mac地址绑定信息
接口：GET api/Equipment/GetEqpRegistInfo ? eqpMacStr = {eqpMacStr}
*/
export function Eq_GetEqpRegistInfo(param) {
  return getheader(param, serverUrl + '/Equipment/GetEqpRegistInfo')
}

/*
2.获取我的设备信息
接口：GET api/Equipment/MyEquipments?custID={custID}
*/
export function Eq_MyEquipments(param) {
  return getheader(param, serverUrl + '/Equipment/MyEquipments')
}

/*
3.设备扫码绑定
接口:POST api/Equipment/BindingEquipment
*/
export function Eq_BindingEquipment(param) {
  return getpostheader(param, serverUrl + '/Equipment/BindingEquipment')

}

/*
4.向目标客户发出设备分享邀请
接口：POST api/Equipment/ShareEquipmentTo
*/
export function Eq_ShareEquipmentTo(param) {
  return getpostheader(param, serverUrl + '/Equipment/ShareEquipmentTo')
}

/*
5.目标客户同意绑定设备
接口：POST api/Equipment/ShareEquipmentAgree
*/
export function Eq_ShareEquipmentAgree(param) {
  return getpostheader(param, serverUrl + '/Equipment/ShareEquipmentAgree')
}

/*
6.查询设备激活状态（决定是否弹出填写设备信息的界面）
接口：GET api/Equipment/CheckEquipmentIsExist?custID={custID}&eqpMacStr={eqpMacStr}
*/
export function Eq_CheckEquipmentIsExist(param) {
  return getheader(param, serverUrl + '/Equipment/CheckEquipmentIsExist')
}
/*
7.获取设备分享绑定的成员
接口：GET api/Equipment/ShareMembers?custID={custID}&eqpID={eqpID}
*/
export function Eq_ShareMembers(param) {
  return getheader(param, serverUrl + '/Equipment/ShareMembers')
}
/*
8.移除指定成员的绑定关系
接口：GET api/Equipment/RemoveShareMembers?custID={custID}&removeCustID={removeCustID}&eqpID={eqpID}
*/
export function Eq_RemoveShareMembers(param) {
  return getheader(param, serverUrl + '/Equipment/RemoveShareMembers')
}
/*
9.从设备绑定成员中主动退出
接口：GET api/Equipment/RemoveFromShareMembers?removeCustID={removeCustID}&eqpID={eqpID}
*/
export function Eq_RemoveFromShareMembers(param) {
  return getheader(param, serverUrl + '/Equipment/RemoveFromShareMembers')
}
/*
10.修改设备信息
接口：POST api/Equipment/EquipmentModify
*/
export function Eq_EquipmentModify(param) {
  return getpostheader(param, serverUrl + '/Equipment/EquipmentModify')
}
/*
11.获取最新设备更新版本
接口：GET api/Equipment/GetLastestEqpVersion?custID={custID}&eqpID={eqpID}&numCode={numCode}
*/
export function Eq_GetLastestEqpVersion(param) {
  return getheader(param, serverUrl + '/Equipment/GetLastestEqpVersion')
}
/*
12.获取最新手机更新版本
接口：GET api/Equipment/GetLastestPhoneVersion?custID={custID}&phoneType={phoneType}
*/
export function Eq_GetLastestPhoneVersion(param) {
  return getpostheader(param, serverUrl + '/Equipment/GetLastestPhoneVersion')
}
/*
13.下载指定硬件固件
接口：GET api/Equipment/DowloadEqpVersionFile?id={id}&macStr={macStr}
*/
export function Eq_DowloadEqpVersionFile(param) {
  return getheader(param, serverUrl + '/Equipment/DowloadEqpVersionFile')
}

export function Vo_AddEvent(param, url) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/Add' + url)
}

export function Vo_EditEvent(param, url) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/Edit' + url)
}

export function Vo_DeleteEvent(param, url) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/Delete' + url)
}

/*1.
POST api/VoiceAnalysis/AddBabyDietEvent
新增婴儿饮食事件
*/
export function Vo_AddBabyDietEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/AddBabyDietEvent')
}
/*2.
POST api/VoiceAnalysis/EditBabyDietEvent
编辑婴儿饮食事件
*/
export function Vo_EditBabyDietEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/EditBabyDietEvent')
}
/*3.
POST api/VoiceAnalysis/DeleteBabyDietEvent
删除指定婴儿饮食事件
*/
export function Vo_DeleteBabyDietEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/DeleteBabyDietEvent')
}
/*4.
POST api/VoiceAnalysis/AddBabyMetabolismEvent
新增婴儿便便事件
*/
export function Vo_AddBabyMetabolismEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/AddBabyMetabolismEvent')
}
/*5.
POST api/VoiceAnalysis/EditBabyMetabolismEvent
编辑婴儿便便事件
*/
export function Vo_EditBabyMetabolismEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/EditBabyMetabolismEvent')
}
/*6.
POST api/VoiceAnalysis/EditBabyTemperatureEvent
编辑婴儿体温事件
*/
export function Vo_EditBabyTemperatureEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/EditBabyTemperatureEvent')
}
/*7.
POST api/VoiceAnalysis/DeleteBabyMetabolismEvent
删除指定婴儿便便事件
*/
export function Vo_DeleteBabyMetabolismEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/DeleteBabyMetabolismEvent')
}
/*8.
POST api/VoiceAnalysis/AddBabyDiaperEvent
新增婴儿尿布事件
*/
export function Vo_AddBabyDiaperEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/AddBabyDiaperEvent')
}
/*9.
POST api/VoiceAnalysis/EditBabyDiaperEvent
编辑婴儿尿布事件
*/
export function Vo_EditBabyDiaperEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/EditBabyDiaperEvent')
}
/*10.
POST api/VoiceAnalysis/DeleteBabyDiaperEvent
删除指定婴儿尿布事件
*/
export function Vo_DeleteBabyDiaperEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/DeleteBabyDiaperEvent')
}
/*11.
POST api/VoiceAnalysis/AddBabyTemperatureEvent
新增婴儿体温事件
*/
export function Vo_AddBabyTemperatureEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/AddBabyTemperatureEvent')
}
/*12.
POST api/VoiceAnalysis/DeleteBabyTemperatureEvent
删除指定婴儿体温事件
*/
export function Vo_DeleteBabyTemperatureEvent(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/DeleteBabyTemperatureEvent')
}
/*13.
GET api/VoiceAnalysis/GetAllBabyEventCombineData?custID={custID}&eqpID={eqpID}&endCheckDate={endCheckDate}
查询婴儿事件的整合数据
*/
export function Vo_GetAllBabyEventCombineData(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetAllBabyEventCombineData')
}
/*14.
GET api/VoiceAnalysis/GetBabyEventDisplayItems?eventTypeID={eventTypeID}&eqpID={eqpID}
获取各种事件的可选值
*/
export function Vo_GetBabyEventDisplayItems(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetBabyEventDisplayItems')
}
/*15.
GET api/VoiceAnalysis/GetBabyCryReasonList?custID={custID}&eqpWaveID={eqpWaveID}&voiceTime={voiceTime}
获取哭声原因分析数据
*/
export function Vo_GetBabyCryReasonList(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetBabyCryReasonList')
}
/*16.
GET api/VoiceAnalysis/IsShowCryReasonWin?eqpWaveID={eqpWaveID}&eqpMacStr={eqpMacStr}&voiceTime={voiceTime}
询问是否需要推送哭声原因（true弹，false不弹）
*/
export function Vo_IsShowCryReasonWin(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/IsShowCryReasonWin')
}
/*17.
POST api/VoiceAnalysis/ConfirmReasonForCry
客户确认婴儿哭声原因
*/
export function Vo_ConfirmReasonForCry(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/ConfirmReasonForCry')
}


/*18.   20180627
GET api/VoiceAnalysis/GetEquipmentHomeData
设备首页数据
*/
export function Vo_GetEquipmentHomeData(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetEquipmentHomeData')
}

/*19.   20180627
GET api/VoiceAnalysis/GetTheLastBabyCryReason
获取最后一次语义分析的原因
*/
export function Vo_GetTheLastBabyCryReason(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetTheLastBabyCryReason')
}

/*20.   20180627
GET api/VoiceAnalysis/GetChildCareRecordAnalysis
获取当前周期的看护分析数据
*/
export function Vo_GetChildCareRecordAnalysis(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetChildCareRecordAnalysis')
}

/*21.   20180627
GET api/VoiceAnalysis/GetEquipmentRecordList
获取当前周期的看护分析数据
*/
export function Vo_GetEquipmentRecordList(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetEquipmentRecordList')
}

/*22.   20180630
POST api/VoiceAnalysis/ChangeEquipmentManager
变更设备管理员
*/
export function Eq_ChangeEquipmentManager(param) {
  return getpostheader(param, serverUrl + '/Equipment/ChangeEquipmentManager')
}

/*23.   20180630
POST api/VoiceAnalysis/UpdateWaveTitle
重命名音频副标题
*/
export function Vo_UpdateWaveTitle(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/UpdateWaveTitle')
}

/*24.   20180630
POST api/VoiceAnalysis/DeleteEquipmentWave
重命名音频副标题
*/
export function Vo_DeleteEquipmentWave(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/DeleteEquipmentWave')
}

/*25.   20180703
POST api/VoiceAnalysis/SetCryAnalysisTurnOn
设置开启哭声语义分析
*/
export function Vo_SetCryAnalysisTurnOn(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/SetCryAnalysisTurnOn')
}

/*26.   20180703
GET api/VoiceAnalysis/IsTurnOnCryAnalysis
设置开启哭声语义分析
*/
export function Vo_IsTurnOnCryAnalysis(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/IsTurnOnCryAnalysis')
}

/*27.   20180705
GET api/Equipment/GetCryNotifyInfo？custID = {custID}＆eqpID = {eqpID}
获取哭声事件推送频率设置信息
*/
export function Eq_GetCryNotifyInfo(param) {
  return getheader(param, serverUrl + '/Equipment/GetCryNotifyInfo')
}
/*28.   20180705
GET api/Equipment/GetCryNotifySettingList
获取哭声事件设置列表
*/
export function Eq_GetCryNotifySettingList(param) {
  return getheader(param, serverUrl + '/Equipment/GetCryNotifySettingList')
}
/*29.   20180705
POST api/Equipment/SetCustomerCryNotifyInfo
设置客户哭声提醒信息
*/
export function Eq_SetCustomerCryNotifyInfo(param) {
  return getpostheader(param, serverUrl + '/Equipment/SetCustomerCryNotifyInfo')
}

/*30.   20180710
GET api/VoiceAnalysis/GetCryNotifyAllInfo
获取哭声完整信息
*/
export function Vo_GetCryNotifyAllInfo(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetCryNotifyAllInfo')
}

/*31.   20180716
POST api/VoiceAnalysis/CorrectCryFactorItem
哭声语义分析纠错
*/
export function Vo_CorrectCryFactorItem(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/CorrectCryFactorItem')
}

/*32.   20180717
GET api/VoiceAnalysis/GetCryFactorItems
获取哭声原因列表
*/
export function Vo_GetCryFactorItems(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/getCryFactorItems')
}

/*33.   20180716
POST api/VoiceAnalysis/CorrectTheLastCryFactorItem
最后一次哭声语义分析纠错
*/
export function Vo_CorrectTheLastCryFactorItem(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/CorrectTheLastCryFactorItem')
}

/*34.   20180801
POST api/VoiceAnalysis/ConfirmReasonForTheLastCry
最后一次哭声语义分析纠错
*/
export function Vo_ConfirmReasonForTheLastCry(param) {
  return getpostheader(param, serverUrl + '/VoiceAnalysis/ConfirmReasonForTheLastCry')
}



export function deviceInit() {

  if (window.plus == undefined) return false;

  var _BARCODE = 'HGDQPlugin',
    B = window.plus.bridge;
  var HGDQPlugin = {
    hgdqGotoNative: function (params, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
          successCallback(args);
        },
        fail = typeof errorCallback !== 'function' ? null : function (code) {
          errorCallback(code);
        };
      consolelog("callbackID0")
      var callbackID = B.callbackId(success, fail);
      consolelog("callbackID1" + callbackID)
      //通知执行异步方法
      return B.exec(_BARCODE, "hgdqGotoNative", [callbackID, params]);
    }
  };
  window.plus.HGDQPlugin = HGDQPlugin;
  return true;
}

export function getssid(self) {

  //alert("getssid H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"0"}';
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    //alert("成功 status = " + data.status + " ,cmd = " + data.cmd + " ,ssid = " + data.data.ssid);
    if (self.getssid_success) self.getssid_success(data.data.ssid);
  }, function (data) {

    //alert("失败 status = " + data.status + " ,cmd = " + data.cmd);
    if (self.getssid_failed) self.getssid_failed("");
  });
  return 'loading getssid'
}

export function airkiss(ssid, pass, self, action) {

  //action 0.配网 1.关闭  2.状态

  // alert("airkiss H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"1","ssid":"' + ssid + '","pass":"' + pass + '","action":"' + action + '"}';
  consolelog(params);
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    //alert("成功 status = " + data.status + " ,cmd = " + data.cmd);
    if (self.airkiss_success) self.airkiss_success(data);
  }, function (data) {

    //alert("失败 status = " + data.status + " ,cmd = " + data.cmd);
    if (self.airkiss_failed) self.airkiss_failed(data);
  });
  return 'loading airkiss'
}

export function playwav(url, action, self, time = 0) {

  //action 0.停止 1.加载  2.暂停  3.播放  4.拖动  5.进度 6.音量(0-1.0)

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"2","url":"' + url + '","action":"' + action + '","time":"' + time + '"}';
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    // consolelog("成功 status = " + data.status + " ,cmd = " + data.cmd+ " ,duration = " + data.data.duration+ " ,playing = " + data.data.playing+  " ,currentTime = " + data.data.curtime+  " ,volume = " + data.data.volume);
    if (self.playwav_success) self.playwav_success(data);
  }, function (data) {

    alert("失败 status = " + data.status + " ,cmd = " + data.cmd);
    if (self.playwav_failed) self.playwav_failed(data);
  });
  return 'loading playwav'
}

export function setstatusbar(action, self) {

  //action 0.隐藏  1.黑色  2.白色

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"3","action":"' + action + '"}';
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    if (self.statusbar_success) {
      self.statusbar_success(data);
    }
  }, function (data) {

    alert("失败 status = " + data.status + " ,cmd = " + data.cmd);
    if (self.statusbar_failed) self.statusbar_failed(data);
  });
  return 'loading playwav'
}

export function shotscreen(self, action = 0, url = "", ...arg) {

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"4","action":"' + action + '","url":"' + url + '"}';
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    if (self.shotscreen_success) {
      self.shotscreen_success(data, ...arg);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.shotscreen_failed) self.shotscreen_failed(data, ...arg);
  });
  return 'loading playwav'
}

export function getshotscreenurl(self, ...arg) {

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"5"}';
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    // console.log('getshotscreenurl data : '+JSON.stringify(data))
    if (self.shotscreenurl_success) {
      self.shotscreenurl_success(data, ...arg);
    }
  }, function (data) {

    alert("失败 status = " + data.status + " ,cmd = " + data.cmd);
    if (self.shotscreenurl_failed) self.shotscreenurl_failed(data, ...arg);
  });
  return 'loading playwav'
}

export function uploadfile(self, token, url, path, param) {

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"6","token":"' + token + '","url":"' + url + '","path":"' + path + '","param":' + JSON.stringify(param) + '}';
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('uploadfile data : ' + JSON.stringify(data))
    if (self.uploadfile_success) {
      self.uploadfile_success(data);
    }
  }, function (data) {

    alert("失败 status = " + data.status + " ,cmd = " + data.cmd);
    if (self.uploadfile_failed) self.uploadfile_failed(data);
  });
  return 'loading playwav'
}

export function getuploadfileurl(self) {

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"7"}';
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('getuploadfileurl data : ' + JSON.stringify(data))
    if (self.getuploadfileurl_success) {
      self.getuploadfileurl_success(data);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.getuploadfileurl_failed) self.getuploadfileurl_failed(data);
  });
  return 'loading playwav'
}

export function getauthorize(self, action) {

  //action   case 0://麦克风权限 1://相机权限 2://相册权限 3://定位权限

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"8","action":' + action + '}';
  consolelog(params);
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('getauthorize data : ' + JSON.stringify(data))
    if (self.getauthorize_success) {
      self.getauthorize_success(data);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.getauthorize_failed) self.getauthorize_failed(data);
  });
  return 'loading playwav'
}

export function setauthorize(self, action) {

  //action   case 0://麦克风权限 1://相机权限 2://相册权限 3://定位权限

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"9","action":' + action + '}';
  consolelog(params);
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('getauthorize data : ' + JSON.stringify(data))
    if (self.setauthorize_success) {
      self.setauthorize_success(data);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.setauthorize_failed) self.setauthorize_failed(data);
  });
  return 'loading playwav'
}

export function wxshare(self, action, file="") {

  //action   case 0://麦克风权限 1://相机权限 2://相册权限 3://定位权限

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"10","action":' + action + ',"file":"' + file + '"}';
  consolelog(params);
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('wxshare data : ' + JSON.stringify(data))
    if (self.wxshare_success) {
      self.wxshare_success(data);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.wxshare_failed) self.wxshare_failed(data);
  });
  return 'loading playwav'
}

export function getwxshare(self) {

  //backcall_data
  // wxshare  1://正在分享中 0://分享成功 -1://普通错误类型 -2://用户点击取消 -3://发送失败  -4://授权失败  -5://微信不支持
  // application 1://前台 2://准备进度后台  3://后台  4://后台准备进入前台  5://退出APP

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"11"}';
  consolelog(params);
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('getwxshare data : ' + JSON.stringify(data))
    if (self.getwxshare_success) {
      self.getwxshare_success(data);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.getwxshare_failed) self.getwxshare_failed(data);
  });
  return 'loading playwav'
}
export function setWebView(self,action,url="") {

  //backcall_data
  // wxshare  1://正在分享中 0://分享成功 -1://普通错误类型 -2://用户点击取消 -3://发送失败  -4://授权失败  -5://微信不支持
  // application 1://前台 2://准备进度后台  3://后台  4://后台准备进入前台  5://退出APP

  // alert("playwav H5界面向原生界面传值");
  // H5界面向原生界面传值
  var params = '{"cmd":"12","action":'+action+',"url":"'+url+'"}';
  consolelog(params);
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('setWebView data : ' + JSON.stringify(data))
    if (self.setWebView_success) {
      self.setWebView_success(data);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.setWebView_failed) self.setWebView_failed(data);
  });
  return 'loading playwav'
}

export function setNotice(self,title,info) {

  // H5界面向原生界面传值
  var params = '{"cmd":"13","title":"'+title+'","info":"'+info+'"}';
  consolelog(params);
  plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

    console.log('setWebView data : ' + JSON.stringify(data))
    if (self.setNotice_success) {
      self.setNotice_success(data);
    }
  }, function (data) {

    alert("失败 cmd = " + data.cmd);
    if (self.setNotice_failed) self.setNotice_failed(data);
  });
  return 'loading playwav'
}

export function sendMqttSubTest(mqtt) {

  // mqtt_send(mqtt, "30140786aea461a3fe8af8");
  // mqtt_send(mqtt, "B_30140786aea461a3fe8af8");


  // mqtt_send(mqtt, "18038138924");
  // mqtt_send(mqtt, "B_18038138924");

  // mqtt_send(mqtt, "3094f664aea468268e8cd8");
  // mqtt_send(mqtt, "B_3094f664aea468268e8cd8");
  // mqtt_send(mqtt, "18565004448");
  // mqtt_send(mqtt, "B_18565004448");
  // mqtt_send(mqtt, "13510499050");
  // mqtt_send(mqtt, "B_13510499050");
}

export function sendMqttSub(mqtt, mac = "", phone = "") {

  // mqtt_sub('B_'+mac);
  // mqtt_sub(phone);

  // consolelog('订阅self OK！')
  if (mac == "") {
    if (localStorage.getItem("userdata") != null) {
      var phone = JSON.parse(localStorage.getItem("userdata")).PhoneNum;
      consolelog('订阅self OK0！' + phone)
      mqtt_send(mqtt, phone);
    }
  } else if (mac != "" && phone == "") {
    consolelog('订阅self OK1！B_' + mac)
    mqtt_send(mqtt, 'B_' + mac);
  } else {

    consolelog('订阅self OK2！B_' + mac)
    mqtt_send(mqtt);
    mqtt_send(mqtt, 'B_' + mac);
  }
}


export function sendMqttPubMac(self, cmd, mac = '', data = {}) {
  consolelog('发布self OK！cmd1 = ' + cmd + ' mac = ' + mac)

  // var phone = localStorage.getItem("curScanPhone")

  var phone = "";
  if (localStorage.getItem("userdata") != null)
    phone = JSON.parse(localStorage.getItem("userdata")).PhoneNum;
  sendData(self, cmd, mac, phone, data)
}

export function sendMqttPub(self, cmd, data = {}) {

  consolelog('发布self OK！cmd2 = ' + cmd)
  consolelog('发布self OK！data = ' + data)
  //self.$mqtt.publish(topic, data)

  var mac = localStorage.getItem("curScanCode")
  // var phone = localStorage.getItem("curScanPhone")
  var phone = "";
  if (localStorage.getItem("userdata") != null)
    phone = JSON.parse(localStorage.getItem("userdata")).PhoneNum;
  sendData(self, cmd, mac, phone, data)
}

export function sendData(self, cmd, mac, phone, data) {
  consolelog("sendData");
  consolelog(mac);
  //B_phone mac B_mac
  var _cmd = cmd;
  var _topic = mac;
  var _data = data;
  var _phone = phone;

  switch (_cmd) {
    case 'binding_req': //绑定
      {

      }
      break;
    case 'unbinding_req': //解除绑定
      {

      }
      break;
    case 'online': //APP上线
      {
        _topic = "B_" + _phone;
      }
      break;
    case 'control': //控制命令
      {

      }
      break;
    case 'query': //查询命令
      {

      }
      break;
    case 'setparam': //设置参数
      {

      }
      break;
    case 'getparam': //参数获取
      {

      }
      break;
    case 'upgrade_req': //升级请求
      {

      }
      break;
    case 'binding_share': //绑定分享
      {
        _phone = "resource.babygarden.org.cn";
      }
      break;
    default: //默认
      {

      }
      break;
  }

  var obj = {
    "header": {
      "sender": _phone,
      "cmd": _cmd
    },
    "data": data
  };
  _data = JSON.stringify(obj);

  consolelog("SendData Start : _topic = " + _topic + "  _data = " + _data);
  // self.$mqtt.publish(_topic, _data);

  // mqtt_self(self);
  // mqtt_pub(_topic, _data);
  mqtt_send(self, _topic, _data);
}

export function receiveMqttData(self, data) {

  var mac = localStorage.getItem("curScanCode");
  var B_mac = 'B_' + mac;
  var phone = "";
  if (localStorage.getItem("userdata") != null)
    phone = JSON.parse(localStorage.getItem("userdata")).PhoneNum;

  var obj = data; //返回一个新对象

  var _header = obj.header;
  var _data = obj.data;
  var _sender = _header.sender;
  var _cmd = _header.cmd;

  if (localStorage.getItem("curScanCode") == _sender || global.DEV_ListDeviceMac.indexOf(_sender) > -1 || _sender == phone || "api.babygarden.org.cn" == _sender || "resource.babygarden.org.cn" == _sender) {
  //  console.log('_sender2 : ' + _sender + '  cmd : ' + _cmd);
    // consolelog("ReceiveData : topic = " + _sender + " _data1 = " + JSON.stringify(_data));
  } else {
    //console.log("error receiveMqttData: " + JSON.stringify(data) + " global.DEV_ListDeviceMac = " + JSON.stringify(global.DEV_ListDeviceMac));
    return;
  }

  _data.sender = _sender;

  switch (_cmd) {
    case 'babycrynotify':
      {
        /*
        '{
          "header":{"sender":"api.babygarden.org.cn",
                    "cmd":"babycrynotify"},
          "data":{"cryCycleID":"bfee12a8e87345abb3a40492ead3dcf3",
                  "cryNotifyID":"cc3a4af7ea5d4588a7979b637a131b3e",
                  "eqpMacStr":"30140786aea461a3fe8af8",
                  "eqpID":"195",
                  "voiceTime":"2018-06-19 14:05:29"}}'
        */

        global.SHOW_Cry = true;
        var time = _data.voiceTime.split(' ')[1];
        var times = time.split(":")[0] + ":" + time.split(":")[1]
        if (localStorage.getItem("userdata") != null) {

          setNotice("",times+"分 宝宝哭了","快去看一下吧!");

          var params = '{"cmd":"14"}';
          plus.HGDQPlugin.hgdqGotoNative(params, function (data) {

            if(data.application_status >1)
            {
              if (global.SHOW_Cry) {
                self.$router.push({
                  name: "index7DataAnalysis"
                });
              } else {
                self.$router.push({
                  name: "index7DataAnalysis_cryanalyze"
                });
              }
            }
            else
            {

              if ((self.$route.name != "index7DataAnalysis" && self.$route.name != "index7DataAnalysis_cryanalyze") || (global.DEV_CurDeviceMac && _data.eqpMacStr != global.DEV_CurDeviceMac)) {
                document.querySelector(".remind").innerHTML = times + "分 宝宝哭了 快去看一下吧"; //消息提示内容修改
                document.querySelector("#messShareBox").style.display = "block"; //消息提示显示
              } else { //推送

              }
            }

          }, function (data) {
            alert("失败 cmd = " + data.cmd);
          });



        }

      }
      break;
    case 'babyfirstcry': //检测哭声
      {
        var eqpWaveID = _data.eqpWaveID;
        var eqpMacStr = _data.eqpMacStr;
        var voiceTime = _data.voiceTime;
        var data1 =
          "?eqpWaveID=" + eqpWaveID + "&eqpMacStr=" + eqpMacStr + "&voiceTime=" + voiceTime + "&custID=" +
          JSON.parse(localStorage.getItem("userdata")).CustID;

        var eqpID = "";
        if (global.DEV_ListDeviceMac.indexOf(eqpMacStr) != -1) {
          eqpID = global.NET_ListDeviceData[global.DEV_ListDeviceMac.indexOf(eqpMacStr)].EqpID;
        } else {
          break;
        }

        Vo_IsShowCryReasonWin(data1).then(
          res => {

            consolelog('Vo_IsShowCryReasonWin : ' + JSON.stringify(res));
            if (res.Code === 1) {

              if (res.Data) {

                var data2 =
                  "?eqpWaveID=" +
                  eqpWaveID +
                  "&custID=" +
                  JSON.parse(localStorage.getItem("userdata")).CustID +
                  "&voiceTime=" +
                  voiceTime +
                  "&eqpID=" + eqpID;
                Vo_GetBabyCryReasonList(data2).then(
                  res => {

                    consolelog(JSON.stringify(res));
                    if (res.Code === 1) {
                      global.NET_LexemeAnalysis = res.Data;
                      console.log(res.Data);
                      global.SHOW_Cry = false;
                      var time = _data.voiceTime.split(' ')[1]; //20:02:11
                      var times = time.split(":")[0] + ":" + time.split(":")[1]
                      if (localStorage.getItem("userdata") != null) {

                        setNotice("",times + "分 宝宝哭了","快去看一下原因!");

                        if(data.application_status >1)
                        {
                          if (global.SHOW_Cry) {
                            self.$router.push({
                              name: "index7DataAnalysis"
                            });
                          } else {
                            self.$router.push({
                              name: "index7DataAnalysis_cryanalyze"
                            });
                          }
                        }
                        else
                        {
                          if ((self.$route.name != "index7DataAnalysis" && self.$route.name != "index7DataAnalysis_cryanalyze") || (global.DEV_CurDeviceMac && _data.eqpMacStr != global.DEV_CurDeviceMac)) {
                            document.querySelector(".remind").innerHTML = times + " 宝宝哭了 快去看一下原因"; //消息提示内容修改
                            document.querySelector(".messShareBox").style.display = "block"; //消息提示显示
                          } else { //推送

                          }
                        }

                      }
                    }
                  }
                );
              }
            }
            /*end if*/
          }
        );
      }
      break;
    case 'binding_ack': //绑定 return
      {
        //alert('binding_ack')
        var status = _data.status; //binding_ok
        var binders = _data.binders;
        consolelog('status : ' + status + '  binders : ' + binders);
        if (status == "error_exceed_max_binders") {
          alert("超出设备绑定数量");
        } else if (status == "binding_ok" && binders == phone) {
          if (self.binding_success) self.binding_success(_data);
        } else {
          if (self.binding_failed) self.binding_failed(_data);
        }
      }
      break;
    case 'unbinding_ack': //解除绑定 return
      {
        var status = _data.status; //unbinding_ok
        var binders = _data.binders;
        consolelog('解除绑定 status : ' + status + '  binders : ' + binders + ' phone : ' + phone);

        if (status == "unbinding_ok" && binders == phone) {

          if (self.unbinding_success) self.unbinding_success(_data);
          else consolelog("self : " + self.$route.path + " 没有定义 unbinding_success ")
        } else {
          if (self.unbinding_failed) self.unbinding_failed(_data);
          else consolelog("self : " + self.$route.path + " 没有定义 unbinding_failed ")
        }
      }
      break;
    case 'offline': //设备下线 notice
      {
        consolelog('设备下线 notice');
        if (self.mqtt_offline) self.mqtt_offline(_data);
        else consolelog("self : " + self.$route.path + " 没有定义 mqtt_offline ")
      }
      break;
    case 'online': //设备上线 notice
      {
        consolelog('设备上线 notice : ' + JSON.stringify(_data));
        if (self.mqtt_online) self.mqtt_online(_data);
        else consolelog("self : " + self.$route.path + " 没有定义 mqtt_online ")
      }
      break;
    case 'status': //APP上线/状态 return ／ APP下线/状态 notice
      {
        if (_sender == phone) {
          consolelog('APP上线/状态 return');
          var onoff = _data.onoff;
          var color = _data.color;
          var cry = _data.cry;
          var lightness = _data.lightness;

          if (self.mqtt_status_phone) self.mqtt_status_phone(_data);
          else consolelog("self : " + self.$route.path + " 没有定义 mqtt_status_phone ")
        } else if (global.DEV_ListDeviceMac.indexOf(_sender) > -1) {
          consolelog('APP下线/状态 notice');
          var onoff = _data.onoff;
          var color = _data.color;
          var cry = _data.cry;
          var lightness = _data.lightness;
          var lightness_min = _data.lightness_min;
          var lightness_max = _data.lightness_max;
          var nightlight_enable = _data.nightlight_enable;
          var dlytime = _data.dlytime;
          var firmwareversion = _data.firmwareversion;
          var firmware_indx = _data.firmware_indx;
          if (self.mqtt_status_mac) self.mqtt_status_mac(_data);
          else consolelog("self : " + self.$route.path + " 没有定义 mqtt_status_mac ")
        } else {
          console.log("error topic: " + _sender + " phone : " + phone + " global.DEV_ListDeviceMac = " + global.DEV_ListDeviceMac);
        }
      }
      break;
    case 'query_ack': //查询命令 return
      {
        consolelog('查询命令 return');
        var status = _data.status; //query_ok
        var onoff = _data.onoff;
        var color = _data.color;
        var cry = _data.cry;
        var lightness = _data.lightness;
        var gender = _data.gender;
        var birthday = _data.birthday;
        var register = _data.register;
        var firmwareversion = _data.firmwareversion;
        var firmware_indx = _data.firmware_indx;
        var device_type = _data.device_type;
        var lightness_min = _data.lightness_min;
        var lightness_max = _data.lightness_max;
        var gradient_enable = _data.gradient_enable;
        var nightlight_enable = _data.nightlight_enable;
        var dlytime = _data.dlytime;
        if (self.mqtt_query_ack) self.mqtt_query_ack(_data);
        else consolelog("self : " + self.$route.path + " 没有定义 mqtt_query_ack ")
      }
      break;
    case 'setparam_ack': //设置参数 return
      {
        consolelog('设置参数 return');
        var gender = _data.gender;
        var birthday = _data.birthday;
        var register = _data.register;
        var lightness_min = _data.lightness_min;
        var lightness_max = _data.lightness_max;
        var nightlight_enable = _data.nightlight_enable;
        var dlytime = _data.dlytime;
        var firmwareversion = _data.firmwareversion;
        var firmware_indx = _data.firmware_indx;
        var status = _data.status; //setparam_ok
        if (_data.status == 'setparam_ok') {
          global.DEV_CurDeviceData.lightness_min = _data.lightness_min
          global.DEV_CurDeviceData.lightness_max = _data.lightness_max
          global.DEV_CurDeviceData.nightlight_enable = _data.nightlight_enable
          global.DEV_CurDeviceData.dlytime = _data.dlytime
          global.DEV_CurDeviceData.firmwareversion = _data.firmwareversion
          global.DEV_CurDeviceData.firmware_indx = _data.firmware_indx
        }

      }
      break;
    case 'getparam_ack': //参数获取 return
      {
        consolelog('参数获取 return');
        var gender = _data.gender;
        var birthday = _data.birthday;
        var register = _data.register;
        var lightness_min = _data.lightness_min;
        var lightness_max = _data.lightness_max;
        var nightlight_enable = _data.nightlight_enable;
        var dlytime = _data.dlytime;
        var firmwareversion = _data.firmwareversion;
        var firmware_indx = _data.firmware_indx;
      }
      break;
    case 'upgrade_ack': //升级请求 return
      {
        consolelog('升级请求 returne');
        var status = _data.status; //upgrade_ok
        if (status == "upgrade_ok")
          if (self.upgrade_req_success) self.upgrade_req_success()
        else if (status == "upgrade_fail")
          if (self.upgrade_req_failed) self.upgrade_req_failed()
      }
      break;

    case 'binding_share': //绑定分享
      {

        consolelog('binding_share 绑定分享');
        if (self.binding_share_notice)
          self.binding_share_notice(_data);
        else
          consolelog('binding_share no 绑定分享' + self);

      }
      break;
    default: //默认
      {

        consolelog('默认');
      }
      break;
  }

}


export function mqtt_sub(subname) {
  // console.log('mqtt_sub : ' + subname);
  if (global.MQTT_Client != "") {
    console.log('mqtt_sub ok: ' + subname);
    global.MQTT_Client.subscribe(subname); //订阅主题
    return true;
  } else
    console.log('mqtt_sub error: ' + subname);

  return false;
}

export function mqtt_pub(pic, pubjson) {
  consolelog('mqtt_pub : ' + pic);
  if (global.MQTT_Client != "") {

    pubjson = mqtt_enc(pubjson); //加密
    //consolelog(pubjson)
    //发送消息
    var message = new Paho.MQTT.Message(pubjson);
    message.destinationName = pic;
    global.MQTT_Client.send(message);
    return true;
  }

  return false;
}

export function mqtt_self(self) {
  global.MQTT_Receive = self;
}

export function mqtt_sub_init(self) {
  if (localStorage.getItem("userdata") != null) {

    mqtt_send(self, JSON.parse(localStorage.getItem("userdata")).PhoneNum);
    var ss = self;
    let data =
      "?CustID=" + JSON.parse(localStorage.getItem("userdata")).CustID;
    Eq_MyEquipments(data).then(res => {
      // alert('Eq_MyEquipments');

      if (res.Code === 1) {

        for (let key in res.Data) {

          mqtt_send(ss, res.Data[key].EqpMacStr);
        }

      } else {} /*end if*/
    });
  }
}

// export function mqtt_send(self, topic = null, data = null) {
//
//   global.MQTT_Receive = self;
//   if (global.MQTT_Client == "") {
//     // console.log('mqtt_send 1 : ' + topic + "  data : " + data);112.95.161.10 39.108.160.202
//     // var client = new Paho.MQTT.Client("112.95.161.10", Number(9001), 'WebClient-' + parseInt(Math.random() * 100000)); //建立客户端实例
//     var client = new Paho.MQTT.Client("39.108.160.202", Number(9001), 'WebClient-' + parseInt(Math.random() * 100000)); //建立客户端实例
//     // client.userName = "avsnest";
//     // client.password = "avs12345";
//     let options = {timeout : 3,useSSL:false,cleanSession:true,onSuccess: onConnect,onFailure: onFailure,userName:"avsnest",password:"avs12345"}
//
//     client.connect(options);
//     function onFailure() {
//
//       console.log("MQTT连接失败");
//       global.MQTTWORK = false;
//       // mqtt_send(global.MQTT_Receive);
//     }
//     //连alert('发送 : '+接服务器并注册连接成功处理事件
//     function onConnect() {
//       //consolelog("onConnected");
//       console.log("MQTT连接成功");
//
//       global.MQTTWORK = true;
//       global.MQTT_Client = client;
//       alert(client.isConnected());
//       // console.log('mqtt_send 2 : ' + topic + "  data : " + data);
//       if (topic != null && data != null)
//         mqtt_pub(topic, data);
//       else if (topic != null && data == null)
//         mqtt_sub(topic);
//       else {
//         if (localStorage.getItem("userdata") != null)
//           mqtt_sub(JSON.parse(localStorage.getItem("userdata")).PhoneNum);
//       }
//
//       if (global.MQTT_Receive.MqttReceiveData)
//         global.MQTT_Receive.MqttReceiveData(1, '');
//     }
//     client.onConnectionLost = onConnectionLost; //注册连接断开处理事件
//     client.onMessageArrived = onMessageArrived; //注册消息接收处理事件
//     function onConnectionLost(responseObject) {
//       if (responseObject.errorCode !== 0) {
//         //consolelog("onConnectionLost:"+responseObject.errorMessage);
//         console.log("MQTT连接断开");
//         global.MQTTWORK = false;
//         mqtt_send(global.MQTT_Receive);
//         global.MQTT_Client = "";
//         if (global.MQTT_Receive.MqttReceiveData)
//           global.MQTT_Receive.MqttReceiveData(2, responseObject.errorMessage);
//       }
//     }
//
//     function onMessageArrived(message) {
//       //consolelog("onMessageArrived:"+message.payloadString);
//       // console.log("MQTT收到消息 字符串:" + message.payloadString);
//       // message = JSON.parse(message.payloadString);
//
//       consolelog("MQTT收到消息");
//       // console.log(message.payloadBytes);
//       // console.log(message.payloadString);
//
//
//       var array = message.payloadBytes;
//       var json = "";
//       if (array[0] == 123) {
//         consolelog('MQTT收到消息 是明文 : ' + message.payloadString);
//         json = JSON.parse(message.payloadString);
//       } else {
//         consolelog("MQTT收到消息 是十进制数据流 : " + mqtt_dec(message.payloadBytes));
//         // console.log('解密 : start');
//         var datastr = mqtt_dec(array);
//         // console.log('解密 : end');
//         json = JSON.parse(datastr); //十进制数据流解密
//       }
//
//       // console.log("MQTT收到消息开始处理");
//       // console.log("MQTT收到消息处理完成 : ",JSON.stringify(json));
//       // console.log("MQTT收到消息处理完成");
//
//       receiveMqttData(global.MQTT_Receive, json);
//       // if (global.MQTT_Receive.MqttReceiveData)
//       //   global.MQTT_Receive.MqttReceiveData(3, json);
//     }
//   }
//   else if(global.MQTT_Client.isConnected() == false)
//   {
//     consolelog("重新链接");
//   }
//   else if (topic != null && data != null) {
//     console.log('mqtt_send 3 : ' + topic + "  data : " + data+" is："+global.MQTT_Client.isConnected());
//     mqtt_pub(topic, data);
//   } else if (topic != null && data == null) {
//     console.log('mqtt_send 4 : ' + topic + "  data : " + data+" is："+global.MQTT_Client.isConnected());
//     mqtt_sub(topic);
//   }
//   // else
//   //   console.log('mqtt_send 5 : ' + topic + "  data : " + data);
// }


export function mqtt_send(self, topic = null, data = null) {


  global.MQTT_Receive = self;

  var time = new Date();
  var sec = parseInt(time-global.MQTTWORKTime) / 1000
  consolelog(sec);
  if(global.MQTTSTATUS!=2 && sec<3)
  {
    console.log("global.MQTTSTATUS :",global.MQTTSTATUS, topic , data);

    global.MQTTDATA[topic] = data;
    return ;
  }

  if (global.MQTT_Client == "") {

    clearInterval(mqtttimer);
    global.MQTTWORKTime = new Date();
    global.MQTTSTATUS = 1;
    // console.log('mqtt_send 1 : ' + topic + "  data : " + data);112.95.161.10 39.108.160.202
    // var client = new Paho.MQTT.Client("112.95.161.10", Number(9001), 'WebClient-' + parseInt(Math.random() * 100000)); //建立客户端实例
    var client = new Paho.MQTT.Client("39.108.160.202", Number(9001), 'WebClient-' + parseInt(Math.random() * 100000)); //建立客户端实例

    let options = {timeout : 3,useSSL:false,cleanSession:true,onSuccess: onConnect,onFailure: onFailure,userName:"avsnest",password:"avs12345"}
    client.connect(options);
    function onFailure() {

      console.log("MQTT连接失败");
      global.MQTTWORKTime = new Date();
      global.MQTTWORK = false;
      global.MQTTSTATUS = -1;
      if (global.MQTT_Receive.MqttLinkStatus)
        global.MQTT_Receive.MqttLinkStatus(-1);

      // mqtt_send(global.MQTT_Receive);

      clearInterval(mqtttimer);
      mqtttimer = setInterval(() => {

        var time = new Date();
        var sec = parseInt(time-global.MQTTWORKTime) / 1000
        consolelog(sec);
        if(global.MQTTSTATUS!=2 && sec>3)
        {
          mqtt_send(global.MQTT_Receive);
        }
      }, 3000);
    }
    //连alert('发送 : '+接服务器并注册连接成功处理事件
    function onConnect() {
      //consolelog("onConnected");
      console.log("MQTT连接成功");
      global.MQTTWORKTime = new Date();

      global.MQTTSTATUS = 2;
      if (global.MQTT_Receive.MqttLinkStatus)
        global.MQTT_Receive.MqttLinkStatus(2);
      global.MQTTWORK = true;
      global.MQTT_Client = client;
      // console.log('mqtt_send 2 : ' + topic + "  data : " + data);
      if (topic != null && data != null)
        mqtt_pub(topic, data);
      else if (topic != null && data == null)
        mqtt_sub(topic);
      else {
        if (localStorage.getItem("userdata") != null)
          mqtt_sub(JSON.parse(localStorage.getItem("userdata")).PhoneNum);
      }

      if (global.MQTT_Receive.MqttReceiveData)
        global.MQTT_Receive.MqttReceiveData(1, '');

      for(var key in global.MQTTDATA)
      {
        var data = global.MQTTDATA[key];
        mqtt_send(global.MQTT_Receive,key,data);
      }
      global.MQTTDATA = [];
    }
    client.onConnectionLost = onConnectionLost; //注册连接断开处理事件
    client.onMessageArrived = onMessageArrived; //注册消息接收处理事件
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        //consolelog("onConnectionLost:"+responseObject.errorMessage);
        console.log("MQTT连接断开");
        global.MQTTWORKTime = new Date();

        global.MQTTSTATUS = 0;
        if (global.MQTT_Receive.MqttLinkStatus)
          global.MQTT_Receive.MqttLinkStatus(0);
        global.MQTTWORK = false;
        global.MQTT_Client = "";
        // mqtt_send(global.MQTT_Receive);

        if (global.MQTT_Receive.MqttReceiveData)
          global.MQTT_Receive.MqttReceiveData(2, responseObject.errorMessage);

        clearInterval(mqtttimer);
        mqtttimer = setInterval(() => {

          var time = new Date();
          var sec = parseInt(time-global.MQTTWORKTime) / 1000
          consolelog(sec);
          if(global.MQTTSTATUS!=2 && sec>3)
          {
            mqtt_send(global.MQTT_Receive);
          }
        }, 3000);
      }
    }

    function onMessageArrived(message) {
      //consolelog("onMessageArrived:"+message.payloadString);
      // console.log("MQTT收到消息 字符串:" + message.payloadString);
      // message = JSON.parse(message.payloadString);

      consolelog("MQTT收到消息");
      global.MQTTWORKTime = new Date();
      // console.log(message.payloadBytes);
      // console.log(message.payloadString);


      var array = message.payloadBytes;
      var json = "";
      if (array[0] == 123) {
        consolelog('MQTT收到消息 是明文 : ' + message.payloadString);
        json = JSON.parse(message.payloadString);
      } else {
        consolelog("MQTT收到消息 是十进制数据流 : " + mqtt_dec(message.payloadBytes));
        // console.log('解密 : start');
        var datastr = mqtt_dec(array);
        // console.log('解密 : end');
        json = JSON.parse(datastr); //十进制数据流解密
      }

      // console.log("MQTT收到消息开始处理");
      // console.log("MQTT收到消息处理完成 : ",JSON.stringify(json));
      // {("MQTT收到消息处理完成");

      receiveMqttData(global.MQTT_Receive, json);
      // if (global.MQTT_Receive.MqttReceiveData)
      //   global.MQTT_Receive.MqttReceiveData(3, json);
    }
  }
  else if(global.MQTT_Client.isConnected() == false || global.MQTTWORK == false || global.NETWORK == false)
  {
    consolelog("重新链接");
    global.MQTTWORKTime = new Date();
    global.MQTT_Client.disconnect();
    global.MQTT_Client = "";

    global.MQTTSTATUS = 1;
    if (global.MQTT_Receive.MqttLinkStatus)
      global.MQTT_Receive.MqttLinkStatus(1);

    // mqtt_send(global.MQTT_Receive);
    clearInterval(mqtttimer);
    mqtttimer = setInterval(() => {

      var time = new Date();
      var sec = parseInt(time-global.MQTTWORKTime) / 1000
      consolelog(sec);
      if(global.MQTTSTATUS!=2 && sec>3)
      {
        mqtt_send(global.MQTT_Receive);
      }
    }, 3000);
  }
  else if (topic != "null" && topic != null && data != null && global.MQTTWORK == true) {

    global.MQTTWORKTime = new Date();
    console.log('mqtt_send 3 : ' + topic + "  data : " + data+" is："+global.MQTT_Client.isConnected());
    mqtt_pub(topic, data);
  } else if (topic != "null" && topic != null && data == null && global.MQTTWORK == true) {
    global.MQTTWORKTime = new Date();
    console.log('mqtt_send 4 : ' + topic + "  data : " + data+" is："+global.MQTT_Client.isConnected());
    mqtt_sub(topic);
  }
  // else
  //   console.log('mqtt_send 5 : ' + topic + "  data : " + data);
}

export function getcharcode(char) {
  var val = char.charCodeAt();
  return val;
}

export function getbinarytochar(char) {
  return parseInt(getcharcode(char)).toString(2);
}

export function getdectobinary(num) {
  var val = num.toString(2)
  var len = 8 - val.length;
  for (var i = 0; i < len; i++) {
    val = '0' + val;
  }
  return val;
}

export function getchartodec(code) {
  return String.fromCharCode(parseInt(code, 10));
}

export function getchartobinary(code) {
  return String.fromCharCode(parseInt(code, 2));
}

export function getxortobinary(val1, val2) {
  var len1 = 8 - val1.length;
  for (var i = 0; i < len1; i++) {
    val1 = '0' + val1;
  }

  var len2 = 8 - val2.length;
  for (var i = 0; len2; i++) {
    val2 = '0' + val2;
  }

  var value = '';
  for (var i = 0; i < val1.length; i++) {
    if (val1[i] == val2[i])
      value += '0';
    else
      value += '1';
  }
  return value;
}

export function mqtt_dec(ciphetext) { //解密

  var plaintext = ''; //明文
  // var ciphetext = [];//密文10进制
  var cipher = '1ddce2d43d5fe7b9e8629989cd3279b7'; //钥匙

  for (var i = 0; i < ciphetext.length; i++) {
    var t1 = getcharcode(cipher[i % 32]);
    var t2 = getdectobinary(parseInt(getcharcode(cipher[i % 32])));
    var t3 = ciphetext[i];
    var t4 = getdectobinary(t3);
    var t5 = getxortobinary(t2, t4);
    var t6 = parseInt(t5, 2);
    var t7 = getchartobinary(t5);
    // console.log(cipher[i%32],'^',getchartobinary(t4),' -> ',t1,'^',t3,' -> ',t2,'^',t4,' = ',t6,t5,'异或结果 : ',t7);
    plaintext += t7;
  }
  return plaintext;
}

export function mqtt_enc(plaintext) { //加密

  // var plaintext = '';//明文
  var ciphetext = []; //密文10进制
  var ciphetexthex = []; //密文16进制
  var ciphetexthexstr = ""; //密文16进制字符串
  var cipher = '1ddce2d43d5fe7b9e8629989cd3279b7'; //钥匙
  var uint8Array = new Uint8Array(plaintext.length);
  for (var i = 0; i < plaintext.length; i++) {
    var t1 = getcharcode(cipher[i % 32]);
    var t2 = getdectobinary(parseInt(getcharcode(cipher[i % 32])));
    var t3 = getcharcode(plaintext[i]);
    var t4 = getdectobinary(t3);
    var t5 = getxortobinary(t2, t4);
    var t6 = parseInt(t5, 2);
    var t7 = parseInt(t6).toString(16);
    // ciphetext[i] = t6;
    // ciphetexthex[i] = t7;
    // ciphetexthexstr += t7;
    uint8Array[i] = t6;
  }
  // console.log('ciphetext : '+ciphetext);
  // console.log(ciphetext);
  // console.log('ciphetexthex : '+ciphetexthex);
  // console.log(ciphetexthex);
  // console.log('ciphetexthexstr : '+ciphetexthexstr);
  // console.log(ciphetexthexstr);
  // console.log('uint8Array : '+uint8Array);
  // console.log(uint8Array);
  return uint8Array;
}

export function consolelog(msg) {
  if(global.VERSION!="")
    console.log(msg);
}

export function encryptionPwd(apPwd) {

  var newPwd = "";
  var tempChars = apPwd;
  var num1 = getcharcode('!');
  var num2 = getcharcode('~');
  var num3 = getcharcode('t');
  var num4 = getcharcode('+');
  for (var i = 0; i < tempChars.length; i++) {

    if (getcharcode(tempChars[i]) >= num1 && getcharcode(tempChars[i]) <= num3) {
      //'!'<=x<='t' 是处理方式
      newPwd += getchartodec(getcharcode(tempChars[i]) + 10);
    } else if (getcharcode(tempChars[i]) > num3 && getcharcode(tempChars[i]) <= num2) {
      //'t'<=x<='~' 是处理方式
      newPwd += getchartodec(getcharcode(tempChars[i]) + 10 - num2 + num1);
    }

  }
  // consolelog("新wifi 密码:"+newPwd);
  // consolelog("新wifi md5密码:"+md5(newPwd));
  // consolelog("新wifi64 密码:"+Base64.encode(newPwd));
  return Base64.encode(newPwd); //加密后以字符串方式返回
}

export function getmac(data) {

  // data = "30aea46e8cd8";
  var datamd5 = md5(data);
  var data1md5 = datamd5.substring(0, 6);
  var data2md5 = datamd5.substring(6, 10);

  var data1 = data.substring(0, 2);
  var data2 = data.substring(2, 7);
  var data3 = data.substring(7, 12);

  consolelog("data:" + data);
  consolelog("data1:" + data1);
  consolelog("data2:" + data2);
  consolelog("data3:" + data3);

  consolelog("datamd5:" + datamd5);
  consolelog("data1md5:" + data1md5);
  consolelog("data2md5:" + data2md5);

  var mac = data1 + data1md5 + data2 + data2md5 + data3;
  consolelog("mac:" + mac);
  return mac;
}

export function initglobaldata() {
  global.DEV_CurDeviceData = {}
  global.DEV_CurDeviceMac = ""
  global.DEV_ListDeviceMac = []
  global.NET_ListDeviceData = {}
  global.NET_CurDeviceData = {}
  global.PAG_EditDataAnalysis = {}
  global.NET_LexemeAnalysis = []
  //global.MQTT_Client = ""
  // global.MQTT_Receive = ""
  global.NET_LexemeAnalysisWaveID = ""
}

export function getNowFormatDate() {
  var date = new Date();
  return fromDateToString(date);
}

export function fromStringToDate(datestr) {
  var fullDate = datestr.split(" ");
  var fullDate1 = fullDate[0].split("-");
  var fullDate2 = fullDate[1].split(":");
  return new Date(
    fullDate1[0],
    fullDate1[1] - 1,
    fullDate1[2],
    fullDate2[0],
    fullDate2[1],
    fullDate2[2]
  );
}

export function fromDateToString(date) {

  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHour = date.getHours();
  var strMin  = date.getMinutes();
  var strSec  = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (strHour >= 0 && strHour <= 9) {
    strHour = "0" + strHour;
  }
  if (strMin >= 0 && strMin <= 9) {
    strMin = "0" + strMin;
  }
  if (strSec >= 0 && strSec <= 9) {
    strSec = "0" + strSec;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + strHour + seperator2 + strMin
    + seperator2 + strSec;
  return currentdate;
}


export function getMonthLenToDate(date) {

  var d = date;
//d.getMonth()+1代表下个月，月份索引从0开始，即当前月为6月时，getMonth()返回值为5，创建日期时同理
//此处构造的日期为下个月的第0天，天数索引从1开始，第0天即代表上个月的最后一天
  var curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
  return curMonthDays;
  // alert("本月共有 " + curMonthDays + " 天");
}

export function getMonthLen(year,month){ //获取当月总共有多少天

  if(month >= 0 && month <= 9)
    month = "0" + month;
  var time1 = year+"-"+month+"-01 00:00:00"
  var time = fromStringToDate(time1);
  return getMonthLenToDate(time);
}
