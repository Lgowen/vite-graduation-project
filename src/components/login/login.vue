<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="logForm"
      label-width="60px"
      class="loginForm"
    >
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="loginForm.loginId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginPwd">
        <el-input v-model="loginForm.loginPwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button type="primary" @click="toReg()">立即注册</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { handleLogin } from './handleLogin'
import { useRouter } from 'vue-router'
import { getCurrentInstance, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance() // 获取当前组件实例
    const router = useRouter()
    const { loginForm, loginRules, validateLogin, resetLoginForm, linkToRegister } = handleLogin() // 引入登录业务数据逻辑
    
    function login() {
      validateLogin(ctx, router)
    }

    function resetForm() {
      resetLoginForm(ctx)
    }

    function toReg() {
      linkToRegister(router)
    }

    return { loginForm, loginRules, login, resetForm, toReg }
  }
})
</script>

<style lang="scss">
   .login{
       margin: 0 auto;
       margin-top: 100px;
       width: 500px;
       height: 500px;
   }
</style>
