import { ref, reactive } from "vue"
import { reg } from 'utils/api'
import { ElMessage } from 'element-plus'


export function handleRegister() {
    const regForm = reactive({
        loginId: "",
        loginPwd: "",
        name: "",
        age: "",
        role: "",
        confirmPwd: ""
    })

    const regRules = reactive({
        loginId: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        loginPwd: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        name: [
          {required: true, message: "请输入姓名", trigger: "blur" },
        ],
        age: [
            { required: true, message: "请输入年龄", trigger: "blur" },
            { type: 'number', message: "年龄必须为数值", trigger: "blur" }
        ],
        role: [
            { required: true, message: '请选择角色', trigger: 'change' }
        ],
        confirmPwd: [
            { required: true, message: "请再次输入密码", trigger: "blur" },
            { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
    })

    
    function validateReg(ctx, router){
      ctx.$refs['registerForm'].validate(async (valid) => {
          if (valid) {
            try {
              const { data: userInfo } = await reg(regForm)
              console.log(userInfo)
              if(userInfo.err) return ElMessage.error('用户已存在') // 注册失败
              ElMessage.success('注册成功，即将跳转到登录页面')
              resetRegForm(ctx)
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

    function resetRegForm(ctx){
        ctx.$refs['registerForm'].resetFields()
    }

    return { regForm, regRules, validateReg, resetRegForm }
}