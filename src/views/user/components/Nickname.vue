<template>
  <div id="nickname">
    <div class="userInfoForm formOffset">
      <div class="tipText">
        <div class="labelInfo labelInfoTitle">昵&nbsp;&nbsp;&nbsp;称:</div>
        <div class="labelInfoTitle" v-if="nicknameShow">{{ userInfoUpdate.nickname || '未设置'}}</div>
        <el-input v-else v-model="userInfoUpdate.nickname" clearable></el-input>
      </div>
      <div v-show="nicknameShow" class="Editor showEditor" @click="nicknameShow = !nicknameShow">编辑</div>
      <div v-show="!nicknameShow" class="Editor showEditor offsetClose" @click="nicknameClose">取消</div>
      <div v-show="!nicknameShow" class="Editor showEditor offsetSave" @click="nicknameSave">保存</div>
    </div>
  </div>
</template>
<style lang="less" scoped src="../style/userInfo.less"/>

<script setup>
import {useStore} from "vuex";
import {reactive, ref} from 'vue'
import {updateUser} from '/@/api/user'
import {ElMessage} from "element-plus";
import {getUserInfo} from "/@/utils/auth";

const store = useStore()
const nicknameShow = ref(true)
const userInfoUpdate = reactive({
  userId: getUserInfo().id,
  nickname: getUserInfo().nickname,
})
const nicknameSave = async () => {
  const data = {
    nickname: userInfoUpdate.nickname,
    userId: getUserInfo().id
  }
  await updateUser(data).then((res) => {
   if (res.code === 0) {
     store.dispatch('user/getUserInfo')
     nicknameShow.value = !nicknameShow.value
     ElMessage({message: "修改成功", type:"success"})
   }
  })
}
const nicknameClose = () => {
  nicknameShow.value = !nicknameShow.value
  userInfoUpdate.nickname = getUserInfo().nickname
}
</script>
<script>
export default {
  name: "Nickname"
}
</script>
