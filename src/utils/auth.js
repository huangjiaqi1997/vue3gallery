import store from '@/store'

export const auth = () => {
  const token = store.getters.token
  return {
    isLogin: !!token
  }
}
