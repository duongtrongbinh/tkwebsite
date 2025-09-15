<template>
  <div class="menu-master">
    <el-button text>
      Website<el-icon><ArrowDown /></el-icon>
    </el-button>
    <el-button text>Email</el-button>
    <el-button text>
      Bảng giá<el-icon><ArrowDown /></el-icon>
    </el-button>
    <el-button text>
      Khách hàng<el-icon><ArrowDown /></el-icon>
    </el-button>
    <el-button text>Thêm</el-button>
    <el-button text>Khuyến mãi</el-button>
  </div>
</template>
<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
</script>
<style scoped lang="scss">
@use 'index.scss';
</style>
