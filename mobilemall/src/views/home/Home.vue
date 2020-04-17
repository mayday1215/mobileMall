<template>
    <div>
        <!--        头部导航-->
        <home-nav-bar></home-nav-bar>
        <!--        中间商品-->
        <home-products @scroll="scroll" ref="productList"></home-products>
        <!--        底部导航-->
        <tab-bar :index="0"></tab-bar>
        <!--        回到顶部-->
        <home-back-top v-show="backTopShow" @click.native="backTop"></home-back-top>
    </div>
</template>

<script>
  import TabBar from "../../components/tabBar/TabBar";
  import HomeNavBar from "./child/HomeNavBar";
  import HomeProducts from "./child/HomeProducts";
  import HomeBackTop from "./child/HomeBackTop";

  export default {
    name: "Home",
    components: {TabBar, HomeNavBar, HomeProducts, HomeBackTop},
    data(){
      return {
        backTopShow:false
      }
    },
    created(){
    },
    methods:{
      scroll(scrollTop){
        scrollTop >= 1500 ? this.backTopShow = true : this.backTopShow = false
      },
      backTop(){
       this.$refs.productList.$el.scrollTop = 0
      }
    }

  }
</script>

<style scoped>

</style>
