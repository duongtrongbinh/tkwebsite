<template>
  <el-dialog
    v-model="isShow"
    class="popup-register"
    width="510px"
    :show-close="false"
    @close="uiStore.setUiState('isRegisterDialog' ,!uiStore.getUiState('isRegisterDialog'))"
  >
    <div class="register__main">
      <div class="register__main--form">
        <div class="register__main--logo">
          <h3>Chào mừng bạn đến với Lifelearn</h3>
          <p>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>
        </div>
        <el-form
          ref="ruleFormRegisterRef"
          :model="registerForm"
          :rules="rules"
          label-width="auto"
          label-position="top"
          size="large"
          hide-required-asterisk
        >
          <el-form-item
            label="Họ và tên"
            prop="fullname"
            class="required"
          >
            <el-input
              v-model="registerForm.fullname"
              type="text"
              maxlength="255"
              autocomplete="off"
              placeholder="Nhập họ tên"
            >
              <template #prefix>
                <img src="~/assets/icons/user-blue.svg" alt="user">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="Email"
            prop="email"
            class="required"
          >
            <el-input
              v-model="registerForm.email"
              type="text"
              maxlength="255"
              autocomplete="off"
              placeholder="Nhập email"
            >
              <template #prefix>
                <img src="~/assets/icons/email-blue.svg" alt="email">
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
              v-model="registerForm.password"
              :type="showPassword ? 'text' : 'password'"
              maxlength="100"
              minlength="6"
              autocomplete="off"
              placeholder="Nhập mật khẩu"
            >
              <template #prefix>
                <img src="~/assets/icons/lock-blue.svg" alt="lock">
              </template>
              <template #suffix>
                <el-icon @click="togglePassword" style="cursor: pointer;">
                  <img v-if="showPassword" src="~/assets/icons/blind-eye.svg" alt="blind-eye.svg">
                  <img v-else src="~/assets/icons/eye.svg" alt="eye.svg">
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            label="Xác nhận mật khẩu"
            prop="password_confirmation"
            class="required"
          >
            <el-input
              ref="passwordInput"
              v-model="registerForm.password_confirmation"
              :type="showPasswordConfirm ? 'text' : 'password'"
              autocomplete="off"
              placeholder="Nhập lại mật khẩu"
            >
              <template #prefix>
                <img src="~/assets/icons/lock-blue.svg" alt="lock">
              </template>
              <template #suffix>
                <el-icon @click="togglePasswordConfirm" style="cursor: pointer;">
                  <img v-if="showPasswordConfirm" src="~/assets/icons/blind-eye.svg" alt="blind-eye.svg">
                  <img v-else src="~/assets/icons/eye.svg" alt="eye.svg">
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <div v-if="errors.length > 0" class="error-custom">{{ errors[0] }}</div>
          <el-form-item>
            <el-button
              class="btn-register"
              type="primary"
              @click="submitForm(ruleFormRegisterRef)"
            >
              Đăng ký
            </el-button>
          </el-form-item>
          <p class="register__main--form--redirect">Bạn đã có tài khoản?
            <nuxt-link to="/login">Đăng nhập ngay</nuxt-link>
          </p>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useUiStore } from '@/stores'
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleFormRegister } from '~/types'
import {
  EMAIL_REGEX,
  REQUIRED,
  MAX_STRING,
  MIN_STRING,
  INVALID,
  ACCEPT_TERM,
  PASSWORD_CONFIRMATION
} from '~/utils/validators'
import { useAuth } from '@/api/useAuth'

const uiStore = useUiStore()
const isShow = defineModel<boolean>({ default: false })

const isVerifyEmail = ref<boolean>(false)
const errors = ref<string[]>([])
const { register } = useAuth()
const ruleFormRegisterRef = ref<FormInstance>()
const registerForm = reactive<RuleFormRegister>({
  fullname: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const rules = reactive<FormRules<RuleFormRegister>>({
  fullname: [
    { required: true, message: REQUIRED('Họ và tên'), trigger: ['blur', 'change'] },
    { max: 255, message: MAX_STRING('Họ và tên', '255'), trigger: ['blur', 'change'] },
  ],
  email: [
    { required: true, message: REQUIRED('Email'), trigger: ['blur', 'change'] },
    { max: 255, message: MAX_STRING('Email', '255'), trigger: ['blur', 'change'] },
    { pattern: EMAIL_REGEX, message: INVALID('Email'), trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: REQUIRED('Mật khẩu'), trigger: ['blur', 'change'] },
    { max: 100, message: MAX_STRING('Mật khẩu', '100'), trigger: ['blur', 'change'] },
    { min: 6, message: MIN_STRING('Mật khẩu', '6'), trigger: ['blur', 'change'] },
  ],
  password_confirmation: [
    { required: true, message: REQUIRED('Xác nhận mật khẩu'), trigger: ['blur', 'change'] },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error(REQUIRED('Xác nhận mật khẩu')))
        } else if (value !== registerForm.password) {
          callback(new Error(PASSWORD_CONFIRMATION))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (!valid) return
    const response = await register(registerForm)
    if (response && response.success) {
      singletonToast("success", "Đăng ký thành công!")
      isVerifyEmail.value = true
    } else {
      if (response && !response?.success) {
        errors.value.push(response.message)
      }
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

const passwordConfirmInput = ref()
const showPasswordConfirm = ref(false)
const togglePasswordConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
  nextTick(() => {
    passwordConfirmInput.value?.blur()
  })
}

watch(
  () => [
    registerForm.fullname,
    registerForm.email,
    registerForm.password,
    registerForm.password_confirmation,
  ],
  () => {
    errors.value = []
  }
)
</script>
<style lang="scss" scoped>
@use 'index.scss';
</style>