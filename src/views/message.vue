<template>
  <div class="message">
    <el-form
      :model="state.massageForm"
      ref="commentForm"
      label-width="80px"
      class="commentForm"
    >
      <el-form-item label="留言板" prop="content">
        <el-input v-model="state.massageForm.content"></el-input>
      </el-form-item>
      <el-form-item label="用户信息" prop="userInfo">
        <el-input v-model="state.massageForm.userInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">留言</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>留言板</span>
          <el-button class="button" type="text" @click="clearComment">清空留言</el-button>
        </div>
      </template>
      <div v-for="item in state.comments" :key="item._id" class="text item">
        {{item.userInfo}}评论了：{{ item.content }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getComments, addComment } from 'utils/api'
import { setLocalStorage, removeLocalStorage } from 'utils/storage'
export default {
  name: "message",
  setup() {
    const { ctx, appContext } = getCurrentInstance() // 获取当前组件实例
    let state = reactive({
      comments: [],
      massageForm: {
        content: "",
        userInfo: ""
      }
    });
    onMounted(() => {
      get()
    });
    // console.log(comments)

    async function get () {
      const { data } = await getComments()
      state.comments = data
    }

    async function add() {
      const res = await addComment(state.massageForm)
      console.log(res)
      resetForm()
      ElMessage.success("添加评论成功")
      get()
    }

    function resetForm() {
      ctx.$refs['commentForm'].resetFields();
    }

    return { state, add };
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
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
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.message {
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-form {
    width: 500px;
    height: 500px;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
