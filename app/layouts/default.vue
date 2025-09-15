<template>
  <el-container>
    <el-header>
      <OrganismsLayoutsHeader />
    </el-header>
    <el-main>
      <slot />
    </el-main>
    <el-footer>
      <OrganismsLayoutsFooter />
    </el-footer>
    <AtomsBackToTop />
    <MoleculesPopupSearch v-model="uiStore.uiState.isSearch" />
    <MoleculesPopupLogin v-model="uiStore.uiState.isLoginDialog" />
    <MoleculesPopupRegister v-model="uiStore.uiState.isRegisterDialog" />
  </el-container>
</template>
<script lang="ts" setup>
import { useUiStore } from '@/stores'

const uiStore = useUiStore()
</script>
<style lang="scss" scoped>
@use '~/assets/scss/main.scss' as *;

:deep(.el-header) {
  padding: 0 !important;
  height: 5rem;
  width: 100%;
  position: fixed;
  background-color: rgba(255, 255, 255, .9);
  backdrop-filter: blur(.625rem);
  border-bottom: .05rem solid $color-gray-light;
  z-index: 100;
}

:deep(.el-footer) {
  padding: 0 !important;
  height: 15rem;
  background-color: $color-gray-light;
}

:deep(.el-main) {
  padding: 0 !important;
  background-color: $color-white;
  min-height: calc(100vh - 20rem);
  margin-top: 5rem;
}
</style>