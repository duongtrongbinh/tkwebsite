import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const isReady = ref(false)

  const setToken = (newToken: string, expires: number) => {
    localStorage.setItem('token', newToken)
    localStorage.setItem('token_expired', (new Date(new Date().getTime() + (expires - 30) * 1000)).getTime().toString())
    token.value = newToken
  }

  const setUser = (newUser: User) => {    
    localStorage.setItem('user', newUser ? JSON.stringify(newUser) : '')
    user.value = newUser
  }

  const getToken = (): string | null => {
    if (import.meta.client) {
      if (!token.value) {
        token.value = localStorage.getItem('token') ?? null
      }
    }
    return token.value
  }

  const getUser = (): User | null => {
    if (import.meta.client) {
      if (!user.value) {
        const userData = localStorage.getItem('user') ?? null
        user.value = userData ? JSON.parse(userData) : null
      }
    }
    return user.value ?? null
  }

  const clearToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('token_expired')
    token.value = ''
  }

  const clearUser = () => {
    localStorage.removeItem('user')
    user.value = null
  }

  const isAuthenticated = (): boolean => {
    if (!getToken() && !getUser()) {
      return false
    }

    return true
  }

  const initAuth = () => {
    if (import.meta.client) {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      token.value = storedToken ?? null
      user.value = storedUser ? JSON.parse(storedUser) : null
      isReady.value = true
    }
  }

  return {
    setToken,
    getToken,
    clearToken,
    setUser,
    getUser,
    clearUser,
    isAuthenticated,
    token,
    user,
    initAuth,
    isReady,
  }
})