import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      component: () => import('../views/FrontView.vue'),
      children:[
        {
        path: '/',
          component: () => import('../views/HomeView.vue')
        },
        {
        path: '/products',
          component: () => import('../views/FrontView/ProductsView.vue')
        },{
        path: '/product/:id',
          component: () => import('../views/FrontView/ProductView.vue')
        },{
        path: '/carts',
          component: () => import('../views/FrontView/CartsView.vue')
        },{
        path: '/login',
          component: () => import('../views/LoginView.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardView.vue'),
      children:[
        {
        path: '/dashboard/products',
          component: () => import('../views/DashboardView/ProductsView.vue')
        },{
        path: '/dashboard/orders',
          component: () => import('../views/DashboardView/OrdersView.vue')
        },{
        path: '/dashboard/carts',
          component: () => import('../views/DashboardView/CartsView.vue')
        }
      ]
    }
  ]
})

export default router
