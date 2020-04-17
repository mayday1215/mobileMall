<template>
    <div>
        <van-nav-bar
                title="用户设置"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
                class="nav-bar-border-bottom"
        />

        <van-cell-group title="基本信息">
            <van-cell title="修改昵称" icon="setting-o" is-link to="/setNickName" />
            <van-cell title="修改头像" icon="setting-o" is-link to="/setAvatar"/>
        </van-cell-group>
        <van-cell-group title="安全">
            <van-cell title="修改登录密码" icon="setting-o" is-link to="/setLoginPassword" />
            <van-cell title="修改支付密码" icon="setting-o" is-link to="/setPayPassword"/>
        </van-cell-group>
    </div>
</template>

<script>
  export default {
    name: "Setting"
  }
</script>

<style scoped>

</style>
