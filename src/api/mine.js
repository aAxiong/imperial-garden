import axios from 'axios'
import {
  commonParams,
  serverUrl,
  serverApi
} from './config'
import {
  Message
} from 'element-ui'
import {
  Indicator
} from 'mint-ui';
import {
  comfunction,
  getcomfunction,
  getheader,
  getpostheader,
  get
} from './axios.js'
import router from '../router'


/*
 * 获取积分
 */
export function GetMyTotalScore(param) {
  return getheader(param, serverUrl + '/Score/GetMyTotalScore')
}

/*
 * 修改昵称
 */
export function ModifyCustomerName(param) {
  return getpostheader(param, serverUrl + '/Customer/ModifyCustomerName')
}
/*
 * 修改生日
 */
export function ModifyBabyBirth(param) {
  return getpostheader(param, serverUrl + '/Customer/ModifyBabyBirth')
}
/*
 * 修改性别
 */
export function ModifyBabySex(param) {
  return getpostheader(param, serverUrl + '/Customer/ModifyBabySex')
}

/*
 * 修改出生地
 */
export function ModifyBabyBirthPlace(param) {
  return getpostheader(param, serverUrl + '/Customer/ModifyBabyBirthPlace')
}

/*
 * 修改关系
 */
export function ModifyBabyRelation(param) {
  return getpostheader(param, serverUrl + '/Customer/ModifyBabyRelation')
}


/*
 * 获取地址
 */
export function GetMyCustomerAddr(param) {
  return getheader(param, serverUrl + '/Score/GetMyCustomerAddr')
}


/*
 * 删除地址
 */
export function DeleteCustomerAddr(param) {
  return getpostheader(param, serverUrl + '/Score/DeleteCustomerAddr')
}

/*
 * 新增地址
 */
export function AddCustomerAddr(param) {
  return getpostheader(param, serverUrl + '/Score/AddCustomerAddr')
}

/*
 * 编辑地址
 */
export function EditCustomerAddr(param) {
  return getpostheader(param, serverUrl + '/Score/EditCustomerAddr')
}

/*
 * 意见反馈
 */
export function MakeFeedBack(param) {
  return getpostheader(param, serverUrl + '/Customer/MakeFeedBack')
}

/*
 * 获取抽奖奖品列表
 */
export function GetPrizeList(param) {
  return getheader("", serverUrl + '/Score/GetPrizeList')
}

/*
 * 发起一次抽奖
 */
export function TakeLuckyDraw(param) {
  return getpostheader(param, serverUrl + '/Score/TakeLuckyDraw')
}
/*
 * 兑奖纪录
 */
export function GetMyLuckyDrawLog(param) {
  return getheader(param, serverUrl + '/Score/GetMyLuckyDrawLog')
}

/*
 * 获取获奖详情
 */
export function GetLuckyDrawLogDetail(param) {
  return getheader(param, serverUrl + '/Score/GetLuckyDrawLogDetail')
}

/*
 * 绑定实物奖品与地址
 */
export function BindPrizeLogWithAddr(param) {
  return getpostheader(param, serverUrl + '/Score/BindPrizeLogWithAddr')
}

/*
 * 绑定实物奖品与地址
 */
export function GetLastestPhoneVersion(param) {
  return getheader(param, serverUrl + '/Equipment/GetLastestPhoneVersion')
}

/*
 * 获取我的录音列表
 */
export function GetMyRecordWave(param) {
  return getheader(param, serverUrl + '/RecordWave/GetMyRecordWave')
}

/*
 * 删除录音记录
 */
export function DeleteRecordWave(param) {
  return getpostheader(param, serverUrl + '/RecordWave/DeleteRecordWave')
}

/*
 * 取出指定code的系统参数值
 * AboutCustomerScore	积分规则
 * AboutGrowTest	关于成长测评
 * AboutLuckyDraw	抽奖游戏规则
 * AboutUs	关于我们
 */
export function GetSystemContent(param) {
  return get(serverUrl + '/System/GetSystemContent' + param)
}


/* 保存头像 */
export function setupload(param) {
  Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
  });
  let data = Object.assign({}, commonParams, param);
  let formData = new FormData();
  console.log("data :",data);
  console.log("param :",param);
  formData.append('custID', data.custID)
  formData.append('headImageUrl', data.headImageUrl)
  var url = `${serverUrl}/Customer/ModifyCustomerImage`;
  if (!global.URL_Rroxy)
    url = serverApi + url;
  return axios.post(url, formData, {  //+ '/Customer/ModifyCustomerImage'
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken
    }
  }).then((res) => {
    Indicator.close();
    if (res.data.Code === -102) {
      Message.error({
        message: '异常操作请重新登录',
        center: true,
        duration: 1000
      });
      localStorage.removeItem('userdata')
      setTimeout(router.push({
        path: "/login"
      }), 1000);
    } else {
      return Promise.resolve(res.data)
    }
  })
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
export function convertBase64UrlToBlob(basestr){

  // //console.log("urlData :",urlData);
  //
  // var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
  //
  // //处理异常,将ascii码小于0的转换为大于0
  // var ab = new ArrayBuffer(bytes.length);
  // var ia = new Uint8Array(ab);
  // for (var i = 0; i < bytes.length; i++) {
  //   ia[i] = bytes.charCodeAt(i);
  // }
  //
  // return new Blob( [ab] , {type : 'image/png'});
  var text = window.atob(basestr.split(",")[1]);
  var buffer = new ArrayBuffer(text.length);
  var ubuffer = new Uint8Array(buffer);
  var pecent = 0 , loop = null;
  for (var i = 0; i < text.length; i++) {
    ubuffer[i] = text.charCodeAt(i);
  }
  var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
  var blob;
  if (Builder) {
    var builder = new Builder();
    builder.append(buffer);
    blob = builder.getBlob(type);
  } else {
    blob = new window.Blob([buffer], {type: type});
  }
  return blob;
}
