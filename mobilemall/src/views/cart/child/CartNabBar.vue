<template>
    <div>
        <van-nav-bar
                title="购物车"
                left-text="返回"
                left-arrow
                @click-left="back"
                class="nav-bar-border-bottom"
                fixed
        />


    </div>
</template>

<script>
  export default {
    name: "CartNabBar",
    methods:{
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
