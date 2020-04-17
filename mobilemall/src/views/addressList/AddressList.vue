<template>
    <div>
        <address-list-nav-bar></address-list-nav-bar>

        <address-list-data></address-list-data>
    </div>
</template>

<script>
    import AddressListNavBar from "./child/AddressListNavBar";
    import AddressListData from "./child/AddressListData";
  export default {
    name: "AddressList",
    components: {AddressListData, AddressListNavBar}
  }
</script>

<style scoped>

</style>
