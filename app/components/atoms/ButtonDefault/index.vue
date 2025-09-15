<template>
  <div class="button-default">
    <el-button>
      {{ props.title }}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  }
})
</script>
<style lang="scss" scoped>
@use 'index.scss';
</style>