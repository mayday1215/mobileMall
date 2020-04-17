import axios from "axios"
import router from "../router";
//调用tools
import {loading,loadingClear} from "../tools";
export function request(config) {
  return new Promise(((resolve, reject) => {
    const instance = axios.create({
      timeout:5000,
      baseURL:'/api/v4'
    })
    instance.interceptors.request.use(config => {
      if (sessionStorage.getItem("token")){
        config.headers.Authorization = sessionStorage.getItem("token")
      }
      //加载中吐司
      loading()
      return config
    })

    instance.interceptors.response.use(res => {
      if (res.data.errcode === 90101){
        router.push("/login")
      }
      //加载完成取消吐司
      loadingClear()
      return res.data
    })

    instance(config).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  }))
}
