<template>
    <div>用户
        <tab-bar :index="2"></tab-bar>
    </div>
</template>

<script>
    import TabBar from "../../components/tabBar/TabBar";
  export default {
    name: "User",
    components:{
      TabBar
    }
  }
</script>

<style scoped>

</style>
