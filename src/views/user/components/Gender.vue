<template>
  <div id="gender">
    <div class="userInfoForm formOffset">
      <div class="tipText">
        <div class="labelInfo labelInfoTitle">性&nbsp;&nbsp;&nbsp;别:</div>
        <div class="labelInfoTitle" v-if="genderShow">{{ genderFilter(userInfoUpdate.gender) }}</div>
        <el-select v-else v-model="userInfoUpdate.gender" placeholder="请选择" size="large">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
      </div>
      <div v-show="genderShow" class="Editor showEditor" @click="genderShow = !genderShow">编辑</div>
      <div v-show="!genderShow" class="Editor showEditor offsetClose" @click="genderClose">取消</div>
      <div v-show="!genderShow" class="Editor showEditor offsetSave" @click="genderSave">保存</div>
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
const genderShow = ref(true)
const userInfoUpdate = reactive({
  userId: getUserInfo().id,
  gender: getUserInfo().gender,
})
const genderSave = async () => {
  const data = {
    gender: userInfoUpdate.gender,
    userId: getUserInfo().id
  }
  await updateUser(data).then((res) => {
    if (res.code === 0) {
      store.dispatch('user/getUserInfo')
      genderShow.value = !genderShow.value
      ElMessage({message: "修改成功", type:"success"})
    }
  })
}
const genderClose = () => {
  genderShow.value = !genderShow.value
  userInfoUpdate.gender = getUserInfo().gender
}
//性别过滤
const genderFilter = (type) => {
  return type === 1 ? '男' : "女"
}

</script>
<script>
export default {
  name: "Gender"
}
</script>
