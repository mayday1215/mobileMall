<template>
    <div>
        <van-tabs v-model="active" sticky offset-top="46">
            <van-tab title="图片">
                <div class="img-list" v-for="item in productInfo.detailImgList" :key="item.id">
                    <img :src="item.path" alt="">
                </div>
            </van-tab>
            <van-tab title="参数">
                <van-cell-group>
                    <van-cell v-for="item in productInfo.properties" :key="item.id">
                        <van-col span="10">{{item.name}}</van-col>
                        <van-col span="14">{{item.detail}}</van-col>
                    </van-cell>
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
  export default {
    name: "ProductInfoParams",
    props: {
      productInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    data() {
      return {
        active: 2
      };
    }
  }
</script>

<style scoped>
    .img-list img {
        width: 100%;
    }

    .van-cell {
        font-size: 12px;
    }

</style>
