<template>
  <div id="emailBind">
    <ListTitle>
      <template v-slot:Header>
        <div class='pattern-header'>
          <h1>邮箱绑定</h1>
        </div>
      </template>
    </ListTitle>
    <div class="MainWrapper">
      <el-form ref="formRef" v-show="success" :model="formEmail" :rules="rulesEmail">
        <el-form-item prop="email" v-show="queryEmail !== ''">
          <el-input disabled v-model="queryEmail"/>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" v-model="formEmail.email"/>
        </el-form-item>
        <el-form-item>
          <el-button class="onRestPass" plain @click="bindEmailClick" :loading="loading">发送验证邮件</el-button>
        </el-form-item>
      </el-form>

      <div v-show="!success" class="success-content">
        <p>验证邮件已发送至{{ formEmail.email }}</p>
        <p>请至你的邮箱查收，点击邮件里的确认链接，进行邮箱确认操作。</p>
      </div>

      <div v-show="!success" class="tip-content">
        若没有收到邮件可以：检查你的垃圾邮件，是否包含验证邮件；或者&ensp;
        <el-link type="warning" @click="success = true" style="font-size: 13px">重新发送验证邮件</el-link>
      </div>

    </div>
  </div>
</template>
<style scoped lang="less" src="./style/email.less"></style>

<script setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import ListTitle from '/@/components/listTitle/ListTitle.vue'
import emailReg from '/@/utils/validate'
import {validateEmail} from "/@/api/user";
import {ElMessage} from "element-plus";

const router = useRouter()
const formRef = ref(null)
const success = ref(true)
const loading = ref(false)
const formEmail = reactive({email: ''})
const queryEmail = ref('')
if (router.currentRoute.value.query.email)
  queryEmail.value = "当前绑定：" + router.currentRoute.value.query.email

const rulesEmail = {
  email: [
    {required: true, message: '邮箱不能为空', trigger: 'blur'},
    {pattern: emailReg, message: "邮箱格式不正确", trigger: "blur"}
  ]
}

const bindEmailClick = () => {
  formRef.value.validate(check => {
    if (check) {
      const params = {
        email: formEmail.email
      }
      loading.value = true
      validateEmail(params).then((res) => {
        if (res.code !== 0) return
        loading.value = false
        success.value = false
        ElMessage.success("发送成功，请查收")
      }).catch(error => {
        loading.value = false
        success.value = false
        console.log(error)
      })
    }
  })
}
</script>

<script>
export default {
  name: "EmailBind"
}
</script>
