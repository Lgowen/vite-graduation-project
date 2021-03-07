<template>
  <!-- <div class="article">
       <el-col :span="4">
          <div class="nav-right">
            <el-button size="small" type="primary" @click="handleClick('login')"
              >登录</el-button
            >
            <el-button size="small" type="danger" @click="handleClick('register')"
              >注册</el-button
            >
          </div>
        </el-col>
    </div> -->
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "about",
  setup() {},
  components: {},
};
</script>

<style lang="scss" scoped>
.content {
  >:first-child {
    width: 1080px;
    margin: 0 auto;
  }
}
</style>
