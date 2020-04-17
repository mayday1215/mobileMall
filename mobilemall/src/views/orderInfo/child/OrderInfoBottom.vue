<template>
    <div class="bottom tab-bar-bor-top">
        <div class="price">合计：<span>￥{{totalPrice}}</span></div>
        <van-button type="primary" size="normal" @click="payClick" v-if="orderState">付款</van-button>
        <van-tag size="large" v-else>等待商家发货</van-tag>
    </div>
</template>

<script>
  export default {
    name: "OrderInfoBottom",
    props:{
      orderInfo:{
        type:Object,
        default(){
          return {}
        }
      },
      //点击付款
    },
    methods:{
      payClick(){
        console.log(123)
        this.$store.commit('updateIsPop',true)
      }
    },
    computed:{
      orderState(){
        if (!this.orderInfo){
          return
        }
        return this.orderInfo.order_status==0
      },
      totalPrice(){
        if (!this.orderInfo){
          return
        }
        let price = 0
        this.orderInfo.orderProducts.forEach(item => {
          price += item.count * item.price
        })
        return price.toFixed(2)
      }
    }
  }
</script>

<style scoped>
    .bottom{
        height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        /*line-height: 50px;*/
        background: #fff;

    }
    .price{
        font-size: 14px;
    }
    .price span{
        color: #ee0a24;
        font-size: 16px;
    }
    .van-tag{
        padding: 10px 9px;
    }

</style>
