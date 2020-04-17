<template>
    <div class="list">
        <div v-if="isCartData">
            <van-checkbox
                    v-model="item.checked"
                    v-for="item in cart"
                    :key="item.product_id"
                    class="item"
                    @click="checkClick(item)"

            >
                <van-card :price="item.price.toFixed(2)" :title="item.name" :thumb="item.cover" @click.stop>
                    <div slot="num">
<!--                        <van-stepper @change="changeNum" :name="item.product_id" v-model="item.count"/>-->
                        <van-stepper @plus="changeCount(item)" @minus="changeCount(item)" :name="item.product_id" v-model="item.count"/>
                        <van-button type="danger" size="small" @click="delClick(item)">删除</van-button>
                    </div>
                </van-card>
            </van-checkbox>
        </div>

        <div class="noData" v-else>
            <van-icon name="warning-o" class="icon"/>
            <div class="txt">您的购物车为空</div>
        </div>

    </div>
</template>


<script>
  export default {
    name: "CartShowData",
    props: {
      cart: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      //点击选中
      checkClick(item) {
        this.request({
          url: this.url.updateCart,
          method: "post",
          data: {
            product_id: item.product_id,
            checked: item.checked ? 0 : 1
          }
        }).then(res => {
          console.log(res)
        })
      },
      //增加减少
      changeCount(item){
        this.$nextTick(()=>{
          this.request({
            url: this.url.updateCart,
            method: 'post',
            data: {
              product_id: item.product_id,
              count: item.count
            }
          }).then(res => {
            console.log(res)
          })
        })

      },
      delClick(itemobj) {
        // console.log(this.cart)
        // console.log(item)
        this.request({
          url: this.url.delCart,
          method: 'get',
          params: {
            product_id: itemobj.product_id
          }
        }).then(res => {
          this.cart.forEach((item, index) => {
            if (item.product_id == itemobj.product_id) {
              this.cart.splice(index, 1)
            }
          })
        })

      }

    },
    computed:{
      isCartData(){
        return this.cart.length ? true : false
      }
    }

  }
</script>

<style scoped>

    .noData{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(150,150,150,.1);
        text-align: center;
    }
    .noData .txt{
        color: #aaa;
    }
    .noData .icon{
        font-size: 18vw;
        color: #aaa;
        margin-top: 18vh;

    }
    .list {
        padding: 3px 10px;
        box-sizing: border-box;
        height: calc(100vh - 97px);
        margin-top: 47px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;


    }

    .van-card {
        width: 85vw;
        background: #fff;
    }

    .item {
        box-shadow: 0 0 2px rgba(0, 0, 0, .2);
        padding: 2px 3px;
        box-sizing: border-box;
        margin-bottom: 5px;

    }

    .van-card__price {
        color: #ff5500;
    }
</style>
