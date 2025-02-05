<script setup>
import { Message } from '@/libs'
import SliderCaptcha from './sliderCaptcha.vue'
import { onUnmounted, ref } from 'vue'
import md5 from 'md5'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const emits = defineEmits(['close'])

const inputValue = ref({ username: '金色年华', password: 'qwer1234' })
const validateErrors = ref({})
const formType = ref('LOGIN')
const isCaptchaVisible = ref(false)
const store = useStore()
const isLoading = ref(false)
const router = useRouter()

onUnmounted(() => resetState())

// 重置表单
const resetState = (_type = 'LOGIN') => {
  formType.value = _type
  inputValue.value = { username: '', password: '' }
  validateErrors.value = {}
  isCaptchaVisible.value = false
}

// 点击登录注册
const onSubmit = () => {
  // 校验所有字段
  const errors = Object.keys(inputValue.value).filter((key) => validate(key))
  if (errors.length) return

  isCaptchaVisible.value = true
}

const onTypeClick = () => {
  resetState(formType.value === 'LOGIN' ? 'REGISTER' : 'LOGIN')
}
// 校验规则 => errorMsg
const validateRules = {
  username(val) {
    if (!val || val.length < 4 || val.length > 10) return '请输入4-10位用户名'
  },
  password(val) {
    if (!val || val.length < 6 || val.length > 20 || val.indexOf(' ') !== -1)
      return '请输入6-20位密码，区分大小写，不能使用空格！'
  },
  pwdAgain(val) {
    if (
      inputValue.value.password &&
      (!val || val !== inputValue.value.password)
    )
      return '两次输入的密码不一致！'
  }
}

// 校验字段，设置error
const validate = (key) => {
  const error = validateRules[key](inputValue.value[key])
  validateErrors.value[key] = error
  return error
}

const onBlur = (key) => validate(key)

// 行为验证结果
const handleCaptchaFinish = (result) => {
  if (result) {
    isCaptchaVisible.value = false
    loginRegister()
  }
}

const requestMethod = () => (formType.value === 'LOGIN' ? 'login' : 'register')

// 登录注册
const loginRegister = async () => {
  isLoading.value = true
  let params = {
    username: inputValue.value.username,
    password: md5(inputValue.value.password)
  }
  if (formType.value === 'LOGIN') {
    params = { ...params, loginType: 'username' }
  }

  try {
    await store.dispatch(requestMethod(), params)
  } catch {
  } finally {
    isLoading.value = false
  }
  emits('close')
  router.push('/')
}
</script>

<template>
  <div
    class="bg-white relative w-full flex flex-col items-center text-base text-zinc-800 py-3.5 px-2.5 rounded"
  >
    <!-- 标题 -->
    <div class="text-lg font-semibold mb-3">
      {{ formType === 'LOGIN' ? '账号登录' : '快速注册' }}
    </div>

    <!-- 用户名 -->
    <div class="relative w-full">
      <input
        autocomplete="on"
        @blur="onBlur('username')"
        v-model="inputValue.username"
        class="font-semibold outline-none p-1 w-full bg-zinc-100 rounded-sm"
        placeholder="请输入用户名"
        type="text"
      />
      <div class="px-0.5 h-2.5 leading-[0.625rem] text-xs text-red-600">
        <span>{{ validateErrors.username }}</span>
      </div>
    </div>
    <!-- 密码 -->
    <div class="w-full">
      <input
        @blur="onBlur('password')"
        v-model="inputValue.password"
        class="font-semibold outline-none p-1 w-full bg-zinc-100 rounded-sm"
        placeholder="请输入密码"
        type="password"
      />
      <div class="px-0.5 h-2.5 leading-[0.625rem] text-xs text-red-600">
        <span>{{ validateErrors.password }}</span>
      </div>
    </div>
    <!-- 确认密码 -->
    <div v-if="formType !== 'LOGIN'" class="w-full">
      <input
        @blur="onBlur('pwdAgain')"
        v-model="inputValue.pwdAgain"
        class="font-semibold outline-none p-1 w-full bg-zinc-100 rounded-sm"
        placeholder="确认密码"
        type="password"
      />
      <div class="px-0.5 h-2.5 leading-[0.625rem] text-xs text-red-600">
        <span>{{ validateErrors.pwdAgain }}</span>
      </div>
    </div>
    <!-- 政策 -->
    <div class="text-sm text-zinc-500 mt-0.5 mb-1.5 text-center">
      登录注册即同意
      <a
        target="_blank"
        href="https://www.baidu.com/"
        class="text-main cursor-pointer"
        >《隐私政策》</a
      >
    </div>

    <!-- 登录、注册按钮 -->
    <m-button
      :loading="isLoading"
      style="width: 100%; border-radius: 0.625rem"
      class="mb-2"
      type="primary"
      size="large"
      @click="onSubmit"
      >{{ formType === 'LOGIN' ? '登录' : '立即注册' }}</m-button
    >
    <!-- 切换登陆注册 -->
    <div class="text-main cursor-pointer mb-2" @click="onTypeClick">
      {{ formType === 'LOGIN' ? '快速注册' : '返回账号登录' }}
    </div>
    <!-- 第三方登录 -->
    <div class="w-full flex justify-evenly">
      <m-svg-icon
        class="group h-4 w-4 cursor-pointer"
        name="qq"
        fillClass="fill-zinc-500 group-hover:fill-[#1296db] duration-300"
      ></m-svg-icon>
      <m-svg-icon
        class="h-4 w-4 cursor-pointer"
        name="weixin"
        fillClass="fill-zinc-500"
      ></m-svg-icon>
    </div>

    <!-- 人类行为验证 -->
    <SliderCaptcha
      v-if="isCaptchaVisible"
      @finish="handleCaptchaFinish"
      @close="() => (isCaptchaVisible = false)"
      class="absolute top-5"
    ></SliderCaptcha>
  </div>
</template>

<style scoped></style>
