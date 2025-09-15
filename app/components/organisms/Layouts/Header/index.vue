<template>
  <div class="header">
    <AtomsLogo :logo="Logo" />
    <!-- <MoleculesMenu /> -->
    <AtomsMenu />
    <div class="header__redirect">
      <AtomsButtonIcon :name="`oui:search`" @click="uiStore.toggleUiState('isSearch')" />
      <AtomsButtonDefault :title="`Đăng ký`" @click="uiStore.toggleUiState('isRegisterDialog')" />
      <AtomsButtonDefault :title="`Đăng nhập`" @click="uiStore.toggleUiState('isLoginDialog')" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from '~/assets/images/logo.png'
import { useUiStore } from '@/stores'

const uiStore = useUiStore()
</script>
<style lang="scss" scoped>
@use 'index.scss';
</style>