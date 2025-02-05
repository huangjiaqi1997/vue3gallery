export default {
  state: () => ({
    themeType: 'THEME_LIGHT'
  }),
  mutations: {
    setTheme(state, type) {
      state.themeType = type
    }
  }
}
