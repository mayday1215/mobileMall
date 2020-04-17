<template>
    <div class="info">
        <!--        navbar-->
        <product-info-nav-bar/>
        <div class="content">
            <!--        轮播图-->
            <product-info-swipe :swipeList="productInfo.imgList"/>
            <!--        商品信息-->
            <product-info-message :productInfo="productInfo"/>
            <!--        商品参数-->
            <product-info-params :productInfo="productInfo"/>
        </div>
        <!--        底部-->
        <product-info-bottom :productInfo="productInfo"/>


    </div>
</template>

<script>
  import ProductInfoNavBar from "./child/ProductInfoNavBar";
  import ProductInfoSwipe from "./child/ProductInfoSwipe";
  import ProductInfoMessage from "./child/ProductInfoMessage";
  import ProductInfoParams from "./child/ProductInfoParams";
  import ProductInfoBottom from "./child/ProductInfoBottom";

  export default {
    name: "ProductInfo",
    components: {ProductInfoParams, ProductInfoSwipe, ProductInfoNavBar, ProductInfoMessage, ProductInfoBottom},
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
    .content{
        height: calc(100vh - 97px);
        overflow-y: scroll;
        margin-top: 47px;
        -webkit-overflow-scrolling: touch;
    }

</style>
