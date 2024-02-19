import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminDashboard.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
