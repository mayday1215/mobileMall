<template>
    <div>
        <order-list-nav-bar></order-list-nav-bar>
        <order-list-main :orders="orders"></order-list-main>
    </div>
</template>

<script>
    import OrderListNavBar from "./child/OrderListNavBar";
    import OrderListMain from "./child/OrderListMain";
  export default {
    name: "OrderList",
    components:{
      OrderListNavBar,
      OrderListMain
    },
    data(){
      return {
        orders:null
      }
    },
    created(){
      this.getOrderList()
    },
    methods:{
      getOrderList(){
        this.request({
          url:this.url.orderList,
          method:'get',
          params:{
            page:1,
            size:30
          }
        }).then(res => {
          console.log(res)
          this.orders = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
