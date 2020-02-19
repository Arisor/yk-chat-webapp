<template>
  <div class>
    <van-dialog v-model="show" title="请求加好友" @confirm="handleConfirm" show-cancel-button>
      <van-cell-group>
        <van-field v-model="sendMsg" placeholder="说点啥" />
      </van-cell-group>
    </van-dialog>
    <van-search
      v-model="value"
      shape="round"
      background="-webkit-linear-gradient(right, #1989fa, #4ecff5)"
      placeholder="请输入要搜索的用户名"
    />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false">
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
import { findPeople, isFriend, requestNewFriend, isRequestFriends } from '@/api'
export default {
  components: {},
  data () {
    return {
      value: '',
      sendMsg: '',
      list: [],
      loading: false,
      finished: false,
      show: false,
      to_user: ''
    }
  },
  computed: {},
  watch: {
    value (data) {
      this.loading = true
      findPeople({ name: data })
        .then(res => {
          this.list = res.data.userInfo.filter(item => {
            return item.id !== this.$store.getters.userIdGetter
          })
          this.loading = false
          this.finished = true
        })
        .catch(() => {
          this.loading = false
          this.finished = true
        })
    }
  },
  methods: {
    async handleClick (id, name) {
      const res1 = await isFriend({
        other_user_id: id
      })
      if (res1.data.isMyFriend.length > 0) {
        this.$toast('已经是好友了')
        return
      }
      const res2 = await isRequestFriends({ to_user: id })
      if (res2.data.isRequesting) {
        this.$toast('已经在申请状态')
        return
      }
      this.to_user = id
      this.sendMsg = ''
      this.show = true
    },
    handleConfirm () {
      requestNewFriend({
        to_user: this.to_user,
        content: this.sendMsg,
        time: Date.now(),
        status: 0
      })
        .then(res => {

        })
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
