<template>
  <el-row v-if="props.blogs" :gutter="24">
    <el-col v-for="(item, index) in props.blogs" :key="index" :xl=8 :lg=8 :md=8 :sm=12 :xs=12 class="col-xxs-6">
      <section class="box-job">
        <nuxt-link :to="'/blogs/' + item.slug">
          <div class="box-job-item">
            <div class="box-body">
              <div class="box-body__logo">
                <el-image :src="item.thumbnail" fit="cover" :lazy="true" >
                  <template #error>
                    <div class="loading-failed">
                      <Icon name="flat-color-icons:cancel" />
                      <span>Image load failed</span>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="box-body__company title-blog">
                <div class="title-blog__info">
                  <h3>{{ item.author }}</h3>
                  <span>{{ formatDate( item.created_at) }}</span>
                </div>
                <el-tooltip
                  effect="dark"
                  :content="item.title"
                  placement="top"
                >
                  <nuxt-link>{{ item.title }}</nuxt-link>
                </el-tooltip>
                <p v-html="item.content" />
              </div>
            </div>
          </div>
        </nuxt-link>
      </section>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import type { Blog } from '~/types'
import { formatDate } from '~/utils/formatters'
import type { PropType } from 'vue'

const props = defineProps({
  blogs: {
    type: Object as PropType<Blog[]>,
    required: false,
  },
})
</script>
<style lang="scss" scoped>
@use "index.scss";
</style>
