<template>
    <div>
        <van-nav-bar
                class="nav-bar-border-bottom"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
        >
            <van-search
                    slot="title"
                    v-model="value"
                    :clearable="false"
                    placeholder="请输入搜索关键词"
                    @input="debuonce(search)"
            />
        </van-nav-bar>
    </div>
</template>

<script>
  export default {
    name: "SearchNavBar",
    data(){
      return {
        value:'',
        interId:0
      }
    },
    methods:{
      //防抖函数
      debuonce(fn){
        clearTimeout(this.interId) //
        this.interId = setTimeout(() => {
          fn()
        },500)
      },
      search(){
        this.request({
          url:this.url.productList,
          method:'get',
          params:{
            page:1,
            size:20,
            key:this.value
          }
        }).then(res => {
          if (this.value.trim() == ""){
            this.bus.$emit("searchData",null)
            return
          }
          this.bus.$emit("searchData",res.data)
        })
      }
    }
  }
</script>

<style scoped>
    .van-nav-bar{
        display: flex;
        align-items: center;

    }
    .van-search{
        padding: 0;
        margin-left: 20px;

    }
</style>
