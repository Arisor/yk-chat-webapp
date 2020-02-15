<template>
  <div class="msg-wrapper">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.name"
        size="large"
        :title="item.name || '老🐖'"
        :value="item.time"
        :label="item.message || '喂喂喂'"
        @click="handleClick('老🐖')"
      >
        <van-image
          round
          slot="icon"
          width="1rem"
          height="1rem"
          :src="item.avator || require('@/assets/avatar.gif')"
        />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getMsg } from '@/api'
export default {
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onLoad () {
      this.loading = true
      getMsg({
        user_id: this.$store.getters.userIdGetter
      })
        .then((res) => {
          console.log(res.data)
          res.data.privateList.forEach(element => {
            this.list.push({
              name: element.name,
              message: element.message,
              time: element.time,
              avator: element.avator
            })
          })
          // this.list.push({
          //   id: this.list.length + 1,
          //   word: words[Math.floor(Math.random() * 3)]
          // })
          this.loading = false
          this.finished = true
        })
        .catch(() => {
          this.loading = false
          this.finished = true
        })
    },
    handleClick (userId) {
      this.$router.push({
        name: 'private_chat',
        params: {
          userId
        }
      })
    }
  },
  created () {
    // console.log(this.$store.getters.userIdGetter)
  },
  mounted () {}
}
</script>
<style lang='scss' scoped>
</style>
