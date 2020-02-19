<template>
  <div class="msg-wrapper">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.name"
        size="large"
        :title="item.name"
        :label="item.message"
        @click="handleClick(item.id,item.name)"
      >
        <van-image
          class="avatar"
          round
          slot="icon"
          width="1.2rem"
          height="1.2rem"
          :src="item.isGroup ? require('@/assets/group.png') : require('@/assets/friend.png')"
        />
        <div slot="default" class="right-wrapper">
          <div class="time-wrapper">{{ item.time | calendar }}</div>
          <CountIcon :num="item.count" />
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getMsg } from '@/api'
import CountIcon from '@/components/CountIcon'
export default {
  components: { CountIcon },
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
          this.list = []
          res.data.privateList.forEach(element => {
            this.list.push({
              isGroup: false,
              id: element.other_user_id,
              name: element.name,
              message: element.message,
              count: element.count.toString(),
              time: element.time || element.be_friend_time
            })
          })
          // 交流群暂未开发
          // res.data.groupList.forEach(element => {
          //   this.list.push({
          //     isGroup: true,
          //     id: element.group_id,
          //     name: element.group_name,
          //     message: element.message,
          //     time: element.time || element.creater_time
          //   })
          // })
          this.list.sort((a, b) => {
            return b.time - a.time
          })
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
    // console.log(this.$store.getters.userIdGetter)
  },
  mounted () {},
  sockets: {
    getPrivateMsg () {
      this.onLoad()
    }
  }
}
</script>
<style lang='scss' scoped>
.avatar {
  margin-right: 20px;
}
.right-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .count-icon {
    margin-right: 10px;
  }
}
</style>
