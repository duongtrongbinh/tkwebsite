<template>
  <div class="footer container">
    <el-row>
      <el-col :md="12" :sm="12" :xs="24">
        <div class="information">
          <AtomsLogo :logo="Logo" />
          <p>
          Blog chuyên chia sẻ các kiến thức về công nghệ, lập trình website, sắp tới có thể có thêm mobile.
          Chủ yếu làm về các tin tức mới liên quan đến php, laravel, js, vue, nuxt, và các phần liên quan đến máy chủ....
          </p>
        </div>
      </el-col>
      <el-col :md="4" :sm="4" :xs="24">
        <MoleculesMenu :flexColumn="true" />
      </el-col>
      <el-col :md="8" :sm="8" :xs="24">
        <div class="share">
          <AtomsButtonIcon :name="`entypo-social:facebook`" />
          <AtomsButtonIcon :name="`entypo-social:github`" />
          <AtomsButtonIcon :name="`entypo-social:youtube`" />
          <AtomsButtonIcon :name="`entypo-social:linkedin`" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import Logo from '~/assets/images/logo.png'
</script>
<style lang="scss" scoped>
@use 'index.scss';
</style>