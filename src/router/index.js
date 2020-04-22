import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import store from '@/store'

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
      keepAlive: false,
      header: true,
      footer: true
    }
  },
  {
    path: '/private_chat/:id/:name',
    name: 'private_chat',
    component: () => import('@/views/PrivateChat.vue'),
    meta: {
      title: '私聊',
      keepAlive: false,
      header: true,
      footer: false
    }
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('@/views/Friend.vue'),
    meta: {
      title: '联系人',
      keepAlive: false,
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
      keepAlive: false,
      header: true,
      footer: true
    }
  },
  {
    path: '/new_friend',
    name: 'new_friend',
    component: () => import('@/views/NewFriend.vue'),
    meta: {
      title: '新朋友',
      keepAlive: false,
      header: true,
      footer: false
    }
  },
  {
    path: '/find_group',
    name: 'find_group',
    component: () => import('@/views/FindGroup.vue'),
    meta: {
      title: '找群',
      keepAlive: false,
      header: true,
      footer: false
    }
  },
  {
    path: '/find_friend',
    name: 'find_friend',
    component: () => import('@/views/FindFriend.vue'),
    meta: {
      title: '找人',
      keepAlive: false,
      header: true,
      footer: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      keepAlive: false,
      header: false,
      footer: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册',
      keepAlive: false,
      header: false,
      footer: false
    }
  }
]

const router = new VueRouter({
  // base: process.env.BASE_URL,
  mode: 'history',
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!store.getters.tokenGetter) {
    if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === '/login' || to.path === '/register') {
      next('/msg')
    } else {
      next()
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
