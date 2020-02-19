<template>
  <div class="friends-wrapper">
    <van-cell title="新朋友" :to="{name: 'new_friend'}" is-link />
    <van-cell title="加群" :to="{name: 'find_group'}" is-link />
    <van-cell title="加朋友" :to="{name: 'find_friend'}" is-link />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        center
        @click="handleClick(item.id, item.name)"
      >
        <van-image
          class="avatar"
          round
          slot="icon"
          width="1rem"
          height="1rem"
          :src="require('@/assets/friend.png')"
        />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getMyFriends } from '@/api'
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
      getMyFriends()
        .then(res => {
          this.list = res.data.friendList
          this.loading = false
          this.finished = true
        })
        .catch(() => {
          this.loading = false
          this.finished = true
        })
    },
    handleClick (id, name) {
      this.$router.push({
        name: 'private_chat',
        params: {
          id,
          name
        }
      })
    }
  },
  created () {
    // console.log('friend')
  },
  mounted () {}
}
</script>
<style lang='scss' scoped>
.friends-wrapper {
  background-color: #eee;
  .van-list {
    margin-top: 20px;
    .avatar {
      margin-right: 10px;
    }
  }
}
</style>
