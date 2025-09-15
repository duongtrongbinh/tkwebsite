<template>
  <div v-if="model" class="pagination">
    <el-button link @click="decrease" :class="{ disabled: isFirst }" :disabled="isFirst">
      <img src="~/assets/icons/back-gray.svg" alt="icon back" />
    </el-button>
    <div class="progress">
      <p>{{ model.progress + "/" + model.total }}</p>
    </div>
    <el-button link @click="increase" :class="{ disabled: isLast }" :disabled="isLast">
      <img src="~/assets/icons/right-gray.svg" alt="icon right" />
    </el-button>
  </div>
</template>
<script setup lang="ts">
const model = defineModel<{
  progress: number;
  total: number;
}>()

const emit = defineEmits(['change'])
const isFirst = computed(() => model.value ? model.value.progress === 1 : true)
const isLast = computed(() => model.value ? model.value.progress === model.value.total : true)

const increase = () => {
  if (model.value) {
    model.value.progress++
    if (model.value.progress > model.value.total) {
      model.value.progress = model.value.total
    }
    emit('change', model.value.progress)
  }
}
const decrease = () => {
  if (model.value) {
    model.value.progress--
    if (model.value.progress < 1) {
      model.value.progress = 1
    }
    emit('change', model.value.progress)
  }
}
</script>
<style scoped lang="scss">
@use 'index.scss';
</style>
