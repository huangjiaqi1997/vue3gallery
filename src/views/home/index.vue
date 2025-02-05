<script>
export default { name: 'home' }
</script>
<script setup>
import Navigation from './navigation/index.vue'
import List from './list.vue'
import { isMobile } from '@/utils/flexible'
import { onActivated, onDeactivated, useTemplateRef, ref, computed } from 'vue'
import { useStore } from 'vuex'

// triggerBar menu
const store = useStore()
const token = computed(() => store.getters.token)
const menu = computed(() => {
  const _menu = [
    {
      id: 1,
      name: '首页',
      icon: 'home',
      path: '/'
    }
  ]
  if (token.value) {
    _menu.push(
      {
        id: 2,
        name: 'VIP',
        icon: 'vip',
        path: '/vip'
      },
      {
        id: 3,
        name: '我的',
        icon: 'profile',
        path: '/profile'
      }
    )
  } else {
    _menu.push({
      id: 2,
      name: '去登录',
      icon: 'profile',
      path: '/login'
    })
  }
  return _menu
})

// keepalive钩子 设置滚动
const homeRef = useTemplateRef('homeRef')
const homeScrollTop = ref(0)
onActivated(() => {
  homeRef.value.scrollTop = homeScrollTop.value
})
onDeactivated(() => {
  homeScrollTop.value = homeRef.value?.scrollTop || 0
})
</script>

<template>
  <div ref="homeRef" class="home h-full overflow-y-auto">
    <Navigation></Navigation>
    <List></List>
    <m-trigger-menu v-if="isMobile" :menu="menu"></m-trigger-menu>
  </div>
</template>

<style scoped></style>
