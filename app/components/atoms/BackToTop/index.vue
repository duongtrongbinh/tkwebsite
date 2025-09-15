<template>
  <div>
    <button v-if="showButton" class="back-to-top" @click="scrollToTop">
      <img :src="BacktotopIcon" alt="review-icon" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import BacktotopIcon from "~/assets/icons/back-to-top.svg"

const showButton = ref<boolean>(false)
/**
 * Scrolls the window to the top smoothly.
 */

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

/**
 * This function toggles the visibility of the "Back to Top" button
 * based on the user's scroll position relative to the footer.
 *
 */
const handleScroll = () => {
  const footer = document.querySelector("footer")
  if (footer) {
    const footerRect = footer.getBoundingClientRect()
    showButton.value = footerRect.top <= window.innerHeight
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style lang="scss" scoped>
@use "index.scss";
</style>
