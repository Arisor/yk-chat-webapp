<template>
  <div class="me-wrapper">
    <div class="avatar-wrapper">
      <van-image lazy-load round width="2rem" height="2rem" :src="require('@/assets/friend.png')" />
      <div class="user-info-wrapper">
        <div class="username-wrapper">{{ $store.getters.nameGetter }}</div>
        <div class="account-wrapper">账号:&nbsp;xxxxxxxxx</div>
      </div>
    </div>
    <van-button round color="linear-gradient(to left, #1989fa, #4ecff5)" size="large" @click="handleLogout">退出登录</van-button>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    handleLogout () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否退出登录?'
      }).then(() => {
        this.$store.dispatch('removeTokenAction')
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$toast('小垃圾')
      })
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
.me-wrapper {
  position: relative;
  .avatar-wrapper {
    background: -webkit-linear-gradient(right, #1989fa, #4ecff5);
    display: flex;
    padding: 0 50px 40px;
    .user-info-wrapper {
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 50px;
      .username-wrapper {
        font-size: 30px;
        color: #000;
      }
      .account-wrapper {
        font-size: 25px;
      }
    }
  }
  button {
    width: 90%;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
