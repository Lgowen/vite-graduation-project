<template>
  <div class="nav">
    <div class="nav-content">
      <el-row :gutter="20">
        <el-col :span="3">
          <router-link to="/">
            <img class="logo" src="../../assets/logo/avartar.png" alt="lgowen" />
          </router-link>
        </el-col>
        <el-col :span="16">
          <el-menu
            :router="true"
            :default-active="activeId"
            active-text-color="#409eff"
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-menuItem
              :route="item.path"
              :index="item.id"
              v-for="item in navListItem"
              :key="item.id"
            >
              {{ item.name }}
            </el-menuItem>
          </el-menu>
        </el-col>
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
      </el-row>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, defineComponent } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { controlRoute } from './controlRoute'

export default defineComponent({
  name: "Nav",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { activeId, navListItem, routeChange } = controlRoute() // 抽离Nav组件业务逻辑
    onMounted( () => {
      
      routeChange(route)
    })  // 保证从首页进来时展示的是当前的激活项
    
    watch(route, nowPath => routeChange(nowPath)) // 保证路由变化时能够显示当前激活项(包括浏览器的前进、后退)
    
    function handleClick(path) {
      router.push(path)
    }

    return { activeId, navListItem, routeChange, handleClick }
  },
});
</script>

<style lang="scss" scoped>
@mixin flex-center {
    display: flex;
    justify-content: center;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  .el-row {
    text-align: center;
    @include flex-center;
    .el-menu {
      @include flex-center;
    }
  }
  .logo {
    height: 50px;
    margin: 0;
    border-radius: 50%;
    margin-top: 5px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu--horizontal > .el-menu-item {
    cursor: pointer;
    color: #333;
  }
  .nav-right {
    position: relative;
    padding-top: 15px;
    text-align: right;
    .el-dropdown {
      cursor: pointer;
      padding-right: 60px;
    }
    .user-img {
      position: absolute;
      top: -15px;
      right: 0;
      width: 50px;
      border-radius: 50%;
    }
  }
}

.enter-slideUp,
.leave-slideDown {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1010;
}

.enter-slideUp {
  overflow: auto;
  visibility: visible;
  z-index: 1001;
  animation: slideUp 0.3s forwards;
}
.leave-slideDown {
  visibility: visible;
  z-index: 1001;
  animation: slideDown 0.3s forwards;
}
@keyframes slideUp {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0.1;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes slideDown {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
}
.mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
}
.mask-fade-out {
  animation: maskFadeOut 0.4s forwards;
}
@keyframes maskFadeOut {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0;
  }
}
</style>
