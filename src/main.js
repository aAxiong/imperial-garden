// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/js/size750.js'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'mint-ui/lib/style.css'
import 'common/scss/index.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import {
  Message
} from 'element-ui';
//引入echarts
import echarts from "echarts";
// hack for global nextTick
function noop() { }

window.MessageChannel = noop
window.setImmediate = noop
//添加到原型
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
import animate from 'animate.css'
Vue.use(animate)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)

//mqtt
// import VueMqtt from 'vue-mqtt'
// Vue.use(VueMqtt, 'ws://39.108.160.202:9001/mqtt', {
//   clientId: 'WebClient-' + parseInt(Math.random() * 100000)
// })

window.alert = function (name) {
  const iframe = document.createElement('IFRAME');
  iframe.style.display = 'none';
  iframe.setAttribute('src', 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode.removeChild(iframe);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  Message,
  render: h => h(App)
})
