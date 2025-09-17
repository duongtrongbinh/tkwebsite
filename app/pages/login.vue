<template>
  <el-main class="login">
    <MoleculesPopupLogin />
  </el-main>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})
</script>
<style lang="scss" scoped>
@use '~/assets/scss/main.scss' as *;

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('~/assets/images/signin-basic.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>