<template>
    <div class="swipe">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa" height="100px">
            <van-swipe-item v-for="item in swipeList" :key="item.id">
                <img v-lazy="item.path" alt="">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
  export default {
    name: "ProductInfoSwipe",
    props: {
      swipeList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
    .swipe {
        margin-top: 47px;
    }

    .swipe img {
        width: 100%;
        height: 300px;
        display: block;
    }

</style>
