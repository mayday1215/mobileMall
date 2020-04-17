<template>
    <div class="deal">
        <van-grid>
            <van-grid-item icon="pending-payment" text="待付款"/>
            <van-grid-item icon="records" text="待发货" />
            <van-grid-item icon="tosend" text="已发货" />
            <van-grid-item icon="logistics" text="已完成" />
        </van-grid>
    </div>
</template>

<script>
  export default {
    name: "UserDeal"
  }
</script>

<style scoped>
    .deal{
        /*border-bottom: 7px solid rgba(100,100,100,.3);*/
    }

</style>
