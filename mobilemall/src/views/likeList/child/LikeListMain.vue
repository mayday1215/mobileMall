<template>
    <div class="main">
        <van-cell
                v-for="item in likes"
                :key="item.id"
                :title="`${item.name.split(' ')[0]}`"
                :label="`￥${item.price}`"
                :icon="item.cover"
                is-link
                :to="{path:'/productInfo',query:{id:item.id}}"
        />
    </div>
</template>

<script>
  export default {
    name: "LikeListMain",
    props:{
      likeList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    computed:{
      likes(){
        if (!this.likeList){
          return
        }
        return this.likeList
      }
    }
  }
</script>

<style scoped>
    .main{
        padding:0 10px;
        height: calc(100vh - 47px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        margin-top: 47px;
    }
    .van-cell{
        /*box-shadow: 0 0 3px rgba(0,0,0,.3);*/
        padding: 10px;
        margin-top: 10px;
        /*border-radius: 5px;*/
        }
.van-icon__image{
    width: 50px;
    height: 50px;
}

</style>
