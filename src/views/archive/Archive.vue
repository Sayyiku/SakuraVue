<template>
  <div id="archive">
    <ScrollBar ref="ScrollBarRef"></ScrollBar>
    <ListTitle>
      <template v-slot:Header>
        <div class='pattern-header '>
          <h1>归档</h1>
        </div>
      </template>
    </ListTitle>
    <div>
      <div class="MainWrapper flexMain">
        <div v-if="!isShow" class="isShowArchive">
          还没发布过文章~
          <el-divider></el-divider>
        </div>
        <div v-else>
          <div class="leftTime">
            <div class="BtnWra" v-for="(year, index) in leftYearTime" :key="year">
              <div class="yearBtn" :class="{orange: currentIndex === index}" @click="yearClick(year, index)">{{year.yearMonth}}</div>
            </div>
          </div>
          <el-timeline>
            <el-timeline-item v-for="(article, index) in timeArticle.value" :key="index"
                              :timestamp="article.publishTime" placement="top" color="orange">
              <div class="BlogList">
                <div :class="Class[index % Class.length]">
                  <div class='post-thumb'>
                    <router-link :to="{path:'/article/' + article.id}">
                      <img :src='article.cover'/>
                    </router-link>
                  </div>
                  <div class='post-content-wrap'>
                    <div class='post-content'>
                      <router-link :to="{path:'/article/' + article.id}" class="post-title" :title="article.title">
                        <h3>{{ article.title }}</h3>
                      </router-link>
                      <div class='post-meta post-meta-category'>
                 <span>
                  <i class='iconfont icon-chongwumao'/>
                  作者: {{article.user}}
                </span>
                      </div>
                      <div class='float-content'>
                        <p>{{ article.summary }}</p>
                        <div class='post-bottom'>
                          <router-link :to="{path:'/article/' + article.id}">
                            <i class='iconfont icon-gengduo'/>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./style/archive.less"></style>

<script setup>
import {ElMessage} from "element-plus";
import {pageArchives} from '/@/api/archives'
import {pagePublishedArticle} from '/@/api/article'
import {nextTick, onBeforeMount, reactive, ref} from "vue";
import ListTitle from '/@/components/listTitle/ListTitle.vue'
import ScrollBar from "/@/components/scrollBar/ScrollBar.vue";

const isShow = ref(true)
const currentIndex = ref(0)
const ScrollBarRef = ref(null)
const leftYearTime = reactive([])
const timeArticle = reactive({value: []})
const Class = ['blog-item post-list-show left', 'blog-item post-list-show right'];
onBeforeMount(() => getArchive())
//获取归档年份
const getArchive = async () => {
  const params = {current: 1, size: 99}
  await pageArchives(params).then(res => {
    if (res.code === 0) {
      const records = res.data.records
      if (records.length > 0) {
        records.map(i => leftYearTime.push(i))
        getArticle(records[0])
      } else {
        isShow.value = false
      }
    }
    else ElMessage.warning("请求失败，请刷新页面")
  })
}

const yearClick = (yearMounth, index) => {
  currentIndex.value = index
  getArticle(yearMounth)
}

const getArticle = async (yearMonth) => {
  let params = {current: 1, size: 99, yearMonth: yearMonth.yearMonth}
  timeArticle.value = []
  await pagePublishedArticle(params).then(res => {
    if (res.code === 0) {
      const records = res.data.records
      records.forEach(obj => {
        const time = {
          id: obj.id,
          cover: obj.cover,
          title: obj.title,
          summary: obj.summary,
          user: obj.user.nickname,
          publishTime: obj.publishTime,
        }
        timeArticle.value.push(time)
        nextTick(() => ScrollBarRef.value.scrollBar())
      })
    }
    else ElMessage.warning("请求失败，请刷新页面")
  })
}
</script>
<script>
export default {
  name: "Archive"
}
</script>
