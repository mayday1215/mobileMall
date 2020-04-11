<template>
    <div>
        <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                class="nav-bar-border-bottom"
                fixed
                @click-left="back"


        />
    </div>
</template>

<script>
  export default {
    name: "ProductInfoNavBar",
    methods:{
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
