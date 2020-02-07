<template>
  <div id="app">
    <keep-alive>
      <router-view class="main-container" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="main-container" v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" v-if="$route.meta.footer">
      <van-tabbar-item icon="more" replace to="/msg">消息</van-tabbar-item>
      <van-tabbar-item icon="friends" replace to="/friend">联系人</van-tabbar-item>
      <van-tabbar-item icon="manager" replace to="/me">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang="scss">
</style>
