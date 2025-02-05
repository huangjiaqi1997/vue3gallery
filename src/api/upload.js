import request from '@/utils/request'

export const getSts = () => request({ url: '/user/sts', method: 'GET' })

export const uploadImage = (data) => {
  const { url, file, credentials } = data
  return request({
    baseURL: '/images',
    url,
    method: 'PUT',
    data: { file, credentials }
  })
}

export const scr2blob = (src) => {
  return request({
    baseURL: 'https://picsum.photos/200/200',
    url: src,
    responseType: 'blob',
    method: 'GET'
  })
}
