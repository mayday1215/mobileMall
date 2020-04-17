<template>
    <div class="address">
        <van-cell :title="title"
                  :label="label"
                  is-link :to="{path:'/addressList',query:{from:'order'}}"
        v-if="addrFlag"/>


        <van-cell title="请选择收货地址"
                  is-link :to="{path:'/addressList',query:{from:'order'}}"
        v-else/>

    </div>
</template>

<script>
  export default {
    name: "OrderConfirmSelectAddress",
    data(){
      return {

      }
    },
    created() {

    },
    mounted(){

    },
    computed:{
        addrFlag (){
          return this.$store.state.selectAddr.name ? true : false
        },
        title(){
          return `${this.$store.state.selectAddr.name},${this.$store.state.selectAddr.mobile}`

        },
        label(){
          return this.$store.state.selectAddr.detail
        }
    }
  }
</script>

<style scoped>
    .address{
        border-top: 10px solid rgba(150,150,150,.1);
        border-bottom: 10px solid rgba(150,150,150,.1);
        margin-top: 47px;
    }

</style>
