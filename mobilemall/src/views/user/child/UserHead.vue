<template>
    <div class="head">
        <div class="content" v-if="userShow">
            <img :src="`http://127.0.0.1:8360${$store.state.user.avatar}`" alt="">
            <div class="nickname">{{$store.state.user.nickname}}</div>
        </div>
        <div class="content" v-else>
            <img src="~assets/img/profile.png" alt="">
            <div class="nickname" @click="loginClick">登录</div>
        </div>

    </div>
</template>

<script>
  export default {
    name: "UserHead",
    methods:{
      loginClick(){
        this.$router.push("/login")
      }
    },
    computed:{
      userShow(){
        if (!this.$store.state.user){
          return
        }
        return this.$store.state.user.name ? true : false
      }
    }
  }
</script>

<style scoped>
    .head{
        height: 25vw;
        background: #F37D0F;
        /*position: fixed;*/
        /*left: 0;*/
        /*top: 0;*/
        /*right: 0;*/
        /*box-shadow: 0 2px 2px rgba(100,100,100,.4);*/
    }
    .head .content{
        display: flex;
    }
    .head .content img{
        width: 17vw;
        height: 17vw;
        margin-left: 5vw;
        margin-top: 3vw;
        border-radius: 50%;
        vertical-align: middle;


    }
    .head .nickname{
        margin-left: 10px;
        color: #ffffff;
        margin-top: 27px;
    }

</style>
