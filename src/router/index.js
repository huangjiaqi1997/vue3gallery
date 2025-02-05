import { isMobile } from '@/utils/flexible'
import { createRouter, createWebHistory } from 'vue-router'
import mRoutes from './m-routes'
import pcRoutes from './pc-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: isMobile.value ? mRoutes : pcRoutes
  // 只针对#app
  // scrollBehavior(to, from, savedPosition) {
  //   if (!isMobile.value) return
  //   console.log('pos', savedPosition)
  //   if (savedPosition) return savedPosition
  // }
})

export default router
