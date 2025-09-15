import { nextTick } from 'vue'
import { ElLoading } from 'element-plus'

export const useLoading = (loadingRef: Ref<boolean>) => {
  const withLoading = async (asyncFn: () => Promise<any>) => {
    const loadingInstance= ref<any>(null)
    try {
      loadingRef.value = true

      await nextTick(() => {
        loadingInstance.value = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
      })

      const result = await asyncFn()
      return result
    } catch (error) {
      console.error('Loading error:', error)
      throw error
    } finally {
      if (loadingInstance.value) {
        loadingInstance.value.close()
      }
      loadingRef.value = false
    }
  }

  return { withLoading }
}