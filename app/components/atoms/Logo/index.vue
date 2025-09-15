<template>
  <div class="logo" @click="handleClick()">
    <el-image :src="props.logo" fit="contain">
      <template #error>
        <div class="avatar">
          <img
            src="~/assets/images/avatar-default.png"
            alt="logo default"
          />
        </div>
      </template>
    </el-image>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleClick = () => {
  router.push('/')
}
const props = defineProps({
  logo: {
    type: String,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
@use 'index.scss';
</style>