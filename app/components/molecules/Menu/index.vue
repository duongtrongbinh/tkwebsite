<template>
  <div
    class="menu" 
    :class="props.flexColumn ? `flex-column` : ``"
  >
    <el-menu
      :default-active="activePath"
      :mode="props.flexColumn ? `vertical` : `horizontal`"
    >
      <el-menu-item
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :index="item.path"
      >
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { menuItems } from "~/utils/menu"

const props = defineProps({
  flexColumn: {
    type: Boolean,
    default: false,
    required: false
  }
})

const route = useRoute()
const routeToIndexMap: { [key: string]: string } = {
  '': '/',
  'category': '/category',
  'contact': '/contact',
  'blogs-slug': '/blogs/:slug',
};

const activePath = computed(() => {
  const routeName = route.name ? String(route.name) : ''
  return routeToIndexMap[routeName] || '/'
});
</script>

<style lang="scss" scoped>
@use 'index.scss';
</style>