import type { AxiosInstance } from "axios"

let isMessageActive = false

export const useAxios = (): AxiosInstance => {
  const { $axios } = useNuxtApp()

  $axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  $axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (isMessageActive) return Promise.reject(error)
      isMessageActive = true

      return Promise.reject(error)
    }
  )

  return $axios
}
