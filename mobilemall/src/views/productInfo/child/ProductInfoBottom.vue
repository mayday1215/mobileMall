<template>
    <div>
        <van-goods-action class="bottom-bar">
            <van-goods-action-icon
                    :icon="isLike ?'like': 'like-o'"
                    :color="isLike ? 'red' : ''"
                    text="收藏"
                    @click="likeClick"/>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="goCart"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
            <van-goods-action-button type="danger" text="立即购买" @click="orderConfirm"/>
        </van-goods-action>
    </div>
</template>

<script>
  export default {
    name: "ProductInfoBottom",
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
        productId: null
      }
    },
    created() {
      this.productId = this.$route.query.id
    },
    methods: {
      //点击立即购买
      orderConfirm(){
        this.$router.push("/orderConfirm")
        let productInfo = [{
          id:this.productInfo.id,
          name:this.productInfo.name,
          price:this.productInfo.price,
          cover:this.productInfo.cover,
          count:1
        }]
        console.log(productInfo)
        sessionStorage.setItem("confirmProducts",JSON.stringify(productInfo))
      },
      //点击跳转购物车
      goCart(){
        this.$router.push("/cart")
      },
      //点击收藏
      likeClick() {
        if (this.isLike) {
          //已经收藏取消收藏
          this.request({
            url: this.url.cancelLikeProduct,
            method: 'get',
            params: {
              product_id: this.productId
            }
          }).then(res => {
            this.$store.commit("delUserLike", this.productId)
          })
        } else {
          //还没收藏要收藏
          this.request({
            method: "post",
            url: this.url.likeProduct,
            data: {
              product_id: this.productId
            }
          }).then(res => {
            if (res.errcode == 0) {
              let likeItem = {
                cover: this.productInfo.cover,
                name: this.productInfo.name,
                price: this.productInfo.price,
                product_id: this.productInfo.id
              }
              this.$store.commit("addUserLike", likeItem)
            }

          })
        }
      },
      //加入购物车
      addCart() {
        this.request({

          url: this.url.updateCart,
          method: 'post',
          data: {
            product_id: this.productId
          }
        }).then(res => {
          if (res.errcode != 90101) {
            this.$toast("加入成功")

          }


        })
      }
    },
    computed: {
      //是否收藏
      isLike() {
        if (!this.$store.state.user) {
          return
        }
        return this.$store.state.user.likeList.some(item => {
          return item.product_id == this.productId
        })
      }
    }

  }
</script>

<style scoped>
    .bottom-bar {
        box-shadow: 0 -1px 2px rgba(0, 0, 0, .1);
    }

</style>
