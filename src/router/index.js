import { createRouter, createWebHashHistory } from 'vue-router'
import asyncRouter from './asyncRouter'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue'),
      redirect: '/home',
      children: [...asyncRouter],
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      meta: {
        title: 'NOT FIND',
      },
    },
    {
      name: 'any',
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})
export default router
