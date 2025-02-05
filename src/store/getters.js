export default {
  category: (state) => state.category.category,
  categoryId: (state) => state.category.categoryId,
  searchText: (state) => state.search.searchText,
  history: (state) => state.search.history,
  themeType: (state) => state.theme.themeType,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo
}
