<template>
    <div>
        <address-edit-nav-bar></address-edit-nav-bar>

        <address-edit-main></address-edit-main>
    </div>
</template>

<script>
    import AddressEditNavBar from "./child/AddressEditNavBar";
    import AddressEditMain from "./child/AddressEditMain";
  export default {
    name: "AddressEdit",
    components: {AddressEditMain, AddressEditNavBar}
  }
</script>

<style scoped>

</style>
