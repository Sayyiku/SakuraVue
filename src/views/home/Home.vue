<template>
  <div id="Home">
    <el-container>
      <scrollBar ref="ScrollBarRef"></scrollBar>
      <Header></Header>
      <div class="HomeWrapper">
        <el-main>
          <Banner @scrollOffset="scrollOffset"></Banner>
          <div class="MainWrapper">
            <Feature></Feature>
            <ArticlesList ref="FeatureScroll" @scrollBarServer="scrollBarServer"></ArticlesList>
          </div>
        </el-main>
      </div>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<style lang="less" src="./style/home.less"/>
<script>
export default {
  name: 'Home'
}
</script>
<script setup>
import scrollBar from '/@/components/scrollBar/ScrollBar.vue'
import Header from "/@/components/header/Header.vue";
import Banner from "./components/Banner.vue";
import Feature from './components/Feature.vue'
import ArticlesList from './components/ArticlesList.vue'
import Footer from '/@/components/footer/Footer.vue'
import {onMounted, ref} from "vue";

const FeatureScroll = ref(null)
const ScrollBarRef = ref(null)

const scrollOffset = () => FeatureScroll.value.scrollGo()
const scrollBarServer = () => ScrollBarRef.value.scrollBar()

</script>
<style lang="less" scoped>
::v-deep(.el-main, .el-header) {
  padding: 0;
}
</style>
