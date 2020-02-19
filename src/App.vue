<template>
  <div id="app">
    <van-nav-bar
      v-if="$route.meta.header"
      fixed
      :title="$store.getters.titleGetter"
      :left-arrow="!$route.meta.footer"
      @click-left="onClickLeft"
    />
    <keep-alive>
      <router-view :class="className" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view :class="className" v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" v-if="$route.meta.footer" fixed>
      <van-tabbar-item icon="more" replace to="/msg" :info="count">消息</van-tabbar-item>
      <van-tabbar-item icon="friends" replace to="/friend">联系人</van-tabbar-item>
      <van-tabbar-item icon="manager" replace to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { getUnReadCount } from '@/api'
export default {
  data () {
    return {
      active: -1
    }
  },
  computed: {
    className () {
      const header = this.$route.meta.header
      const footer = this.$route.meta.footer
      if (header && footer) {
        return 'cant-hasHeader-hasFooter'
      } else if (header && !footer) {
        return 'cant-hasHeader-noFooter'
      } else {
        return 'cant-noHeader-noFooter'
      }
    },
    count () {
      return this.$store.getters.msgCountGetter
    }
  },
  watch: {
    $route () {
      this.$store.dispatch('titleAction', this.$route.meta.title)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    getUnReadCount () {
      getUnReadCount()
        .then((res) => {
          this.$store.dispatch('msgCountAction', res.data.count)
        })
    }
  },
  created () {
    this.getUnReadCount()
  },
  beforeUpdate () {
    if (this.$route.name === 'msg') {
      this.active = 0
    } else if (this.$route.name === 'friend') {
      this.active = 1
    } else if (this.$route.name === 'me') {
      this.active = 2
    }
  },
  sockets: {
    getPrivateMsg () {
      this.getUnReadCount()
    }
  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
.van-nav-bar {
  background: -webkit-linear-gradient(right, #1989fa, #4ecff5);
  .van-nav-bar__title {
    color: white;
  }
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.cant-hasHeader-hasFooter {
  margin-top: 46px;
  height: calc(100vh - 96px);
  overflow: auto;
}
.cant-noHeader-noFooter {
  height: 100vh;
}
.cant-hasHeader-noFooter {
  margin-top: 46px;
  height: calc(100vh - 46px);
}
</style>
