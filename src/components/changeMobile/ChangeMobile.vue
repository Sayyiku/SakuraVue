<template>
  <div id="changeMobile">
    <div :class="[isMobile ? 'search-form search-form--modal is-visible' : 'search-form search-form--modal']">
      <div class='search-form__inner'>
        <div v-show="!isChangeMobile" class="loginTitle">绑定手机号</div>
        <div v-show="isChangeMobile" class="loginTitle">验证原手机号</div>

        <!--绑定手机号/更换手机号-->
        <el-form v-show="!isChangeMobile" ref="mobileBind" :model="formMobileBind" :rules="rulesMobile">
          <el-form-item prop="mobile">
            <el-input placeholder="请输入绑定手机号" v-model="formMobileBind.mobile"/>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="验证码" v-model="formMobileBind.code">
              <template #suffix>
                <span v-show="!codeCount" @click="sendCodeRule(1)" class="codeRight">获取验证码</span>
                <el-button
                    v-show="codeCount"
                    size="small"
                    style="margin-right: -5px;"
                    disabled>
                  {{ codeCount }}s
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="onLogin">
            <div v-show="!isChangeMobile && !replacement">
              <el-button class="onPasswordBtn" @click.stop.prevent="bind">绑定</el-button>
            </div>
            <div v-show="replacement">
              <el-button class="onPasswordBtn" @click.stop.prevent="rebind">更换</el-button>
            </div>
          </el-form-item>
        </el-form>

        <!--验证原手机号-->
        <el-form v-show="isChangeMobile" ref="mobileChange" :model="formMobileChange">
          <el-form-item prop="mobile">
            <el-input v-model="Mobile.mobile" disabled/>
          </el-form-item>
          <el-form-item prop="code">
            <el-input placeholder="验证码" v-model="formMobileChange.code">
              <template #suffix>
                <span v-show="!codeCount" @click="sendCodeRule(2)" class="codeRight">获取验证码</span>
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
              <el-button class="onPasswordBtn" @click.stop.prevent="changeMobile">验证</el-button>
            </div>
            <el-link type="warning" style="display: flex">验证成功后请五分钟内绑定新手机号</el-link>
          </el-form-item>
        </el-form>
      </div>
      <div class="loginClose" @click="mobileClick">
        <i class="iconfont icon-guanbi1"></i>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="../header/style/Header.less"/>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {sendCode} from "/@/api/code";
import {ElMessage} from "element-plus";
import {reactive, ref, watch} from "vue";
import mobileReg from '/@/utils/validate'
import {validMobile} from '/@/utils/validate'
import {getUserInfo, getAccessToken} from "/@/utils/auth";
import {validateMobile, rebindMobile, bindMobile} from '/@/api/user'

const mobileBind = ref()
const store = useStore()
const router = useRouter()
const mobileChange = ref()
const timer = ref(null)
const codeCount = ref(0)
const isMobile = ref(false)
const replacement = ref(false)
let userInfo = reactive(getUserInfo())
const isChangeMobile = ref(true)

const formMobileChange = reactive({code: ''})
const formMobileBind = reactive({mobile: '', code: ''})
watch(() => store.state.user.userInfo, (val, old) => {
  if (getAccessToken()) userInfo = getUserInfo()
})
watch(() => store.state.login.isMobile, (val, old) => isMobile.value = val)  //更换手机弹窗是否显示
watch(() => store.state.login.isChangeMobile, (val, old) => isChangeMobile.value = val)

// 手机号脱敏
const sensitiveMobile = (mobile) => {
  const pat = /(\d{3})\d*(\d{4})/;
  return mobile ? mobile.toString().replace(pat, '$1****$2') : '未绑定'
}
const Mobile = reactive({mobile: sensitiveMobile(userInfo.mobile)}) //手机号默认显示

//手机号验证规则
const rulesMobile = reactive({
  mobile: [
    {required: true, message: '手机号码不能为空', trigger: 'blur'},
    {pattern: mobileReg, message: "手机号格式不正确", trigger: "blur"}
  ],
  code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
})

//弹窗关闭
const mobileClick = () => store.dispatch('login/changeIsMobile')
//绑定手机号
const bind = () => {
  mobileBind.value.validate(async check => {
    if (check) {
      const params = {
        mobile: formMobileBind.mobile,
        code: formMobileBind.code
      }
      await bindMobile(params).then(res => {
        if (res.code === 0) {
          ElMessage.success("绑定成功")
          store.dispatch('user/getUserInfo')
          store.dispatch('login/changeIsMobile')
          store.dispatch('user/changeReRouter')
        }
      })
    }
  })
}
//验证原手机号
const changeMobile = () => {
  mobileChange.value.validate(async check => {
    if (check) {
      const params = {
        mobile: getUserInfo().mobile,
        code: formMobileChange.code
      }
      await validateMobile(params).then(res => {
        if (res.code === 0) {
          ElMessage.success({message: '验证成功，请勿刷新或关闭页面，请等待倒计时结束重新获取验证码。', duration: 0, showClose: true})
          isChangeMobile.value = false
          replacement.value = true
          setTimeout(() => {
            isChangeMobile.value = true
            replacement.value = false
            ElMessage.warning("验证过期，请重新验证")
          }, 300000)
        }
      })
    }
  })
}
//更换手机号
const rebind = () => {
  mobileBind.value.validate(async check => {
    if (check) {
      const params = {
        mobile: formMobileBind.mobile,
        code: formMobileBind.code
      }
      await rebindMobile(params).then(res => {
        if (res.code === 0) {
          ElMessage.success("更换成功")
          store.dispatch('user/getUserInfo')
          store.dispatch('login/changeIsMobile')
          store.dispatch('user/changeReRouter')
        }
      })
    }
  })
}
//发送验证码
let sendCodeRule = (type) => {
  if (type === 1 && formMobileBind.mobile === '') return
  if (!validMobile(formMobileBind.mobile)) return
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
  const params = type === 1 ? {mobile: formMobileBind.mobile} : {mobile: getUserInfo().mobile}
  sendCode(params).then(() => ElMessage.success("发送成功, 请查收"))
}

</script>
<script>
export default {
  name: "ChangeMobile"
}
</script>

<style scoped>
.onPasswordBtn {
  width: 100%;
}

::v-deep(.el-form-item__content) {
  display: block !important;
}
</style>
