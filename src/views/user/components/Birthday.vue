<template>
  <div id="birthday">
    <div class="userInfoForm formOffset">
      <div class="tipText">
        <div class="labelInfo labelInfoTitle">生&nbsp;&nbsp;&nbsp;日:</div>
        <div class="labelInfoTitle" v-if="birthdayShow">{{ userInfoUpdate.birthday }}</div>
        <el-date-picker v-else v-model="userInfoUpdate.birthday" type="date" format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD" @change="getTime" placeholder="选择生日"></el-date-picker>
      </div>
      <div v-show="birthdayShow" class="Editor showEditor" @click="birthdayShow = !birthdayShow">编辑</div>
      <div v-show="!birthdayShow" class="Editor showEditor offsetClose" @click="birthdayClose">取消</div>
      <div v-show="!birthdayShow" class="Editor showEditor offsetSave" @click="birthdaySave">保存</div>
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
const birthdayShow = ref(true)
const userInfoUpdate = reactive({
  userId: getUserInfo().id,
  birthday: getUserInfo().birthday,
})

const birthdaySave = async () => {
  const data = {
    birthday: userInfoUpdate.birthday,
    userId: getUserInfo().id
  }
  await updateUser(data).then((res) => {
    if (res.code === 0) {
      store.dispatch('user/getUserInfo')
      birthdayShow.value = !birthdayShow.value
      ElMessage({message: "修改成功", type: "success"})
    }
  })
}
const birthdayClose = () => {
  birthdayShow.value = !birthdayShow.value
  userInfoUpdate.birthday = getUserInfo().birthday
}
</script>
<script>
export default {
  name: "Birthday"
}
</script>

<style scoped>

</style>
