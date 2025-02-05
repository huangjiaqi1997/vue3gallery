import api from '@/api'

export default {
  state: () => ({
    /* 刷新闪烁问题：
    将每次获取到的新数据缓存 作为下一次的初始化数据 */
    category: [
      { name: '全部', id: 'ALL_CATEGORY' },
      {
        id: 'web_app_icon',
        name: 'UI/UX',
        col: 1,
        urlname: 'web_app_icon'
      },
      {
        id: 'design',
        name: '平面',
        col: 1,
        urlname: 'design'
      },
      {
        id: 'illustration',
        name: '插画/漫画',
        col: 1,
        urlname: 'illustration'
      },
      {
        id: 'photography',
        name: '摄影',
        col: 2,
        urlname: 'photography'
      },
      {
        id: 'games',
        name: '游戏',
        urlname: 'games'
      },
      {
        id: 'anime',
        name: '动漫',
        urlname: 'anime'
      },
      {
        id: 'industrial_design',
        name: '工业设计',
        col: 2,
        urlname: 'industrial_design'
      },
      {
        id: 'architecture',
        name: '建筑设计',
        urlname: 'architecture'
      },
      {
        id: 'art',
        name: '人文艺术',
        urlname: 'art'
      }
    ],
    categoryId: 'ALL_CATEGORY'
  }),
  mutations: {
    setCategory(state, categorys) {
      state.category = [{ name: '全部', id: 'ALL_CATEGORY' }, ...categorys]
    },

    setCategoryId(state, id) {
      state.categoryId = id
    }
  },
  actions: {
    async getCategory(content) {
      const { categorys } = await api.getCategory()
      content.commit('setCategory', categorys)
    }
  }
}
