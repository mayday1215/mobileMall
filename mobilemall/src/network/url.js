export default {
  productList:'/product/pagination', //首页商品数据
  productInfo:'/product', //商品详情数据
  likeProduct:'/product_like/create', //收藏
  cancelLikeProduct:'/product_like/delete',//取消收藏
  signin:"/user/signin", //登录注册
  updateCart:'/cart/update', //单个购物车的改变
  cartData:'/cart/all', //购物车商品
  userInfo:'/user/info', //用户信息
  delCart:'/cart/delete',//删除一项购物车数据
  area:'/data/area',////城市列表
  updateAdd:'/user_address/update', //修改地址
  createAdd:'/user_address/create', //新增地址
  delethAdd:'/user_address/delete',  //删除地址
  createOrder:'/order/create', //下单
  pay:'/order/pay', //付款
  orderInfo:'/order', //订单详情
  orderList:'/order/pagination', //全部订单 我的订单
  likeAll:'/product_like/all', //获取我的收藏
  city:'/data/city', //获取字母城市信息
  setNickName:'/user/setting', //修改昵称
  setPayPwd:'/user/updatePayPassword', //设置支付密码
  setLoginPws:'/user/updatePassword' //修改登录密码
}
