<template>
  <div id="nickname">
    <div class="userInfoForm formOffset">
      <div class="tipText">
        <div class="labelInfo labelInfoTitle">用户名:</div>
        <div class="labelInfoTitle" v-if="usernameShow">{{ userInfoUpdate.username || '未绑定' }}</div>
        <el-input v-else v-model="userInfoUpdate.username"></el-input>
      </div>
      <div v-show="usernameShow && getUserInfo().username" class="Editor showEditor">不可编辑</div>
      <div v-show="usernameShow && !getUserInfo().username" class="Editor showEditor"
           @click="usernameShow = !usernameShow">编辑
      </div>
      <div v-show="!usernameShow" class="Editor showEditor offsetClose" @click="usernameClose">取消</div>
      <div v-show="!usernameShow" class="Editor showEditor offsetSave" @click="usernameShowSave">保存</div>
    </div>
  </div>
</template>
<style lang="less" scoped src="../style/userInfo.less"/>

<script setup>
import {useStore} from "vuex";
import {reactive, ref} from 'vue'
import {ElMessage} from "element-plus";
import {bindUsername} from '/@/api/user'
import {getUserInfo} from "/@/utils/auth";

const store = useStore()
const usernameShow = ref(true)
const userInfoUpdate = reactive({
  userId: getUserInfo().id,
  username: getUserInfo().username,
})
const usernameShowSave = async () => {
  const params = {username: userInfoUpdate.username,}
  await bindUsername(params).then((res) => {
    if (res.code === 0) {
      store.dispatch('user/getUserInfo')
      usernameShow.value = !usernameShow.value
      ElMessage.success({message: "修改成功"})
    }
  })
}
const usernameClose = () => {
  usernameShow.value = !usernameShow.value
  userInfoUpdate.username = getUserInfo().username
}
</script>
<script>
export default {
  name: "Nickname"
}
</script>
