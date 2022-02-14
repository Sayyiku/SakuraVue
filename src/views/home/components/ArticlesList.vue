<template>
  <div id="articlesList">
    <div class="HomeList">
      <div class="FeatureTitle" style="width: 56%;">
        <h1 id="scrollTitle"><i class='iconfont icon-envira'/><span> 文章列表 </span></h1>
      </div>
      <div class="BlogList" id="BlogList" v-for="(item, index) in articleList" :key="item.id" v-loading="loading">
        <div :class="Class[index % Class.length]">
          <div class='post-thumb'>
            <router-link :to="{path:'/article/' + item.id}">
              <img :src='item.cover'/>
            </router-link>
          </div>
          <div class='post-content-wrap'>
            <div class='post-content'>
              <div class='post-date'>
                <i class='iconfont icon-shizhong'/>
                发布于 {{ item.publishTime }}
              </div>
              <router-link :to="{path:'/article/' + item.id}" class="post-title">
                <h3>{{ item.title }}</h3>
              </router-link>
              <div class='post-meta'>
                <span class='comments-number'>
                  <i class='iconfont icon-dianzan'/>
                  {{ item.likeCount }} 点赞
                </span>
                <span class='comments-number'>
                  <i class='iconfont icon-xiaoxi'/>
                  {{ item.commentCount }} 评论
                </span>
                <span class='comments-number'>
                  <i class='iconfont icon-guanli'/>
                  {{ item.collectCount }} 收藏
                </span>

                <span class='comments-number'>
                  <i class='iconfont icon-yuedu'/>
                  {{ item.viewCount }} 阅读
                </span>

              </div>
              <div class='post-meta post-meta-category'>
                 <span>
                  <i class='iconfont icon-wenjianjia'/>
                  {{ item.categoryName }}
                </span>
              </div>
              <div class='float-content'>
                <p>{{ item.summary }}</p>
                <div class='post-bottom'>
                  <router-link :to="{path:'/article/' + item.id}">
                    <i class='iconfont icon-gengduo'/>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PagInaction :isFinish="isFinish" @updateCurrentPage="updateCurrentPage"></PagInaction>
    </div>
  </div>
</template>

<script setup>
import {isMobile} from '/@/utils/auth'
import {pagePublishedArticle} from '/@/api/article'
import {nextTick, onMounted, reactive, ref} from "vue";
import PagInaction from '/@/components/pagInation/PagInaction.vue'

const size = ref(10)
const currentPage = ref(1)
const loading = ref(false)
const isFinish = ref(false)
const articleList = reactive([])
const emit = defineEmits(["scrollBarServer"])
const Class = ['blog-item post-list-show left', 'blog-item post-list-show right'];

onMounted(() => getArtList())
const getArtList = async () => {
  loading.value = true
  const params = {
    current: currentPage.value,
    size: size.value,
  }
  await pagePublishedArticle(params).then(res => {
    loading.value = false
    res.data.records.forEach(j => articleList.push(j))
    articleList.length >= res.data.total ? isFinish.value = true : isFinish.value = false
    nextTick(() => emit("scrollBarServer"))
  }).catch(error => {
    loading.value = false
    console.log(error)
  })
}
const updateCurrentPage = (num) => {
  currentPage.value += num
  getArtList()
}
const scrollGo = () => {
  const element = document.getElementById("scrollTitle")
  let headerOffset;
  isMobile() ? headerOffset = 90 : headerOffset = 390;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}
defineExpose({
  scrollGo
})

</script>

<script>
export default {
  name: "ArticlesList"
}
</script>

<style scoped>
</style>
