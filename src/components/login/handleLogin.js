import { reactive } from "vue"
import { login } from 'utils/api'
import { ElMessage } from 'element-plus'
import { setLocalStorage } from "utils/storage"
import { useStore } from 'vuex'

export function handleLogin() {
    const loginForm = reactive({
        loginId: "",
        loginPwd: ""
    })
    const loginRules = reactive({
        loginId: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        loginPwd: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
    })
    const store = useStore()

    function validateLogin(ctx, router) {
        ctx.$refs['logForm'].validate(async (valid) => {
            if (valid) {
            //   console.log(this.ruleForm)
              // alert("submit!")
              try {
                // console.log(this.ruleForm)
                const { data } = await login(loginForm)
                // console.log(this.ruleForm)
                setLocalStorage('token', data.token) // 保存登录成功后的token
                store.commit('changeUserInfo', data) // 保存用户信息到vuex中
                store.commit('changeLoginStatus', true) // 保持用户登录状态
                console.log(data)
                if(data.err) {
                  ElMessage.error("账号或密码错误")
                }else {
                  ElMessage.success("即将跳转到文章列表")
                  resetLoginForm(ctx)
                  setTimeout( () => router.push('/article/algorithm'), 2000)
                }
              } catch (error) {
                console.log(error)
              }
            } else {
              console.log("error submit!!")
              return false
            }
        })
    }

    function resetLoginForm(ctx) {
        ctx.$refs['logForm'].resetFields()
    }

    function linkToRegister(router) {
        router.push('register')
    }

    return { loginForm, loginRules, validateLogin, resetLoginForm, linkToRegister }
}