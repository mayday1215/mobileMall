<template>
    <div class="info">
        <!--        navbar-->
        <product-info-nav-bar></product-info-nav-bar>
        <!--        轮播图-->
        <product-info-swipe :swipeList="productInfo.imgList"></product-info-swipe>
        <!--        商品信息-->
        <product-info-message :productInfo="productInfo"></product-info-message>
        <!--        商品参数-->
        <product-info-params :productInfo="productInfo"></product-info-params>


    </div>
</template>

<script>
  import ProductInfoNavBar from "./child/ProductInfoNavBar";
  import ProductInfoSwipe from "./child/ProductInfoSwipe";
  import ProductInfoMessage from "./child/ProductInfoMessage";
  import ProductInfoParams from "./child/ProductInfoParams";

  export default {
    name: "ProductInfo",
    components: {ProductInfoParams, ProductInfoSwipe, ProductInfoNavBar, ProductInfoMessage},
    data() {
      return {
        productId: null,  //商品id
        productInfo: {}
      }
    },
    created() {
      //赋值商品id
      this.productId = this.$route.query.id
      //获取详情数据
      this.getProductInfo()

    },
    methods: {
      //获取数据
      getProductInfo() {
        this.request({
          url: this.url.productInfo,
          method: 'get',
          params: {
            id: this.productId
          }
        }).then(res => {
          this.productInfo = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
