<template>
  <div class='search-form__inner'>
    <div class="loginTitle">修改密码</div>
    <el-form ref="Password" :model="formPassword" :rules="rulesPassword">
      <el-form-item prop="old">
        <el-input placeholder="旧密码" v-model="formPassword.old" show-password/>
      </el-form-item>
      <el-form-item prop="new">
        <el-input placeholder="新密码" v-model="formPassword.new" show-password/>
      </el-form-item>
      <el-form-item prop="newOnce">
        <el-input placeholder="确认新密码" v-model="formPassword.newOnce" show-password/>
      </el-form-item>

      <el-form-item class="onLogin">
        <div>
          <el-button class="onPasswordBtn" @click.stop.prevent="changePassword">修改</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="less" scoped src="../style/Header.less"/>

<script setup>
import {useStore} from "vuex";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {updatePassword} from "/@/api/user";

const Password = ref()
const store = useStore()
const formPassword = reactive({old: '', new: '', newOnce: ''})
const rulesPassword = reactive({
  old: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 15, message: '密码最短六位', trigger: 'blur'},
  ],
  new: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 15, message: '密码最短六位', trigger: 'blur'},
  ]
})

const changePassword = () => {
  if (formPassword.new !== formPassword.newOnce) {
    ElMessage.warning("两次输入的密码不一致")
    return
  }
  Password.value.validate(check => {
    if (check) {
      const params = {
        oldPassword: formPassword.old,
        newPassword: formPassword.new
      }
      updatePassword(params).then(res => {
        if (res.code === 0) {
          ElMessage.success("修改成功")
          formPassword.old = ''
          formPassword.new = ''
          formPassword.newOnce = ''
          store.dispatch('login/changeIsPassword')
        }
      })
    }
  })
}
</script>
<script>
export default {
  name: "ChangePassword"
}
</script>

<style lang="less" scoped>
.onPasswordBtn {
  width: 100%;
}

::v-deep(.el-form-item__content) {
  display: block !important;
}
</style>
