<template>
  <div id="email">

    <ListTitle>
      <template v-slot:Header>
        <div class='pattern-header'>
          <h1>邮箱绑定</h1>
        </div>
      </template>
    </ListTitle>
    <div class="MainWrapper">
      <el-result
          icon="success"
          title="邮箱绑定成功！">
        <template #extra>
          <el-button type="warning">回到首页</el-button>
        </template>
      </el-result>
    </div>

  </div>

</template>

<script setup>
import ListTitle from '/@/components/listTitle/ListTitle.vue'
</script>


<script>
export default {
  name: "email"
}
</script>

