import axios from "axios"
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const axiosInstance = axios.create({
    baseURL: config.public.NUXT_API_URL as string,
    headers: {
      "Content-Type": "application/json"
    }
  })
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )
  return {
    provide: {
      axios: axiosInstance
    }
  }
})
