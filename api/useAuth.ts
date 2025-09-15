import type {
  RuleFormLogin,
  RuleFormRegister,
  User,
} from '~/types'
import { useAuthStore } from "@/stores/auth"
import type { UserAuthorizationData } from '~/types'
import { useRouter } from 'vue-router'
import { useApi } from './useApi'

export const useAuth = () => {
  const api = useApi()
  const login = useAuthStore()
  const router = useRouter()

  const auth = async (data: RuleFormLogin) => {
    const response = await api.POST<UserAuthorizationData>("login", data)
    if (response && response.success) {
      login.setToken(response.data.authorization.token, response.data.authorization.exprire_in ?? 0)
      login.setUser(response.data.user)
    } else {
      return response
    }
  }

  const register = async (data: RuleFormRegister) => {
    return await api.POST<UserAuthorizationData>("register", data)
  }

  const logout = async () => {
    const response = await api.POST("logout")
    if (response && response.success) {
      login.clearToken()
      login.clearUser()

      await router.push("/login")
    }
  }

  const me = async () => {
    const response = await api.GET<User>("me")
    if (response && response.success) {
      return response.data
    }
  }

  const loginSocial = async (provider: string, token: string) => {
    const response = await api.POST<UserAuthorizationData>(`login/${provider}`, {token})
    if (response && response.success) {
      login.setToken(response.data.authorization.token, response.data.authorization.exprire_in ?? 0)
      login.setUser(response.data.user)
    } else {
      return response
    }
  }

  return {
    auth,
    register,
    logout,
    me,
    loginSocial
  }
}