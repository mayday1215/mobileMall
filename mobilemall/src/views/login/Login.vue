<template>
    <div>
        <van-nav-bar
                title="登录/注册"
                left-text="返回"
                left-arrow
                class="nav-bar-border-bottom"
                @click-left="back"
        />

        <van-cell-group>
            <van-field
                    v-model="username"
                    label="用户名"
                    placeholder="请输入用户名"
                    :error-message="nameErr"/>
        </van-cell-group>
        <van-cell-group>
            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    :error-message="pwdErr"/>
        </van-cell-group>
        <van-button type="primary" size="large" @click="loginClick">登录/注册</van-button>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
        return {
          username:'',
          password:'',
          nameErr:'',
          pwdErr:''
        }
    },
    methods:{

      loginClick(){
        if (this.username.trim() === ""){
          this.nameErr = "账号不能为空"
          return;
        }else{
          this.nameErr = ""
        }
        if (this.username.trim().length <= 5){
          this.nameErr="账号不能小于5个字符"
          return;
        }else{
          this.nameErr=""
        }
        if (this.password.trim() === ""){
          this.pwdErr = "密码不能为空"
          return
        }else{
          this.pwdErr = ""
        }

        if (this.password.trim().length <= 5){
          this.pwdErr="密码不能小于5个字符"
          return;
        }else{
          this.pwdErr=""
        }
        this.request({
          url:this.url.signin,
          method:"post",
          data:{
            name:this.username,
            password:this.password
          }
        }).then(res => {
          if (res.errcode == 90102){
            //账号或密码有误
            this.pwdErr = res.errmsg
          }else if(res.errcode == 0){
            //登录成功
            this.$store.commit("loginSaveUser",res.data)
            sessionStorage.setItem("token",res.data.token)
            this.$router.back()

          }
        })
      },
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
