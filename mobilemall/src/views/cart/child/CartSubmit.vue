<template>
    <div>
        <van-submit-bar
                :price="totalPrice"
                button-text="提交订单"
                class="tab-bar-bor-top"
                @submit="submitClick"
                :disabled="disabledBtn"
        >
<!--            <van-checkbox v-model="isAllChecked" @change="allCheckClick">全选</van-checkbox>-->
            <div slot="default">共计:{{totalCount}}件</div>
        </van-submit-bar>
    </div>
</template>

<script>
  export default {
    name: "CartSubmit",
    props: {
      cart: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }
    },
    methods: {
      submitClick(){
        this.$router.push("/orderConfirm")
        let orderProducts = []
        this.cart.forEach(item => {
          if (item.checked){
            orderProducts.push({
              id:item.product_id,
              name:item.name,
              price:item.price,
              cover:item.cover,
              count:item.count,
            })
          }
        })
        sessionStorage.setItem("confirmProducts",JSON.stringify(orderProducts))
      }
      // allCheckClick(boo) {
      //   console.log(boo)
      // }
    },
    computed: {
      disabledBtn(){
        return this.cart.length > 0 ? false : true
      },

      totalCount(){
        let count = 0
        this.cart.forEach(item => {
          if (item.checked){
            count += item.count
          }
        })
        return count
      },
      totalPrice(){
        let price = 0
        this.cart.forEach(item => {
          if (item.checked){
            price += item.count * item.price
          }
        })
        return price * 100
      }


      //全选 后端有bug
      // isAllChecked: {
      //   set(newVla) {
      //     // this.cart.forEach(item => {
      //     //   item.checked = newVla
      //     // })
      //     this.cart.forEach(item => {
      //       item.checked = newVla ? 1 : 0
      //       item.count = 1
      //     })
      //     // console.log(this.cart)
      //     this.request({
      //       url: '/cart/cacheUpdate',
      //       method: "post",
      //       data: {
      //         cart:this.cart,
      //       }
      //     }).then(res => {
      //       console.log(res)
      //     })
      //   },
      //   get() {
      //     return this.cart.every(item => {
      //       return item.checked
      //     })
      //   }
      // },
      // isAllChecked(){
      //   return  this.cart.every(item => {
      //     return item.checked
      //   })
      // }
    }
  }
</script>

<style scoped>

</style>
