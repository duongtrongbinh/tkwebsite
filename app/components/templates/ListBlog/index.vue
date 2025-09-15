<template>
  <div class="blog__header">
    <div class="blog__header--title">
      <div class="blog__header-title--main container">
        <h1>Blog công nghệ</h1>
        <p>
          Blog chuyên chia sẻ các kiến thức về công nghệ, lập trình website, sắp tới có thể có thêm mobile. 
          Chủ yếu làm về các tin tức mới liên quan đến php, laravel, js, vue, nuxt, và các phần liên quan đến máy chủ....
        </p>
      </div>
    </div>
  </div>
  <section class="feature-list-blog">
    <el-row :gutter="24" class="container">
      <el-col class="wrapper-feature-list-blog container" :md=18 :sm=18 :xs=18>
        <Carousel v-model="data.progress">
          <Slide v-for="(slide, index) in data.blogs" :key="index">
            <MoleculesItemBlog :blogs="slide" />
          </Slide>
        </Carousel>
        <AtomsPaginationBlog v-model="pagination" @change="onPageChange" />
      </el-col>
      <el-col :md=6 :sm=6 :xs=6>
        <AtomsBannerBlog />
      </el-col>
    </el-row>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { chunkArray } from "~/utils/helpers"
import type { Blog, BlogResponse } from "~/types"
import { useBlog } from '@/api/useBlog'
import { PAGINATION_LIST_BLOG, PAGINATION_LIST_BLOG_DEFAULT } from "~/utils/constants"

const { breakpoint } = useBreakpoint()
const { getBlogs } = useBlog()
const dataBlogs = ref<BlogResponse>()
const data = ref<{ blogs: Blog[][]; progress: number, total: number }>({
  blogs: [],
  progress: 0,
  total: 0,
})

const itemsPerSlide = computed(() => {
  if (breakpoint.value === 'xl' || breakpoint.value === 'lg') return PAGINATION_LIST_BLOG
  if (breakpoint.value === 'md') return PAGINATION_LIST_BLOG_DEFAULT
  return PAGINATION_LIST_BLOG
})

const processJobChunks = (blogs: BlogResponse) => {
  const values = chunkArray(blogs.blogs, itemsPerSlide.value)
  data.value = {
    blogs: values,
    progress: 0,
    total: values.length,
  }
}

const fetchBlogs = async (page?: number) => {
  dataBlogs.value = await getBlogs(page)
  if (dataBlogs.value) {
    processJobChunks(dataBlogs.value)    
  }
}

const onPageChange = (page: number) => {
  fetchBlogs(page)
}

onMounted(() => {
  fetchBlogs()
})


const pagination = computed(() => {
  return dataBlogs.value?.pagination
    ? { progress: dataBlogs.value.pagination.current_page || 0, total: dataBlogs.value.pagination.last_page || 0 }
    : undefined
})
</script>

<style lang="scss" scoped>
@use "index.scss";
</style>
