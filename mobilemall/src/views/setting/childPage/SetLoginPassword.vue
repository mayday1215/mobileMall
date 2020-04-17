<template>
    <div>
        <van-nav-bar
                title="修改登录密码"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom"
        />
        <van-field v-model="oldPwd"
                   label="旧密码"
                   placeholder="请输入旧密码"
                   clearable
                   type="password"
        />
        <van-field v-model="newPwd"
                   label="新密码"
                   placeholder="请输入新密码"
                   :error-message="errTxt"
                   clearable
                   type="password"
        />
        <van-button type="primary" size="large" @click="submit">确认修改</van-button>
    </div>
</template>

<script>
  export default {
    name: "SetLoginPassword",
    data(){
      return {
        oldPwd:'',
        newPwd:'',
        errTxt:''
      }
    },
    methods:{
      submit(){

        if (this.newPwd === this.oldPwd){
          this.errTxt = "新密码不能和旧密码相同"
          return
        }else{
          this.errTxt = ""
        }
        this.request({
          url:this.url.setLoginPws,
          method:"post",
          data:{
            password:this.oldPwd,
            newPassword:this.newPwd
          }
        }).then(res => {
          console.log(res)
          if (res.errcode == 90131){
            this.$toast("旧密码验证错误")
          }else if (res.errcode == 0){
            this.$toast("登录密码修改成功\n请重新登录")
            this.oldPwd = this.newPwd = ""
            sessionStorage.removeItem("token")
            this.$store.commit("loginSaveUser",{})
            this.$router.push('/user')

          }

        })
      }
    }
  }
</script>

<style scoped>

</style>
