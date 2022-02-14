<template>
 <div id="collection">
   <ScrollBar ref="ScrollBarRef"></ScrollBar>
   <ListTitle>
     <template v-slot:Header>
       <div class='pattern-header'>
         <h1>我的收藏</h1>
       </div>
     </template>
   </ListTitle>
   <div class="MainWrapper">
     <div v-if="isList" class="isShowList">
       暂无收藏
       <el-divider></el-divider>
     </div>
     <div v-else class="collectCard" v-for="item in collectList" :key="item.id">
       <router-link :to="{path:'/article/' + item.id}">
         <div class="imgCard">
           <img :src="item.cover" alt="">
         </div>
         <div class="cardContent">
           <div class="contentTitle">{{ item.title }}</div>
           <div class="contentInfo">{{item.summary}}</div>
           <div class="contentUserInfo">
             <div class="avatarWrapper">
               <div class="avatar"> <img :src="item.user.avatar" alt=""> </div>
               <div class="nickname">{{item.user.nickname}}</div>
             </div>
             <div class="time">{{item.publishTime}} | {{parseDates(item.publishTime)}}</div>
           </div>
         </div>
       </router-link>
     </div>

   </div>
 </div>
</template>
<style lang="less" scoped src="./style/collection.less"></style>

<script setup>
import {parseDate} from "/@/utils";
import {pageCollect} from '/@/api/collect'
import {ref, onMounted, reactive, nextTick} from 'vue'
import ListTitle from '/@/components/listTitle/ListTitle.vue'
import ScrollBar from "/@/components/scrollBar/ScrollBar.vue";

const sizes = ref(12)
const isList = ref(true)
const currentPage = ref(1)
const ScrollBarRef = ref(null)
const collectList = reactive([])

onMounted(() => getCollect())
const getCollect = () => {
  const params = {
    current: currentPage.value,
    size: sizes.value
  }
  pageCollect(params).then(res => {
    res.data.records.forEach(i => collectList.push(i))
    collectList.length > 0 ? isList.value = false : isList.value = true
    nextTick(() => ScrollBarRef.value.scrollBar())
  })
}

// 日期转换
const parseDates = (str) => {
  str = str.replace(/\-/g, '/')
  return parseDate(new Date(str))
}
</script>

<script>
export default {
  name: "Collection"
}
</script>

<style scoped>

</style>
