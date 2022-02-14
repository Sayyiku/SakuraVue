<template>
  <div id="article">
    <div class="ArticleWrapper">
      <ScrollBar ref="ScrollBarRef"></ScrollBar>
      <ListTitle>
        <template v-slot:Header>
          <div class='single-header'>
            <h1 class='entry-title'>{{ articleInfo.article.title }}</h1>
            <p class='entry-census'>
              <span><img :src="articleInfo.article.user.avatar || defaultSettings.defaultAvatar"/></span>
              <span>{{ articleInfo.article.user.nickname }}</span>
              <span class="bull">·</span>
              <span>{{ articleInfo.article.publishTime }}</span>
              <span class="bull">·</span>
              <span>{{ articleInfo.article.viewCount }} 次阅读</span>
              <span class="bull isMobileDevice">·</span>
              <span class="isMobileDevice">最后更新 {{ parseDates(articleInfo.article.updateTime) }}</span>
            </p>
          </div>
        </template>
      </ListTitle>
    </div>
    <div class="MainWrapper" v-loading="loading">
      <div class='flex-items'>
        <div class='cell'>
          <div class='entry-content'
               id='content'
               v-html="articleInfo.article.htmlContent"
               v-highlight/>
          <div class="collLike">
            <div class="bingo">
              <div class="heart" :class="{isActive:isLike}" @click.stop.prevent="stateClick('like')"></div>
            </div>
            <transition :name=" isColl ? 'zoom' : '' " mode="out-in">
              <img src="../../assets/images/collection-active.png" alt="" class="collection" v-if="isColl"
                   @click="stateClick('coll')">
              <img src="../../assets/images/collection.png" alt="" class="collection" v-else
                   @click="stateClick('coll')">
            </transition>
            <div class="countWra">
              <span class="likeCount">{{ articleInfo.article.likeCount }}</span>
              <span class="collCount">{{ articleInfo.article.collectCount }}</span>
            </div>
          </div>
          <Comments :id=id :userId="articleInfo.article.user.id" @scrollBarServer="scrollBarServer"/>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Comments from './components/Comments.vue'
import Footer from '/@/components/footer/Footer.vue'
import ListTitle from '/@/components/listTitle/ListTitle.vue'
import ScrollBar from  '/@/components/scrollBar/ScrollBar.vue'

import {useStore} from "vuex";
import {parseDate} from "/@/utils";
import {useRouter} from "vue-router";
import defaultSettings from "/@/settings";
import {getAccessToken} from "/@/utils/auth";
import {isLiked, addLike, cancelLiked} from '/@/api/like'
import {incrementView, viewArticle} from '/@/api/article'
import {onBeforeMount, reactive, ref, inject, watch, nextTick} from "vue";
import {isCollected, cancelCollected, addCollect} from '/@/api/collect'
import ClipboardJS from "clipboard";

const store = useStore()
const router = useRouter()
const isLike = ref(Boolean)
const isColl = ref(Boolean)
const loading = ref(false)
const reload = inject('reload')
const ScrollBarRef = ref(null)
const id = router.currentRoute.value.params.id
let articleInfo = reactive({article: {user: {avatar: ''}}})
watch(() => store.state.login.isReload, (val, old) => {
  val ? getStated() : isLike.value = isColl.value = false
})
watch(() => store.state.user.userInfo, () => store.dispatch('user/changeReRouter')) //登陆退出刷新路由
onBeforeMount(() => {
  getArticle()
  getStated()
})
// 日期转换
const parseDates = (str) => {
  if (str) str = str.replace(/\-/g, '/')
  return parseDate(new Date(str))
}
//加载文章数据
const getArticle = async () => {
  loading.value = true
  await viewArticle(id).then(res => {
    loading.value = false
    articleInfo.article = res.data
    articleInfo.article.user.avatar = res.data.user.avatar
    increment()
    nextTick(() => {
      copyCode()
      scrollBarServer()
    })
  })
}
const scrollBarServer = () => ScrollBarRef.value.scrollBar()

//刷新数据
const reloadData = () => {
  viewArticle(id).then(res => {
    articleInfo.article = res.data
    reload()
  })
}
// 浏览次数自增
const increment = async () => {
  await incrementView(id).then(res => {
    if (res.data) articleInfo.article.viewCount += 1
  })
}
//代码复制
const copyCode = () => {
  let count = 0
  const codeCopes = document.getElementsByTagName("pre")
  //遍历DOM（pre节点）
  for (let i = 0; i < codeCopes.length; i++) {
    count++
    let codeCopy = codeCopes[i];
    let time = new Date().getTime();
    let html_temp = `<div class="codecopy-btn"
                      data-title="复制"
                      data-clipboard-action="copy"
                      data-clipboard-target="#code_${time}${count}"
                      onclick="onC(this)"
                      onmouseout="mOut(this)">复制</div>`

    codeCopy.firstChild.id = 'code_' + time + count;
    codeCopy.innerHTML = codeCopy.innerHTML + html_temp;
  }
}
//初始化复制功能
const clipboardJs = new ClipboardJS('.codecopy-btn');
//复制失败事件
clipboardJs.on('error', (e) => {
  // console.log(e);
});
window.onC = (ths) => ths.innerHTML = '复制成功';
window.mOut = (ths) => setTimeout(() => ths.innerHTML = '复制', 1500);

//获取状态
const getStated = async () => {
  if (!getAccessToken()) {
    isLike.value = false
    isColl.value = false
    return
  }
  //获取点赞状态
  await isLiked(id).then(res => {
    res.data === 1 ? isLike.value = true : isLike.value = false
  })
  //获取收藏状态
  await isCollected(id).then(res => {
    res.data === 1 ? isColl.value = true : isColl.value = false
  })
}
//点赞收藏状态切换
const stateClick = async (type) => {
  if (!getAccessToken()) {
    await store.dispatch('login/changeIsLogin')
    return
  }
  const params = {articleId: id}
  if (type === 'like') {
    isLike.value ? await cancelLiked(params).then(() => {
      isLike.value = false
      reloadData()
    }) : await addLike(params).then(() => {
      isLike.value = true
      reloadData()
    })
  } else {
    isColl.value ? await cancelCollected(params).then(() => {
      isColl.value = false
      reloadData()
    }) : await addCollect(params).then(() => {
      isColl.value = true
      reloadData()
    })
  }
}

</script>

<script>
export default {
  name: "Article"
}
</script>
<style lang="less" scoped src="./style/article.less"/>
