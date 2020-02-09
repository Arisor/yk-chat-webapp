<template>
  <div class>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="item in list"
        :key="item"
        size="large"
        title="老🐖"
        value="00:59"
        label="喂喂喂"
        @click="handleClick"
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
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 80) {
          this.finished = true
        }
      }, 1000)
    },
    handleClick () {
      this.$toast('小垃圾')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
</style>
