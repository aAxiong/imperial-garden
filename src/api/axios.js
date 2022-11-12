// Axios.defaults.headers.post['content-Type'] = 'application/json;charset=utf-8';
// export function axios(url, data) {
//   Indicator.open({
//     text: 'Loading...',
//     spinnerType: 'fading-circle'
//   });;
//   return Axios({
//     method: 'post',
//     url: url,
//     params: data
//   }).then((res) => {
//     console.log(res);
//     if (res.data.code == "1" || res.data.code == "100000") {
//       Indicator.close();
//       return Promise.resolve(res)
//     } else {
//       Indicator.close();
//       Message.error({
//         message: res.data.msg,
//         center: true,
//         duration: 1000
//       })
//     }

//   }).catch((res) => {
//     console.log(res);
//     Indicator.close();
//     Message.error({
//       message: res,
//       center: true,
//       duration: 1000
//     })
//   })
// }



//代码拦截
import axios from 'axios'
// import qs from 'qs';
import {
  Message
} from 'element-ui'
import {
  Indicator
} from 'mint-ui';
import router from '../router'
import {
  serverApi
} from './config'

export function comfunction(param, url) {
  // if (localStorage.getItem("userdata")) {
  //   axios.defaults.headers.common['Authorization'] = "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken;
  // }
  let timer = setTimeout(() => {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
  }, 1000)

  let data = param

  if (!global.URL_Rroxy)
    url = serverApi + url;

  let dlay = setTimeout(() => {
    if (timer) {
      errinfo("timeout", 'comfunction', url, data)
    }
  }, 1000*10);


  return axios.post(url, data).then((res) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    Indicator.close();
    global.NETWORK = true;
    return Promise.resolve(res.data)
  }, (err) => {

    clearTimeout(timer);
    clearTimeout(dlay);
    errinfo(err, 'comfunction', url, data)
  })
}



//get
export function getcomfunction(param, url) {
  let timer = setTimeout(() => {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
  }, 1000)
  let data = param

  if (!global.URL_Rroxy)
    url = serverApi + url;

  let dlay = setTimeout(() => {
    if (timer) {
      errinfo("timeout", 'getcomfunction', url, data)
    }
  }, 1000*10);

  return axios.get(url + data).then((res) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    Indicator.close();
    global.NETWORK = true;
    return Promise.resolve(res.data)
  }, (err) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    errinfo(err, 'getcomfunction', url, data)
  })
}


//post & header
export function getpostheader(param, url) {
  let timer = setTimeout(() => {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
  }, 1000)
  let data = param

  if (!global.URL_Rroxy)
    url = serverApi + url;

  let dlay = setTimeout(() => {
    if (timer) {
      errinfo("timeout", 'getpostheader', url, data)
    }
  }, 1000*10);

  return axios.post(
    url,
    data, {
      headers: {
        'Authorization': "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken
      }
    }
  ).then((res) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    Indicator.close();
    global.NETWORK = true;
    if (res.Code === -102) {
      Message.error({
        message: '异常操作请重新登录',
        center: true,
        duration: 1000
      });
      localStorage.removeItem("userdata");
      setTimeout(router.push({
        path: "/login"
      }), 1000);
    } else {
      return Promise.resolve(res.data)
    }

  }, (err) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    errinfo(err, 'getpostheader', url, data)
  })
}

//get & header
export function getheader(param, url) {
  let timer = setTimeout(() => {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
  }, 1000)

  //LiuBoQ 20180503  json 转 get param string
  if (typeof (param) == 'object') {
    let str = JSON.stringify(param)
    str = str.replace(/"/g, '');
    str = str.replace(/:/g, '=');
    str = str.replace(/,/g, '&');
    str = str.replace(/{/g, '?');
    str = str.replace(/}/g, '');
    param = str;
    // console.log('get param string : '+typeof(param));
  }

  let data = param

  if (!global.URL_Rroxy)
    url = serverApi + url;

  let dlay = setTimeout(() => {
    if (timer) {
      errinfo("timeout", 'getheader', url, data)
    }
  }, 1000*10);

  return axios.get(
    url + data, {
      headers: {
        'Authorization': "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken
      }
    }
  ).then((res) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    Indicator.close();
    global.NETWORK = true;
    if (res.data.Code === -102) {
      Message.error({
        message: '异常操作请重新登录',
        center: true,
        duration: 1000
      });
      localStorage.removeItem("userdata");
      setTimeout(router.push({
        path: "/login"
      }), 1000);
    } else {
      return Promise.resolve(res.data)
    }
  }, (err) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    errinfo(err, 'getheader', url, data)
  })
}


//get & header&&response
export function getresponse(param, url) {
  let timer = setTimeout(() => {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
  }, 1000)
  let data = param

  if (!global.URL_Rroxy)
    url = serverApi + url;

  let dlay = setTimeout(() => {
    if (timer) {
      errinfo("timeout", 'getheader', url, data)
    }
  }, 1000*10);

  return axios.get(
    url + data, {
      headers: {
        'Authorization': "BasicAuth " + JSON.parse(localStorage.getItem("userdata")).AccessToken
      }
    }
  ).then((res) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    Indicator.close();
    global.NETWORK = true;
    if (res.data.Code === -102) {
      Message.error({
        message: '异常操作请重新登录',
        center: true,
        duration: 1000
      });
      localStorage.removeItem("userdata");
      setTimeout(router.push({
        path: "/login"
      }), 1000);
    } else {
      return Promise.resolve(res)
    }
  }, (err) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    errinfo(err, 'getresponse', url, data)
  })
}

export function get(url) {
  let timer = setTimeout(() => {
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
  }, 1000)

  if (!global.URL_Rroxy)
    url = serverApi + url;

  let dlay = setTimeout(() => {
    if (timer) {
      errinfo("timeout", 'get', url, "")
    }
  }, 1000*10);

  return axios.get(url).then((res) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    Indicator.close();
    global.NETWORK = true;
    return Promise.resolve(res.data)
  }, (err) => {
    clearTimeout(timer);
    clearTimeout(dlay);
    errinfo(err, 'get', url, '')
  })
}

export function errinfo(err, title, url, data) {
  Indicator.close();
  //alert('网络不稳定...');
  Message.error({
    message: "网络似乎开小差了...",
    center: true,
    duration: 1300
  });
  global.MQTTWORK = false;
  global.NETWORK = false;
  console.log('err:'+err+' title:'+title + ' 网络不稳定... url:=>' + url + " data :=> " + JSON.stringify(data));
  if(global.DEVNUM>5)
  global.URL_Rroxy = true;//联网失败自动 开启代理

}
