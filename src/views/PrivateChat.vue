<template>
  <div class="private-chat-wrapper">
    <div class="chat-content-wrapper" ref="chatList">
      <van-list v-model="loading" :finished="finished" @load="onLoad" direction="up">
        <div v-for="(item,index) in privateDetail" :key="index">
          <ChatItem
            v-if="$store.getters.userIdGetter === item.from_user"
            :href="item.from_user"
            :img="item.avator"
            :me="$store.getters.userIdGetter === item.from_user"
            :msg="item.message"
            :name="item.name"
            :time="item.time | calendar"
          ></ChatItem>
          <ChatItem
            v-else
            :href=" item.from_user "
            :img="item.avator"
            :me="$store.getters.userIdGetter === item.from_user"
            :msg="item.message"
            :name="item.name"
            :time="item.time | calendar"
          ></ChatItem>
        </div>
      </van-list>
    </div>
    <div class="input-msg">
      <textarea ref="message" rows="1" placeholder="请输入" v-model.trim="inputMsg" @keydown.enter.prevent="handleSendMsg"></textarea>
      <div class="btn" @click="handleSendMsg">发送</div>
    </div>
  </div>
</template>

<script>
import ChatItem from '@/components/ChatItem.vue'
import { getPrivateDetail, savePrivateMsg, setIsRead, getUnReadCount } from '@/api'
export default {
  components: { ChatItem },
  data () {
    return {
      loading: false,
      finished: false,
      privateDetail: [], // 私聊相关
      inputMsg: ''
    }
  },
  methods: {
    onLoad () {
      this.loading = true
      getPrivateDetail({
        to_user: this.$route.params.id
      })
        .then(res => {
          res.data.privateDetail.forEach(element => {
            this.privateDetail.push({
              from_user: element.from_user,
              avator: require('@/assets/friend.png'),
              message: element.message,
              name: element.name,
              time: element.time
            })
          })
          this.$refs.message.focus()
          this.refershScroll()
          this.loading = false
          this.finished = true
        })
        .catch(() => {
          this.loading = false
          this.finished = true
        })
    },
    // 发送信息
    handleSendMsg () {
      this.$refs.message.focus()
      if (this.inputMsg === '') return
      this.sendMsgBySocket()
      this.saveMsgByDB()
    },
    // 用socket发消息
    sendMsgBySocket () {
      const data = {
        from_user: this.$store.getters.userIdGetter, // 自己的id
        to_user: this.$route.params.id, // 对方id
        name: this.$route.params.name, // 自己的昵称
        avator: '', // 自己的头像
        message: this.inputMsg, // 消息内容
        type: 'private',
        status: '1', // 是否在线 0为不在线 1为在线
        time: Date.now() // 时间
      }
      this.$socket.emit('sendPrivateMsg', data)
      // this.$store.commit('updateListMutation', data)
    },
    // 用数据库存消息
    saveMsgByDB () {
      const currTime = Date.now()
      const data = {
        from_user: this.$store.getters.userIdGetter, // 自己的id
        to_user: this.$route.params.id, // 对方id
        name: this.$route.params.name, // 自己的昵称
        avator: '', // 自己的头像
        message: this.inputMsg, // 消息内容
        type: 'private',
        status: '1', // 是否在线 0为不在线 1为在线
        time: currTime // 时间
      }
      // 存此条私聊信息到数据库
      savePrivateMsg(data).then(res => {
        this.privateDetail.push({
          from_user: this.$store.getters.userIdGetter,
          avator: require('@/assets/friend.png'),
          message: this.inputMsg,
          name: this.$route.params.name,
          time: currTime
        })
        this.inputMsg = ''
        this.refershScroll()
      })
    },
    refershScroll () {
      this.$nextTick(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
    },
    setIsRead () {
      setIsRead({
        from_user: this.$route.params.id
      })
    },
    getUnReadCount () {
      getUnReadCount()
        .then((res) => {
          this.$store.dispatch('msgCountAction', res.data.count)
        })
    }
  },
  created () {
    this.$store.dispatch('titleAction', this.$route.params.name)
    this.setIsRead()
    this.getUnReadCount()
  },
  sockets: {
    getPrivateMsg (data) {
      this.privateDetail.push({
        from_user: data.from_user,
        avator: require('@/assets/friend.png'),
        message: data.message,
        name: data.name,
        time: data.time
      })
      this.refershScroll()
      this.setIsRead()
    }
  }
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
      cursor: not-allowed;
    }
  }
}
</style>
