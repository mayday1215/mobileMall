<template>
    <div class="product">
        <div class="item" v-for="item in searchList" :key="item.id" @click="goProductInfo(item.id)">
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
    name: "SearchMain",
    data(){
      return {
        searchData:null
      }
    },
    methods:{
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
    created() {
      this.bus.$on("searchData",data => {
        // console.log(data)
        this.searchData = data
      })
    },
    computed:{
      searchList(){
        console.log(this.searchData)
        if (!this.searchData){
          return
        }
        return this.searchData.data
      }
    }
  }
</script>

<style scoped>
    .product{
        height: calc(100vh - 47px);
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
        height: 245px;
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
