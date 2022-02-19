<template>
  <el-affix @change="affixChange" :z-index="17">
    <div class="nav-wrapper" :class="{'nav-wrapper-hover' : isFiex}">
      <div class='ellipsis'>
        <a href="#">{{ defaultSettings.titleLeft }}</a>
        <i class="iconfont icon-menus" @click="openMonav"/>
      </div>
      <div class="nav-right">
        <div class="">
          <div class="nav">
            <router-link to="/">
              <div class="nav-item">
                <div class="nav-item">
                  <i class="iconfont icon-xingzhuang"></i>
                  <span>首页</span>
                </div>
              </div>
            </router-link>

            <el-dropdown class="nav-item" id='area' size="medium" placement="bottom-end" popper-class="popperCLass"
                         @command="categoryClick">
              <div class="nav-item">
                <i class="iconfont icon-xingzhuang5"></i>
                <span class="el-dropdown-link">分类</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu v-for="item in categoryA" :key="item.id">
                  <el-dropdown-item :command="{id:item.id, name:item.name}" class='item flex-items'>
                    {{item.name}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <router-link to="/archive">
              <div class="nav-item">
                <div class="nav-item">
                  <i class="iconfont icon-xingzhuang10"></i>
                  <span>归档</span>
                </div>
              </div>
            </router-link>

            <!--            <div class="nav-item">-->
            <!--              <div class="nav-item">-->
            <!--                <i class="iconfont icon-xingzhuang6"></i>-->
            <!--                <span>友链</span>-->
            <!--              </div>-->
            <!--            </div>-->

            <router-link to="/tags">
              <div class="nav-item">
                <div class="nav-item">
                  <i class="iconfont icon-xingzhuang2"></i>
                  <span>标签墙</span>
                </div>
              </div>
            </router-link>

            <router-link to="/message">
              <div class="nav-item">
                <div class="nav-item">
                  <i class="iconfont icon-xingzhuang9"></i>
                  <span>留言板</span>
                </div>
              </div>
            </router-link>

            <div class="icon-box">
              <i class="iconfont icon-sousuo1" @click="searchClick"></i>
              <i v-if="isToken" class="iconfont icon-yonghu" @click="loginClick"></i>
              <el-dropdown v-else class="nav-item" id='acc' size="medium" placement="bottom-end"
                           popper-class="popperCLass" @command="userClick">
                <div class="nav-item nav-item-offset">
                  <div>
                    <img ref="imgAvatar" :src="Avatar || defaultSettings.defaultAvatar"
                         style="vertical-align: text-bottom;" alt="">
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="userInfo" class='item flex-items'>用户信息</el-dropdown-item>
                    <el-dropdown-item command="collection" class='item flex-items'>我的收藏</el-dropdown-item>
                    <el-dropdown-item command="passwordRe" class='item flex-items'>修改密码</el-dropdown-item>
                    <el-dropdown-item command="loginOut" class='item flex-items'>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>

          <div class="nav-mobile">
            <i class="iconfont icon-sousuo1 searchIcon" @click="searchClick"></i>
            <i v-if="isToken" class="iconfont icon-yonghu accountIcon" @click="loginClick"></i>
            <el-dropdown v-else  id='acm' size="small" placement="bottom"
                         popper-class="popperCLass" @command="userClick">
              <div class="nav-item">
                <div>
                  <img ref="imgAvatar" class="mobileAvatar" :src="Avatar || defaultSettings.defaultAvatar">
                </div>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="userInfo" class='item flex-items'>用户信息</el-dropdown-item>
                  <el-dropdown-item command="collection" class='item flex-items'>我的收藏</el-dropdown-item>
                  <el-dropdown-item command="passwordRe" class='item flex-items'>修改密码</el-dropdown-item>
                  <el-dropdown-item command="loginOut" class='item flex-items'>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>

      <div class="mask" :class="[isMoNav ? 'show' : 'hidden']" @Click="openMonav"/>
      <div v-if="isMoNav" class="mo-nav" :class="[isMoNav ? 'open' : '']" >
        <div class='m-avatar'><img :src="Avatar || defaultSettings.defaultAvatar" alt=""/></div>
        <div class="userInfoFlex">
          <p v-if="getUserInfo()" class='name ellipsis'>{{ getUserInfo().nickname }}</p>
          <p v-else class='name ellipsis'>未登录</p>
          <p v-if="getUserInfo()" class='info ellipsis'>{{ getUserInfo().brief}}</p>
          <p v-else class='info ellipsis'></p>
        </div>
        <ul class='menu'>
          <li>
            <router-link to="/">
              <div class='item flex-items'>
                <i class='iconfont icon-xingzhuang'/>
                <span>首页</span>
              </div>
            </router-link>
          </li>

          <li class="categoryItem">
            <span class='item flex-items'>
              <i class='iconfont icon-xingzhuang5'/>
              <span>分类</span>
            </span>
            <ul class='sub-menu'>
              <li v-for="item in categoryA" :key="item.name">
                <router-link :to="{path: '/category/' + item.id, query: {category: item.name}}">
                  <div class='item flex-items'>
                    <span>{{ item.name }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </li>

          <li>
            <router-link to="/archive">
              <div class='item flex-items'>
                <i class='iconfont icon-xingzhuang10'/>
                <span>归档</span>
              </div>
            </router-link>
          </li>

          <!--          <li>-->
          <!--            <div class='item flex-items'>-->
          <!--              <i class='iconfont icon-link'/>-->
          <!--              <span>友人帐</span>-->
          <!--            </div>-->
          <!--          </li>-->

          <li>
            <router-link to="/tags">
              <div class='item flex-items'>
                <i class='iconfont icon-xingzhuang2'/>
                <span>标签墙</span>
              </div>
            </router-link>
          </li>

          <li>
            <router-link to="/message">
              <div class='item flex-items'>
                <i class='iconfont icon-xingzhuang9'/>
                <span>留言板</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div :class="[isVisible ? 'search-form search-form--modal is-visible' : 'search-form search-form--modal']">
      <div class='search-form__inner'>
        <el-input placeholder="这里可以搜索哦" v-model="search" @focus="inputIconColor = '#fe9600'"
                  @blur="inputIconColor = ''"
                  @keyup.enter.native="searchPages">
          <template #prefix>
            <i class="iconfont icon-sousuo1" @click="searchPages" style="vertical-align: middle"
               :style="'color:' + inputIconColor"></i>
          </template>
        </el-input>
        <div class="searchClose" @click="searchClick">
          <i class="iconfont icon-guanbi1"></i>
        </div>
      </div>
    </div>

    <div :class="[isLogin ? 'search-form search-form--modal is-visible' : 'search-form search-form--modal']">
      <Login v-show="logonShow"></Login>
      <Register v-show="!logonShow"></Register>
      <div class="loginClose" @click="loginClick">
        <i class="iconfont icon-guanbi1"></i>
      </div>
    </div>

    <div :class="[isPassword ? 'search-form search-form--modal is-visible' : 'search-form search-form--modal']">
      <ChangePassword></ChangePassword>
      <div class="loginClose" @click="passwordClick">
        <i class="iconfont icon-guanbi1"></i>
      </div>
    </div>
    <BackTop></BackTop>
  </el-affix>
</template>
<style lang="less" scoped src="./style/Header.less"/>
<script>
export default {
  name: 'Header'
}
</script>

<script setup>
import Login from './components/Login.vue'
import defaultSettings from "/@/settings";
import Register from "./components/Register.vue";
import BackTop from '/@/components/backTop/BackTop.vue'
import ChangePassword from './components/ChangePassword.vue'

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {categoryList} from "/@/api/category";
import {onBeforeMount, onMounted, reactive, ref, watch} from 'vue';
import {getAccessToken, setUserInfo, getUserInfo, removeUserInfo} from "/@/utils/auth";
import {ElMessage} from "element-plus";

const store = useStore()
const router = useRouter()
const search = ref('')
const Avatar = ref('')
const isToken = ref(Boolean)
const isFiex = ref(false)
const isLogin = ref(false)
const isMoNav = ref(false)
const logonShow = ref(true)
const isVisible = ref(false)
let inputIconColor = ref('')
let categoryA = reactive([])
const isPassword = ref(false)

const loginClick = () => store.dispatch('login/changeIsLogin')
const searchClick = () => store.dispatch('login/changeIsVisible')
const passwordClick = () => store.dispatch('login/changeIsPassword')
watch(() => store.state.login.isLogin, (val, old) => isLogin.value = val)  //登录页打开关闭
watch(() => store.state.login.visible, (val, old) => isVisible.value = val)// 搜索页打开关闭
watch(() => store.state.login.logonShow, (val, old) => logonShow.value = val) //登陆注册显示切换
watch(() => store.state.login.isPassword, (val, old) => isPassword.value = val) //修改密码页打开关闭
watch(() => store.state.user.token, () => isToken.value = !getAccessToken())  //头像是否显示
watch(() => store.state.user.userInfo, () => {
  setUserInfo(store.state.user.userInfo)
  Avatar.value = getUserInfo().avatar
})
onBeforeMount(() => category())
onMounted(() => {
  isToken.value = !getAccessToken()
  if (getUserInfo()) isToken.value ? removeUserInfo() : Avatar.value = getUserInfo().avatar
})

//header吸顶控制
const affixChange = (value) => isFiex.value = !!value

//获取分类列表
const category = async () => {
  await categoryList().then(res => {
    if (res.data.length > 0) res.data.forEach(i => categoryA.push(i))
  })
}
//登录后下拉框点击
const userClick = (command) => {
  switch (command) {
    case 'userInfo':
      router.push('/userInfo')
      break;
    case 'collection':
      router.push('/collection')
      break;
    case 'passwordRe':
      store.dispatch('login/changeIsPassword')
      break;
    case 'loginOut':
      store.dispatch('user/logout')
      store.dispatch('user/changeReRouter')
      ElMessage.info("退出登录")
      isToken.value = true
      break;
  }
}
//分类下拉点击
const categoryClick = (command) => {
  router.push({
    path: '/category/' + command.id,
    query: {category: command.name}
  })
}
//搜索
const searchPages = () => {
  if (search.value) {
    router.push({
      path: '/search',
      query: {keyword: search.value}
    })
  }
  store.dispatch('login/changeIsVisible')
}

//移动端侧边栏打开事件
const openMonav = () => {
  isMoNav.value = !isMoNav.value
  const weatherEle = document.getElementById("weather")
  if (!isMoNav.value) {
    weatherEle.style.zIndex = 999
  } else {
    weatherEle.style.zIndex = 0
  }
}
</script>
