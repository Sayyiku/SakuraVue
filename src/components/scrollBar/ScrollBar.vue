<template>
  <div id="scrollBar">
    <div class="scrollBar"></div>
  </div>
</template>
<style src="./style/scrollBar.less"></style>
<script setup>
import {useRouter} from "vue-router";
import {addEvent} from '/@/utils/auth'
const router = useRouter()
window.onresize = () => scrollBar();
const scrollBar = () => {
  //页面高度
  let pageHeight
  //首页计入header高度
  router.currentRoute.value.path === "/" ?
      pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight :
      pageHeight = document.body.scrollHeight - 50 || document.documentElement.scrollHeight - 50;
  //可视高度
  let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  //可滚动高度
  let scrollAvail = pageHeight - windowHeight;
  //监听滚动事件
  addEvent('scroll', () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    document.querySelector('.scrollBar').style.width = (scrollTop/scrollAvail)*100 + '%';
  })
}
defineExpose({
  scrollBar
})
</script>