<template>
    <div class="content">
        <van-steps :active="active">
            <van-step>未付款</van-step>
            <van-step>已付款</van-step>
            <van-step>已发货</van-step>
            <van-step>交易完成</van-step>
        </van-steps>


        <van-cell :title="nameAndTle"
                  :label="address"
                  class="address"
        />

        <van-cell
                :title="`${item.name}`"
                :value="`${item.count}件`"
                v-for="(item,index) in poduct"
                :key="index"
                :label="`￥${item.price}`"
                :icon="item.cover"
                class="product"
        />



    </div>
</template>

<script>
  export default {
    name: "OrderInfoMain",
    props:{
      orderInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        title:'',
        label:''
      }
    },
    computed:{
      poduct(){
        if (!this.orderInfo){
          return
        }
        return this.orderInfo.orderProducts
      },
      active(){
        // console.log(this.orderInfo)
        if (!this.orderInfo){
          return
        }
        return this.orderInfo.order_status
      },
      nameAndTle(){
        if (!this.orderInfo){
          return
        }
        return `${this.orderInfo.userAddress.name}，${this.orderInfo.userAddress.mobile}`
      },
      //
      address(){
        if (!this.orderInfo){
          return
        }
        return `${this.orderInfo.userAddress.province} ${this.orderInfo.userAddress.city} ${this.orderInfo.userAddress.country} ${this.orderInfo.userAddress.detail}`
      }
    }
  }
</script>

<style scoped>
    .content{
        height: calc(100vh - 47px - 50px);
        overflow-y: scroll;
        margin-top: 47px;
        -webkit-overflow-scrolling: touch;
    }
    .address{
        border-top: 10px solid rgba(150,150,150,.1);
        border-bottom: 10px solid rgba(150,150,150,.1);
    }
    .product{
        /*box-shadow: 0 0 3px rgba(150,150,150,.2);*/
        margin-top: 3px;
    }
    .product .van-icon{
        font-size: 50px;

    }
    .product .van-icon img{
        box-shadow: 0 0 3px rgba(0,0,0,.2);
        /*border: 1px solid rgba(0,0,0,.3);*/
    }

</style>
