<template>
  <div id="backTop">
      <span class="clickBtn" @click="BackTopClick"></span>
      <img src='../../assets/images/scroll.png' alt="backTop" />
  </div>
</template>
<style lang="less" scoped src="./style/backTop.less"/>
<script setup>
import {onMounted, ref} from "vue";
import {addEvent} from '/@/utils/auth'

const rolling = ref(600) //backTop出现距离
const speed = ref(15) //滚动顶部速度
onMounted(() => {
  //监听滚动距离
  addEvent('scroll', () => {
    let t = document.documentElement.scrollTop || document.body.scrollTop;
    let backTop = document.getElementById('backTop')
    t > rolling.value ? backTop.style.top = -150 + 'px' : backTop.style.top = -950 + 'px'
  })
})
const BackTopClick = () => {
  let backTop = document.getElementById('backTop')
  backTop.style.top = -150 + 'px'
  scrollToTop()
}

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / speed.value);
  }
}
</script>

<script>
export default {
  name: "BackTop"
}
</script>
