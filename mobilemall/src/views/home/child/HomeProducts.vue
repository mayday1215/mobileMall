<template>
    <div class="product" @scroll="scroll" ref="product">
        <div class="item" v-for="item in productList" :key="item.id" @click="goProductInfo(item.id)">
            <img v-lazy="item.cover" alt="">
            <div class="bottom">
                <h3>{{item.name}}</h3>
                <span class="price">￥{{item.price}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "HomeProducts",
    data(){
      return {
        productList:[], //商品列表
        page:1, //当前页数
        isPullLoad:true, //是否可以下拉
        totalPage:0 //总页数
      }
    },
    created() {
        this.getProductList(this.page)
    },
    methods:{
      //加载数据
      getProductList(page){
        this.request({
          url:this.url.productList,
          method:"get",
          params:{
            page:page,
            size:20
          }
        }).then(res => {
          this.totalPage = res.data.totalPages
          this.productList = this.productList.concat(res.data.data)
          this.isPullLoad = false
        })
      },
      //下拉加载更多
      scroll(){
        if (this.isPullLoad){
          return
        }

        let scrollTop = this.$refs.product.scrollTop
        let clientHeight = this.$refs.product.clientHeight
        let scrollHeight = this.$refs.product.scrollHeight
        this.$emit("scroll",scrollTop)

        if (scrollTop + clientHeight >= scrollHeight-1){
          this.page++
          if (this.page > this.totalPage){
            this.$toast("没有更多数据")
            return;
          }
          this.getProductList(this.page)
          this.isPullLoad = true
        }
      },
      //跳转到详情页
      goProductInfo(id){
        this.$router.push({
          path:"/productInfo",
          query:{
            id
          }
        })

      }

    },

  }
</script>

<style scoped>
    .product{
        height: calc(100vh - 97px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 5px;
        box-sizing: border-box;
        /*background: #F2F2F2;*/
    }
    .item{
        width: 49%;
        padding: 0.3vw 0.3vw 50px 0;
        box-sizing: border-box;
        box-shadow: 0 0 3px rgba(100,100,100,.8);
        margin-bottom: 10px;
        border-radius: 5px;
        position: relative;

    }

    .item img{
        width: 100%;
        border-radius: 5px;
    }
    .item .bottom{
        padding: 3px;
        box-sizing: border-box;
        position: absolute;
        bottom: 3px;
        left: 0;
        right: 0;
    }
    .item h3{
        font-size: 14px;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        line-height: 30px;
    }
    .item .price{
        font-size: 13px;
        color: #ff5500;
    }

</style>
