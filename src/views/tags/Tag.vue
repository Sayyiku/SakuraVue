<template>
  <div id="tag">
    <div class="TagsWrapper">
      <ListTitle>
        <template v-slot:Header>
          <div class='pattern-header'>
            <h1>标签墙</h1>
          </div>
        </template>
      </ListTitle>
      <div class="MainWrapper">
        <CatList :id="id" :type="'tag'"></CatList>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./style/tags.less"/>

<script setup>
import {useRouter} from "vue-router";
import CatList from '/@/components/catList/CatList.vue'
import ListTitle from '/@/components/listTitle/ListTitle.vue'

const router = useRouter()
const id = router.currentRoute.value.params.id
</script>
<script>
export default {
  name: "Tag"
}
</script>
