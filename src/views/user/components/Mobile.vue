<template>
  <div id="mobile">
    <div class="userInfoForm formOffset">
      <div class="tipText">
        <div class="labelInfo labelInfoTitle">手机号:</div>
        <div class="labelInfoTitle" v-if="mobileShow">{{ sensitiveMobile() }}</div>
      </div>
      <div v-show="mobileShow && getUserInfo().mobile !== ''" class="Editor showEditor" @click="store.dispatch('login/changeIsMobile', 1)">修改绑定</div>
      <div v-show="mobileShow && getUserInfo().mobile === ''" class="Editor showEditor" @click="store.dispatch('login/changeIsMobile', 2)">绑定手机号</div>
    </div>
    <ChangeMobile></ChangeMobile>
  </div>
</template>
<style lang="less" scoped src="../style/userInfo.less"/>

<script setup>
import {ref} from 'vue'
import {useStore} from "vuex";
import {getUserInfo} from "/@/utils/auth";
import ChangeMobile from '/@/components/changeMobile/ChangeMobile.vue'

const store = useStore()
const mobileShow = ref(true)

// 手机号脱敏
const sensitiveMobile = () => {
  const mobile = getUserInfo().mobile
  const pat = /(\d{3})\d*(\d{4})/;
  return mobile ? mobile.toString().replace(pat, '$1****$2') : '未绑定'
}
</script>
<script>
export default {
  name: "Mobile"
}
</script>
