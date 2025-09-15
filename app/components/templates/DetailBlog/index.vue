<template>
  <section>
    <el-row class="container" :gutter="24">
      <el-col>
        <AtomsBreadcrumb />
      </el-col>
      <el-col :md="16" :sm="16" :xs="24">
        <MoleculesItemDetailBlog />
      </el-col>
      <el-col :md="8" :sm="8" :xs="24">
      </el-col>
    </el-row>
  </section>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use "index.scss";
</style>
