import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue'),
    beforeEnter: function (to, from, next) {
      // check if access token exist
      const token = localStorage.token
      if (token) {
        next({ path: '/', replace: true })
        return
      }
      next()
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    beforeEnter: function (to, from, next) {
      // check if access token exist
      const token = localStorage.token
      if (token) {
        next({ path: '/', replace: true })
        return
      }
      next()
    }
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    beforeEnter: async (to, from, next) => {
      const token = localStorage.token
      if (!token) {
        next({ path: '/sign-in' })
        return
      }
      try {
        await store.dispatch('user/getUserData')
        await store.dispatch('configuration/getConfiguration')
        next()
      } catch (error) {
        store.dispatch('feature/openNotification', {
          message: '系統資訊：無法獲得你的帳戶資料',
          color: 'red'
        })
        next({ path: '/sign-in', replace: true })
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
