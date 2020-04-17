<template>
    <div>
        <order-confirm-nav-bar></order-confirm-nav-bar>
        <order-confirm-select-address></order-confirm-select-address>
        <order-confirm-info></order-confirm-info>
        <order-confirm-bottom></order-confirm-bottom>
        <pwdcom></pwdcom>

    </div>
</template>

<script>
  import OrderConfirmNavBar from "./child/OrderConfirmNavBar";
  import OrderConfirmSelectAddress from "./child/OrderConfirmSelectAddress";
  import OrderConfirmInfo from "./child/OrderConfirmInfo";
  import OrderConfirmBottom from "./child/OrderConfirmBottom";
  import Pwdcom from "../../components/pwdCom/Pwdcom";
  export default {
    name: "OrderConfirm",
    components: {Pwdcom, OrderConfirmBottom, OrderConfirmSelectAddress, OrderConfirmNavBar, OrderConfirmInfo,}
  }
</script>

<style scoped>

</style>
