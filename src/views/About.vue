<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="primary">主要按钮</van-button>
    <div class="test">123</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      return: {
        data: 1
      }
    }
  },
  methods: {
    handle () {}
  }
}
</script>
<style lang="scss" scoped>
.test {
  width: 750px;
  background-color: red;
     transform: rotate(7deg);

  width: 1px;
}
</style>
