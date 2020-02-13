<template>
  <div class="private-chat-wrapper">
    <div class="chat-content-wrapper" ref="chatList">
      <van-list v-model="loading" :finished="finished" @load="onLoad" direction="up">
        <div v-for="(item,index) in privateDetail" :key="index">
          <ChatItem
            v-if="$route.params.userId === item.from_user"
            :href="item.from_user"
            :img="item.avator"
            :me="true"
            :msg="item.message"
            :name="item.name"
            :time="item.time"
          ></ChatItem>
          <ChatItem
            v-else
            :href=" item.from_user "
            :img="item.avator"
            :me="false"
            :msg="item.message"
            :name="item.name"
            :time="item.time"
          ></ChatItem>
        </div>
      </van-list>
    </div>
    <div class="input-msg">
      <textarea rows="1" placeholder="支持Enter发信息哦"></textarea>
      <div class="btn">发送</div>
    </div>
  </div>
</template>

<script>
import ChatItem from '@/components/ChatItem.vue'
export default {
  components: { ChatItem },
  data () {
    return {
      loading: false,
      finished: false,
      privateDetail: [], // 私聊相关
      tag: true
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
          this.privateDetail.push({
            from_user: '老🐖',
            avator: require('@/assets/avatar.gif'),
            message: '信息1231354541354151231355165165165151513502131521351撒大苏打吴大维135',
            name: '老🐖',
            time: '时间'
          })
        }

        // 加载状态结束
        this.loading = false
        if (this.tag) {
          this.$nextTick(() => {
            this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
          })
          this.tag = false
        }

        // 数据全部加载完成
        if (this.privateDetail.length >= 30) {
          this.finished = true
        }
      }, 1000)
    }
  },
  created () {
    this.$store.dispatch('titleAction', this.$route.params.userId)

    // this.$nextTick(() => {
    //   this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
    // })
  },
  mounted () {}
}
</script>
<style lang='scss' scoped>
.private-chat-wrapper {
  .chat-content-wrapper {
    height: calc(100% - 100px);
    overflow: auto;
    background-color: #f7f8fa;
  }
  .input-msg {
    width: 100%;
    height: 100px;
    padding: 15px 20px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    background-color: #f3f3f3;
    textarea {
      flex-grow: 1;
      box-sizing: content-box;
      border: none;
      resize: none;
      padding: 20px;
      border-radius: 5px;
      margin-right: 20px;
    }
    .btn {
      padding: 20px 50px;
      background-color: #66b3ef;
      color: white;
      border-radius: 5px;
    }
  }
}
</style>
