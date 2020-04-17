import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import("views/home/Home")
const Cart = () => import("views/cart/Cart")
const User = () => import("views/user/User")
const ProductInfo = () => import("views/productInfo/ProductInfo")
const Login = () => import("views/login/Login")
const OrderList = () => import("views/orderList/OrderList")
const OrderConfirm = () => import("views/orderConfirm/OrderConfirm")
const AddressList = () => import("views/addressList/AddressList")
const AddressEdit = () => import("views/addressEdit/AddressEdit")
const OrderInfo = () => import("views/orderInfo/OrderInfo")
const PaySuccess = () => import("views/paySuccess/PaySuccess")
const LikeList = () => import("views/likeList/LikeList")
const CitySelect = () => import("views/citySelect/CitySelect")
const Search = () => import("views/search/Search")
const Setting = () => import("views/setting/Setting")

const SetAvatar = () => import("views/setting/childPage/SetAvatar")
const SetLoginPassword = () => import("views/setting/childPage/SetLoginPassword")
const SetNickName = () => import("views/setting/childPage/SetNickName")
const SetPayPassword = () => import("views/setting/childPage/SetPayPassword")



const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path:'/setAvatar',
      component:SetAvatar,
      name:'SetAvatar',
      meta:{
        auth:true
      }
    },
    {
      path:'/setLoginPassword',
      component:SetLoginPassword,
      name:'SetLoginPassword',
      meta:{
        auth:true
      }
    },
    {
      path:'/setNickName',
      component:SetNickName,
      name:'SetNickName',
      meta:{
        auth:true
      }
    },
    {
      path:'/setPayPassword',
      component:SetPayPassword,
      name:'SetPayPassword',
      meta:{
        auth:true
      }
    },


    {
      path:'/setting',
      component:Setting,
      name:'Setting',
      meta:{
        auth:true
      }
    },
    {
      path:'/search',
      component:Search,
      name:'Search',
    },
    {
      path:'/citySelect',
      component:CitySelect,
      name:'CitySelect',
    },
    {
      path:'/likeList',
      component:LikeList,
      name:'LikeList',
      meta:{
        auth:true
      }
    },
    {
      path:'/paySuccess',
      component:PaySuccess,
      name:'PaySuccess',
      meta:{
        auth:true
      }
    },
    {
      path:'/orderInfo',
      component:OrderInfo,
      name:'OrderInfo',
      meta:{
        auth:true
      }
    },
    {
      path:'/addressEdit',
      component:AddressEdit,
      name:'AddressEdit',
      meta:{
        auth:true
      }
    },
    {
      path:'/addressList',
      component:AddressList,
      name:'AddressList',
      meta:{
        auth:true
      }
    },
    {
      path:'/orderConfirm',
      component:OrderConfirm,
      name:'OrderConfirm',
      meta:{
        auth:true
      }
    },
    {
      path:'/orderList',
      component:OrderList,
      meta:{
        auth:true
      },
      name:'OrderList'
    },
    {
      path:'/productInfo',
      component:ProductInfo,
      name:'ProductInfo'
    },
    {
      path: '/home',
      component:Home,
      name:'Home'
    },
    {
      path: '/cart',
      component:Cart,
      name:'Cart',
      meta:{
        auth:true
      }
    },
    {
      path: '/user',
      component:User,
      name:'User'
    },
    {
      path:'/login',
      component:Login,
      name:'Login'
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})




router.beforeEach((to, from, next) => {
  if (to.meta.auth){
      if (sessionStorage.getItem("token")){
        next()
      }else{
        next({
          path:'/login'
        })
      }
  }else{
    next()
  }

})

export default router
