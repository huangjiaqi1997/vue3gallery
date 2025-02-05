import request from '@/utils/request'

export default {
  getList: ({ page, size, categoryId, searchText }) => {
    const _categoryId = categoryId === 'ALL_CATEGORY' ? '' : categoryId
    return request({
      url: `/pexels/list?page=${page}&size=${size}&categoryId=${_categoryId}&searchText=${searchText}`
    })
  },

  getDetailById: (id) => request({ url: '/pexels/' + id })
}
