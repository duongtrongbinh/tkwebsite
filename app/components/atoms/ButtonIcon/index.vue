<template>
  <div class="button-icon">
    <Icon :name="name" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
}>();
</script>

<style lang="scss" scoped>
@use 'index.scss';
</style>