import router from './router'
import { isMobile } from '@/utils/flexible'
// import { auth } from '@/utils/auth'
import store from '@/store'

router.beforeEach((to, from) => {
  if (to.meta.user && !store.getters.token) {
    console.log('beform', to)
    return {
      path: isMobile.value ? '/login' : '/'
      // query: { redirect: to.fullPath }
    }
  }
})
