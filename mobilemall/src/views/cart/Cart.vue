<template>
    <div>
        <cart-nab-bar></cart-nab-bar>

        <cart-show-data :cart="cart"></cart-show-data>

        <cart-submit :cart="cart"></cart-submit>

    </div>
</template>

<script>
  import CartNabBar from "./child/CartNabBar";
  import CartShowData from "./child/CartShowData";
  import CartSubmit from "./child/CartSubmit";

  export default {
    name: "Cart",
    components: {
      CartNabBar,
      CartShowData,
      CartSubmit
    },
    data() {
      return {
        cart: []
      }
    },
    created() {
      this.getCartData()
    },
    methods: {
      getCartData() {
        this.request({
          url: this.url.cartData,
          method: "get"
        }).then(res => {
          this.cart = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
