<template>
  <el-dialog
    v-model="isShow"
    modal-class="popup-search"
    :show-close="false"
    @close="uiStore.setUiState('isSearch' ,!uiStore.getUiState('isSearch'))"
  >
    <AtomsAutocomplete />
  </el-dialog>
</template>
<script lang="ts" setup>
import { useUiStore } from '@/stores'

const uiStore = useUiStore()
const isShow = defineModel<boolean>({ default: false });
</script>
<style lang="scss" scoped>
:deep(.popup-search .el-dialog) {
  background-color: transparent !important;
  box-shadow: none !important;
}
// @use 'index.scss';
</style>