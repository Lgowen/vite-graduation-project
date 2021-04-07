<template>
  <div class="update">
    <el-form
      :model="updateForm"
      :rules="updateRules"
      ref="update"
      label-width="80px"
      class="updateForm"
    >
      <el-form-item label="账号" prop="loginId">
        <el-input v-model="updateForm.loginId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="loginPwd">
        <el-input v-model="updateForm.loginPwd" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update">修改密码</el-button>
        <el-button @click="resetUpdateForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { updatePwd } from 'utils/api'
export default {
  name: "message",
  setup() {
     const { ctx, appContext } = getCurrentInstance() // 获取当前组件实例

     const router = useRouter()
     const updateForm = reactive({
        loginId: "",
        loginPwd: ""
    })

    const updateRules = reactive({
        loginId: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        loginPwd: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
    })

    function update(){
      ctx.$refs['update'].validate(async (valid) => {
          if (valid) {
            try {
              const { data: userInfo } = await updatePwd(updateForm)
              console.log(userInfo)
              if(userInfo.err) return ElMessage.error('修改密码失败') // 注册失败
              ElMessage.success('修改密码成功，即将跳转到登录页面')
              resetUpdateForm()
              setTimeout( () => router.push('login'), 2000)
               // 保存个人信息
               //   console.log(userInfo)
            } catch (error) {
              console.log(error)
            }
          } else {
            ElMessage.error('信息不合法，请重新输入')
            return false
          }
      })
    }


    function resetUpdateForm(){
        ctx.$refs['update'].resetFields()
    }

    return { updateForm, updateRules, update, resetUpdateForm }
  },
  data() {
    return {
      btnLoading: false,
      // massageForm: {
      //   content: "",
      //   userInfo: "",
      // },
      commentList: [],
    };
  },
  mounted() {
    // getComments()
  },
  methods: {
    // addComment(formName) {
    //   const message = {
    //     content: this.massageForm.content,
    //     userInfo: this.massageForm.userInfo,
    //   };
    //   setLocalStorage(message.userInfo, message.content)
    //   this.getComment()
    //   this.resetForm(formName);
    // },
    // getComment() {
    //   console.log(localStorage)
    //   console.log(Object.keys(localStorage))
    //   const keys = Object.keys(localStorage)
    //   keys.forEach(item => {
    //     if(item !== 'token') {
    //       this.commentList.push(localStorage[item])
    //     }
    //   })
    // },
    // clearComment () {
    //   const keys = Object.keys(localStorage)
    //   keys.forEach(item => {
    //     if (item !== 'token') {
    //       removeLocalStorage(item)
    //     }
    //   })
    //   this.commentList = []
    // }
  }
};
</script>

<style lang="scss" scoped>
.update{
       margin: 0 auto;
       margin-top: 100px;
       width: 500px;
       height: 500px
   }
</style>
