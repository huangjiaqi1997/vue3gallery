import request from '@/utils/request'

export default {
  getCategory: () => request({ url: '/category', method: 'GET' })
}
