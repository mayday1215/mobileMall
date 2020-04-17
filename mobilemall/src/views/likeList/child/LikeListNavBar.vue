<template>
    <div>
        <van-nav-bar
                title="我的收藏"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom"
                fixed
        />
    </div>
</template>

<script>
  export default {
    name: "LikeListNavBar"
  }
</script>

<style scoped>

</style>
