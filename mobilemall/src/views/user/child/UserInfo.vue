<template>
    <div>
        <van-cell title="我的订单" icon="records" is-link to="/orderList" />
        <van-cell title="我的收藏" icon="like-o" is-link to="/likeList" />
        <van-cell title="收获地址" icon="description" is-link :to="{path:'/addressList',query:{from:'user'}}" />
        <van-cell title="用户设置" icon="setting-o" is-link to="/setting" />
    </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>


</style>
