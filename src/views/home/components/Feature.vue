<template>
  <div id="Feature">
    <div class="FeatureWrapper">
      <div class="FeatureTitle">
        <h1><i class='iconfont icon-anchor'/><span> 文章推荐 </span></h1>
        <div v-if="isFeature" class="isFeature">
          现在还没有推荐~
        </div>
        <el-row v-else className='top-feature-row' :gutter=16 v-loading="loading">
          <el-col class="top-feature-v2" id="topFeature" :xs=24 :sm=24 :md=8 :lg=8 :xl=8 v-for="l in featureList"
                  :key="l.title">
            <div class='top-feature-item'>
              <router-link :to="{path:'/article/' + l.id}">
                <div class='img-box'>
                  <img v-if="isFeatureCover" :src="l.cover" alt="">
                  <img v-else :src="filetUrl()[Random(0, ListImg.length - 1)]" alt="">
                </div>
                <div class='info'>
                  <h3 class='ellipsis'>{{ l.title }}</h3>
                  <p class='ellipsis-two'>{{ l.summary }}</p>
                </div>
              </router-link>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="../style/home.less"/>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import {recommendList} from "/@/api/article";
import defaultSettings from "/@/settings";

const router = useRouter()
const loading = ref(true)
const isFeature = ref(true)
const featureList = ref([])
const ListImg = defaultSettings.Feature
const isFeatureCover = defaultSettings.isShowCover
onBeforeMount(() => getArticle())
const getArticle = async () => await recommendList().then(res => {
  loading.value = false
  res.data.map(i => {
    featureList.value.push(i)
    featureList.value.length > 0 ? isFeature.value = false : isFeature.value = true
  })
})
const getImageUrl = (url) => {
  return new URL(url, import.meta.url).href
}
//获取图片数组
const filetUrl = () => {
  return ListImg.map(u => getImageUrl(u.url))
}
//随机数
const Random = (m, n) => {
  return Math.floor(Math.random() * (n - m + 1)) + m
}

</script>

<script>
export default {
  name: "Feature"
}
</script>

