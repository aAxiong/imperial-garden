//代码拦截
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
  getpostheader,
  getheader
} from './axios.js'


// import axios from 'axios'

/**
 * 用户短信登录
 * @param {*手机号} phone
 * @param {*验证码} verify_code
 * @param {*唯一id} mac
 * @param {*appid} appid
 * @param {*密码} password
 */
// export function meslogin(phone, verify_code, mac, appid, password) {
//   const url = serverUrl + 'verify';
//   const data = Object.assign({}, commonParams, {
//     phone,
//     verify_code,
//     mac,
//     appid,
//     password
//   })

//   return axios(url, data)
// }


// export function comfunction(param, url) {
//   Indicator.open({
//     text: 'Loading...',
//     spinnerType: 'fading-circle'
//   });
//   let data = param
//   console.log(param)
//   return axios.post(url, data).then((res) => {
//     Indicator.close();
//     return Promise.resolve(res.data)
//   })
// }


/*
 * 用户注册接口
 */
export function setRegister(param) {
  return comfunction(param, serverUrl + '/Customer/Register')
}
/*
 * 短信验证
 */
export function verify_code(param) {
  return comfunction(param, serverUrl + '/Customer/GetCheckCode')
}
/*
 * 登录
 */
export function login(param) {
  // return comfunction(param, serverUrl + '/Customer/Login')
  return comfunction(param, serverUrl + '/Customer/Login')
}
/*
 * 忘记密码
 */
export function update_pwd(param) {
  return comfunction(param, serverUrl + '/Customer/ResetPassword')
}

/*
 * 保存婴儿信息及头像
 */
export function UploadBabyImageAndInfo(param) {
  return getpostheader(param, serverUrl + '/Customer/UploadBabyImageAndInfo')
}


/* 保存婴儿信息 */
export function setupload(param) {
  Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
  });
  let data = Object.assign({}, commonParams, param);
  let formData = new FormData();
  formData.append('custID', data.custID)
  formData.append('phoneNum', data.phoneNum)
  formData.append('realName', data.realName)
  formData.append('nickName', data.nickName)
  formData.append('email', data.email)
  formData.append('headImageUrl', data.headImageUrl)
  formData.append('birthPlace', data.birthPlace)
  formData.append('birthDay', data.birthDay)
  formData.append('sex', data.sex)
  formData.append('relation', data.relation)
  var url = `${serverUrl}/Customer/UploadBabyImageAndInfo`;
  if (!global.URL_Rroxy)
    url = serverApi + url;
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken
    }
  }).then((res) => {
    Indicator.close();
    return Promise.resolve(res.data)
  })
}

//发起签到 post请求
export function MakeCustomerSign(param) {
  return getpostheader(param, serverUrl + '/System/MakeCustomerSign')
}
//获取本次签到的预期结果值
export function GetCustSignInInfo(param) {
  return getheader(param, serverUrl + '/System/GetCustSignInInfo')

}
