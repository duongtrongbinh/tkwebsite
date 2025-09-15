<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :to="item.path"
    >
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((segment) => segment); // Loại bỏ các đoạn rỗng
  const crumbs = [
    {
      name: 'Home',
      path: '/',
    },
  ];

  let currentPath = '';
  pathArray.forEach((segment, index) => {
    currentPath += `/${segment}`;
    crumbs.push({
      name: formatName(segment),
      path: currentPath,
    });
  });

  return crumbs;
});

const formatName = (segment: string) => {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
};
</script>
<style lang="scss" scoped>
@use "index.scss"
</style>