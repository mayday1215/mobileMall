<template>
    <div>
        <van-address-list
                v-model="chosenAddressId"
                :list="addressList"
                :switchable="$route.query.from == 'user' ? false : true"
                @edit="editClick"
                @add="addClick"
                @select="select"
        />
    </div>
</template>

<script>
  export default {
    name: "AddressListData",
    data() {
      return {
        chosenAddressId: '1',
        list: [

        ],

      }
    },
    created() {

    },
    computed:{},

    methods:{
      //选中地址
      select(item){
        this.$store.commit("updateSelectAddr",item)
        this.$router.back()

      },
      //编辑地址
      editClick(item){
        this.$router.push({
          path:"/addressEdit",
          query:{
            id:item.id
          }
        })
      },
      //新增地址
      addClick(){
        this.$router.push({
          path:"/addressEdit",
          query:{
            id:0
          }
        })
      }
    },
    computed:{
      addressList(){
        let list =[]
        if (!this.$store.state.user){
          return
        }
        this.$store.state.user.addressList.forEach(item => {
          list.push({
            id:item.id,
            name:item.name,
            tel:item.mobile,
            address:`${item.province} ${item.city} ${item.country} ${item.detail}`
          })
        })
        return list
      }
    }
  }
</script>

<style scoped>
.van-radio-group{
    height: calc(100vh - 47px - 50px);
    overflow-y: scroll;
    margin-top: 47px;
    -webkit-overflow-scrolling: touch;
}
</style>
