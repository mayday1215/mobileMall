<template>
    <div>
        <order-info-nav-bar/>

        <order-info-main :orderInfo="orderInfo"></order-info-main>

        <order-info-bottom :orderInfo="orderInfo"></order-info-bottom>

        <pwdcom></pwdcom>

    </div>
</template>

<script>
  import OrderInfoNavBar from "./child/OrderInfoNavBar";
  import OrderInfoMain from "./child/OrderInfoMain";
  import OrderInfoBottom from "./child/OrderInfoBottom";
  import Pwdcom from "../../components/pwdCom/Pwdcom";
  export default {
    name: "Order",
    components:{ OrderInfoBottom, OrderInfoMain, OrderInfoNavBar,Pwdcom},
    data(){
      return {
        orderInfo:null,
        orderId:null
      }
    },
    created() {
        this.orderId = this.$route.query.orderId
        this.getOrderInfo()
    },
    methods:{
      getOrderInfo(){
        this.request({
          url:this.url.orderInfo,
          method:'get',
          params:{
            id:this.orderId
          }
        }).then(res =>{
          console.log(res)
          this.orderInfo = res.data
        })
      }
    }
  }
</script>

<style scoped>


</style>
