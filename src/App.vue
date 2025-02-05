<script setup>
import { ref, watch } from 'vue'
import { isMobile } from './utils/flexible'
import { useRoute, useRouter } from 'vue-router'

// const finialState = ref('100%')
const route = useRoute()
const router = useRouter()

// watch(
//   () => route.path,
//   () => {
//     if (route.path === '/') {
//       finialState.value = '-100%'
//     } else {
//       finialState.value = '100%'
//     }
//   },
//   { immediate: true }
// )
</script>

<template>
  <div class="h-screen">
    <!-- <router-view></router-view> -->
    <!-- 页面非单一根节点无效 -->
    <!-- <router-view v-slot="{ Component, route }">
    <transition :name="fade">
      <KeepAlive>
        <component
          class="absolute"
          :class="isMobile ? 'h-screen w-screen' : ''"
          :is="Component"
        />
      </KeepAlive>
    </transition>
  </router-view> -->
    <m-transition-router-view></m-transition-router-view>
  </div>
</template>

<style scoped>
/* .fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
  transform: translateX(v-bind(finialState));
}
.fade-enter-to {
  transform: translateX(0);
}
.fade-leave-from {
  transform: translateX(0);
}
.fade-leave-to {
  transform: translateX(v-bind(finialState));
} */
</style>
