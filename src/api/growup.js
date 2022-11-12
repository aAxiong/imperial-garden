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
export function GrowTestStart(param) {
  return getpostheader(param, serverUrl + '/GrowTest/GrowTestStart')
}
//继续做题
export function GrowTestContinue(param) {
  return getpostheader(param, serverUrl + '/GrowTest/GrowTestContinue')
}
/*
 * 测评首页信息
 */
export function GetMyBabyTestInfo(param) {
  return getresponse(param, serverUrl + '/GrowTest/GetMyBabyTestInfo')
}
/*
 * 获取我的历史测评记录
 */
export function GetCustTestRecord(param) {
  return getresponse(param, serverUrl + '/GrowTest/GetCustTestRecord')
}
// 获取单个测试报告
export function GetCustTestReport(param) {
  return getheader(param, serverUrl + '/GrowTest/GetCustTestReport')
}
//获取测评报告详细分析
export function GetCustTestDetailAnalysis(param) {
  return getheader(param, serverUrl + '/GrowTest/GetCustTestDetailAnalysis')
}
//获取测评报告结果分析
export function GetCustTestResultAnalysis(param) {
  return getheader(param, serverUrl + '/GrowTest/GetCustTestResultAnalysis')
}
