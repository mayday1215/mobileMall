<template>
    <van-nav-bar
            title="精选"
            class="nav-bar-border-bottom"
            @click-left="citySelect"
            @click-right="searchClick"
    >
        <div slot="left">
            <van-icon fixed name="location-o" size="17px"></van-icon>
            {{cityName}}
        </div>
        <van-icon name="search" slot="right" size="20px"/>
    </van-nav-bar>
</template>

<script>
  export default {
    name: "HomeNavBar",
    methods:{
      //搜索
      searchClick(){
        this.$router.push("/search")
      },
      //选择城市
      citySelect(){
        this.$router.push("/citySelect")
      }
    },
    computed:{
      cityName(){
        if (!this.$store.state.selectCity){
          return
        }
        return this.$store.state.selectCity
      }
    }
  }
</script>

<style scoped>

</style>
