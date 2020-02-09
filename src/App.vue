<template>
  <div id="app">
    <van-nav-bar
      v-if="$route.meta.header"
      fixed
      left-arrow
      :title="title"
      @click-left="handleBack"
    />
    <keep-alive>
      <router-view class="cant-main-container" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="cant-main-container" v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" v-if="$route.meta.footer" fixed>
      <van-tabbar-item icon="more" replace to="/msg" info="80">消息</van-tabbar-item>
      <van-tabbar-item icon="friends" replace to="/friend">联系人</van-tabbar-item>
      <van-tabbar-item icon="manager" replace to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      title: '消息'
    }
  },
  computed: {},
  watch: {
    active (data) {
      switch (data) {
        case 0:
          this.title = '消息'
          break
        case 1:
          this.title = '联系人'
          break
        case 2:
          this.title = '我的'
          break
      }
    }
  },
  methods: {
    handleBack () {
      this.$router.push({
        name: 'login'
      })
    }
  },
  created () {},
  mounted () {},
  beforeUpdate () {
    if (this.$route.name === 'msg') {
      this.active = 0
    } else if (this.$route.name === 'friend') {
      this.active = 1
    } else if (this.$route.name === 'me') {
      this.active = 2
    }
  }
}
</script>
<style lang="scss">
.van-nav-bar{
  background: -webkit-linear-gradient(right, #1989fa, #4ecff5);
}
.cant-main-container {
  margin-top: 46px;
  height: calc(100vh - 96px);
  overflow: auto;
}
</style>
