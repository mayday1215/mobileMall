<template>
    <div>
        <van-submit-bar
                :price="totalPrice"
                button-text="付款"
                class="tab-bar-bor-top"
                @submit="buyClick"
        >
            <div slot="default">
                合计:{{totalCount}}件
            </div>

        </van-submit-bar>
    </div>
</template>

<script>
  export default {
    name: "OrderConfirmBottom",
    data() {
      return {
        productList: null
      }
    },
    created() {
      this.productList = JSON.parse(sessionStorage.getItem("confirmProducts"))
    },
    computed: {
      totalPrice() {
        let price = 0
        this.productList.forEach(item => {
          price += item.count * item.price
        })
        return price * 100
      },
      totalCount() {
        let count = 0
        this.productList.forEach(item => {
          count += item.count
        })
        return count
      }
    },
    methods: {
      //点击付款下单
      buyClick() {
        if (!this.$store.state.selectAddr.id) {
          this.$toast("请选择地址")
          return
        }
//         orderProductList：{
//   "product_id":37364,
//   "name":"黑鲨游戏手机 2",
//   "price:2699, "
//   "cover":"/www4/upload/1566020597689.webp",
//   "count":1
// }
//         user_address_id：用户收货地址id

        let orderProductList = []
        this.productList.forEach(item => {
          orderProductList.push({
            product_id:item.id,
            name:item.name,
            price:item.price,
            cover:item.cover,
            count:item.count
          })
        })
        let params = {
          orderProductList,
          user_address_id:this.$store.state.selectAddr.id
        }
        console.log(params)
        this.request({
          url:this.url.createOrder,
          method:'post',
          data:params
        }).then(res => {
          console.log(res)
          if (res.errcode == 0){
            this.$store.commit("updateIsPop", true)
            this.bus.$emit("orderId",{id:res.data.id})
          }
        })



      }
    },
    destroyed() {
      this.bus.$off("orderId")
    }
  }
</script>

<style scoped>

</style>
