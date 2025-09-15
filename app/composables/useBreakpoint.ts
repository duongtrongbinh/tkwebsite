import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Breakpoints } from '~/utils/breakpoints'

const isClient = typeof window !== 'undefined';
export function useBreakpoint() {
  const width = ref(isClient ? window.innerWidth : 0)

  const updateWidth = () => {
    if (isClient) {
      width.value = window.innerWidth;
    }
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const breakpoint = computed(() => {
    if (width.value >= Breakpoints.DesktopXl) return 'xl'
    if (width.value >= Breakpoints.TabletMd) return 'lg'
    if (width.value >= Breakpoints.MobileMd) return 'md'
    if (width.value >= Breakpoints.Mobile) return 'sm'
    if (width.value < Breakpoints.Mobile) return 'xs'
    if (width.value < Breakpoints.MobileXs) return 'xxs'
    return 'xl'
  })

  return { width, breakpoint }
}
