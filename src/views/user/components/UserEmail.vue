<template>
  <div id="userEmail">
    <div class="userInfoForm formOffset">
      <div class="tipText">
        <div class="labelInfo labelInfoTitle">邮&nbsp;&nbsp;&nbsp;箱</div>
        <div class="labelInfoTitle" v-if="getUserInfo().email">{{ sensitiveEmail() }}</div>
        <div class="labelInfoTitle" v-else>未绑定</div>
      </div>

      <!--      <div v-show="emailShow" class="Editor showEditor">暂未上线</div>-->
      <div v-if="!getUserInfo().email" class="Editor showEditor" @click="toBindEmail(1)">修改绑定</div>
      <div v-else class="Editor showEditor" @click="toBindEmail(2)">绑定邮箱</div>
    </div>
  </div>
</template>
<style scoped lang="less" src="../style/userInfo.less"></style>

<script setup>
import {useRouter} from "vue-router";
import {getUserInfo} from "/@/utils/auth";

const router = useRouter()
// 邮箱脱敏
const sensitiveEmail = () => {
  const email = getUserInfo().email
  return email ? email.substr(0, 2) + '****' + email.substr(email.indexOf('@')) : ''
}
const toBindEmail = (type) => {
  type === 1 ? router.push({
        path: '/emailbind',
        query: {email: getUserInfo().email}
      })
      : router.push('/emailbind')
}
</script>
<script>
export default {
  name: "UserEmail"
}
</script>

<style scoped>

</style>