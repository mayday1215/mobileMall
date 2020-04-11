import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//一次性导入所有vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


//请求地址
import url from "./network/url";
Vue.prototype.url = url
//请求工具
import {request} from "./network/request";

Vue.prototype.request = request

Vue.config.productionTip = false

//图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  loading:require("assets/img/lazyLoad/loding.gif"),
  error:require("assets/img/lazyLoad/error.jpg"),
});



const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



