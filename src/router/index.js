import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/msg'
  },
  {
    path: '/msg',
    name: 'msg',
    component: () => import('@/views/Msg.vue'),
    meta: {
      title: '消息',
      requireAuth: true,
      keepAlive: true,
      header: true,
      footer: true
    }
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('@/views/Friend.vue'),
    meta: {
      title: '联系',
      requireAuth: true,
      keepAlive: true,
      header: true,
      footer: true
    }
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('@/views/Me.vue'),
    meta: {
      title: '我的',
      requireAuth: true,
      keepAlive: true,
      header: true,
      footer: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      requireAuth: false,
      keepAlive: false,
      header: false,
      footer: false
    }
  }
]

const router = new VueRouter({
  // base: process.env.BASE_URL,
  routes
})

export default router
