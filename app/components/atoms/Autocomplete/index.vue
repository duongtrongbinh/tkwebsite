<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    popper-class="my-autocomplete"
    highlight-first-item
    placeholder="Please input"
    @select="handleSelect"
  >
    <template #header>header content</template>
    <template #suffix>
      <el-icon class="el-input__icon" @click="handleIconClick">
        <edit />
      </el-icon>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="link">{{ item.link }}</span>
    </template>
    <template #loading>
      <el-icon class="is-loading">
        <svg class="circular" viewBox="0 0 20 20">
          <g
            class="path2 loading-path"
            stroke-width="0"
            style="animation: none; stroke: none"
          >
            <circle r="3.375" class="dot1" rx="0" ry="0" />
            <circle r="3.375" class="dot2" rx="0" ry="0" />
            <circle r="3.375" class="dot4" rx="0" ry="0" />
            <circle r="3.375" class="dot3" rx="0" ry="0" />
          </g>
        </svg>
      </el-icon>
    </template>
    <template #footer>
      <el-button link size="small" @click="handleClear"> Clear </el-button>
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'

interface LinkItem {
  value: string
  link: string
}

const footerSlotstate = ref('')
const state = ref('')
const links = ref<LinkItem[]>([])
let timeout: ReturnType<typeof setTimeout>
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value
    
  clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(results)
    }, 5000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}
const handleSelect = (item: Record<string, any>) => {
  console.log(item)
}

const handleIconClick = (ev: Event) => {
  console.log(ev)
}

onMounted(() => {
  links.value = loadAll()
})

const footerAutocompleteRef = ref()
const handleClear = () => {
  footerSlotstate.value = ''
  footerAutocompleteRef.value.getData()
}
</script>

<style scoped lang="scss">
@use 'index.scss';
</style>