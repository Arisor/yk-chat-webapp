<template>
  <div class="msg-wrapper">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.name"
        size="large"
        :title="item.name"
        :value="1581779869744 | calendar"
        :label="item.message"
        @click="handleClick(item.name)"
      >
        <van-image
          class="avatar"
          round
          slot="icon"
          width="1.2rem"
          height="1.2rem"
          :src="item.isGroup ? require('@/assets/group.png') : require('@/assets/friend.png')"
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
        .then(res => {
          res.data.privateList.forEach(element => {
            this.list.push({
              isGroup: false,
              name: element.name,
              message: element.message,
              time: element.time,
              avator: element.avator
            })
          })
          res.data.groupList.forEach(element => {
            this.list.push({
              isGroup: true,
              name: element.group_name,
              message: element.message,
              time: element.time,
              avator: element.avator
            })
          })
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
.avatar {
  margin-right: 20px;
}
</style>
