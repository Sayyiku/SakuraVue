<template>
  <div id="resetPass">
    <ListTitle>
      <template v-slot:Header>
        <div class='pattern-header'>
          <h1>重置密码</h1>
        </div>
      </template>
    </ListTitle>
    <div class="MainWrapper">
      <el-form ref="formRef" :model="formPass" :rules="rulesPass">
        <el-form-item prop="mobile">
          <el-input v-model="formPass.mobile" placeholder="请输入绑定的手机号" clearable class="changePass"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input placeholder="验证码" v-model="formPass.code" class="changePass">
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

        <el-form-item prop="passWord">
          <el-input placeholder="请输入新密码" show-password v-model="formPass.password"/>
        </el-form-item>
        <el-form-item>
          <el-button class="onRestPass" plain @click="resetPassClick">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="less" scoped src="./style/resetPass.less"></style>

<script setup>
import ListTitle from '/@/components/listTitle/ListTitle.vue'
import {reactive, ref} from 'vue'
import {sendCode} from "/@/api/code";
import {ElMessage} from "element-plus";
import {resetPassword} from "/@/api/user";
import {useRouter} from "vue-router";

const formPass = reactive({
  mobile: '',
  code: '',
  password: ''
})
const formRef = ref()
const router = useRouter()
const timer = ref(null)
const codeCount = ref(0)
const mobileReg = /^1[3|4|5|7|8][0-9]\d{8}$/

const rulesPass = reactive({
  mobile: [
    {required: true, message: '手机号码不能为空', trigger: 'blur'},
    {pattern: mobileReg, message: "手机号格式不正确", trigger: "blur"}
  ],
  code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
  passWord: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 15, message: '密码最短六位', trigger: 'blur'},
  ]
})

const resetPassClick = () => {
  formRef.value.validate(check => {
    if (check) {
      const params = {
        mobile: formPass.mobile,
        code: formPass.code,
        password: formPass.password
      }
      resetPassword(params).then(res => {
        if (res.code === 0) {
          ElMessage.success("重置成功，去登录吧")
          router.push('/')
        }
      })
    }
  })
}

//发送验证码
let sendCodeRule = () => {
  if (formPass.mobile === '') return
  if (!mobileReg.test(formPass.mobile)) return
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
  sendCode({mobile: formPass.mobile}).then(() => ElMessage.success("发送成功"))
}
</script>

<script>
export default {
  name: "ResetPass"
}
</script>

<style scoped>

</style>
