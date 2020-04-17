<template>
    <div class="list">
        <van-cell
                v-for="item in productList"
                :key="item.id"
                :value="`${item.count}件`"
                :title="`${item.name.split(' ')[0]}`"
                :label="`￥${item.price}`"
                :icon="item.cover"/>
    </div>
</template>

<script>
  export default {
    name: "OrderConfirmInfo",
    data(){
      return {
        productList:null
      }
    },
    created() {
      this.productList = JSON.parse(sessionStorage.getItem("confirmProducts"))
    },
    filters:{

    }
  }
</script>

<style scoped>
.van-icon{
    font-size: 50px;
}
    .list{
        height: calc(100vh - 47px - 64px - 50px);
        overflow-y: scroll;
    }
</style>
