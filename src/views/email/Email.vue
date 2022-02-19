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
      <div v-show="!success" class="waitLoading">请稍后……</div>
      <el-result
          icon="success"
          title="邮箱绑定成功！">
        <template #extra>
          <el-button type="warning" @click="router.push('/')">回到首页</el-button>
        </template>
      </el-result>
    </div>

  </div>

</template>
<style scoped lang="less" src="./style/email.less"></style>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {bindEmail} from '/@/api/user'
import ListTitle from '/@/components/listTitle/ListTitle.vue'

const router = useRouter()
const store = useStore()
const success = ref(false)

onMounted(() => email())
const email = () => {
  const params = {code: router.currentRoute.value.query.code}
  bindEmail(params).then(() => {
    success.value = true
    store.dispatch('user/getUserInfo')
  })
}
</script>


<script>
export default {
  name: "email"
}
</script>

