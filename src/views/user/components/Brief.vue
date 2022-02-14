<template>
  <div id="brief">
    <div class="userInfoForm formOffset" style="margin-bottom: 5%">
      <div class="tipText berifOffset">
        <el-input v-model="userInfoUpdate.brief" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="介绍一下自己..." clearable></el-input>
      </div>
      <div class="Editor showEditor offsetSave briefSave" @click="briefSave">保存</div>
    </div>
  </div>
</template>
<style lang="less" scoped src="../style/userInfo.less"></style>

<script setup>
import {useStore} from "vuex";
import {reactive} from 'vue'
import {updateUser} from '/@/api/user'
import {ElMessage} from "element-plus";
import {getUserInfo} from "/@/utils/auth";

const store = useStore()
const userInfoUpdate = reactive({
  brief: getUserInfo().brief
})

const briefSave = async () => {
  if (userInfoUpdate.brief === undefined) {
    ElMessage.info("还没输入呢")
    return
  }
  const data = {
    brief: userInfoUpdate.brief,
    userId: getUserInfo().id
  }
  await updateUser(data).then((res) => {
    if (res.code === 0) {
      store.dispatch('user/getUserInfo')
      ElMessage.success("修改成功")
    }
  })
}
</script>
<script>
export default {
  name: "Brief"
}
</script>

<style scoped>

</style>
