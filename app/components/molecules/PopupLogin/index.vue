<template>
  <div class="login__main">
    <div class="login__main--form">
      <div class="login__main--logo" @click="() => router.push('/')">
        <AtomsLogo :logo="Logo" />
      </div>
      <el-form
        ref="ruleFormLoginRef"
        :model="loginForm"
        :rules="rules"
        label-width="auto"
        label-position="top"
        size="large"
        hide-required-asterisk
        @keydown.enter.prevent="submitForm(ruleFormLoginRef)"
      >
        <el-form-item
          label="Email"
          prop="email"
          class="required"
        >
          <el-input
            v-model="loginForm.email"
            type="text"
            maxlength="100"
            autocomplete="off"
            placeholder="lifelearn@gamil.com"
          >
            <template #prefix>
              <img src="~/assets/icons/user-white.svg" alt="user">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="Mật khẩu"
          prop="password"
          class="required"
        >
          <el-input
            ref="passwordInput"
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            maxlength="100"
            autocomplete="off"
            placeholder="Mật khẩu"
          >
            <template #prefix>
              <img src="~/assets/icons/lock-white.svg" alt="lock">
            </template>
            <template #suffix>
              <el-icon @click="togglePassword" style="cursor: pointer;">
                <img v-if="showPassword" src="~/assets/icons/blind-eye.svg" alt="blind-eye.svg">
                <img v-else src="~/assets/icons/eye.svg" alt="eye.svg">
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div v-if="errors.length > 0" class="error-custom">{{ errors[0] }}</div>
        <el-form-item>
          <el-button
            class="btn-login"
            type="primary"
            @click="submitForm(ruleFormLoginRef)"
          >
            Đăng nhập
          </el-button>
        </el-form-item>
        <p class="login__main--form--redirect">Bạn chưa có tài khoản?
          <nuxt-link to="/register">Đăng ký ngay</nuxt-link>
        </p>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from '~/assets/images/logo.png'
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleFormLogin } from '~/types'
import {
  EMAIL_REGEX,
  REQUIRED,
  MAX_STRING,
  INVALID,
} from '~/utils/validators'
import { useRouter } from 'vue-router'
import { nextTick, reactive, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAuth } from '@/api/useAuth'

const login = useAuthStore()
const { auth } = useAuth()
const router = useRouter()
const errors = ref<string[]>([])
const ruleFormLoginRef = ref<FormInstance>()
const loginForm = reactive<RuleFormLogin>({
  email: '',
  password: '',
})

const rules = reactive<FormRules<RuleFormLogin>>({
  email: [
    { required: true, message: REQUIRED('Email'), trigger: ['blur', 'change'] },
    { max: 100, message: MAX_STRING('Email', '100'), trigger: ['blur', 'change'] },
    // { pattern: EMAIL_REGEX, message: INVALID('Email'), trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: REQUIRED('Mật khẩu'), trigger: ['blur', 'change'] },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (!valid) return
    const response = await auth(loginForm)
    if (login.getToken()) {
      await router.push("/")
    }
  })
}

const passwordInput = ref()
const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
  nextTick(() => {
    passwordInput.value?.blur()
  })
}

watch(
  () => [loginForm.email, loginForm.password],
  () => {
    errors.value = []
  }
)
</script>
<style lang="scss" scoped>
@use 'index.scss';
</style>