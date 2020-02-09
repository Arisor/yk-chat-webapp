<template>
  <div class="login-layout">
    <van-button round  :loading="loading" type="info" text="登录" loading-text="登录中..." @click="handleLogin"/>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleLogin () {
      this.loading = true
      setTimeout(() => {
        this.$router.push({
          name: 'msg'
        })
      }, 2000)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
.login-layout {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
