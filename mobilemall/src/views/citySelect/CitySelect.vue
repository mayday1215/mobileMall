<template>
    <div>
        <van-nav-bar
                title="选择城市"
                :left-text="cityName"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom"
                fixed
                z-index="9999"
        />

        <div class="main">
            <van-index-bar>
                <template v-for="(value,key) in citys"  >
                    <van-index-anchor :index="key"/>
                    <van-cell :title="item.name" v-for="item in value" @click="selectClick(item)"/>
                </template>
            </van-index-bar>
        </div>
    </div>
</template>

<script>
  export default {
    name: "CitySelect",
    methods:{
      selectClick(item){
        this.$store.commit("updateSelectCity",item.name)
        this.$router.back()
      }
    },
    computed: {
      citys() {
        return this.$store.state.city.cities
      },
      cityName() {
        if (!this.$store.state.selectCity) {
          return
        }
        return this.$store.state.selectCity
      }
    }
  }
</script>

<style scoped>
    .main {
        height: calc(100vh - 47px);
        overflow-y: scroll;
        margin-top: 47px;
        -webkit-overflow-scrolling: touch;
    }

</style>
