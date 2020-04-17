<template>
    <div>
        <van-nav-bar
                :title="title"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom"
        />
    </div>
</template>

<script>
  export default {
    name: "AddressEditNavBar",
    data(){
      return {
        title:''
      }
    },
    created() {
      this.$route.query.id == 0 ? this.title = "新增地址" : this.title = "保存地址"
    }
  }
</script>

<style scoped>

</style>
