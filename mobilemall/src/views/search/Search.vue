<template>
    <div>
        <search-nav-bar></search-nav-bar>
        <search-main></search-main>
    </div>
</template>

<script>
    import SearchNavBar from "./child/SearchNavBar";
    import SearchMain from "./child/SearchMain";
  export default {
    name: "Search",
    components: {SearchMain, SearchNavBar}
  }
</script>

<style scoped>

</style>
