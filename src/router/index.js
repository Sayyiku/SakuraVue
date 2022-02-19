import {createRouter, createWebHistory} from 'vue-router'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: "Home",
      component: () => import('/@/views/home/Home.vue')
    },
    {
      path: '/search',
      name: "Search",
      component: () => import('/@/views/search/Search.vue')
    },
    {
      path: '/article/:id',
      name: "Article",
      component: () => import('/@/views/article/Article.vue')
    },
    {
      path: '/tags',
      name: "Tags",
      component: () => import('/@/views/tags/Tags.vue')
    },
    {
      path: '/tag/:id',
      name: "Tag",
      component: () => import('/@/views/tags/Tag.vue')
    },
    {
      path: '/category/:id',
      name: "Category",
      component: () => import('/@/views/category/Category.vue')
    },
    {
      path: '/userInfo',
      name: "UserInfo",
      component: () => import('/@/views/user/userInfo.vue')
    },
    {
      path: '/archive',
      name: "Archive",
      component: () => import('/@/views/archive/Archive.vue')
    },
    {
      path: '/collection',
      name: "Collection",
      component: () => import('/@/views/collection/Collection.vue')
    },
    {
      path: '/restPass',
      name: "RestPass",
      component: () => import('/@/views/resetPass/ResetPass.vue')
    },
    {
      path: '/message',
      name: "Message",
      component: () => import('/@/views/message/Message.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

})


/**
 * 重置路由
 */
export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher
}

export default router
