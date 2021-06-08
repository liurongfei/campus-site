// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from  'jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import 'font-awesome/css/font-awesome.css'
import qs from 'qs'
import global from './global.js'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.prototype.$global = global
Vue.prototype.$baseUrl = 'http://localhost'
Vue.prototype.$code = {
  'PING_CODE':10001,
  'PING_CODE':10002,
  'AUTH_CODE':10003,
  'MESS_CODE':10004,
  'Match_CODE':10005,
  'SYS_AUTH_SUCCESS':20001,
  'SYS_AUTH_FAILURE':20002,
  'SYS_MATCH_SUCCESS':20003,
  'SYS_MATCH_FAILURE':20004,
  'SYS_USER_COUNT':30001,
  'SYS_OTHER_INFO':30003,
}

/* axios请求拦截器 */
axios.interceptors.request.use(
  config=>{
    const authorization = localStorage.getItem('authorization')
    console.log('axios拦截器拦截请求');
    if (authorization) {
      config.headers.authorization = authorization
      console.log('给请求头加上token')
    }
    return config
  },
  err =>{
    console.log('err:'+err);
    return Promise.reject(err)
  }
)

/* axios响应拦截器 */
axios.interceptors.response.use(
  config=>{
    console.log(config);
    if(config.data.code==401){
      router.push("/");
    }
    return config
  },
  err =>{
    console.log(err);
    return Promise.reject(err)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
