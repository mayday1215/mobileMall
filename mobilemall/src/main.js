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

Vue.prototype.bus = new Vue()




//图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  loading:require("assets/img/lazyLoad/loding.gif"),
  error:require("assets/img/lazyLoad/error.jpg"),
});


//获取用户信息
if (sessionStorage.getItem("token")){
  request({
    url:url.userInfo,
  }).then(res => {
    store.commit('loginSaveUser',res.data)

    store.commit("selectAddrChange",res.data.addressList)

  })
}

//获取省份城市列表
request({
  url:url.area,
  method:'get'
}).then(res => {
  store.commit("getArea",res.data)
})

//获取字母城市列表
request({
  url:url.city,
  method:'get'
}).then(res => {
  store.commit("getCity",res.data)
})

// jsonp
import jsonp from "vue-jsonp"
Vue.use(jsonp)
//获取当前位置
// window.navigator.geolocation.getCurrentPosition(p => {
//   console.log(p.coords.latitude) //经度
//   console.log(p.coords.longitude) //纬度
//   Vue.jsonp("http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+p.coords.latitude+","+p.coords.longitude+"&output=json&pois=0").then(res => {
//     console.log(res.result.addressComponent.street)
//     console.log(res.result.addressComponent.city)
//     store.commit("updateSelectCity",res.result.addressComponent.street)
//   })
// })
//
Vue.jsonp("http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=22.62,114.07&output=json&pois=0").then(res => {
  console.log(res.result.addressComponent.street)
  console.log(res.result.addressComponent.city)
  store.commit("updateSelectCity",res.result.addressComponent.city)
})

// window.navigator.geolocation.getCurrentPosition(function (position) {
//   console.log(position)
//   // document.body.innerHTML = "纬度="+position.coords.latitude+"经度="+position.coords.longitude
// })

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


