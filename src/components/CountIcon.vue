<template>
  <div
    class="count-icon"
    v-if="num !== '0'"
  >{{ num }}</div>
</template>

<script>
export default {
  props: {
    num: {
      type: String,
      default: '0'
    }
  }
}
</script>
<style lang='scss' scoped>
.count-icon {
  background-color: #ee0a24;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  width: 50px;
  height: 40px;
  font-size: 10px;
  border-radius: 20px;
}
</style>
