<script setup>
import { ref, watch } from 'vue'
import { isMobile } from '@/utils/flexible'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tranisitionName = ref('')
const keepliveRoutes = ref(['home'])
const isTransiton = ref(false)

let position = 0
router.beforeEach((to, from) => {
  if (!isMobile.value) {
    tranisitionName.value = ''
    return true
  }

  const isBack = position > window.history.state.position
  if (isBack) {
    tranisitionName.value = 'back'
    keepliveRoutes.value.pop()
  } else {
    tranisitionName.value = 'push'
    keepliveRoutes.value.push(to.name)
  }

  if (from.name === 'pin') {
    tranisitionName.value = ''
  }

  // if (to.name === 'home') {
  //   console.log('', to.name)
  //   // keepliveRoutes.value = []
  //   tranisitionName.value = ''
  // }
})
router.afterEach(() => {
  position = window.history.state.position
})

const onBeforeEnter = () => {
  isTransiton.value = true
}
const onAfterLeave = () => {
  isTransiton.value = false
}
</script>

<template>
  <!-- 页面非单一根节点无效 -->
  <router-view v-slot="{ Component, route }">
    <transition
      :name="tranisitionName"
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <!-- 样式对内部组件可能有影响，动画结束去除样式 -->
      <KeepAlive :include="keepliveRoutes">
        <component
          :class="{
            'fixed z-20 w-full h-full top-0 left-0': isTransiton
          }"
          :is="Component"
          :key="route.path"
        />
      </KeepAlive>
    </transition>
  </router-view>
</template>

<style scoped>
/* tranisition 逻辑 */
/* 首页 跳转到 我的，设置 我的 enter (leave) 动画，设置 首页 (enter) leave 动画 */

.push-enter-active,
.push-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 0.4s ease;
}
/* 若是push，来的页面一定 右，去的页面一定 左 */
.push-enter-from {
  transform: translateX(100%);
}
.push-enter-to,
.push-leave-from {
  transform: translateX(0);
}
.push-leave-to {
  transform: translateX(-50%);
}

/* 若是back，来的页面一定 左，去的页面一定 右 */
.back-enter-from {
  transform: translateX(-100%);
}
.back-enter-to,
.back-leave-from {
  transform: translateX(0);
}
.back-leave-to {
  transform: translateX(50%);
}
</style>
