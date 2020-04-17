<template>
    <div>
        <van-popup
                v-model="$store.state.isPoP"
                position="bottom"
                :style="{height:'70%'}"
                :close-on-click-overlay="false">
            <van-nav-bar title="付款" @click-left="close">
                <van-icon name="cross" slot="left"/>
            </van-nav-bar>
            <!-- 密码输入框 -->
            <van-password-input info="密码为 6 位数字"  :value="pwd" :mask="true"/>
            <!-- 数字键盘 -->
            <van-number-keyboard :show="true" @input="setPwd" v-model="pwd" />
        </van-popup>

    </div>
</template>

<script>
  export default {
    name: "Pwdcom",
    data(){
      return {
        show:true,
        pwd:'',
        orderId:null
      }
    },
    created(){
      console.log("tanchu")
      if (this.$route.query.orderId){
        this.orderId = this.$route.query.orderId
        return
      }
      this.bus.$on("orderId",order => {
        this.orderId = order.id
      })
    },
    methods:{
      //输入密码  当密码到6位数发富矿
      setPwd(){
        this.$nextTick(()=>{
          console.log(this.pwd);
          if (this.pwd.length >= 6){
            console.log("开始了")
            //发请求
            this.request({
              url:this.url.pay+"?order_id="+this.orderId,
              method:'post',
              data:{
                pay_password:this.pwd
              }
            }).then(res => {
              console.log(res)
             if (res.errcode == 901201){
               //支付密码有误
               this.$toast("支付密码有误")
               this.pwd = ""
             }else if(res.errcode == 0){
               this.$router.push("/paySuccess")
             }
            })

          }
        })
      },
      //xx取消
      close(){
        this.$store.commit("updateIsPop",false)
        this.$router.push({
          path:"/orderInfo",
          query:{
            orderId:this.orderId
          }
        })
      }

    },
    destroyed() {

    }
  }
</script>

<style scoped>

</style>
