export default [
  {
    name: 'layout',
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@/views/home/index.vue')
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
  },
  {
    name: 'pin',
    path: '/pins/:id',
    component: () => import('@/views/pin/index.vue')
  },
  // 开发者模式PC切到移动端时，仍然使用PC的路由
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]
