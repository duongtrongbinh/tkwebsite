import { useRouter } from "vue-router"
import { nextTick } from "vue"
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { useAxios } from "@/api/useAxios"
import { ElLoading } from "element-plus"
import type { responseError, responseFail, responseSuccess } from "~/types"
import { useAuthStore } from "@/stores/auth"
import { RESPONSE_STATUS_CODE } from "~/utils/contant-code"

export const useApi = () => {
  const router = useRouter()
  const isRefreshingToken = ref(false)
  const authStore = useAuthStore()
  const loadingInstance= ref<any>(null)
  const $axios = useAxios()

  const checkRefreshToken = async () => {
    const tokenExpired = localStorage.getItem('token_expired')
    if (tokenExpired && parseInt(tokenExpired) - new Date().getTime() <= 0) {
      await refreshToken()
    }
  }

  const refreshToken = async () => {
    if (isRefreshingToken) {
      return
    }
    startRefreshToken()

    try {
      const response = await $axios.post('refresh', [], {
        headers: {
          Authorization: localStorage.getItem('refresh_token') || '',
        }
      })

      if (response.data.success) {
        authStore.setToken(response.data.authorization.token, response.data.authorization.exprire_in ?? 0)
        authStore.setUser(response.data.user)
      } else {
        await router.push("/login")
      }

      finishRefreshToken()
    } catch (e) {
      console.error(e)
      localStorage.removeItem('refresh_token')
      finishRefreshToken()
      router.push('/login')
    }
  }

  const startRefreshToken = () => {
    isRefreshingToken.value = true
  }

  const finishRefreshToken = () => {
    isRefreshingToken.value = false
  }

  const http = async <T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    apiPath: string,
    data?: Record<string, unknown>,
    config: AxiosRequestConfig = {},
    loading: boolean = true
  ): Promise<responseSuccess<T> | responseFail<T> | responseError | void> => {
    await checkRefreshToken()

    if (loading) {
      await nextTick(() => {
        loadingInstance.value = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
      })
    }

    const requestConfig: AxiosRequestConfig = {
      ...config,
      url: apiPath,
      method
    }

    if (method === "GET") {
      requestConfig.params = data
    } else {
      requestConfig.data = data
    }

    try {
      const response: AxiosResponse<responseSuccess<T> | responseFail<T> | responseError> = await $axios(requestConfig)
      if (response.data.success && response.status === RESPONSE_STATUS_CODE.SUCCESS) {
        return response.data as responseSuccess<T>
      } else {
        return response.data as responseFail<T>
      }
    } catch (error: unknown) {
      handleApiError(error)
      const axiosError = error as AxiosError<any>
      const message = axiosError.response?.data?.errors?.error_message || "Đã xảy ra lỗi"
      const error_code = axiosError.response?.data?.errors?.error_code || ""
      return {
        success: false,
        message: message,
        error_code: error_code
      } as responseError
    } finally {
      if (loading) {
        await nextTick(() => {
          if (loading && loadingInstance.value) {
            loadingInstance.value.close()
          }
        })
      }
    }
  }

  const handleApiError = (error: unknown) => {
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as { response: { status: number, data?: responseError } }
      const status = axiosError.response.status

      if (status === RESPONSE_STATUS_CODE.FORBIDDEN) {
        router.push("/")
      } else if (status === RESPONSE_STATUS_CODE.NOT_FOUND) {
        router.push("/404")
      } else if (status === RESPONSE_STATUS_CODE.UNAUTHORIZED) {
        if (localStorage.getItem('refresh_token')) {
          refreshToken()
          return
        }
        authStore.clearToken()
        authStore.clearUser()
        router.push("/login")
      }
    } else {
      console.error("Unknown error:", error)
    }
  }

  const GET = <T>(apiPath: string, params?: Record<string, any>, config?: AxiosRequestConfig, loading: boolean = true) =>
    http<T>("GET", apiPath, params, config, loading)

  const POST = <T>(apiPath: string, data?: Record<string, any>, config?: AxiosRequestConfig, loading: boolean = true) =>
    http<T>("POST", apiPath, data, config, loading)

  const PUT = <T>(apiPath: string, data?: Record<string, any>, config?: AxiosRequestConfig, loading: boolean = true) =>
    http<T>("PUT", apiPath, data, config, loading)

  const PATCH = <T>(apiPath: string, data?: Record<string, any>, config?: AxiosRequestConfig, loading: boolean = true) =>
    http<T>("PATCH", apiPath, data, config, loading)

  const DELETE = <T>(apiPath: string, params?: Record<string, any>, config?: AxiosRequestConfig, loading: boolean = true) =>
    http<T>("DELETE", apiPath, params, config, loading)

  return {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
  }
}
