import { createStore } from 'vuex'
import category from './modules/category'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import theme from './modules/theme'
import search from './modules/search'
import user from './modules/user'

const store = createStore({
  plugins: [
    createPersistedState({
      key: 'vue3gallery',
      // paths: ['category', 'theme', 'user']
      reducer(state) {
        // 一个和 state 映射的结构
        return {
          category: {
            category: state.category.category
          },
          theme: state.theme,
          search: {
            history: state.search.history
          },
          user: state.user
        }
      }
    })
  ],
  modules: {
    category,
    theme,
    search,
    user
  },
  getters
})

export default store
