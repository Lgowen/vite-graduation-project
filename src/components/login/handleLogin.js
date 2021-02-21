import { reactive } from "vue"
import { login } from 'utils/api'

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
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
    })

    function validateLogin(ctx) {
        ctx.$refs['logForm'].validate(async (valid) => {
            if (valid) {
            //   console.log(this.ruleForm)
              // alert("submit!")
              try {
                // console.log(this.ruleForm)
                const userInfo = await login(loginForm)
                // console.log(this.ruleForm)
                console.log(userInfo)
              } catch (error) {
                console.log(error)
              }
            } else {
              console.log("error submit!!")
              return false
            }
        })
        resetLoginForm(ctx)
    }

    function resetLoginForm(ctx) {
        ctx.$refs['logForm'].resetFields()
    }

    function linkToRegister(router) {
        router.push('register')
    }

    return { loginForm, loginRules, validateLogin, resetLoginForm, linkToRegister }
}