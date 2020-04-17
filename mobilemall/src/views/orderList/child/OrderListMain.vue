<template>
    <div class="main">
        <van-cell-group v-for="item in orderData" :key="item.id">
            <van-cell :title="`订单ID: ${item.id}`"
                      is-link
                      :to="{path:'/orderInfo',query:{orderId:item.id}}" />
            <div v-for="item1 in item.orderProducts" :key="item1.id">
                <van-cell :title="item1.name"
                          :value="`${item1.count}件`"
                          is-link
                          :icon="item1.cover"
                          :to="{path:'/productInfo',query:{id:item1.id}}"/>
            </div>
        </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "OrderListMain",
    props:{
      orders:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      orderData(){
        if (!this.orders){
          return
        }
        return this.orders.data
      }
    }
  }
</script>

<style scoped>
    .main{
        height: calc(100vh - 47px);
        margin-top: 47px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

    }
    .van-icon__image{
        width: 50px;
        height: 50px;
    }

    .van-cell-group{
        border-top:8px solid rgba(150,150,150,.1);
        margin-bottom: 10px;
    }
</style>
