<template>
    <div>
<!--        头部导航-->
        <home-nav-bar></home-nav-bar>
<!--        中间商品-->
        <home-products></home-products>
<!--        底部导航-->
        <tab-bar :index="0"></tab-bar>
    </div>
</template>

<script>
    import TabBar from "../../components/tabBar/TabBar";
    import HomeNavBar from "./child/HomeNavBar";
    import HomeProducts from "./child/HomeProducts";
  export default {
    name: "Home",
    components:{TabBar,HomeNavBar,HomeProducts}

  }
</script>

<style scoped>

</style>
