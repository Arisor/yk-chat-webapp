<template>
  <div class>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.from_user"
        :title="item.name"
        :label="`附言: ${item.content}`"
        center
        size="large"
      >
        <van-image
          class="avatar"
          round
          slot="icon"
          width="1rem"
          height="1rem"
          :src="require('@/assets/friend.png')"
        />
        <van-button
          slot="right-icon"
          size="small"
          round
          type="primary"
          :disabled="item.status === 1"
          @click="handleClick(item.from_user, item.name)"
        >{{ item.status === 1 ? '已同意' : '同意' }}</van-button>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getNewFriends, updateNewFriends, beFriend } from '@/api'
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
      getNewFriends()
        .then(res => {
          this.list = res.data.newFriends
          this.loading = false
          this.finished = true
        })
        .catch(() => {
          this.loading = false
          this.finished = true
        })
    },
    async handleClick (id, name) {
      // this.$router.push({
      //   name: 'private_chat',
      //   params: {
      //     id,
      //     name
      //   }
      // })
      try {
        await updateNewFriends({
          from_user: id
        })
        await beFriend({
          other_user_id: id,
          time: Date.now()
        })
        const res = await getNewFriends()
        this.list = res.data.newFriends
      } catch (error) {
        this.$toast('系统繁忙')
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
.avatar {
  margin-right: 10px;
}
</style>
