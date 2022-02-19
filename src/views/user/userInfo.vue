<template>
  <ListTitle>
    <template v-slot:Header>
      <div class='pattern-header '>
        <h1>欢迎 {{ userInfo.nickname }}</h1>
      </div>
    </template>
  </ListTitle>
  <div class="MainWrapper">
    <el-upload
        class="uploadAvatar"
        :action="path"
        :limit="1"
        :name="'file'"
        :headers="headers"
        :multiple="false"
        :auto-upload="true"
        :file-list="files"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
        :show-file-list="false">
      <div class="avatarImg">
        <div class="maskAvatar">
          <i class="iconfont icon-xiugai"></i>
        </div>
        <el-avatar :size="150" :src="getUserInfo().avatar || defaultSettings.defaultAvatar" alt="用户头像"></el-avatar>
      </div>
    </el-upload>

    <div class="userInfoWra">

      <BriefCom></BriefCom>

      <UserName></UserName>
      <Nickname></Nickname>
      <Mobile></Mobile>
      <Email></Email>
      <Birthday></Birthday>
      <Gender></Gender>
    </div>
  </div>
  <Footer></Footer>
</template>
<style lang="less" scoped src="./style/userInfo.less"/>
<style lang="less" src="../category/style/category.less"/>

<script setup>
import BriefCom from './components/Brief.vue'
import Mobile from './components/Mobile.vue'
import Gender from './components/Gender.vue'
import Nickname from './components/Nickname.vue'
import UserName from './components/UserName.vue'
import Birthday from './components/Birthday.vue'
import Footer from '/@/components/footer/Footer.vue'
import ListTitle from '/@/components/listTitle/ListTitle.vue'

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {reactive, ref, watch} from 'vue'
import {getUserInfo} from "/@/utils/auth";
import defaultSettings from "/@/settings";
import {getAccessToken} from "/@/utils/auth";
import Email from "./components/UserEmail.vue";

const store = useStore()
const router = useRouter()
const loading = ref(false)
const emailShow = ref(true)
const files = reactive([])
const userInfo = reactive(getUserInfo())
const headers = {Authorization: 'Bearer ' + getAccessToken()}
const path = import.meta.env.VITE_APP_URL + '/user/avatar/update'

watch(() => store.state.user.userInfo, (val, old) => {
  if (val === '') router.push('/')
})

 // 上传前，对文件校验
const beforeUpload = (file) => {
  loading.value = true
  const isImg =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg'
  const isLt500KB = file.size / 1000 < 500
  if (!isImg) {
    ElMessage.error('格式不正确，仅支持bmp、gif、jpeg、jpeg、png、webp格式')
    loading.value = false
  }
  if (!isLt500KB) {
    ElMessage.error('头像大小不能大于500KB')
    loading.value = false
  }
  return isImg && isLt500KB
}

// 上传成功
const uploadSuccess = async res => {
  if (res.code !== 0) {
    console.error(res.message)
    ElMessage.error('头像上传失败')
    return
  }
  loading.value = false
  ElMessage.success("头像上传成功")
  await store.dispatch('user/getUserInfo')
  await store.dispatch("user/changeReRouter")
}

// 上传失败
const uploadError = (err) => {
  console.error(err)
  loading.value = false
  ElMessage.error('头像上传失败')
}

</script>
<script>
export default {
  name: "userInfo"
}
</script>

