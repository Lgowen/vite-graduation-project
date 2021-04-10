<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="logForm"
      label-width="80px"
      class="loginForm"
    >
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="loginForm.loginId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginPwd">
        <el-input v-model="loginForm.loginPwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="identify">
        <el-input v-model="loginForm.identify" style="width: 275px"></el-input>
      </el-form-item>
      <vueImgVerify class="identify" ref="verifyRef" />
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button type="primary" @click="toReg()">立即注册</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { handleLogin } from "./handleLogin";
import { useRouter } from "vue-router";
import { getCurrentInstance, defineComponent, toRefs } from "vue";
import { ElMessage } from "element-plus";
import vueImgVerify from "../indentify.vue";
export default defineComponent({
  components: {
    vueImgVerify,
  },
  setup() {
    const { ctx } = getCurrentInstance(); // 获取当前组件实例
    const router = useRouter();
    const {
      loginForm,
      loginRules,
      validateLogin,
      resetLoginForm,
      linkToRegister,
      verifyRef,
    } = handleLogin(); // 引入登录业务数据逻辑

    function login() {
      console.log(verifyRef.value.imgCode);
      console.log(loginForm.identify);
      if (verifyRef.value.imgCode.toLowerCase() === loginForm.identify.toLowerCase()) {
        validateLogin(ctx, router);
      } else {
        ElMessage.error("验证码输入错误");
      }
    }

    function resetForm() {
      resetLoginForm(ctx);
    }

    function toReg() {
      linkToRegister(router);
    }

    return { loginForm, loginRules, login, resetForm, toReg, verifyRef };
  },
});
</script>

<style lang="scss">
.login {
  margin: 0 auto;
  margin-top: 100px;
  width: 500px;
  height: 500px;
}
.loginForm {
  position: relative;
  .identify {
    position: absolute;
    right: 0px;
    bottom: 57px;
  }
}
</style>
