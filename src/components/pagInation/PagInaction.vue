<template>
  <div id="pagInaction">
    <div class="PagWrapper" v-if="props.isFinish">
      <p>很高兴你翻到这里，但是真的没有了...</p>
    </div>
    <div class="PagWrapper" v-else>
      <div class='btn' @click="previousClick">查看更多</div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./style/pagInaction.less"/>

<script setup>
const emit = defineEmits(['updateCurrentPage'])
const props = defineProps({
  isFinish: {
    type: Boolean,
    default: false
  }
})
const previousClick = async () => {
  await emit('updateCurrentPage', 1)
}
</script>
<script>
export default {
  name: "PagInation"
}
</script>

<style scoped>

</style>
