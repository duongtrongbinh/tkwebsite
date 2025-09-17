<template>
  <div class="header">
    <AtomsLogo :logo="Logo" />
    <!-- <MoleculesMenu /> -->
    <AtomsMenu />
    <div class="header__redirect">
      <!-- <AtomsButtonIcon :name="`oui:search`" @click="uiStore.toggleUiState('isSearch')" /> -->
      <AtomsButtonDefault :title="`Đăng nhập`" @click="router.push('/login')" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from '~/assets/images/logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<style lang="scss" scoped>
@use 'index.scss';
</style>