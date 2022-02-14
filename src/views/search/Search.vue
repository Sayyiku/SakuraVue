<template>
  <div id="search">
    <ScrollBar ref="ScrollBarRef"></ScrollBar>
    <Header></Header>
    <div class="SearchWrapper" v-loading="loading">
      <div class='pattern-center-blank'></div>
      <div class="MainWrapper">
        <div class="page-header">
          <h1 class="page-title">{{ keyword }} 搜索结果</h1>
        </div>
        <CatList :keyword="keyword" :type="'search'" @scrollBarServer="scrollBarServer"></CatList>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
}
</script>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import Header from "/@/components/header/Header.vue";
import CatList from '/@/components/catList/CatList.vue'
import ScrollBar from '/@/components/scrollBar/ScrollBar.vue'

const router = useRouter()
const loading = ref(false)
const ScrollBarRef = ref(null)
const keyword = router.currentRoute.value.query.keyword

const scrollBarServer = () => ScrollBarRef.value.scrollBar()
</script>

<style lang="less" scoped src="./style/search.less">

</style>
