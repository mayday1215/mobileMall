<template>
    <div>
        <like-list-nav-bar></like-list-nav-bar>
        <like-list-main :likeList="likeList"></like-list-main>
    </div>
</template>

<script>
    import LikeListNavBar from "./child/LikeListNavBar";
    import LikeListMain from "./child/LikeListMain";
  export default {
    name: "LikeList",
    components:{
      LikeListNavBar,
      LikeListMain
    },
    data(){
      return {
        likeList:null
      }
    },
    created(){
      this.getLikeList()
    },
    methods:{
      getLikeList(){
        this.request({
          url:this.url.likeAll,
          method:"get"
        }).then(res => {
          console.log(res)
          this.likeList = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
