<template>
  <div id="app">
    <!-- elementPlus切换中文组件 -->
    <el-config-provider :locale="zhCn">
      <router-view v-if="reRouter"></router-view>
    </el-config-provider>
  </div>
</template>
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import './assets/js/click.js'

const store = useStore()
const router = useRouter()
const reRouter = ref(true)
//监听状态改变，刷新路由
watch(() => store.state.user.reRouter, (val, old) => reRouter.value = val)
</script>
<style>
 @import "assets/style/style.css";
</style>
