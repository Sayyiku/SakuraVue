<template>
  <div class='search-form__inner' v-show="!logonShow">
    <div class="loginTitle">注册</div>
    <el-form ref="Register" :model="formRegister" :rules="rulesRegister">
      <el-form-item prop="username">
        <el-input placeholder="用户名字母开头, 允许2-16字节" v-model="formRegister.username"/>
      </el-form-item>

      <el-form-item prop="mobile">
        <el-input placeholder="手机号用于登录和找回密码" v-model="formRegister.mobile"/>
      </el-form-item>

      <el-form-item prop="password">
        <el-input placeholder="设置登录密码" show-password v-model="formRegister.password"/>
      </el-form-item>

      <el-form-item prop="code">
        <el-input placeholder="验证码" v-model="formRegister.code">
          <template #suffix>
            <span v-show="!codeCount" @click="sendCodeRule" class="codeRight">获取验证码</span>
            <el-button
                v-show="codeCount"
                size="small"
                style="margin-right: -5px;"
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
              v-show="!logonShow"
              type="warning"
              @click="onRegister"
              :loading="loginLoading">注册
          </el-button>
        </div>
        <div>
          <el-button v-show="!logonShow" class="onLoginRegisterBtn" @click="isLogins" plain>已有账号登陆</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped src="../style/Header.less"/>
<script setup>
import {useStore} from "vuex";
import {register} from "/@/api/user";
import {sendCode} from "/@/api/code";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import { reactive, ref, watch} from "vue";

const Register = ref()
const store = useStore()
const router = useRouter()
const timer = ref(null)
const codeCount = ref(0)
const usernameReg = /^[a-zA-Z]/
const logonShow = ref(false)
const loginLoading = ref(false)
const mobileReg = /^1[3|4|5|6|7|8|9]\d{9}$/
watch(() => store.state.login.logonShow, (val, old) => logonShow.value = val)

//注册表单
const formRegister = reactive({
  username: '',
  mobile: '',
  password: '',
  code: ''
})

const rulesRegister = reactive({
  username: [{min: 2, max: 16, pattern: usernameReg, required: true, message: '用户名只能字母开头，允许2-16字节', trigger: 'blur'}],
  mobile: [
    {required: true, message: '手机号码不能为空', trigger: 'blur'},
    {pattern: mobileReg, message: "手机号格式不正确", trigger: "blur"}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 15, message: '密码最短六位, 最长15位', trigger: 'blur'},
  ],
  code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
})

const isLogins = () => store.dispatch('login/changeLogonShow')

//注册
const onRegister = () => {
  Register.value.validate(check => {
    if (check) {
      const data = {
        username: formRegister.username,
        password: formRegister.password,
        mobile: formRegister.mobile,
        code: formRegister.code
      }
      loginLoading.value = true
      register(data).then(res => {
        loginLoading.value = false
        if (res.code === 0) {
          ElMessage.success("注册成功!")
          setTimeout(() => {isLogins()}, 1000)
        } else {
          ElMessage.warning({message: res.msg})
        }
      }).catch(error => {
        loginLoading.value = false
      })
    }
  })
}

//发送验证码
let sendCodeRule = () => {
  if (formRegister.mobile === '' || !mobileReg.test(formRegister.mobile)) return
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
  sendCode({mobile: formRegister.mobile}).then(() => ElMessage.success("发送成功, 请查收"))
}

</script>

<script>
export default {
  name: "Register"
}
</script>
