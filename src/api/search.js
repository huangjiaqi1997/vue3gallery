import request from '@/utils/request'

export const getSearchHint = (q) => request.get('/pexels/hint?q=' + q)
