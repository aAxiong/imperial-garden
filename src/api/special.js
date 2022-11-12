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
  get,
  getresponse
} from './axios.js'
import router from '../router'


/*
 * 获取逗笑妙招全集
 */
export function GetMethodOfLaughAll(param) {
  return getheader(param, serverUrl + '/VoiceModule/GetMethodOfLaughAll')
}

/*
 * 获取声音专题明细
 */
export function GetVoiceModuleDetails(param) {
  return getheader(param, serverUrl + '/VoiceModule/GetVoiceModuleDetails')
}

/*
 * 获取声音专题明细详情ByID
 */
export function GetSubVoiceModuleDetail(param) {
  return getheader(param, serverUrl + '/VoiceModule/GetSubVoiceModuleDetail')
}

/*
 * 问题答疑的所有列表
 */
export function GetQuestionList(param) {
  return getheader(param, serverUrl + '/VoiceModule/GetQuestionList')
}

/*
 * 提问
 */
export function AskQuestion(param) {
  return getpostheader(param, serverUrl + '/VoiceModule/AskQuestion')
}

/*
 * 问题答疑的所有列表
 */
export function GetMyQuestionList(param) {
  return getheader(param, serverUrl + '/VoiceModule/GetMyQuestionList')
}
/*
 * 获取日排行前三名
 */
export function GetVoiceRankOfDayTop(param) {
  return getheader(param, serverUrl + '/VoiceModule/GetVoiceRankOfDayTop3')
}


/*
 * 获取日排行清单
 */
export function GetVoiceRankOfDay(param) {
  return getresponse(param, serverUrl + '/VoiceModule/GetVoiceRankOfDay')
}

/*
 * 获取月排行清单
 */
export function GetVoiceRankOfMonth(param) {
  return getresponse(param, serverUrl + '/VoiceModule/GetVoiceRankOfMonth')
}

/*
 * 分享录音视频获取积分
 */
export function GetScoreByShareRecordWave(param) {
  return getpostheader(param, serverUrl + '/Score/GetScoreByShareRecordWave?' + param)
}
/*
 * 点赞
 */
export function MakeSubPraise(param) {
  return getpostheader(param, serverUrl + '/VoiceModule/MakeSubPraise')
}


/* 上传声音 */
export function UploadRecordWave(param) {
  Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
  });
  let data = Object.assign({}, commonParams, param);
  let formData = new FormData();
  formData.append('custID', data.custID)
  formData.append('waveName', data.waveName)
  formData.append('voiceSecond', data.voiceSecond)
  formData.append('beginTime', data.beginTime)
  formData.append('endTime', data.endTime)
  formData.append('macStr', data.macStr)
  formData.append('ipStr', data.ipStr)
  formData.append('voiceType', data.voiceType)
  formData.append('voiceReason', data.voiceReason)
  formData.append('modelNum', data.modelNum)
  formData.append('voiceFile', data.voiceFile)
  console.log('voiceFile1', data.voiceFile)
  var url = `${serverUrl}/RecordWave/UploadRecordWave`;
  if (!global.URL_Rroxy)
    url = serverApi + url;
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken
    }
  }).then((res) => {
    Indicator.close();
    if (res.Code === -102) {
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
