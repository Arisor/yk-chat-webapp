<template>
  <div class="chat-item">
    <div :class="me ? 'mychat' : 'otherchat'">
      <van-image class="img" lazy-load round width="1.2rem" height="1.2rem" :src="img" />
      <div class="ci">
        <div class="nt">
          <span v-if="time">{{time}}</span>
          <span v-if="name">{{name}}</span>
        </div>
        <div class="msg">{{msg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-item',
  props: ['me', 'name', 'img', 'msg', 'time', 'href'],
  components: {},
  data () {
    return {}
  },

  computed: {},

  watch: {},

  methods: {
    lookInfo () {
      // console.log('href', this.href)
      this.$router.push(`/user_info/${this.href}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-item {
  padding: 20px;
  .mychat {
    display: flex;
    flex-direction: row-reverse;
    .ci {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      .nt {
        color: #686868;
        display: flex;
        justify-content: flex-end;
        padding: 15px 0;
        & > :first-child {
          padding-right: 10px;
        }
      }
      .msg {
        padding: 20px;
        background-color: #daf4fe;
        border-radius: 10px;
        max-width: 70vw;
        word-break: break-all;
      }
    }
  }
  .otherchat {
    display: flex;
    .ci {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      .nt {
        color: #686868;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        padding: 15px 0;
        & > :first-child {
          padding-left: 10px;
        }
      }
      .msg {
        padding: 20px;
        background-color: #daf4fe;
        border-radius: 10px;
        max-width: 70vw;
        word-break: break-all;
      }
    }
  }
}
</style>
