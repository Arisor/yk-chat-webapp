<template>
  <div class="login-layout">
    <transition
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <div class="login-form" v-show="isShow">
        <div class="login-or-register">
          <div class="is-login" @click="handleClickLogin">登录</div>
          <div class="is-register" @click="handleClickRegister">注册</div>
        </div>
        <div class="login-title">Login</div>
        <input class="user-name-input" type="text" placeholder="用户名" v-model="name" />
        <input class="password-input" type="password" placeholder="密码" v-model="password" />
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
    </transition>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  components: {},
  data () {
    return {
      loading: false,
      name: '',
      password: '',
      isShow: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleLogin () {
      this.loading = true
      login({
        name: this.name,
        password: this.password
      })
        .then(res => {
          this.loading = false
          this.$socket.emit('login', res.data.user_id)
          this.$store.dispatch('addUserInfoAction', res.data)
            .then(() => {
              this.timer1 = setTimeout(() => {
                this.isShow = false
              }, 1000)
              this.timer2 = setTimeout(() => {
                this.$router.push({
                  name: 'msg'
                })
              }, 2000)
            })
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleClickLogin () {
      this.$router.push({
        name: 'login'
      })
    },
    handleClickRegister () {
      this.$router.push({
        name: 'register'
      })
    }
  },
  created () {
    this.name = this.$route.query.name
    this.timer = setTimeout(() => {
      this.isShow = true
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.timer1)
    clearInterval(this.timer2)
    this.timer = null
    this.timer1 = null
    this.timer2 = null
  }
}
</script>
<style lang='scss' scoped>
.login-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(bottom, #1989fa, #4ecff5);
  .login-form {
    border-radius: 12px 12px 12px 12px;
    background: -webkit-linear-gradient(bottom, #1989fa, #4ecff5);
    width: 100%;
    max-width: 660px;
    height: 1060px;
    box-shadow: 0 32px 62px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-or-register {
      display: flex;
      justify-content: space-between;
      width: 40%;
      font-size: 40px;
      margin-top: 50px;
      color: #fff;
      .is-login {
        color: #2898ee;
      }
    }
    .login-title {
      font-family: system-ui;
      color: #fff;
      letter-spacing: 20px;
      font-size: 50px;
      margin: 150px 0;
    }
    .user-name-input,
    .password-input {
      border: none;
      text-decoration: none;
      padding: 20px;
      font-size: 27px;
      width: 80%;
      border-radius: 50px;
      margin-bottom: 100px;
      background-color: #f6f6f6;
      border: none;
      color: #0d0d0d;
    }
    .van-button--block {
      display: block;
      width: 80%;
    }
  }
}
</style>
