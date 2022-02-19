<template>
  <div id="catList">
    <div class="SiteMain" id="SiteMain" v-for="item in List" v-loading="loading">
      <div class="post post-list post-list-show">
        <div class='post-entry'>
          <div class='feature'>
            <router-link :to="{path:'/article/' + item.id}">
              <img :src='item.cover' alt=""/>
            </router-link>
          </div>
          <h1 class='entry-title'>
            <router-link :to="{path:'/article/' + item.id}">
              {{ item.title }}
            </router-link>
          </h1>
          <div class='p-time'><i class='iconfont icon-time'/>发布于 {{ item.publishTime }}</div>
          <p>{{ item.summary }}</p>
          <footer class='entry-footer'>
            <div class='post-more'>
              <router-link :to="{path:'/article/' + item.id}">
                <i class='iconfont icon-caidan'/>
              </router-link>
            </div>
            <div class='info-meta'>
              <div class='comnum'>
                <span>
                  <i class="iconfont icon-dianzan"/>{{ item.likeCount }} 点赞
                </span>
              </div>
              <div class='views'>
                <span class="comments-number">
                  <i class="iconfont icon-xiaoxi"/>{{ item.commentCount }} 评论
                </span>
              </div>
              <div class='views'>
                <span class="comments-number">
                  <i class="iconfont icon-guanli"/>{{ item.collectCount }} 收藏
                </span>
              </div>
              <div class='views'>
                <span class="comments-number">
                  <i class="iconfont icon-yuedu"/>{{ item.viewCount }} 阅读
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <PagInaction :isFinish="isFinish" @updateCurrentPage="updateCurrentPage"></PagInaction>
    <Footer></Footer>
  </div>
</template>
<style lang="less" scoped src="./style/catList.less"/>

<script setup>
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {pagePublishedArticle} from "/@/api/article";
import Footer from '/@/components/footer/Footer.vue'
import PagInaction from '/@/components/pagInation/PagInaction.vue'
import {useRoute} from "vue-router";
import {useStore} from "vuex";

const sizes = ref(6) //默认请求每页条数
const currentPage = ref(1) //默认请求页数
const loading = ref(true)
const List = reactive([])
const isFinish = ref(false)
const emit = defineEmits(["scrollBarServer"])
const route = useRoute()
const store = useStore()

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  keyword: {
    type: String,
    default: ''
  },
  type: String
})
watch(() => route.path, () => {
  getCorrespondingArticle()
  store.dispatch('user/changeReRouter')
})
onMounted(() => getCorrespondingArticle())
//获取对应文章
const getCorrespondingArticle = async () => {
  let params
  switch (props.type) {
    case 'tag':
      params = {
        current: currentPage.value,
        size: sizes.value,
        tagId: props.id
      }
      break;
    case 'category':
      params = {
        current: currentPage.value,
        size: sizes.value,
        categoryId: props.id
      }
      break;
    case 'search':
      params = {
        current: currentPage.value,
        size: sizes.value,
        title: props.keyword
      }
      break;
  }
  List.value = []
  await pagePublishedArticle(params).then(res => {
    loading.value = false
    res.data.records.forEach(j => List.push(j))
    List.length >= res.data.total ? isFinish.value = true : isFinish.value = false
    nextTick(() => emit("scrollBarServer"))
  })
}
const updateCurrentPage = (num) => {
  currentPage.value += num
  getCorrespondingArticle()
}
</script>
<script>
export default {
  name: "CatList"
}
</script>
