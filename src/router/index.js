import Vue from 'vue'
import checkBearer from '@/config/checkBearer.js';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    redirect: 'login',
    component: () => import('@/App.vue'),
    children: [
      {
        path: '/login',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "sign-in" */'@/views/auth/SignIn.vue')
      },
      {
        path: '/sign-up',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "sign-up" */'@/views/auth/SignUp.vue')
      },
    ]
  },


  {
    path: '/',
    redirect: '/welcome',
    beforeEnter: checkBearer,
    component: () => import(/* webpackChunkName: "about" */ '@/views/app/Welcome.vue'),
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/welcome',
            name: 'Welcome',
            component: () => import(/* webpackChunkName: "Master Barang" */'@/views/app/Welcome.vue')
          },
        ],
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
