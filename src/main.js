import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
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
  Toast
} from 'vant'
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
  Toast
]
for (let comp of comps) {
  Vue.use(comp)
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
