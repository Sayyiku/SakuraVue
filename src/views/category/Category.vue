<template>
  <div id="category">
    <ScrollBar ref="ScrollBarRef"></ScrollBar>
    <div class="CategoryArticleWrapper">
        <ListTitle>
          <template v-slot:Header>
            <div class='pattern-header '>
              <h1>{{ name }}</h1>
            </div>
          </template>
        </ListTitle>
      <div class="MainWrapper">
        <header class="page-header">
          <h1 class="page-title">分类 {{name}} 下的文章</h1>
        </header>
        <CatList :id="id" :type="'category'" @scrollBarServer="scrollBarServer"></CatList>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./style/category.less"/>

<script setup>
import {ref,watch} from "vue";
import {useRouter,useRoute} from "vue-router";
import CatList from "/@/components/catList/CatList.vue";
import ListTitle from '/@/components/listTitle/ListTitle.vue'
import ScrollBar from '/@/components/scrollBar/ScrollBar.vue'

const router = useRouter()
const route  = useRoute()
const ScrollBarRef = ref(null)
const id = ref(router.currentRoute.value.query.id)
const name = ref(router.currentRoute.value.query.category)
// const scrollBarServer = () => ScrollBarRef.value.scrollBar()

// watch(() => route.path, () => )
watch(() => route.path, () => {
  id.value = router.currentRoute.value.query.id
})
</script>
<script>
export default {
  name: "Category"
}
</script>

<style scoped>

</style>
