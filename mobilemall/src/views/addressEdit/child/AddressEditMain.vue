<template>
    <div>
        <van-address-edit
                :area-list="$store.state.area"
                :show-delete="addressId != 0"
                show-set-default
                :address-info="addressInfo"
                @save="saveClcik"
                @delete="delClcik"

        />
    </div>
</template>

<script>
  export default {
    name: "AddressEditMain",
    data() {
      return {
        addressId: null,

      }
    },
    created() {
      this.addressId = this.$route.query.id
    },
    methods:{
      //点击保存按钮
      saveClcik(content){
        /*
        * name:收货人名称
        province:省份
        city: 城市名称
        country:区或者县
        detail:详细地址门牌号
        mobile: 联系电话
        code:区域编码
        default:是否为默认地址(1为是，0为否,默认为0)
        *
        * */

        /*
        *
        * name: "234"
tel: "18312001680"
country: ""
province: "浙江省"
city: "绍兴市"
county: "越城区"
areaCode: "330602"
postalCode: ""
addressDetail: "234234"
isDefault: true
id: 10
        * */
        let addr = {
          name:content.name,
          province:content.province,
          city:content.city,
          country:content.county,
          detail:content.addressDetail,
          mobile:content.tel,
          code:content.areaCode,
          default:content.isDefault ? 1 : 0
        }
        if (this.addressId != 0){
          //修改地址
          this.request({
            url:this.url.updateAdd + "?id="+this.addressId,
            method:'post',
            data:addr
          }).then(res => {
            if (res.errcode == 0){
              if (addr.default) {
                this.$store.commit("updateSelectAddr",{
                  id :this.addressId,
                  name:addr.name,
                  tel:addr.mobile,
                  address:`${addr.province}${addr.city}${addr.country}${addr.detail}`
                })
              }else{
                this.$store.commit("updateSelectAddr",{})
              }
                addr.id = this.addressId
                this.$store.commit("updateAddr",addr)
                this.$router.back()

            }
          })
        }else{
          //保存地址
          this.request({
            url:this.url.createAdd,
            data:addr,
            method:'post',
          }).then(res => {
            console.log(res)
            if (res.errcode == 0){
              if (addr.default) {
                console.log("有")
                this.$store.commit("updateSelectAddr",{
                  id :this.addressId,
                  name:addr.name,
                  tel:addr.mobile,
                  address:`${addr.province}${addr.city}${addr.country}${addr.detail}`
                })
              }else{
                console.log("空")
                this.$store.commit("updateSelectAddr",{})
              }
              this.$store.commit("createAddr",res.data)
              this.$router.back()
            }
          })
        }
      },
      //删除地址
      delClcik(){
        this.request({
          url:this.url.delethAdd,
          method:'get',
          params:{
            id:this.addressId
          }
        }).then(res => {
          console.log(res)
          if (res.errcode == 0){
            this.$store.commit("delAddr",this.addressId)
            this.$router.back()
          }
        })
      }
    },
    computed: {
      addressInfo() {
        if (!this.$store.state.user) {
          return
        }
        let addInfo = {}

        //   city:"深圳市"
        //   country:"龙华区"
        //   create_time:1586873326606
        // default:1
        //   delete_time:null
        //   detail:"宜驻公寓"
        //   id:12
        //   mobile:"18312001680"
        //   name:"申屠小帅"
        //   province:"广东省"
        //   update_time:null
        //   user_id:14
        let code = 0
        this.$store.state.user.addressList.forEach(item => {
          if (item.id == this.addressId) {
            addInfo.id = item.id
            addInfo.name = item.name
            addInfo.tel = item.mobile
            addInfo.province = item.province
            addInfo.city = item.city
            addInfo.county = item.country
            addInfo.addressDetail = item.detail
            addInfo.areaCode = item.code
            addInfo.isDefault = item.default == 1 ? true : false


          }
        })
        return addInfo
      }
    }
  }
</script>

<style scoped>

</style>
