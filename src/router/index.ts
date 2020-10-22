import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    beforeEnter: (to, from, next) => {
      const login: boolean = true
      if (login) {
        next()
      } else {
        next({ path: '/sign-in' })
      }
    },
    redirect: 'home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'check-in',
        name: 'CheckIn',
        component: () => import('@/views/CheckIn.vue')
      },
      {
        path: 'footprint',
        name: 'Footprint',
        component: () => import('@/views/Footprint.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue')
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
