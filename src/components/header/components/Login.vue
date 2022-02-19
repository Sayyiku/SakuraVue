<template>
  <div class='search-form__inner'>
    <div class="loginTitle">登录</div>
    <el-form ref="loginAccount" :model="formAccount" :rules="rulesAccount">
      <div class="toggleText">
        <span @click="stateChange" class="toggleTextSpan" :class="{'blue': isAccount}">密码登录</span>
        <span @click="stateChange" :class="{'blue': !isAccount}">免密登录</span>
      </div>
      <el-form-item v-show="isAccount" prop="username">
        <el-input placeholder="用户名或手机号" clearable v-model="formAccount.username"/>
      </el-form-item>
      <el-form-item v-show="isAccount" prop="passWord">
        <el-input placeholder="密码" show-password v-model="formAccount.passWord"/>
      </el-form-item>
    </el-form>

    <el-form ref="loginMobile" :model="formMobile" :rules="rulesMobile">
      <el-form-item v-show="!isAccount" prop="mobile">
        <el-input placeholder="手机号" clearable v-model="formMobile.mobile"/>
      </el-form-item>
      <el-form-item v-show="!isAccount" prop="code">
        <el-input placeholder="验证码" v-model="formMobile.code">
          <template #suffix>
            <span v-show="!codeCount" @click="sendCodeRule" class="codeRight">获取验证码</span>
            <el-button
                v-show="codeCount"
                size="small"
                style="margin-right: -5px;height: 100%;"
                disabled
            >{{ codeCount }}s
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item class="onLogin">
        <div>
          <el-button
              class="onLoginLoginBtn"
              v-show="logonShow"
              type="warning"
              @click="onLogin"
              :loading="loginLoading">登录
          </el-button>
        </div>
        <div>
          <el-button class="onLoginRegisterBtn" v-show="logonShow" @click="isLogins" plain>注册</el-button>
        </div>
      </el-form-item>

      <div class="footInfoWrapper">
        <el-checkbox v-show="isAccount" v-model="checkedRemember">记住密码</el-checkbox>
        <router-link to="/restPass">
          <div class="passwordCheckBox">
            <el-link type="warning" @click="forgottenPassword">忘记密码?</el-link>
          </div>
        </router-link>
        <div class="viewAgreement">
          <el-link type="warning" @click="agreementDia = true">登陆注册即同意用户协议</el-link>
        </div>
      </div>

      <el-dialog v-model="agreementDia">
        <Agreement></Agreement>
      </el-dialog>

    </el-form>
  </div>
</template>
<style lang="less" scoped src="../style/Header.less"/>
<script setup>
import {useStore} from "vuex";
import {sendCode} from "/@/api/code";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {onMounted, reactive, ref, watch} from "vue";
import Agreement from '/@/views/agreement/Agreement.vue'
import {getPassword, getRemember, setRemember} from "/@/utils/auth";

const store = useStore()
const loginMobile = ref()
const loginAccount = ref()
const router = useRouter()
const timer = ref(null)
const logonShow = ref(Boolean)
const codeCount = ref(0)
const isAccount = ref(true)
const loginLoading = ref(false)
const agreementDia = ref(false)
const checkedRemember = ref(false)

const usernameReg = /^[a-zA-Z]/
const mobileReg = /^1[3|4|5|6|7|8|9]\d{9}$/
watch(() => store.state.login.logonShow, (val, old) => logonShow.value = val)

//账号登陆表单
const formAccount = reactive({
  username: '',
  passWord: ''
})
//手机登录表单
const formMobile = reactive({
  mobile: '',
  code: ''
})

//账号登录验证规则
const rulesAccount = reactive({
  username: [{min: 2, max: 16, pattern: usernameReg, required: true, message: '用户名只能字母开头，允许2-16字节', trigger: 'blur'}],
  passWord: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 15, message: '密码最短六位', trigger: 'blur'},
  ]
})
//手机登录验证规则
const rulesMobile = reactive({
  mobile: [
    {required: true, message: '手机号码不能为空', trigger: 'blur'},
    {pattern: mobileReg, message: "手机号格式不正确", trigger: "blur"}
  ],
  code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
})

onMounted(() => {
  formAccount.passWord = getPassword() || ""
  checkedRemember.value = getRemember() === '1'
})
const stateChange = () => isAccount.value = !isAccount.value
const isLogins = () => store.dispatch('login/changeLogonShow')
const goto = () => store.dispatch('login/changeIsLogin')

//登录
const onLogin = () => {
  //账号登陆
  loginAccount.value.validate(check => {
    if (check) {
      const params = {
        username: formAccount.username,
        password: formAccount.passWord
      }
      loginLoading.value = true
      new Promise(async (resolve, reject) => {
        try {
          await store.dispatch('user/accountLogin', params)
          await store.dispatch('user/getUserInfo')
          await store.dispatch("user/changeReRouter")
          setRemember(checkedRemember.value ? '1' : '0')
          if (checkedRemember.value) await store.dispatch('login/setUsernameAndPassword', params)
          else await store.dispatch('login/clearUsernameAndPassword')
          loginLoading.value = false
          await goto()
          resolve()
        } catch (error) {
          loginLoading.value = false
          reject(error)
        }
      })
    }
  })

//手机登录
  loginMobile.value.validate(check => {
    if (check) {
      const params = {
        mobile: formMobile.mobile,
        code: formMobile.code
      }
      loginLoading.value = true
      new Promise(async (resolve, reject) => {
        try {
          await store.dispatch('user/codeLogin', params)
          await store.dispatch('user/getUserInfo')
          loginLoading.value = false
          await goto()
          resolve()
        } catch (error) {
          loginLoading.value = false
          reject(error)
        }
      })
    }
  })
}
//发送验证码
let sendCodeRule = () => {
  if (formMobile.mobile === '') return
  if (!mobileReg.test(formMobile.mobile)) return
  //倒计时
  const TIME_COUNT = 90
  if (!timer.value) {
    codeCount.value = TIME_COUNT
    timer.value = setInterval(() => {
      if (codeCount.value > 0 && codeCount.value <= TIME_COUNT) {
        codeCount.value--
      } else {
        clearInterval(timer.value)
        timer.value = null
      }
    }, 1000)
  }
  sendCode({mobile: formMobile.mobile}).then(() => ElMessage.success("发送成功"))
}

const forgottenPassword = () => {
}

</script>

<script>
export default {
  name: "Login"
}
</script>
