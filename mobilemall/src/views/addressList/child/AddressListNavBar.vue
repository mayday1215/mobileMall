<template>
    <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
            class="nav-bar-border-bottom"
            fixed
    />
</template>

<script>
  export default {
    name: "AddressListNavBar",
    data(){
      return {
        title:''
      }
    },
    created() {
      this.$route.query.from == 'user' ? this.title = '我的收货地址' : this.title = "请选择收货地址"
    }
  }
</script>

<style scoped>

</style>
