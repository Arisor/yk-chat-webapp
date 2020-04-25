import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/utils/date'
import VueSocketIO from 'vue-socket.io'
// import '@/styles/global.scss'
import {
  Button,
  Uploader,
  PullRefresh,
  Collapse,
  CollapseItem,
  ImagePreview,
  Skeleton,
  Tabbar,
  TabbarItem,
  Field,
  Grid,
  GridItem,
  Lazyload,
  swipe,
  swipeItem,
  IndexBar,
  IndexAnchor,
  Cell,
  Overlay,
  List,
  sticky,
  CellGroup,
  NavBar,
  Image,
  Toast,
  Dialog,
  Search,
  Icon,
  Tag
} from 'vant'

import animate from 'animate.css'
Vue.use(animate)

Vue.use(new VueSocketIO({
  debug: process.env.NODE_ENV === 'development',
  connection: process.env.VUE_APP_BASE_API.slice(0, -4)
}))

let comps = [
  Button,
  Uploader,
  PullRefresh,
  Collapse,
  CollapseItem,
  ImagePreview,
  Skeleton,
  Tabbar,
  TabbarItem,
  Field,
  Grid,
  GridItem,
  Lazyload,
  swipe,
  swipeItem,
  IndexBar,
  IndexAnchor,
  Cell,
  Overlay,
  List,
  sticky,
  CellGroup,
  NavBar,
  Image,
  Toast,
  Dialog,
  Search,
  Icon,
  Tag
]
for (let comp of comps) {
  Vue.use(comp)
}

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (store.getters.tokenGetter) {
  vm.$socket.emit('update', store.getters.userIdGetter)
}
