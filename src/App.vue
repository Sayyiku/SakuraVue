<template>
  <div id="app">
    <!-- 天气 -->
    <div class="weather" id="weather">
      <div id="he-plugin-simple"></div>
    </div>
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
import {useRoute} from "vue-router";
import {pullWeather} from "/@/assets/js/weather"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import './assets/js/click.js'

const store = useStore()
const route = useRoute()
const reRouter = ref(true)
//监听状态改变，刷新路由
watch(() => store.state.user.reRouter, (val, old) => reRouter.value = val)
//监听路由切换，改变天气层级，始终显示在头部
watch(() => route.path, () => document.getElementById("weather").style = 999)
onMounted(() => pullWeather())
</script>
<style>
 @import "assets/style/style.css";
</style>
