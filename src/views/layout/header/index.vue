<script>
const themeList = [
  {
    id: 1,
    type: 'THEME_LIGHT',
    icon: 'theme-light',
    title: '极简白'
  },
  {
    id: 2,
    type: 'THEME_DARK',
    icon: 'theme-dark',
    title: '极夜黑'
  },
  {
    id: 3,
    type: 'THEME_SYSTEM',
    icon: 'theme-system',
    title: '跟随系统'
  }
]
const profileList = [
  {
    id: 1,
    icon: 'profile',
    title: '个人资料',
    path: '/profile'
  },
  {
    id: 2,
    icon: 'vip-profile',
    title: '升级VIP',
    path: '/memeber'
  },
  {
    id: 3,
    icon: 'logout',
    title: '退出登录',
    path: ''
  }
]
</script>
<script setup>
import { getSearchHint } from '@/api/search'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Hint from './hint.vue'
import History from './history.vue'
import { Confirm } from '@/libs'
import Login from './login/index.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const inputValue = ref('')
const hintList = ref([])
// const _history = localStorage.getItem('history')
// const history = ref(_history ? JSON.parse(_history) : [])
const enableDropVisible = ref(false)
const loginVisible = ref(false)
/**
 * 搜索
 */
const history = computed(() => store.getters.history)

// 聚焦 dropdown可以显示，clickOutside或onSearch dropdown不可显示
// 配合history.length 和 HTMLOptionsCollection.length
const dropVisible = computed(() => {
  return (
    enableDropVisible.value && (history.value.length || hintList.value.length)
  )
})

const handleFocusInput = () => {
  enableDropVisible.value = true
  setHintList()
}

const handleClickOutside = () => (enableDropVisible.value = false)

const handleInput = () => setHintList()

const handleClearInput = () => setHintList()

// 设置搜索提示和请求防抖
let timer = null
const setHintList = () => {
  if (timer) clearTimeout(timer)

  if (inputValue.value === '') {
    timer = null // 还需要中断请求
    return (hintList.value = [])
  }

  timer = setTimeout(async () => {
    const res = await getSearchHint(inputValue.value)
    hintList.value = timer ? res.result : []
  }, 300)
}

// 回车、按钮、点击搜索提示和历史 触发
const handleSearch = (text) => {
  if (location.pathname !== '/') router.push('/')

  inputValue.value = text
  store.commit('setSearchText', text)

  addHistory(text)

  enableDropVisible.value = false
}

const addHistory = (text) => {
  if (text === '') return
  store.commit('addHistory', text)
}

const handleClearHistory = () => {
  Confirm({
    title: '提示',
    content: '删除所有历史记录吗？',
    confirmText: '确定',
    cancelText: '取消'
  }).then(() => store.commit('clearHistory'))
}

const handleRemoveHistory = (index) => store.commit('removeHistory', index)

// 把 history写入 localStorage
// watch(
//   history,
//   () => {
//     localStorage.setItem('history', JSON.stringify(history.value))
//   },
//   { deep: true }
// )

/**
 * 主题
 */
const curThemeType = computed(() => store.getters.themeType)
const curThemeIcon = computed(
  () => themeList.find((theme) => theme.type === curThemeType.value).icon
)
const handleThemeClick = (type) => store.commit('setTheme', type)

/**
 * 我的
 */
const handleProfileClick = (item) => {
  switch (item.id) {
    case 1: // profile
      router.push('/profile')
      break
    case 2: // vip
      router.push('/vip')
      break
    case 3: // logout
      Confirm({ title: '提示', content: '确定退出登录吗？' }).then(() =>
        store.commit('logout')
      )
      break
  }
}

const handleLoginClick = () => {
  loginVisible.value = true
}

const handleLoginClose = () => {
  loginVisible.value = false
}

const avatarUrl = computed(() => store.getters.userInfo.avatar)
const vipLevel = computed(() => store.getters.userInfo.vipLevel)
const token = computed(() => store.getters.token)

/**
 * logo
 */
const onLogoClick = () => router.push('/')
</script>

<template>
  <!-- headbar -->
  <div
    class="dark:bg-zinc-800 h-[1.58rem] flex items-center justify-between p-1 border-b border-zinc-200 dark:border-zinc-600 duration-300"
  >
    <!-- logo -->
    <img
      @click="onLogoClick"
      class="driver-home w-4 h-4 cursor-pointer mx-1"
      src="@/assets/images/logo.png"
    />

    <!-- 搜索栏 -->
    <m-search
      class="driver-search grow mx-1"
      :dropVisible="dropVisible"
      v-model:inputValue="inputValue"
      @input="handleInput"
      @search="() => handleSearch(inputValue)"
      @clickOutside="handleClickOutside"
      @clear="handleClearInput"
      @focus="handleFocusInput"
    >
      <!-- 搜索提示 -->
      <Hint
        :hintList="hintList"
        :inputValue="inputValue"
        @search="handleSearch"
      ></Hint>
      <!-- 搜索历史 -->
      <History
        v-show="!hintList.length && history.length"
        :history="history"
        @search="handleSearch"
        @remove="handleRemoveHistory"
        @clear="handleClearHistory"
      ></History>
    </m-search>

    <!-- 主题切换 -->
    <m-popover placement="bottom-left" class="driver-theme mx-1">
      <template #trigger>
        <div
          class="border border-zinc-200 dark:border-zinc-700 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded duration-300"
        >
          <m-svg-icon
            :name="curThemeIcon"
            class="h-2 w-2"
            fillClass="dark:fill-zinc-100"
          ></m-svg-icon>
        </div>
      </template>
      <template #menu>
        <div
          class="overflow-hidden text-sm text-zinc-900 dark:to-zinc-100 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
        >
          <div
            @click="() => handleThemeClick(item.type)"
            v-for="item in themeList"
            :key="item.id"
            class="w-[3rem] flex align-middle py-1 px-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-zinc-200 duration-300"
          >
            <m-svg-icon
              :name="item.icon"
              class="h-1.5 w-1.5 mr-1"
              fillClass="dark:fill-zinc-200"
            ></m-svg-icon>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </template>
    </m-popover>

    <!-- 登录按钮 / 用户头像 -->
    <m-button
      style="border-radius: 0.25rem"
      class="driver-profile"
      v-if="!token"
      size="large"
      icon="profile"
      @click="handleLoginClick"
    ></m-button>
    <m-popover v-else placement="bottom-left" class="driver-profile ml-1">
      <template #trigger>
        <div
          class="relative flex items-center p-0.5 border border-zinc-200 dark:border-zinc-700 rounded-sm bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 duration-300"
        >
          <img class="w-3 h-3 rounded-sm mr-0.5" :src="avatarUrl" alt="" />
          <m-svg-icon
            v-if="vipLevel"
            name="vip"
            class="w-1.5 h-1.5 absolute bottom-[3px] right-1.5"
          ></m-svg-icon>
          <m-svg-icon
            name="down-arrow"
            class="w-1 h-1"
            fillClass="fill-zinc-500 dark:fill-zinc-200"
          ></m-svg-icon>
        </div>
      </template>
      <template #menu>
        <div
          class="overflow-hidden text-sm text-zinc-900 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded"
        >
          <div
            @click="() => handleProfileClick(item)"
            v-for="item in profileList"
            :key="item.id"
            class="w-[3rem] flex align-middle py-1 px-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 duration-300"
          >
            <m-svg-icon
              :name="item.icon"
              class="h-1.5 w-1.5 mr-1"
              fillClass="dark:fill-zinc-200"
            ></m-svg-icon>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </template>
    </m-popover>
  </div>

  <!-- login 弹窗 -->
  <Login :visible="loginVisible" @close="handleLoginClose"></Login>
</template>

<style scoped></style>
