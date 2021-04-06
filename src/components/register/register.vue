<template>
  <div class="register">
    <el-form
      :model="regForm"
      :rules="regRules"
      ref="registerForm"
      label-width="80px"
      class="regForm"
    >
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="regForm.loginId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginPwd">
        <el-input v-model="regForm.loginPwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="regForm.confirmPwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="regForm.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="regForm.age"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-radio-group v-model="regForm.role" size="medium">
          <el-radio border label="管理员"></el-radio>
          <el-radio border label="普通用户"></el-radio>
          <el-radio border label="VIP"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register()">注册</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { handleRegister } from './handleRegister'
import { useRouter } from 'vue-router'
import { reg } from 'utils/api'
import { ElMessage } from 'element-plus'
import { getCurrentInstance, defineComponent, onMounted, toRefs } from 'vue'
export default defineComponent({
   components: {
     vueImgVerify,
   },
   setup() {
    const router = useRouter()
    const { ctx, appContext } = getCurrentInstance() // 获取当前组件实例
    let { regForm, regRules, verifyRef, state, validateReg, resetRegForm } = handleRegister() // 引入登录业务数据逻辑

    function register() {
      validateReg(ctx, router)
    }

    onMounted(() => {

    })

    function resetForm() {
      resetRegForm(ctx) // 重置表单
    }

    return { regForm, regRules, register, resetForm }
  }
})
</script>

<style lang="scss">
   .register{
       margin: 0 auto;
       margin-top: 100px;
       width: 500px;
       height: 500px
   }
</style>
