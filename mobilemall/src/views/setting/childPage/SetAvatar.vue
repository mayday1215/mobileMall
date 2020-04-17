<template>
    <div>
        <van-nav-bar
                title="设置头像"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom"
        />

        <div class="main">
            <div class="avatar">
                <img :src="avatarImg" ref="img" alt="">
            </div>
        </div>



        <div class="bottom">
            <input type="file" ref ="file" class="file" @change="fileChange">
            <van-button type="info" size="large" @click="selectImg">选择图片</van-button>
            <van-button type="primary" size="large" @click="upAvater">上传图片</van-button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "SetAvatar",
    methods:{
      selectImg(){
        this.$refs.file.click()
      },
      fileChange(){
        //读取的文件信息
        let fileInfo = this.$refs.file.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(fileInfo)
        reader.onload = () => {
          this.$refs.img.src = reader.result
        }
      },
      //上传头像
      upAvater(){
        let formData = new FormData()
        formData.append("avatar",this.$refs.file.files[0])

        this.request({
          url:'/user/avatar',
          method:'post',
          data:formData
        }).then(res => {
          if (res.errcode == 0){
            this.$store.commit("updateAvatar",res.data.avatar)
            this.$router.push("/user")
          }
        })

      }
    },
    computed:{
      avatarImg(){
        if (!this.$store.state.user){
          return
        }
        return `http://127.0.0.1:8360${this.$store.state.user.avatar}`
      }
    }

  }
</script>

<style scoped>

    .main{
        width: 100vw;
        height: calc(100vh - 47px - 100px);
        background: #f8f8f8;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main .avatar{
        width:100px;
        height: 100px;
        box-shadow: 0 0 4px rgba(0,0,0,.2);
        border-radius: 50%;


    }

    .main .avatar img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .file{
        display: none;
    }
</style>
