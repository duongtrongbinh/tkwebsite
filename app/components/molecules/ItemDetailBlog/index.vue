<template>
  <div v-if="blog" class="content__wrapper">
    <h1>{{ blog.title }}</h1>
    <div class="content__wrapper__info">
      <p>{{ blog.author }}</p>
      <span v-if="blog.published_at">{{ formatDate(blog.published_at) }}</span>
    </div>
    <el-image :src="blog.thumbnail" fit="contain" />
    <div class="content" v-html="blog.content" />
  </div>
</template>
<script setup lang="ts">
import { useBlog } from "@/api/useBlog"
import type { Blog, BlogResponse } from '~/types'
import { useRoute } from 'vue-router'
import { formatDate } from '~/utils/formatters'

const { detailBlog } = useBlog()
const blog = ref<Blog | null>(null)
const route = useRoute()


const fetchDetailBlog = async () => {
  const response = await detailBlog(route.params.slug as string)
  if (response) {
    blog.value = response
  }
}

onMounted(async () => {
  await fetchDetailBlog()
})
</script>
<style lang="scss" scoped>
@use "index.scss";
</style>
