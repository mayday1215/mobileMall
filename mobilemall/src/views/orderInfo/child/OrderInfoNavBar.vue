<template>
    <div>
        <van-nav-bar
                title="订单详情"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom nav"
                fixed

        />
    </div>
</template>

<script>
  export default {
    name: "OrderInfoNavBar"
  }
</script>

<style scoped>
.nav{
    background: #fff;
    z-index: 999;
}
</style>
