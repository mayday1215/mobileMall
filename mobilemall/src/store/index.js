import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null, //用户信息
    area:{},//省份城市区域列表
    selectAddr:{}, //选中地址信息
    isPoP:false, //显示输入密码
    city:{}, //字母城市列表
    selectCity:'定位中...',
  },
  mutations: {
    //改变头像
    updateAvatar(state,avatar){
      console.log(avatar)
      state.user.avatar = avatar
    },
    //改变用户名
    updateNickname(state,nickname){
      state.user.nickname = nickname
    },
    //改变选中的城市
    updateSelectCity(state,city){
      state.selectCity = city
    },
    //字母城市列表赋值
    getCity(state,city){
      state.city = city
    },
    //改变isPoP
    updateIsPop(state,boo){
      state.isPoP = boo
    },
    //切换选中地址
    updateSelectAddr(state,addrs){
      // id: 12
      // name: "申屠小帅"
      // tel: "18312001680"
      // address: "广东省 深圳市 龙华区 宜驻公寓"

      /*
      * detail:"广东省深圳市龙华区宜驻公寓"
        id:12
        mobile:"18312001680"
        name:"申屠小帅"

      * */
      // state.selectAddr.id = addr.id
      // state.selectAddr.name = addr.name
      // state.selectAddr.mobile = addr.tel
      // state.selectAddr.detail = addr.address

      let addr = {
        id : addrs.id,
        name:addrs.name,
        mobile:addrs.tel,
        detail:addrs.address
      }
      console.log(addr)
      if (addr.name){state.selectAddr = addr}else{
        state.selectAddr = {}
      }

    },
    //默认赋值选中地址
    selectAddrChange(state,addressList){
      let defAddr = addressList.find(item => item.default)
      if (!defAddr){
        return
      }
      let addr = {
        id : defAddr.id,
        name:defAddr.name,
        mobile:defAddr.mobile,
        detail:`${defAddr.province}${defAddr.city}${defAddr.country}${defAddr.detail}`
      }
      state.selectAddr = addr
    },
    //删除地址
    delAddr(state,addrId){
      state.user.addressList.forEach((item,index) => {
        if (item.id == addrId){
          state.user.addressList.splice(index,1)
        }
      })
    },
    //添加地址
    createAddr(state,addr){
      state.user.addressList.push(addr)
    },
    //改变地址
    updateAddr(state,addr){

      state.user.addressList.forEach(item => {
        if (item.id == addr.id){
          item.city = addr.city
          item.country = addr.country
          item.default = addr.default
          item.detail = addr.detail
          item.mobile = addr.mobile
          item.name = addr.name
          item.province = addr.province
        }
      })

    },
    //给城市列表赋值
    getArea(state,area){
      state.area = area
    },
    //登录情况下保存用户信息
    loginSaveUser(state,data){
      console.log(data)
      state.user = data
      console.log("用户赋值")
    },
    //删除收藏项
    delUserLike(state,id){
      state.user.likeList.forEach((item,index) => {
        if (item.product_id == id){
          state.user.likeList.splice(index,1)
        }
      })
    },
    //添加收藏项
    addUserLike(state,item){
      state.user.likeList.push(item)
    },

  },
  actions: {
  },
  modules: {
  }
})
