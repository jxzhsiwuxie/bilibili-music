import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/CollectionView.vue'),
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: () => import('@/views/RecommendView.vue'),
      },
      {
        path: '/playlist',
        name: 'playlist',
        component: () => import('@/views/PlaylistView.vue'),
      },
      {
        path: '/artist/:name',
        name: 'artist',
        component: () => import('@/views/ArtistView.vue'),
        props: true,
      },
      {
        path: '/album/:name',
        name: 'album',
        component: () => import('@/views/AlbumView.vue'),
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

// 路由守卫
router.beforeEach((to) => {
  const store = useUserStore()
  const publicPages = ['/login']

  // 非公开页面且未登录时跳转登录
  if (!publicPages.includes(to.path) && !store.isLoggedIn) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }, // 保留跳转路径
    }
  }

  // // TODO 恢复
  // // 已登录时禁止访问登录页
  // if (to.path === '/login' && store.isLoggedIn) {
  //   return { path: '/' }
  // }
})

export default router
