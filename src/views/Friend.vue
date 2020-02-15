<template>
  <div class='friends-wrapper'>
   <van-cell title="新朋友" :to="{name: 'new_friend'}" is-link />
   <van-cell title="加群" :to="{name: 'find_group'}" is-link />
   <van-cell title="加朋友" :to="{name: 'find_friend'}" is-link />
   <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item.id"
        title="老🐖"
        center
        @click="handleClick('老🐖')"
      >
        <van-image
          round
          slot="icon"
          width="1rem"
          height="1rem"
          :src="require('@/assets/avatar.gif')"
        />
      </van-cell>
    </van-list>
  </div>
</template>

<script>

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
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push({
            id: this.list.length + 1
          })
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true
        }
      }, 1000)
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
    // console.log('friend')
  },
  mounted () {

  }
}
</script>
<style lang='scss' scoped>
.friends-wrapper {
  background-color: #eee;
  .van-list {
    margin-top: 20px;
  }
}
</style>
