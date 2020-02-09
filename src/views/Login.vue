<template>
  <div class="login-layout">
    <div class="login-form">
      <div class="login-title">LOGIN</div>
      <van-button
        color="#1989fa"
        block
        round
        :loading="loading"
        type="info"
        text="登录"
        loading-text="登录中..."
        @click="handleLogin"
      />
    </div>
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
  height: 100vh !important;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(bottom, #1989fa, #4ecff5);
  .login-form {
    border-radius: 12px 12px 12px 12px;
    background: -webkit-linear-gradient(bottom, #1989fa, #4ecff5);
    width: 100%;
    max-width: 660px;
    height: 80%;
    box-shadow: 0 32px 62px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-title{
      font-family: system-ui;
      color: #fff;
      letter-spacing: 20px;
      font-size: 50px;
      margin: 30% 0 60%;
    }
    .van-button--block {
      display: block;
      width: 80%;
    }
  }
}
</style>
