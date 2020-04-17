<template>
    <div>
        <van-nav-bar
                title="修改昵称"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom"
        />
        <van-cell-group>
            <van-field v-model="nickname" placeholder="请输入昵称" label="昵称" clearable/>
        </van-cell-group>
        <van-button type="primary" size="large" @click="btnClick">确认修改</van-button>
    </div>
</template>

<script>
  export default {
    name: "SetNickName",
    data(){
      return {
      }
    },
    created() {
    },
    methods:{
      btnClick(){
        this.request({
          url:this.url.setNickName,
          method:'post',
          data:{
            nickname:this.nickname
          }
        }).then(res => {
          if (res.errcode == 0){
            this.$router.back()
          }
        })
      }
    },
    computed:{
      nickname:{
        set(newVla){
          this.$store.commit("updateNickname",newVla)
        },
        get(){
          if(!this.$store.state.user){
            return
          }
          return this.$store.state.user.nickname
        }

      }
    }

  }
</script>

<style scoped>

</style>
