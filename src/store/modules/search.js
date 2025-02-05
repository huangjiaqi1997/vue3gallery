export default {
  state: () => ({
    searchText: '',
    history: []
  }),
  mutations: {
    setSearchText(state, searchText) {
      state.searchText = searchText
    },

    addHistory(state, text) {
      const history = state.history

      const index = history.findIndex((h) => h === text)
      if (index !== -1) history.splice(index, 1)

      history.unshift(text)
    },

    removeHistory(state, index) {
      state.history.splice(index, 1)
    },

    clearHistory(state) {
      state.history = []
    }
  }
}
