import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import("views/home/Home")
const Cart = () => import("views/cart/Cart")
const User = () => import("views/user/User")
const ProductInfo = () => import("views/productInfo/ProductInfo")


const router = new VueRouter({
  mode: 'history',
  routes:[
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
      name:'Cart'
    },
    {
      path: '/user',
      component:User,
      name:'User'
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})

export default router
