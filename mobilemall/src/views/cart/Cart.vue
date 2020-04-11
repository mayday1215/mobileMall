<template>
    <div>
        <div>购物车</div>
        <tab-bar :index="1"></tab-bar>
    </div>
</template>

<script>
    import TabBar from "../../components/tabBar/TabBar";
  export default {
    name: "Cart",
    components:{
      TabBar
    }
  }
</script>

<style scoped>

</style>
