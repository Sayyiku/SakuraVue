<template>
  <div id="listTitle">
    <Header></Header>
    <div class='pattern-center-blank'/>
    <div class="TagsTop">
      <div class='pattern-attachment-img'>
        <img class='lazyload' :src="filetUrl()[Random(0, imagesUrl.length - 1)]" alt=""/>
      </div>
      <slot name="Header"></slot>
    </div>
  </div>
</template>
<style lang="less" src="./style/listTitle.less"/>

<script setup>
import defaultSettings from "/@/settings";
import Header from "/@/components/header/Header.vue";
const imagesUrl = defaultSettings.ArticleImg
const getImageUrl = (url) => {
  return new URL(url, import.meta.url).href
}
//获取图片数组
const filetUrl = () => {
  return imagesUrl.map(u => getImageUrl(u.url))
}
//随机数
const Random = (m, n) => {
  return Math.floor(Math.random() * (n - m + 1)) + m
}
</script>
<script>
export default {
  name: "ListTitle"
}
</script>

<style scoped>

</style>
