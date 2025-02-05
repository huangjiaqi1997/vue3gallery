export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    name: 'pin',
    path: '/pins/:id',
    component: () => import('@/views/pin/index.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      user: true
    }
  },
  {
    name: 'vip',
    path: '/vip',
    component: () => import('@/views/vip/index.vue'),
    meta: {
      user: true
    }
  }
]
