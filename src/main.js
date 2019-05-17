// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import $http from './assets/commonjs/http'
import qs from 'qs'


Vue.use(ElementUI);

Vue.prototype.$http = $http;
Vue.prototype.dd = dd;
Vue.config.productionTip = false;
Vue.prototype.$qs = qs
Vue.prototype.$projectId = ''//全局变量保存项目id;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
