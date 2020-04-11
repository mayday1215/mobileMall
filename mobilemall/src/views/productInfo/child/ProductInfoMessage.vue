<template>
    <div>
        <van-cell-group>
            <van-cell>
                <h3>{{productInfo.name}}</h3>
                <span class="price">￥{{productInfo.price}}</span>
            </van-cell>
            <van-cell>
                <van-col span="10">免运费</van-col>
                <van-col span="14">剩余：{{productInfo.stock}}</van-col>
            </van-cell>
            <van-cell>
                <van-col span="10">销量：{{productInfo.sales}}</van-col>
                <van-col span="14">收藏：{{productInfo.likes}}</van-col>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "ProductInfoMessage",
    props: {
      productInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
    h3 {
        font-weight: normal;
    }

    .price {
        color: #ff5500;
    }

    .van-cell {
        font-size: 12px;
    }
</style>
