<template>
    <div>
<!--        头部-->
        <user-head></user-head>
<!--交易信息部分-->
        <user-deal></user-deal>

<!--        用户信息设置等-->
        <user-info></user-info>
        <tab-bar :index="2"></tab-bar>
    </div>
</template>

<script>
    import TabBar from "../../components/tabBar/TabBar";
    import UserHead from "./child/UserHead";
    import UserDeal from "./child/UserDeal";
    import UserInfo from "./child/UserInfo";
  export default {
    name: "User",
    components:{
      UserInfo,
      UserHead,
      TabBar,
      UserDeal
    }
  }
</script>

<style scoped>

</style>
