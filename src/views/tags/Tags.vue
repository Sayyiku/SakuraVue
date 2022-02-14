<template>
  <div id="tags">
   <div class="TagsWrapper">
     <ListTitle :name="'标签墙'">
       <template v-slot:Header>
         <div class='pattern-header'>
           <h1>标签墙</h1>
         </div>
       </template>
     </ListTitle>
     <div class="MainWrapper MainWrapper-flex">
       <div v-if="isShowTags" class="tags-list isShowTags">
         还未添加标签...
         <el-divider></el-divider>
       </div>
       <div v-else class='tags-list' v-for="tag in tagsList.value" :key="tag">
         <router-link :to="{path: '/tag/' + tag.id}">
           <el-tag :color="color[Random(0, color.length - 1)]">{{tag.name}}</el-tag>
         </router-link>
       </div>
     </div>
   </div>
  </div>
</template>
<style lang="less" scoped src="./style/tags.less"/>
<script setup>
import {ref} from 'vue'
import {tagList} from '/@/api/tag'
import {onBeforeMount, reactive} from "vue";
import ListTitle from '/@/components/listTitle/ListTitle.vue'

const isShowTags = ref(true)
const tagsList = reactive({})
const color = ['#23b7e5', '#3a3f51', '#27c24c', '#1c2b36', '#fad733', '#7266ba', '#f05050'];
onBeforeMount( async () => await tagList().then(res => {
  tagsList.value = res.data
  tagsList.value.length > 0 ? isShowTags.value = false : isShowTags.value = true
}))
//随机数
const Random = (m, n) => {
  return Math.floor(Math.random() * (n - m + 1)) + m
}
</script>
<script>
export default {
  name: "tags"
}
</script>

