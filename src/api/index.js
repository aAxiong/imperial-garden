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
  getcomfunction,
  getheader,
  getpostheader,
  get,
  getresponse
} from './axios.js'


// 开始测评
export function GetCareShareData(param) {
  return getheader(param, serverUrl + '/VoiceAnalysis/GetCareShareData')
}

