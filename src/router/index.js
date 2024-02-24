import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/user/UserHome.vue'),
      children: [
        {
          path: '/products',
          component: () => import('../views/user/UserProdusts.vue')
        },
        {
          path: '/product/:id',
          component: () => import('../views/user/UserProdust.vue')
        },
        {
          path: '/cart',
          component: () => import('../views/user/UserCart.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/admin/AdminDashboard.vue'),
      children: [
        {
          path: '/admin/products',
          component: () => import('../views/admin/AdminProducts.vue')
        },
        {
          path: '/admin/orders',
          component: () => import('../views/admin/AdminOrders.vue')
        },
        {
          path: '/admin/Coupons',
          component: () => import('../views/admin/AdminCoupons.vue')
        },
        {
          path: '/admin/posts',
          component: () => import('../views/admin/AdminPosts.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
